import os

from apify import Actor
from mcp.client.stdio import StdioServerParameters

from .const import TOOL_WHITELIST
from .models import ServerType
from .server import ProxyServer

# Actor configuration
STANDBY_MODE = os.environ.get("APIFY_META_ORIGIN") == "STANDBY"
HOST = "0.0.0.0"
PORT = (
    Actor.is_at_home() and int(os.environ.get("ACTOR_STANDBY_PORT") or "5001")
) or 5001
SERVER_NAME = "open-strategy-partners-mcp-server"

server_type = ServerType.STDIO
MCP_SERVER_PARAMS = StdioServerParameters(
    command="python",
    args=["-m", "osp_marketing_tools.server"],
    env={},
    cwd="/usr/src/app/osp_marketing_tools/src",
)


async def main() -> None:
    async with Actor:
        # Initialize Actor
        Actor.log.info("Starting MCP Server Actor")

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
                    'mcpServers': {{
                        '{SERVER_NAME}': {{
                            'url': '{url}/mcp',
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
            )
            await proxy_server.start()
        except Exception as e:
            Actor.log.exception(f"Server failed to start: {e}")
            await Actor.exit()
            raise
