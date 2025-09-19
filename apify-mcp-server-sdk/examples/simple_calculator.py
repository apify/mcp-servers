"""Example: Simple Calculator MCP Server using the SDK."""

import os
from enum import Enum

from apify import Actor
from apify_mcp_server_sdk import (
    ServerType,
    create_stdio_config,
    run_mcp_server,
)


class ChargeEvents(str, Enum):
    """Event types for charging MCP operations."""
    ACTOR_START = 'actor-start'
    TOOL_CALL = 'tool-call'


async def main() -> None:
    """Run the calculator MCP server."""
    # Configure the MCP server to run calculator
    mcp_server_params = create_stdio_config(
        command='uv',
        args=['run', 'mcp-server-calculator'],
        env={'YOUR-ENV_VAR': os.getenv('YOUR-ENV-VAR') or ''},
    )
    
    async with Actor:
        # Initialize and charge for Actor startup
        Actor.log.info('Starting Calculator MCP Server Actor')
        await Actor.charge(ChargeEvents.ACTOR_START.value)
        
        # Run the server with charging enabled
        await run_mcp_server(
            server_name='calculator-mcp-server',
            mcp_server_params=mcp_server_params,
            server_type=ServerType.STDIO,
            actor_charge_function=Actor.charge,
        )


if __name__ == '__main__':
    import asyncio
    asyncio.run(main())