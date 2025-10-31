"""Example: SlideSpeak MCP Server with tool whitelisting using the SDK."""

import os
from enum import Enum

from apify import Actor
from apify_mcp_server_sdk import (
    ProxyServer,
    ServerType,
    create_stdio_config,
    get_actor_config,
)


class ChargeEvents(str, Enum):
    """Event types for charging MCP operations."""
    ACTOR_START = 'actor-start'
    GET_TEMPLATES = 'get-templates'
    GENERATE_SLIDE = 'generate-slide'
    GENERATE_SLIDE_BY_SLIDE = 'generate-slide-by-slide'
    GET_TASK_STATUS = 'get-task-status'


async def main() -> None:
    """Run the SlideSpeak MCP server with tool whitelisting."""
    # Get the API key from environment
    slidespeak_api_key = os.getenv('SLIDESPEAK_API_KEY')
    if not slidespeak_api_key:
        raise ValueError("SLIDESPEAK_API_KEY environment variable not set!")

    # Configure the MCP server
    mcp_server_params = create_stdio_config(
        command='uv',
        args=[
            'run',
            'mcp-remote',
            'https://mcp.slidespeak.co/mcp',
            '--header',
            f'Authorization: Bearer {slidespeak_api_key}',
        ],
    )
    
    # Define tool whitelist with charging events
    tool_whitelist = {
        'generatePowerpoint': (ChargeEvents.GENERATE_SLIDE.value, 1),
        'getAvailableTemplates': (ChargeEvents.GET_TEMPLATES.value, 1),
        'generateSlideBySlide': (ChargeEvents.GENERATE_SLIDE_BY_SLIDE.value, 1),
        'getTaskStatus': (ChargeEvents.GET_TASK_STATUS.value, 1),
    }
    
    # Get actor configuration
    host, port, standby_mode = get_actor_config()
    
    async with Actor:
        # Initialize and charge for Actor startup
        Actor.log.info('Starting SlideSpeak MCP Server Actor')
        await Actor.charge(ChargeEvents.ACTOR_START.value)

        if not standby_mode:
            msg = 'This Actor is not meant to be run directly. It should be run in standby mode.'
            Actor.log.error(msg)
            await Actor.exit(status_message=msg)
            return

        try:
            # Create and start the server with tool whitelisting
            proxy_server = ProxyServer(
                server_name='slidespeak-mcp-server',
                config=mcp_server_params,
                host=host,
                port=port,
                server_type=ServerType.STDIO,
                actor_charge_function=Actor.charge,
                tool_whitelist=tool_whitelist,
            )
            
            await proxy_server.start()
        except Exception as e:
            Actor.log.exception(f'Server failed to start: {e}')
            await Actor.exit()
            raise


if __name__ == '__main__':
    import asyncio
    asyncio.run(main())