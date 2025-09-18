"""Main entry point for the MCP Server Actor."""

import os

from apify import Actor

from .const import TOOL_WHITELIST, ChargeEvents
from .models import RemoteServerParameters, ServerType
from .server import ProxyServer

# Actor configuration
STANDBY_MODE = os.environ.get("APIFY_META_ORIGIN") == "STANDBY"
# Bind to all interfaces (0.0.0.0) as this is running in a containerized environment (Apify Actor)
# The container's network is isolated, so this is safe
HOST = "0.0.0.0"  # noqa: S104 - Required for container networking at Apify platform
PORT = (
    Actor.is_at_home() and int(os.environ.get("ACTOR_STANDBY_PORT") or "5001")
) or 5001
SERVER_NAME = "docfork-mcp-server"  # Name of the MCP server, without spaces


server_type = ServerType.HTTP  # Use HTTP streamable transport for Docfork MCP server
MCP_SERVER_PARAMS = RemoteServerParameters(  # noqa: ERA001, RUF100
    url="https://mcp.docfork.com/mcp",  # Docfork MCP server URL
    headers=None,  # No authentication required for Docfork
)  # noqa: ERA001, RUF100
# ------------------------------------------------------------------------------


async def main() -> None:
    """Run the MCP Server Actor.

    This function:
    1. Initializes the Actor
    2. Charges for Actor startup
    3. Creates and starts the proxy server
    4. Configures charging for MCP operations using Actor.charge

    CHARGING STRATEGIES:
    The template supports multiple charging approaches:

    1. GENERIC MCP CHARGING:
       - Charge for all tool calls with a flat rate (TOOL_CALL event)
       - Charge for resource operations (RESOURCE_LIST, RESOURCE_READ)
       - Charge for prompt operations (PROMPT_LIST, PROMPT_GET)
       - Charge for tool listing (TOOL_LIST)

    2. DOMAIN-SPECIFIC CHARGING (Docfork example):
       - Charge different amounts for different tools
       - get-library-docs: $0.01 per documentation retrieval

    3. NO CHARGING:
       - Comment out all charging lines for free service

    Charging events are defined in .actor/pay_per_event.json
    """
    async with Actor:
        # Initialize and charge for Actor startup
        Actor.log.info("Starting MCP Server Actor")
        await Actor.charge(ChargeEvents.ACTOR_START.value)

        url = os.environ.get("ACTOR_STANDBY_URL", HOST)
        if not STANDBY_MODE:
            msg = (
                "Actor is not designed to run in the NORMAL mode. Use MCP server URL to connect to the server.\n"
                f"Connect to {url}/mcp to establish a connection.\n"
                "Learn more at https://mcp.apify.com/"
            )
            Actor.log.info(msg)
            await Actor.exit(status_message=msg)
            return

        try:
            # Create and start the server with charging enabled
            Actor.log.info("Starting MCP server")
            Actor.log.info(
                "Add the following configuration to your MCP client to use Streamable HTTP transport:"
            )
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
            proxy_server = ProxyServer(
                SERVER_NAME,
                MCP_SERVER_PARAMS,
                HOST,
                PORT,
                server_type,
                actor_charge_function=Actor.charge,
                tool_whitelist=TOOL_WHITELIST,
            )
            await proxy_server.start()
        except Exception as e:
            Actor.log.exception(f"Server failed to start: {e}")
            await Actor.exit()
            raise
