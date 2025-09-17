
# n8n MCP Server


**Important:** This server provides only documentation capability for n8n nodes and does not support workflow management or execution.

Enhance your workflow automation with n8n-MCP, bridging AI and n8n nodes for streamlined efficiency, all without the need for monthly subscriptions! 🚀

![Apify Actor Badge](https://apify.com/actor-badge?actor=mcp-servers/n8n-mcp-server)

**About this MCP Server:**
To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--n8n-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "n8n": {
      "url": "https://mcp-servers--n8n-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## Links
- [mcp-servers GitHub repository](https://github.com/apify/mcp-servers)
- [Apify MCP documentation](https://docs.apify.com/platform/integrations/mcp)
- [Original n8n-mcp GitHub repository](https://github.com/czlonkowski/n8n-mcp)

## 🚩 Claim this MCP server
All credits to the original authors of <https://github.com/czlonkowski/n8n-mcp>
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

---

A Model Context Protocol (MCP) server that provides AI assistants with comprehensive access to n8n node documentation, properties, and operations. Deploy in minutes to give Claude and other AI assistants deep knowledge about n8n's 525+ workflow automation nodes.

## Overview

n8n-MCP serves as a bridge between n8n's workflow automation platform and AI models, enabling them to understand and work with n8n nodes effectively. It provides structured access to:

- 📚 **535 n8n nodes** from both n8n-nodes-base and @n8n/n8n-nodes-langchain
- 📄 **Documentation** - 90% coverage from official n8n docs (including AI nodes)
- 🤖 **AI tools** - 263 AI-capable nodes detected with full documentation

## Key Insights

- **ANY node can be an AI tool** - not just those with usableAsTool=true

## Available Documentation Tools (No API Key Required)

- `tools_documentation` - Get documentation for any MCP tool (START HERE!)
- `list_nodes` - List all n8n nodes with filtering options
- `get_node_info` - Get comprehensive information about a specific node
- `get_node_essentials` - Get only essential properties with examples (10-20 properties instead of 200+)
- `search_nodes` - Full-text search across all node documentation
- `search_node_properties` - Find specific properties within nodes
- `list_ai_tools` - List all AI-capable nodes (ANY node can be used as AI tool!)
- `get_node_as_tool_info` - Get guidance on using any node as an AI tool
- `get_node_documentation` - Get parsed documentation from n8n-docs
- `get_database_statistics` - View database metrics and coverage

## References
- [mcp-servers GitHub repository](https://github.com/apify/mcp-servers)
- [Apify MCP documentation](https://docs.apify.com/platform/integrations/mcp)
- [Original n8n-mcp GitHub repository](https://github.com/czlonkowski/n8n-mcp)
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)


## 📚 Documentation

### Setup Guides
- [Installation Guide](./docs/INSTALLATION.md) - Comprehensive installation instructions
- [Claude Desktop Setup](./docs/README_CLAUDE_SETUP.md) - Detailed Claude configuration
- [Docker Guide](./docs/DOCKER_README.md) - Advanced Docker deployment options
- [MCP Quick Start](./docs/MCP_QUICK_START_GUIDE.md) - Get started quickly with n8n-MCP

### Feature Documentation
- [Workflow Diff Operations](./docs/workflow-diff-examples.md) - Token-efficient workflow updates (NEW!)
- [Transactional Updates](./docs/transactional-updates-example.md) - Two-pass workflow editing
- [MCP Essentials](./docs/MCP_ESSENTIALS_README.md) - AI-optimized tools guide
- [Validation System](./docs/validation-improvements-v2.4.2.md) - Smart validation profiles

### Development & Deployment
- [Railway Deployment](./docs/RAILWAY_DEPLOYMENT.md) - One-click cloud deployment guide
- [HTTP Deployment](./docs/HTTP_DEPLOYMENT.md) - Remote server setup guide
- [Dependency Management](./docs/DEPENDENCY_UPDATES.md) - Keeping n8n packages in sync
- [Claude's Interview](./docs/CLAUDE_INTERVIEW.md) - Real-world impact of n8n-MCP

### Project Information
- [Change Log](./CHANGELOG.md) - Complete version history
- [Claude Instructions](./CLAUDE.md) - AI guidance for this codebase
- [MCP Tools Reference](#-available-mcp-tools) - Complete list of available tools

## 📊 Metrics & Coverage

Current database coverage (n8n v1.106.3):

- ✅ **535/535** nodes loaded (100%)
- ✅ **528** nodes with properties (98.7%)
- ✅ **470** nodes with documentation (88%)
- ✅ **267** AI-capable tools detected
- ✅ **AI Agent & LangChain nodes** fully documented
- ⚡ **Average response time**: ~12ms
- 💾 **Database size**: ~15MB (optimized)

## References
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)