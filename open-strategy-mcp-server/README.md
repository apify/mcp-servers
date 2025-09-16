# Open Strategy Partners (OSP) Marketing Tools for LLMs

A comprehensive suite of tools for technical marketing content creation, optimization, and product positioning based on Open Strategy Partners' proven methodologies.

This software is based on the Model Context Protocol (MCP) and can be used by any LLM client that supports the MCP.

## Features

### 1. OSP Product Value Map Generator
Generate structured OSP product value maps that effectively communicate your product's worth and positioning:
- Tagline creation and refinement
- Position statements across market, technical, UX, and business dimensions
- Persona development with roles, challenges, and needs
- Value case documentation
- Feature categorization and organization
- Hierarchical structure for features, areas, and categories
- Validation system for completeness and consistency

### 2. OSP Meta Information Generator
Create optimized metadata for web content:
- Article titles (H1) with proper keyword placement
- Meta titles optimized for search (50-60 characters)
- Meta descriptions with clear value propositions (155-160 characters)
- SEO-friendly URL slugs
- Search intent analysis
- Mobile display optimization
- Click-through rate enhancement suggestions

### 3. OSP Content Editing Codes
Apply OSP's semantic editing codes for comprehensive content review:
- Scope and narrative structure analysis
- Flow and readability enhancement
- Style and phrasing optimization
- Word choice and grammar verification
- Technical accuracy validation
- Inclusive language guidance
- Constructive feedback generation with before/after examples

### 4. OSP Technical Writing Guide
Systematic approach to creating high-quality technical content:
- Narrative structure development
- Flow optimization
- Style guidelines
- Technical accuracy verification
- Content type-specific guidance (tutorials, reference docs, API documentation)
- Accessibility considerations
- Internationalization best practices
- Quality assurance checklists

### 5. OSP On-Page SEO Guide
Comprehensive system for optimizing web content for search engines and user experience:
- Meta content optimization (titles, descriptions with character limits and keyword placement)
- Content depth enhancement (subtopics, data integration, multi-format optimization)
- Search intent alignment (5 types: informational, navigational, transactional, commercial, local)
- Technical SEO implementation (keyword research, integration protocols, internal linking rules)
- Structured data deployment (FAQ, How-To, Product schemas)
- Content promotion strategies (social media, advertising approaches)
- Quality validation protocol (constructive feedback, diff-based revision system)
- Performance measurement methods (CTR, bounce rate, time on page metrics)

## Usage Examples

In all of these examples, it is assumed that you will provide the texts that you wish to improve, or the technical documentation that describes the product you are marketing.

### Value Map Generation
Prompt: "Generate an OSP value map for [Product Name] focusing on [target audience] with the following key features: [list features]"

Example:
```
Generate an OSP value map for CloudDeploy, focusing on DevOps engineers with these key features:
- Automated deployment pipeline
- Infrastructure as code support
- Real-time monitoring
- Multi-cloud compatibility
- [the rest of your features or text]
```

### Meta Information Creation
Prompt: "Use the OSP meta tool to generate metadata for an article about [topic]. Primary keyword: [keyword], audience: [target audience], content type: [type]"

Example:
```
Use the OSP meta tool to generate metadata for an article about containerization best practices. Primary keyword: 'Docker containers', audience: system administrators, content type: technical guide
```

### Content Editing
Prompt: "Review this technical content using OSP editing codes: [paste content]"

Example:
```
Review this technical content using OSP editing codes:
Kubernetes helps you manage containers. It's really good at what it does. You can use it to deploy your apps and make them run better.
```

### Technical Writing
Prompt: "Apply the OSP writing guide to create a [document type] about [topic] for [audience]"

Example:
```
Apply the OSP writing guide to create a tutorial about setting up a CI/CD pipeline for junior developers
```

## Installation

### Prerequisites

#### macOS
- Install Claude Desktop (or another MCP-enabled AI tool)
    - Download Claude for Desktop
    - Follow the current installation instructions: Installing Claude Desktop
- Install Python 3.10 or higher:
    - Using Homebrew: `brew install python`
    - Verify installation with `python3 --version`
- Install uv:
    - Using Homebrew: `brew install uv`
    - Alternatively: `pip3 install --user uv`
    - Verify installation with `uv --version`

#### Windows
- Install Claude Desktop (or another MCP-enabled AI tool)
    - Download Claude for Desktop
    - Follow the current installation instructions: Installing Claude Desktop
- Install Python 3.10 or higher:
    - Download the latest Python installer from python.org
    - Run the installer, checking "Add Python to PATH"
    - Open Command Prompt and verify installation with `python --version`
- Install uv:
    - Open Command Prompt as Administrator
    - Run `pip install --user uv`
    - Verify installation with `uv --version`

### Configuration

Add the following to your `claude_desktop_config.json`:

```
# ![Apify Actor Badge](https://apify.com/actor-badge?actor=mcp-server/open-strategy-partners-mcp-server)

# Open Strategy Partners MCP Server

**About this MCP Server:**
This Apify Actor provides a suite of technical marketing tools for LLMs, including product value mapping, metadata generation, content editing codes, and technical writing guidance, all accessible via the Model Context Protocol (MCP).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--open-strategy-partners-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
    "mcpServers": {
        "open-strategy-partners": {
            "url": "https://mcp-servers--open-strategy-partners-mcp-server.apify.actor/mcp",
            "headers": {
                "Authorization": "Bearer YOUR_APIFY_TOKEN"
            }
        }
    }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## 🚩 Claim this MCP server
All credits to the original authors of https://github.com/open-strategy-partners/osp_marketing_tools
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).


## Attribution

This software package implements the content creation and optimization methodologies developed by Open Strategy Partners. It is based on their LLM-enabled marketing tools and professional content creation frameworks.

For more information and original resources, visit:
- [The OSP Writing and Editing Guide](https://openstrategypartners.com/resources/writing-editing-guide)
- [Editing Codes Quickstart Guide](https://openstrategypartners.com/resources/editing-codes)
- [OSP Free Resources](https://openstrategypartners.com/resources)

## License

This software is licensed under the Attribution-ShareAlike 4.0 International license from Creative Commons Corporation ("Creative Commons").

This means you are free to:
- **Share**: Copy and redistribute the material in any medium or format
- **Adapt**: Remix, transform, and build upon the material for any purpose, even commercially

Under the following terms:
- **Attribution**: You must give appropriate credit to Open Strategy Partners, provide a link to the license, and indicate if changes were made
- **ShareAlike**: If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original

For the full license text, visit: [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/)

## Contributing

We welcome contributions to improve these tools. Please submit issues and pull requests through our repository.

## Support

For questions and support:
- Check our documentation
- Submit an issue in our repository
- Contact Open Strategy Partners for professional consulting

```json
{
    "actor-start": {
        "eventTitle": "MCP server startup",
        "eventDescription": "Initial fee for starting the Actor MCP Server",
        "eventPriceUsd": 0.1
    },
    "tool-call": {
        "eventTitle": "MCP tool call",
        "eventDescription": "Fee for executing MCP tools",
        "eventPriceUsd": 0.05
    }
}
```

In the Actor, trigger events with:

```python
await Actor.charge('actor-start', 1)  # Charge for server startup
await Actor.charge('tool-call', 1)    # Charge for tool execution
```

To set up the PPE model:

1. Go to your Actor's **Publication settings**.
2. Set the **Pricing model** to `Pay per event`.
3. Add the pricing schema (see [pay_per_event.json](.actor/pay_per_event.json) for a complete example).

## 🔧 How It Works

This template implements a proxy server that can connect to a stdio-based, Streamable HTTP, or SSE-based MCP server and expose it via [legacy Server-Sent Events (SSE) transport](https://modelcontextprotocol.io/specification/2024-11-05/basic/transports#http-with-sse) or [Streamable HTTP transport](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#streamable-http). Here's how it works:

### Server types

1. **Stdio Server** (`StdioServerParameters`):
    - Spawns a local process that implements the MCP protocol over stdio.
    - Configure using the `command` parameter to specify the executable and the `args` parameter for additional arguments.
    - Optionally, use the `env` parameter to pass environment variables to the process.

Example:

```python
server_type = ServerType.STDIO
MCP_SERVER_PARAMS = StdioServerParameters(
    command='uv',
    args=['run', 'osp_marketing_tools'],
    env={'YOUR_ENV_VAR': os.getenv('YOUR-ENV-VAR')},  # Optional environment variables
)
```

2. **Remote Server** (`RemoteServerParameters`):
    - Connects to a remote MCP server via HTTP or SSE transport.
    - Configure using the `url` parameter to specify the server's endpoint.
    - Set the appropriate `server_type` (ServerType.HTTP or ServerType.SSE).
    - Optionally, use the `headers` parameter to include custom headers (e.g., for authentication) and the `auth` parameter for additional authentication mechanisms.

Example:

```python
server_type = ServerType.HTTP
MCP_SERVER_PARAMS = RemoteServerParameters(
    url='https://mcp.apify.com',
    headers={'Authorization': 'Bearer YOUR-API-KEY'},  # Replace with your authentication token
)
```

Note: SSE transport is also supported by setting `server_type = ServerType.SSE`.

- **Tips**:
    - Ensure the remote server supports the transport type you're using and is accessible from the Actor's environment.
    - Use environment variables to securely store sensitive information like tokens or API keys.

#### Environment variables:

Environment variables can be securely stored and managed at the Actor level on the [Apify platform](https://docs.apify.com/platform/actors/development/programming-interface/environment-variables#custom-environment-variables). These variables are automatically injected into the Actor's runtime environment, allowing you to:

- Keep sensitive information like API keys secure.
- Simplify configuration by avoiding hardcoded values in your code.

### Proxy implementation

The proxy server (`ProxyServer` class) handles:

- Creating a Starlette web server with legacy SSE (`/sse` and `/messages/`) and Streamable HTTP (`/mcp`) endpoints
- Managing connections to the underlying MCP server
- Forwarding requests and responses between clients and the MCP server
- Handling charging through the `actor_charge_function`

Key components:

- `ProxyServer`: Main class that manages the proxy functionality
- `create_proxy_server`: Creates an MCP server instance that proxies requests
- `charge_mcp_operation`: Handles charging for different MCP operations

### MCP operations

The proxy supports all standard MCP operations:

- `list_tools()`: List available tools
- `call_tool()`: Execute a tool with arguments
- `list_prompts()`: List available prompts
- `get_prompt()`: Get a specific prompt
- `list_resources()`: List available resources
- `read_resource()`: Read a specific resource

Each operation can be configured for charging in the PPE model.

## 📚 Resources

- [What is Anthropic's Model Context Protocol?](https://blog.apify.com/what-is-model-context-protocol/)
- [How to use MCP with Apify Actors](https://blog.apify.com/how-to-use-mcp/)
- [Apify MCP server](https://mcp.apify.com)
- [Apify MCP server documentation](https://docs.apify.com/platform/integrations/mcp)
- [Apify MCP client](https://apify.com/jiri.spilka/tester-mcp-client)
- [Model Context Protocol documentation](https://modelcontextprotocol.io)
- [Apify SDK documentation](https://docs.apify.com/sdk/js/)


## Getting started

For complete information [see this article](https://docs.apify.com/platform/actors/development#build-actor-locally). To run the Actor use the following command:

```bash
apify run
```

## Deploy to Apify

### Connect Git repository to Apify

If you've created a Git repository for the project, you can easily connect to Apify:

1. Go to [Actor creation page](https://console.apify.com/actors/new)
2. Click on **Link Git Repository** button

### Push project on your local machine to Apify

You can also deploy the project on your local machine to Apify without the need for the Git repository.

1. Log in to Apify. You will need to provide your [Apify API Token](https://console.apify.com/account/integrations) to complete this action.

    ```bash
    apify login
    ```

2. Deploy your Actor. This command will deploy and build the Actor on the Apify Platform. You can find your newly created Actor under [Actors -> My Actors](https://console.apify.com/actors?tab=my).

    ```bash
    apify push
    ```

## Documentation reference

To learn more about Apify and Actors, take a look at the following resources:

- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
