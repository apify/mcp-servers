# MCP Servers Monorepo

A comprehensive collection of Model Context Protocol (MCP) servers published at Apify, providing managed wrappers around existing MCP servers for enhanced functionality, reliability, and ease of use.

## 🚀 Overview

This monorepo contains a variety of MCP servers that extend the capabilities of AI applications by providing secure, controlled access to external tools and data sources. Each server is designed to be production-ready with proper error handling, logging, and monitoring.

**Important:** These are **wrappers** around existing open-source MCP servers. We do not claim ownership of the original MCP server implementations. All credits go to the original developers.

## 💰 Why publish MCP servers at Apify?

### 🚀 Benefits for developers

- **Monetization**: Earn revenue from your MCP servers through pay-per-use pricing
- **Global reach**: Access to Apify's large user base of developers and businesses
- **Production infrastructure**: Enterprise-grade hosting, scaling, and monitoring
- **Built-in analytics**: Track usage, performance, and revenue
- **Community exposure**: Get discovered by users through [Apify MCP server](https://mcp.apify.com) or by browsing the Apify Store

### 🛠️ Technical advantages

- **Standby mode**: Servers stay running for instant response times
- **Auto-scaling**: Handles traffic spikes automatically
- **Multi-transport support**: HTTP-streamable and SSE transport options
- **OAuth integration**: Easy authentication for MCP clients
- **Environment management**: Secure handling of API keys and secrets
- **Docker support**: Containerized deployment for consistency

## 📦 Available servers

| Actor | Description | Actor badge | Original author |
|-------|-------------|-------------|-----------------|
| **[Brave Search MCP Server](./brave-search-mcp-server/)** | Web search capabilities powered by Brave Search | [![Brave Search MCP Server](https://apify.com/actor-badge?actor=mcp-servers/brave-search-mcp-server)](https://apify.com/mcp-servers/brave-search-mcp-server) | [MCP Community](https://github.com/modelcontextprotocol/servers-archived/tree/main/src/brave-search) |
| **[Perplexity Sonar MCP Server](./perplexity-mcp-server/)** | AI-powered search and information retrieval | [![Perplexity Soner MCP Server](https://apify.com/actor-badge?actor=mcp-servers/perplexity-sonar-mcp-server)](https://apify.com/mcp-servers/perplexity-sonar-mcp-server) | [Perplexity AI](https://github.com/ppl-ai/modelcontextprotocol) |
| **[Firecrawl MCP Server](./firecrawl-mcp-server/)** | Web crawling and content extraction | [![Firecrawl MCP Server](https://apify.com/actor-badge?actor=mcp-servers/firecrawl-mcp-server)](https://apify.com/actor/mcp-servers/firecrawl-mcp-server) | [Mendable AI](https://github.com/mendableai/firecrawl-mcp-server) |
| **[Slide Speak MCP Server](./slide-speak-mcp-server/)** | Presentation and speech synthesis | [![Slide Speak MCP Server](https://apify.com/actor-badge?actor=mcp-servers/slidespeak-mcp-server)](https://apify.com/mcp-servers/slidespeak-mcp-server) | [SlideSpeak](https://github.com/slidespeak/slidespeak-mcp) |
| **[Lara Translate MCP Server](./lara-translate-mcp-server/)** | Multi-language translation services | [![Lara Translate MCP Server](https://apify.com/actor-badge?actor=mcp-servers/lara-translate-mcp-server)](https://apify.com/mcp-servers/lara-translate-mcp-server) | [Translated](https://github.com/translated/lara-mcp) |
| **[Calculator MCP Server](./calculator-MCP-server/)** | Mathematical computations and calculations | [![Calculator MCP Server](https://apify.com/actor-badge?actor=mcp-servers/calculator-mcp-server)](https://apify.com/mcp-servers/calculator-mcp-server) | [Githejie](https://github.com/githejie/mcp-server-calculator) |
| **[National Parks MCP Server](./national-parks/)** | Geographic and park information | [![National Parks MCP Server](https://apify.com/actor-badge?actor=mcp-servers/national-parks-mcp-server)](https://apify.com/mcp-servers/national-parks-mcp-server) | [KyrieTangSheng](https://github.com/KyrieTangSheng/mcp-server-nationalparks) |

## 🙏 Credits and acknowledgments

### Original developers

All credits to the original authors of these MCP servers:

- **Brave Search MCP Server**: [brave-search-mcp](https://github.com/brave/brave-search-mcp) by Brave Software
- **Perplexity Sonar MCP Server**: [server-perplexity-ask](https://github.com/perplexity-ai/server-perplexity-ask) by Perplexity AI
- **Firecrawl MCP Server**: [firecrawl-mcp](https://github.com/firecrawl/firecrawl-mcp) by Firecrawl
- **Slide Speak MCP Server**: [slidespeak-mcp](https://github.com/slidespeak/slidespeak-mcp) by SlideSpeak
- **Lara Translate MCP Server**: [lara-mcp](https://github.com/translated/lara-mcp) by Translated
- **Calculator MCP Server**: [mcp-server-calculator](https://github.com/modelcontextprotocol/server-calculator) by MCP Community
- **National Parks MCP Server**: [mcp-server-nationalparks](https://github.com/KyrieTangSheng/mcp-server-nationalparks) by KyrieTangSheng

### Claim this MCP server

🚩 **Claim this MCP server** – If you are the original developer and would like to claim ownership or have any concerns, please write to [ai@apify.com](mailto:ai@apify.com).

## 🛠️ Quick start

### Prerequisites

- **For TypeScript servers**: Node.js 18+ and npm
- **For Python servers**: Python 3.8+ and pip
- **For all servers**: Docker (optional, for containerized deployment)

### Installation

Each server can be installed and run independently:

```bash
# TypeScript servers
cd <server-name>
npm install
npm start

# Python servers
cd <server-name>
pip install -r requirements.txt
python -m src.main
```

### Using with MCP clients

Configure your MCP client (like Claude Desktop) to use these servers:

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@apify/brave-search-mcp-server"]
    },
    "calculator": {
      "command": "python",
      "args": ["-m", "src.main"],
      "cwd": "./calculator-MCP-server"
    }
  }
}
```
## 🔧 Development

### Templates

When creating new MCP servers, you can use our pre-built templates:

- **[Python MCP server template](https://apify.com/templates/python-mcp-server)** - For Python-based MCP servers
- **[TypeScript MCP server template](https://apify.com/templates/ts-mcp-server)** - For TypeScript-based MCP servers

**Template selection guide:**
- For `stdio-based` MCP servers: Choose the template for the language the server is written in
- For `remote` servers: You can select language based on your preference

### Project structure

```
mcp-servers/
├── <server-name>/
│   ├── src/           # Source code
│   ├── Dockerfile     # Container configuration
│   ├── package.json   # Node.js dependencies (TypeScript servers)
│   ├── requirements.txt # Python dependencies (Python servers)
│   └── README.md      # Server-specific documentation
├── LICENSE            # MIT License
├── CONTRIBUTING.md    # Contribution guidelines
├── CODE_OF_CONDUCT.md # Community standards
└── SECURITY.md        # Security policy
```

### Adding a new server

1. Create a new directory with the server name
2. Follow the existing server structure
3. Implement the MCP server interface
4. Add Docker support
5. Include comprehensive documentation
6. Add tests and examples

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- How to report issues
- How to suggest enhancements
- How to submit code changes
- Development setup and guidelines

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

We take security seriously. Please report any vulnerabilities to [security@apify.com](mailto:security@apify.com). See our [Security Policy](SECURITY.md) for more details.

## 🌐 What is Apify MCP?

The Apify Model Context Protocol (MCP) Server at **[mcp.apify.com](https://mcp.apify.com)** instantly connects AI applications and agents to thousands of ready-built tools. It allows your AI assistant to use any [Apify Actor](https://apify.com/store) for web scraping, data extraction, and automation tasks in real time.

**Key benefits:**
- **Instant access** to 5,000+ Apify Actors and tools
- **No setup required** - connect with just a URL
- **OAuth support** for easy authentication
- **Production-ready** with enterprise-grade reliability

### 🎯 Try it now

For the easiest setup and most powerful features, connect your AI assistant to our hosted server:

**[`https://mcp.apify.com`](https://mcp.apify.com)**

It supports OAuth, so you can connect from clients like Claude.ai or Visual Studio Code with just the URL.


## 🌟 Community

- **Issues**: Report bugs and request features on GitHub
- **Discussions**: Join community discussions
- **Documentation**: Check individual server READMEs for detailed usage

## 🙏 Acknowledgments

- Built on the [Model Context Protocol](https://modelcontextprotocol.io/)
- Inspired by the [official MCP servers repository](https://github.com/modelcontextprotocol/servers)
- Community contributions and feedback

### 📈 References

Learn how to build and monetize MCP servers on Apify:

- **[Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)**
- **[How to build and monetize an AI agent on Apify](https://blog.apify.com/how-to-build-an-ai-agent/)**
- **[What is MCP and why does it matter?](https://blog.apify.com/what-is-model-context-protocol/)**

---

**Made with ❤️ by the Apify team**
