import os

from apify import Actor
from mcp.client.stdio import StdioServerParameters

from .const import TOOL_WHITELIST, ChargeEvents
from .models import ServerType
from .server import ProxyServer

STANDBY_MODE = os.environ.get("APIFY_META_ORIGIN") == "STANDBY"
HOST = "0.0.0.0"  # noqa: S104 - Required for container networking at Apify platform
PORT = (
    Actor.is_at_home() and int(os.environ.get("ACTOR_STANDBY_PORT") or "5001")
) or 5001
SERVER_NAME = "time-mcp-server"

server_type = ServerType.STDIO
MCP_SERVER_PARAMS = StdioServerParameters(
    command="uvx",
    args=["mcp-server-time"],
    env={},
)


async def main() -> None:
    """Entry point for the MCP Server Actor. Initializes and starts the server with charging enabled."""
    async with Actor:
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
