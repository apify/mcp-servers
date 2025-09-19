"""Base main function template for MCP servers."""

import os
from typing import Any

from .config import get_actor_config
from .server import ProxyServer


async def run_mcp_server(
    server_name: str,
    mcp_server_params: Any,
    server_type: Any,
    actor_charge_function: Any | None = None,
    startup_delay: float = 0.0,
) -> None:
    """Run an MCP server with common setup.

    Args:
        server_name: Name of the server for logging and HTML page
        mcp_server_params: MCP server parameters (stdio or remote)
        server_type: Type of server (STDIO, SSE, or HTTP)
        actor_charge_function: Optional charging function
        startup_delay: Optional startup delay in seconds
    """
    host, port, standby_mode = get_actor_config()
    
    # Create and start the proxy server
    proxy_server = ProxyServer(
        server_name,
        mcp_server_params, 
        host, 
        port, 
        server_type,
        actor_charge_function=actor_charge_function
    )
    await proxy_server.start()