"""Main entry point for the MCP Server Actor (PyPI Query MCP via stdio/uvx)."""

import os

from apify import Actor

from .const import SESSION_TIMEOUT_SECS, TOOL_WHITELIST
from .models import ServerType
from .server import ProxyServer

# Actor configuration
STANDBY_MODE = os.environ.get('APIFY_META_ORIGIN') == 'STANDBY'
# Bind to all interfaces (0.0.0.0) as this is running in a containerized environment (Apify Actor)
# The container's network is isolated, so this is safe
HOST = '0.0.0.0'  # noqa: S104 - Required for container networking at Apify platform
PORT = (Actor.is_at_home() and int(os.environ.get('ACTOR_STANDBY_PORT') or '5001')) or 5001
SERVER_NAME = 'pypi-query-mcp-server'  # Name of the MCP server, without spaces

# ------------------------------------------------------------------------------
# We use stdio transport and launch the PyPI Query MCP Server via `uvx`.
# See: pip install pypi-query-mcp-server  (runtime fetched by uvx with --from)
# ------------------------------------------------------------------------------

from mcp.client.stdio import StdioServerParameters  # noqa: E402

server_type = ServerType.STDIO
MCP_SERVER_PARAMS = StdioServerParameters(
    command='uvx',
    # Explicitly pull the entry from PyPI and run it.
    args=['--from', 'pypi-query-mcp-server', 'pypi-query-mcp'],
    # Pass-through environment variables supported by the PyPI Query MCP server.
    env={
        # Public index / mirrors
        'PYPI_INDEX_URL': os.getenv('PYPI_INDEX_URL', 'https://pypi.org/pypi'),
        'PYPI_INDEX_URLS': os.getenv('PYPI_INDEX_URLS', ''),  # comma-separated mirrors
        'PYPI_EXTRA_INDEX_URLS': os.getenv('PYPI_EXTRA_INDEX_URLS', ''),  # optional extras
        # Caching & logging
        'PYPI_CACHE_TTL': os.getenv('PYPI_CACHE_TTL', '3600'),
        'PYPI_LOG_LEVEL': os.getenv('PYPI_LOG_LEVEL', 'INFO'),
        # Networking / timeouts
        'PYPI_REQUEST_TIMEOUT': os.getenv('PYPI_REQUEST_TIMEOUT', '30'),
        # Private repository support (optional)
        'PYPI_PRIVATE_PYPI_URL': os.getenv('PYPI_PRIVATE_PYPI_URL', ''),
        'PYPI_PRIVATE_PYPI_USERNAME': os.getenv('PYPI_PRIVATE_PYPI_USERNAME', ''),
        'PYPI_PRIVATE_PYPI_PASSWORD': os.getenv('PYPI_PRIVATE_PYPI_PASSWORD', ''),
        # Advanced knobs (optional; safe defaults)
        'PYPI_DEPENDENCY_MAX_DEPTH': os.getenv('PYPI_DEPENDENCY_MAX_DEPTH', '5'),
        'PYPI_DEPENDENCY_MAX_CONCURRENT': os.getenv('PYPI_DEPENDENCY_MAX_CONCURRENT', '10'),
        'PYPI_ENABLE_SECURITY_ANALYSIS': os.getenv('PYPI_ENABLE_SECURITY_ANALYSIS', 'false'),
    },
)

session_timeout_secs = int(os.getenv('SESSION_TIMEOUT_SECS', SESSION_TIMEOUT_SECS))


async def main() -> None:
    """Run the MCP Server Actor.

    Flow:
    1. Initializes the Actor
    2. Creates and starts the proxy server (only in STANDBY mode)
    3. Configures charging for MCP tool operations using Actor.charge (no system event charging)

    Charging:
    - Generic MCP events (tool list/call, resource, etc.)
    - PyPI-specific tool events via TOOL_WHITELIST (see const.py)
    """
    async with Actor:
        # Initialize and charge for Actor startup
        Actor.log.info('Starting MCP Server Actor (PyPI Query MCP)')
        # NOTE: Removed charging for ACTOR_START. System events like 'apify-actor-start'
        # are not billable and attempting to charge them results in ApifyApiError:
        #   Event "apify-actor-start" is system event and cannot be charged.
        # If you need a startup charge, define a custom event name (e.g. 'actor-custom-start').

        url = os.environ.get('ACTOR_STANDBY_URL', HOST)
        if not STANDBY_MODE:
            msg = (
                'Actor is designed to run in STANDBY mode only. Use the MCP server URL to connect.\n'
                f'When running on Apify in standby, connect to {url}/mcp to establish a connection.\n'
                'Learn more at https://mcp.apify.com/'
            )
            Actor.log.info(msg)
            await Actor.exit(status_message=msg)
            return

        try:
            # Create and start the server with charging and whitelist enabled
            Actor.log.info('Launching MCP proxy server')
            Actor.log.info('Add the following configuration to your MCP client to use Streamable HTTP transport:')
            Actor.log.info(
                f"""
                {{
                    "mcpServers": {{
                        "{SERVER_NAME}": {{
                            "url": "{url}/mcp"
                        }}
                    }}
                }}
                """
            )

            proxy_server = ProxyServer(
                SERVER_NAME,
                MCP_SERVER_PARAMS,
                HOST,
                PORT,
                server_type,
                actor_charge_function=Actor.charge,
                tool_whitelist=TOOL_WHITELIST,
                session_timeout_secs=session_timeout_secs,
            )
            await proxy_server.start()
        except Exception as e:
            Actor.log.exception(f'Server failed to start: {e}')
            await Actor.exit()
            raise
