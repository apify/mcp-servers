"""Main entry point for the MCP Server Actor."""

import os

from apify import Actor

from .const import ChargeEvents
from .models import ServerType
from .server import ProxyServer


# Actor configuration
STANDBY_MODE = os.environ.get('APIFY_META_ORIGIN') == 'STANDBY'
HOST = '0.0.0.0'  # Required for container networking at Apify platform
PORT = (Actor.is_at_home() and int(os.environ.get('ACTOR_STANDBY_PORT') or '5001')) or 5001
SERVER_NAME = 'osp_marketing_tools'  # Name of the MCP server, update as needed

# EDIT THIS SECTION ------------------------------------------------------------
# Configuration constants - You need to override these values. You can also pass environment variables if needed.
from mcp.client.stdio import StdioServerParameters  # noqa: E402


# Set up to use the OSP Marketing Tools server as the default for Apify actorization
server_type = ServerType.STDIO
MCP_SERVER_PARAMS = StdioServerParameters(
    command='python',
    args=['-m', 'osp_marketing_tools.server'],
    env={'PYTHONPATH': 'osp_marketing_tools/src'},
)

# If you later want to use HTTP/SSE, uncomment and configure below:
# from .models import RemoteServerParameters  # noqa: ERA001
# server_type = ServerType.HTTP # or ServerType.SSE, depending on your server type # noqa: ERA001
# MCP_SERVER_PARAMS = RemoteServerParameters( # noqa: ERA001, RUF100
#     url='https://mcp.apify.com',  # noqa: ERA001
#     headers={'Authorization':  'Bearer YOUR-API-KEY'},  # Optional headers, e.g., for authentication  # noqa: ERA001
# )  # noqa: ERA001, RUF100
# ------------------------------------------------------------------------------


async def main() -> None:
    """Run the MCP Server Actor.

    This function:
    1. Initializes the Actor
    2. Charges for Actor startup
    3. Creates and starts the proxy server
    4. Configures charging for MCP operations using Actor.charge

    The proxy server will charge for different MCP operations like:
    - Tool calls
    - Prompt operations
    - Resource access
    - List operations

    Charging events are defined in .actor/pay_per_event.json
    """
    async with Actor:
        # Initialize and charge for Actor startup
        Actor.log.info('Starting MCP Server Actor')
        await Actor.charge(ChargeEvents.ACTOR_START.value)

        url = os.environ.get('ACTOR_STANDBY_URL', HOST)
        if not STANDBY_MODE:
            msg = (
                'Actor is not designed to run in the NORMAL mode. Use MCP server URL to connect to the server.\n'
                f'Connect to {url}/mcp to establish a connection.\n'
                'Learn more at https://mcp.apify.com/'
            )
            Actor.log.info(msg)
            await Actor.exit(status_message=msg)
            return

        try:
            # Create and start the server with charging enabled
            Actor.log.info('Starting MCP server')
            Actor.log.info('Add the following configuration to your MCP client to use Streamable HTTP transport:')
            Actor.log.info(
                f"""
                {{
                    "mcpServers": {{
                        "{SERVER_NAME}": {{
                            "url": "{url}/mcp",
                        }}
                    }}
                }}
                """
            )
            # Pass Actor.charge to enable charging for MCP operations
            # The proxy server will use this to charge for different operations
            proxy_server = ProxyServer(MCP_SERVER_PARAMS, HOST, PORT, server_type, actor_charge_function=Actor.charge)
            await proxy_server.start()
        except Exception as e:
            Actor.log.exception(f'Server failed to start: {e}')
            await Actor.exit()
            raise
