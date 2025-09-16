
import asyncio

from mcp.client.stdio import stdio_client
from src.main import main

if __name__ == '__main__':
    # Execute the Actor entry point, matching the template style
    asyncio.run(main())
    help(stdio_client)
    help(stdio_client)
