import asyncio
import os
import subprocess
import sys

from apify import Actor

from .const import SESSION_TIMEOUT_SECS, TOOL_WHITELIST
from .models import RemoteServerParameters, ServerType
from .server import ProxyServer

# Actor configuration
STANDBY_MODE = os.environ.get('APIFY_META_ORIGIN') == 'STANDBY'
# Bind to all interfaces (0.0.0.0) as this is running in a containerized environment (Apify Actor)
# The container's network is isolated, so this is safe
HOST = '0.0.0.0'  # noqa: S104 - Required for container networking at Apify platform
PORT = (Actor.is_at_home() and int(os.environ.get('ACTOR_STANDBY_PORT') or '5001')) or int(os.environ.get('ACTOR_WEB_SERVER_PORT') or os.environ.get('PORT', '4321'))
SERVER_NAME = 'wikipedia'


def start_wikipedia_mcp() -> subprocess.Popen:
    """Start the Wikipedia MCP server in SSE mode as a background process."""
    command = ['wikipedia-mcp', '--transport', 'sse']
    language = os.environ.get('WIKIPEDIA_LANGUAGE')
    if language:
        command += ['--language', language]
    return subprocess.Popen(command, stdout=sys.stdout, stderr=sys.stderr)  # noqa: S603


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

    2. DOMAIN-SPECIFIC CHARGING (Wikipedia example):
       - Charge different amounts for different tools
       - search_wikipedia: $0.01 per search
       - get_article: $0.001 per article
       - get_summary: $0.005 per summary
       - get_sections: $0.001 per sections request
       - get_links: $0.001 per links request
       - get_related_topics: $0.01 per related topics request
       - summarize_article_for_query: $0.02 per summary
       - summarize_article_section: $0.01 per section summary
       - extract_key_facts: $0.01 per extraction

    3. NO CHARGING:
       - Comment out all charging lines for free service

    Charging events are defined in .actor/pay_per_event.json
    """
    async with Actor:
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
            Actor.log.info('Starting Wikipedia MCP server')
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
            
            # Start the Wikipedia MCP server in the background
            proc = start_wikipedia_mcp()
            try:
                # Wait a moment for the MCP server to start
                await asyncio.sleep(2)
                # Set up the proxy to connect to the local MCP server
                mcp_url = 'http://127.0.0.1:8000/sse'  # Correct port and path for wikipedia-mcp SSE
                mcp_params = RemoteServerParameters(url=mcp_url)
                
                # Pass Actor.charge to enable charging for MCP operations
                # The proxy server will use this to charge for different operations
                session_timeout_secs = int(os.getenv('SESSION_TIMEOUT_SECS', SESSION_TIMEOUT_SECS))
                proxy_server = ProxyServer(
                    SERVER_NAME,
                    mcp_params,
                    HOST,
                    PORT,
                    ServerType.SSE,
                    actor_charge_function=Actor.charge,  # Enable charging
                    tool_whitelist=TOOL_WHITELIST,
                    session_timeout_secs=session_timeout_secs,
                )
                await proxy_server.start()
            finally:
                proc.terminate()
                proc.wait()
        except Exception as e:
            Actor.log.exception(f'Server failed to start: {e}')
            await Actor.exit()
            raise


if __name__ == '__main__':
    asyncio.run(main())
