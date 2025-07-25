# MCP Servers Monorepo

A comprehensive collection of Model Context Protocol (MCP) servers published at Apify, providing managed wrappers around existing MCP servers for enhanced functionality, reliability, and ease of use.

## 🚀 Overview

This monorepo contains a variety of MCP servers that extend the capabilities of AI applications by providing secure, controlled access to external tools and data sources. Each server is designed to be production-ready with proper error handling, logging, and monitoring.

## 📦 Available servers

### Search & Information
- **[Brave Search MCP Server](./brave-search-mcp-server/)** - Web search capabilities powered by Brave Search
- **[Perplexity MCP Server](./perplexity-mcp-server/)** - AI-powered search and information retrieval
- **[Firecrawl MCP Server](./firecrawl-mcp-server/)** - Web crawling and content extraction

### Creative & Media
- **[EverArt MCP Server](./everart-mcp-server/)** - AI image generation and manipulation
- **[Slide Speak MCP Server](./slide-speak-mcp-server/)** - Presentation and speech synthesis
- **[Chart MCP Server](./chart-MCP-server/)** - Data visualization and chart generation

### Translation & Language
- **[Lara Translate MCP Server](./lara-translate-mcp-server/)** - Multi-language translation services

### Data & Analytics
- **[Calculator MCP Server](./calculator-MCP-server/)** - Mathematical computations and calculations
- **[National Parks MCP Server](./national-parks/)** - Geographic and park information

### Browser & Automation
- **[Stagehand BrowserBase MCP Server](./stagehand-browserbase-mcp-server/)** - Web automation and browser control

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

## 🏗️ Architecture

Each server follows a consistent architecture:

- **TypeScript servers**: Built with Node.js, TypeScript, and the MCP TypeScript SDK
- **Python servers**: Built with Python and the MCP Python SDK
- **Docker support**: All servers include Dockerfiles for containerized deployment
- **Configuration**: Environment-based configuration with sensible defaults
- **Logging**: Structured logging with configurable levels
- **Error handling**: Comprehensive error handling and graceful degradation

## 🔧 Development

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

## 🌟 Community

- **Issues**: Report bugs and request features on GitHub
- **Discussions**: Join community discussions
- **Documentation**: Check individual server READMEs for detailed usage

## 📊 Status

| Server | Language | Status | Version |
|--------|----------|--------|---------|
| Brave Search | TypeScript | ✅ Active | Latest |
| Calculator | Python | ✅ Active | Latest |
| Chart | TypeScript | ✅ Active | Latest |
| EverArt | TypeScript | ✅ Active | Latest |
| Firecrawl | TypeScript | ✅ Active | Latest |
| Lara Translate | TypeScript | ✅ Active | Latest |
| National Parks | TypeScript | ✅ Active | Latest |
| Perplexity | TypeScript | ✅ Active | Latest |
| Slide Speak | Python | ✅ Active | Latest |
| Stagehand BrowserBase | TypeScript | ✅ Active | Latest |

## 🙏 Acknowledgments

- Built on the [Model Context Protocol](https://modelcontextprotocol.io/)
- Inspired by the [official MCP servers repository](https://github.com/modelcontextprotocol/servers)
- Community contributions and feedback

---

**Made with ❤️ by the Apify team**
