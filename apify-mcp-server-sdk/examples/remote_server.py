"""Example: Remote MCP Server using the SDK."""

import os
from enum import Enum

from apify import Actor
from apify_mcp_server_sdk import (
    ServerType,
    create_remote_config,
    run_mcp_server,
)


class ChargeEvents(str, Enum):
    """Event types for charging MCP operations."""
    ACTOR_START = 'actor-start'
    TOOL_CALL = 'tool-call'
    RESOURCE_READ = 'resource-read'


async def main() -> None:
    """Run a remote MCP server."""
    # Configure the remote MCP server
    mcp_server_params = create_remote_config(
        url='https://your-remote-mcp-server.com/mcp',
        headers={'Authorization': f'Bearer {os.getenv("API_KEY", "your-api-key")}'},
        timeout=60.0,
    )
    
    async with Actor:
        # Initialize and charge for Actor startup
        Actor.log.info('Starting Remote MCP Server Actor')
        await Actor.charge(ChargeEvents.ACTOR_START.value)
        
        # Run the server with charging enabled
        await run_mcp_server(
            server_name='remote-mcp-server',
            mcp_server_params=mcp_server_params,
            server_type=ServerType.HTTP,  # or ServerType.SSE
            actor_charge_function=Actor.charge,
        )


if __name__ == '__main__':
    import asyncio
    asyncio.run(main())