"""Module implementing an MCP server that can be used to connect to stdio or SSE based MCP servers.

Heavily inspired by: https://github.com/sparfenyuk/mcp-proxy
"""


from __future__ import annotations

import contextlib
import logging
from typing import TYPE_CHECKING, Any

import httpx
import uvicorn
from mcp.client.session import ClientSession
from mcp.client.sse import sse_client
from mcp.client.stdio import StdioServerParameters, stdio_client
from mcp.client.streamable_http import streamablehttp_client
from mcp.server.sse import SseServerTransport
from mcp.server.streamable_http_manager import StreamableHTTPSessionManager
from pydantic import ValidationError
from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse, RedirectResponse, Response
from starlette.routing import Mount, Route

from .event_store import InMemoryEventStore
from .mcp_gateway import create_gateway
from .models import RemoteServerParameters, ServerParameters, ServerType

if TYPE_CHECKING:
    from collections.abc import AsyncIterator, Callable

    from mcp.server import Server
    from starlette.requests import Request
    from starlette.types import Receive, Scope, Send

logger = logging.getLogger('apify')


class McpPathRewriteMiddleware(BaseHTTPMiddleware):
    """Add middleware to rewrite /mcp to /mcp/ to ensure consistent path handling.

    This is necessary so that Starlette does not return a 307 Temporary Redirect on the /mcp path,
    which would otherwise trigger the OAuth flow when the MCP server is deployed on the Apify platform.
    """

    async def dispatch(self, request: Request, call_next: Callable) -> Any:
        """Rewrite the request path."""
        if request.url.path == '/mcp':
            request.scope['path'] = '/mcp/'
            request.scope['raw_path'] = b'/mcp/'
        return await call_next(request)




class ProxyServer:
    """Main class implementing the proxy functionality using MCP SDK, template-aligned with SSE compatibility."""

    @staticmethod
    def get_html_page(server_name: str, mcp_url: str) -> str:
        """Return a simple HTML page for the MCP endpoint browser view."""
        return (
            f"""
<!DOCTYPE html>
<html>
  <head>
    <meta charset='UTF-8'>
    <title>{server_name}</title>
  </head>
  <body>
    <h1>{server_name}</h1>
    <div>MCP endpoint: <code>{mcp_url}</code></div>
  </body>
</html>
"""
        )

    def __init__(
        self,
        server_name: str,
        config: ServerParameters,
        server_options: dict,
    ) -> None:
        self.server_name = server_name
        self.server_type = server_options.get('server_type')
        self.config = self._validate_config(self.server_type, config)
        self.host = server_options.get('host')
        self.port = server_options.get('port')
        self.actor_charge_function = server_options.get('actor_charge_function')
        self.tool_whitelist = server_options.get('tool_whitelist')
        self.path_sse = '/sse'
        self.path_message = '/message'

    @staticmethod
    def _validate_config(client_type: ServerType, config: ServerParameters) -> ServerParameters | None:
        """Validate and return the appropriate server parameters."""
        try:
            match client_type:
                case ServerType.STDIO:
                    return StdioServerParameters.model_validate(config)
                case ServerType.SSE | ServerType.HTTP:
                    return RemoteServerParameters.model_validate(config)
                case _:
                    raise ValueError(f'Unsupported server type: {client_type}')
        except ValidationError as e:
            raise ValueError(f'Invalid server configuration: {e}') from e


    @staticmethod
    async def create_starlette_app(
        server_name: str,
        mcp_server: Server,
        *,
        enable_sse: bool = True,
    ) -> Starlette:
        """Create a Starlette app that exposes /mcp endpoint for Streamable HTTP transport and optionally SSE endpoints.

        The app supports both HTTP and SSE transports, and provides a browser-friendly HTML page at the root endpoint.
        """
        event_store = InMemoryEventStore()
        session_manager = StreamableHTTPSessionManager(
            app=mcp_server,
            event_store=event_store,
            json_response=False,
        )
        transport = SseServerTransport('/messages/') if enable_sse else None

        def is_html_browser(request: Request) -> bool:
            accept_header = request.headers.get('accept', '')
            return 'text/html' in accept_header

        def serve_html_page(server_name: str, mcp_url: str) -> Response:
            html = ProxyServer.get_html_page(server_name, mcp_url)
            return Response(content=html, media_type='text/html')

        @contextlib.asynccontextmanager
        async def lifespan(_app: Starlette) -> AsyncIterator[None]:
            async with session_manager.run():
                logger.info('Application started with StreamableHTTP session manager!')
                try:
                    yield
                finally:
                    logger.info('Application shutting down...')

        async def handle_root(request: Request) -> Any:
            if 'x-apify-container-server-readiness-probe' in request.headers:
                return Response(content=b'ok', media_type='text/plain', status_code=200)
            if is_html_browser(request):
                server_url = f"https://{request.headers.get('host', 'localhost')}"
                mcp_url = f'{server_url}/mcp'
                return serve_html_page(server_name, mcp_url)
            endpoints = {'streamableHttp': '/mcp'}
            if enable_sse:
                endpoints['sse'] = '/sse'
                endpoints['messages'] = '/messages/'
            return JSONResponse({
                'status': 'running',
                'type': 'mcp-server',
                'transport': 'streamable-http' + ('+sse' if enable_sse else ''),
                'endpoints': endpoints,
            })

        async def handle_favicon(_request: Request) -> Any:
            return RedirectResponse(url='https://apify.com/favicon.ico', status_code=301)

        async def handle_oauth_authorization_server(_request: Request) -> Any:
            try:
                async with httpx.AsyncClient() as client:
                    response = await client.get('https://api.apify.com/.well-known/oauth-authorization-server')
                    response.raise_for_status()
                    data = response.json()
                return JSONResponse(data, status_code=200)
            except Exception:
                logger.exception('Error fetching OAuth authorization server data')
                return JSONResponse({'error': 'Failed to fetch OAuth authorization server data'}, status_code=500)

        async def handle_sse(request: Request) -> Any:
            if not transport:
                return Response(status_code=404)
            try:
                send = getattr(request, 'send', None) or getattr(request, '_send', None)
                async with transport.connect_sse(request.scope, request.receive, send) as streams:
                    init_options = mcp_server.create_initialization_options()
                    await mcp_server.run(streams[0], streams[1], init_options)
            except Exception as e:
                logger.exception('Error in SSE connection')
                return Response(status_code=500, content=str(e))
            finally:
                logger.info('SSE connection closed')
            return Response(status_code=204)

        async def handle_streamable_http(scope: Scope, receive: Receive, send: Send) -> None:
            await session_manager.handle_request(scope, receive, send)

        routes = [
            Route('/', endpoint=handle_root),
            Route('/favicon.ico', endpoint=handle_favicon, methods=['GET']),
            Route(
                '/.well-known/oauth-authorization-server',
                endpoint=handle_oauth_authorization_server,
                methods=['GET'],
            ),
            Mount('/mcp/', app=handle_streamable_http),
        ]
        if enable_sse and transport:
            routes.append(Route('/sse', endpoint=handle_sse, methods=['GET']))
            routes.append(Mount('/messages/', app=transport.handle_post_message))

        return Starlette(
            debug=True,
            routes=routes,
            lifespan=lifespan,
            middleware=[Middleware(McpPathRewriteMiddleware)],
        )

    async def _run_server(self, app: Starlette) -> None:
        """Run the Starlette app with uvicorn."""
        config_ = uvicorn.Config(app, host=self.host, port=self.port, log_level='info', access_log=True)
        server = uvicorn.Server(config_)
        await server.serve()

    async def start(self) -> None:
        """Start Starlette app and connect to stdio, Streamable HTTP, or SSE based MCP server."""
        logger.info(f'Starting MCP server with client type: {self.server_type} and config {self.config}')
        params: dict = (self.config and self.config.model_dump(exclude_unset=True)) or {}

        if self.server_type == ServerType.STDIO:
            config_ = StdioServerParameters.model_validate(self.config)
            async with (
                stdio_client(config_) as (read_stream, write_stream),
                ClientSession(read_stream, write_stream) as session,
            ):
                mcp_server = await create_gateway(session, self.actor_charge_function, self.tool_whitelist)
                app = await self.create_starlette_app(self.server_name, mcp_server, enable_sse=True)
                await self._run_server(app)

        elif self.server_type == ServerType.SSE:
            async with (
                sse_client(**params) as (read_stream, write_stream),
                ClientSession(read_stream, write_stream) as session,
            ):
                mcp_server = await create_gateway(session, self.actor_charge_function, self.tool_whitelist)
                app = await self.create_starlette_app(self.server_name, mcp_server, enable_sse=True)
                await self._run_server(app)

        elif self.server_type == ServerType.HTTP:
            async with (
                streamablehttp_client(**params) as (read_stream, write_stream, _),
                ClientSession(read_stream, write_stream) as session,
            ):
                mcp_server = await create_gateway(session, self.actor_charge_function, self.tool_whitelist)
                app = await self.create_starlette_app(self.server_name, mcp_server, enable_sse=True)
                await self._run_server(app)
        else:
            raise ValueError(f'Unknown server type: {self.server_type}')
