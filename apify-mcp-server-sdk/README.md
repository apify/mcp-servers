# Apify MCP Server SDK

A comprehensive Python SDK for building Apify MCP (Model Context Protocol) server implementations with built-in support for charging, tool authorization, and multiple transport protocols.

## Features

- **Multi-Transport Support**: Connect to stdio, SSE, or HTTP-based MCP servers
- **Tool Authorization**: Whitelist-based tool authorization with flexible charging
- **HTML Browser Support**: Automatic detection and serving of HTML pages for browser requests
- **OAuth Integration**: Built-in OAuth authorization server support
- **Event Store**: In-memory event store for resumability functionality
- **Flexible Charging**: Configurable charging for different MCP operations
- **Easy Configuration**: Simple configuration utilities for common setups

## Installation

```bash
pip install apify-mcp-server-sdk
```

## Usage

### Simple Calculator Server

```python
import os
from enum import Enum
from apify import Actor
from apify_mcp_server_sdk import ServerType, create_stdio_config, run_mcp_server

class ChargeEvents(str, Enum):
    ACTOR_START = 'actor-start'
    TOOL_CALL = 'tool-call'

async def main():
    # Configure the MCP server
    mcp_server_params = create_stdio_config(
        command='uv',
        args=['run', 'mcp-server-calculator'],
    )
    
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
```

### Remote Server with Authentication

```python
import os
from enum import Enum
from apify import Actor
from apify_mcp_server_sdk import ServerType, create_remote_config, run_mcp_server

class ChargeEvents(str, Enum):
    ACTOR_START = 'actor-start'
    TOOL_CALL = 'tool-call'

async def main():
    # Configure remote MCP server with authentication
    mcp_server_params = create_remote_config(
        url='https://your-remote-mcp-server.com/mcp',
        headers={'Authorization': f'Bearer {os.getenv("API_KEY")}'},
        timeout=60.0,
    )
    
    # Run the server
    await run_mcp_server(
        server_name='remote-mcp-server',
        mcp_server_params=mcp_server_params,
        server_type=ServerType.HTTP,
        actor_charge_function=Actor.charge,
    )
```

### Advanced: Tool Whitelisting and Custom Charging

```python
import os
from enum import Enum
from apify import Actor
from apify_mcp_server_sdk import ProxyServer, ServerType, create_stdio_config, get_actor_config

class ChargeEvents(str, Enum):
    ACTOR_START = 'actor-start'
    GENERATE_SLIDE = 'generate-slide'
    GET_TEMPLATES = 'get-templates'

async def main():
    # Configure MCP server
    mcp_server_params = create_stdio_config(
        command='npx',
        args=['mcp-remote', 'https://mcp.slidespeak.co/mcp', '--header', f'Authorization: Bearer {os.getenv("API_KEY")}'],
    )
    
    # Define tool whitelist with custom charging
    tool_whitelist = {
        'generatePowerpoint': (ChargeEvents.GENERATE_SLIDE.value, 1),
        'getAvailableTemplates': (ChargeEvents.GET_TEMPLATES.value, 1),
    }
    
    # Get actor configuration
    host, port, standby_mode = get_actor_config()
    
    async with Actor:
        await Actor.charge(ChargeEvents.ACTOR_START.value)
        
        # Create proxy server with custom configuration
        proxy_server = ProxyServer(
            server_name='slidespeak-mcp-server',
            config=mcp_server_params,
            host=host,
            port=port,
            server_type=ServerType.STDIO,
            actor_charge_function=Actor.charge,
        )
        await proxy_server.start()
```

## Development

```bash
# Install in development mode
pip install -e .

# Run tests
pytest

# Format code
black src/
isort src/

# Type checking
mypy src/
```

## License

MIT