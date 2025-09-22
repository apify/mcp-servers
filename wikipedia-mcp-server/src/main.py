import asyncio
import os
import subprocess
import sys

from .const import TOOL_WHITELIST
from .models import RemoteServerParameters, ServerType
from .server import ProxyServer

HOST = '0.0.0.0'  # noqa: S104
PORT = int(os.environ.get('ACTOR_WEB_SERVER_PORT') or os.environ.get('PORT', '4321'))
SERVER_NAME = 'wikipedia'


def start_wikipedia_mcp() -> subprocess.Popen:
    """Start the Wikipedia MCP server in SSE mode as a background process."""
    command = ['wikipedia-mcp', '--transport', 'sse']
    language = os.environ.get('WIKIPEDIA_LANGUAGE')
    if language:
        command += ['--language', language]
    return subprocess.Popen(command, stdout=sys.stdout, stderr=sys.stderr)  # noqa: S603


async def main() -> None:
    """Entrypoint for Apify Actor: launches Wikipedia MCP server (SSE) and HTTP proxy."""
    proc = start_wikipedia_mcp()
    try:
        # Wait a moment for the MCP server to start
        await asyncio.sleep(2)
        # Set up the proxy to connect to the local MCP server
        mcp_url = 'http://127.0.0.1:8000/sse'  # Correct port and path for wikipedia-mcp SSE
        mcp_params = RemoteServerParameters(url=mcp_url)
        proxy_server = ProxyServer(
            SERVER_NAME,
            mcp_params,
            HOST,
            PORT,
            ServerType.SSE,
            actor_charge_function=None,  # Add Actor.charge if using Apify charging
            tool_whitelist=TOOL_WHITELIST,
        )
        await proxy_server.start()
    finally:
        proc.terminate()
        proc.wait()


if __name__ == '__main__':
    asyncio.run(main())
