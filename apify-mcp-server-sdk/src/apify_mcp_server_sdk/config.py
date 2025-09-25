"""Configuration utilities for MCP servers."""

import os
from typing import Any

from apify import Actor
from mcp.client.stdio import StdioServerParameters

from .models import RemoteServerParameters


def get_actor_config() -> tuple[str, int, bool]:
    """Get common Actor configuration.
    
    Returns:
        Tuple of (host, port, standby_mode)
    """
    standby_mode = os.environ.get('APIFY_META_ORIGIN') == 'STANDBY'
    # Bind to all interfaces (0.0.0.0) as this is running in a containerized environment (Apify Actor)
    # The container's network is isolated, so this is safe
    host = '0.0.0.0'  # noqa: S104 - Required for container networking in Apify platform
    port = (Actor.is_at_home() and int(os.environ.get('ACTOR_STANDBY_PORT') or '5001')) or 5001
    
    return host, port, standby_mode


def create_stdio_config(
    command: str,
    args: list[str],
    env: dict[str, str] | None = None,
) -> StdioServerParameters:
    """Create a stdio server configuration.
    
    Args:
        command: Command to run
        args: Command arguments
        env: Optional environment variables
        
    Returns:
        StdioServerParameters instance
    """
    return StdioServerParameters(
        command=command,
        args=args,
        env=env or {},
    )


def create_remote_config(
    url: str,
    headers: dict[str, Any] | None = None,
    timeout: float = 60.0,
    sse_read_timeout: float = 300.0,
) -> RemoteServerParameters:
    """Create a remote server configuration (SSE or HTTP).
    
    Args:
        url: Server URL
        headers: Optional HTTP headers
        timeout: Connection timeout
        sse_read_timeout: SSE read timeout
        
    Returns:
        RemoteServerParameters instance
    """
    return RemoteServerParameters(
        url=url,
        headers=headers,
        timeout=timeout,
        sse_read_timeout=sse_read_timeout,
    )


def get_client_config_urls(host: str, port: int) -> dict[str, str]:
    """Get client configuration URLs for both transport types.
    
    Args:
        host: Server host
        port: Server port
        
    Returns:
        Dict with HTTP and SSE URLs
    """
    base_url = f"http://{host}:{port}"
    return {
        'http': f"{base_url}/mcp",
        'sse': f"{base_url}/sse",
    }