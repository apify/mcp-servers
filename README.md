# MCP Servers Monorepo

A curated collection of production-ready Model Context Protocol (MCP) servers published on Apify. These are wrappers around open-source MCP servers — **credits go to the original developers**.

- **Monetize** your MCP servers via pay-per-use pricing
- **Reach** a global developer and business audience
- **Reliable** hosting, scaling, and monitoring
- **Built-in analytics**
- **Community exposure** via Apify MCP server and the Apify Store
- **Standby mode** for instant responses
- **Multi-transport** (http-streamable and SSE) support
- **OAuth** for easy authentication


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

## 🙏 Credits
These are wrappers—original code by: Brave Software, Perplexity AI, Mendable AI, SlideSpeak, Translated, Githejie, KyrieTangSheng, and others.

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
├── README.md          # This file
```

## 🤝 Contributing
This monorepo is maintained by Apify.
We encourage you to build your own MCP servers using our templates—see the official MCP documentation and Apify MCP docs.

To report issues or request features, open an issue with details.

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

### 📈 References

Learn how to build and monetize MCP servers on Apify:

- **[Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)**
- **[How to build and monetize an AI agent on Apify](https://blog.apify.com/how-to-build-an-ai-agent/)**
- **[What is MCP and why does it matter?](https://blog.apify.com/what-is-model-context-protocol/)**

---

**Made with ❤️ and 🍺 by the Apify team**
