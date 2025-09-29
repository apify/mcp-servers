# Firecrawl MCP Server

A Model Context Protocol (MCP) server implementation that integrates with Firecrawl for web scraping capabilities.

**Big thanks to @vrknetha, @knacklabs for the initial implementation!**

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

---

## ✨ Features

- Web scraping, crawling, and discovery
- Search and content extraction
- Deep research and batch scraping
- Automatic retries and rate limiting
- Cloud and self-hosted support
- SSE support

Play around with our MCP Server on [MCP.so's playground](https://mcp.so) or on [Klavis AI](https://klavis.ai).

---

## 🚀 Installation

### Running with `npx`

```bash
env FIRECRAWL_API_KEY=fc-YOUR_API_KEY npx -y firecrawl-mcp
```

### Manual Installation

```bash
npm install -g firecrawl-mcp
```

---

## 🖥️ Running on Cursor

> Requires Cursor version 0.45.6+

For the most up-to-date configuration instructions, see [Cursor MCP Server Configuration Guide](https://docs.cursor.so/agents/mcp-servers).

### Cursor v0.48.6+

```json
{
  "mcpServers": {
    "firecrawl-mcp": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "YOUR-API-KEY"
      }
    }
  }
}
```

### Cursor v0.45.6

- Go to `Settings > Features > MCP Servers`
- Click **Add New MCP Server**

```bash
Name: firecrawl-mcp
Type: command
Command: env FIRECRAWL_API_KEY=your-api-key npx -y firecrawl-mcp
```

> **Note for Windows:** Use `cmd /c "set FIRECRAWL_API_KEY=your-api-key && npx -y firecrawl-mcp"`

---

## 🌊 Running on Windsurf

Add this to your `./codeium/windsurf/model_config.json`:

```json
{
  "mcpServers": {
    "mcp-server-firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

---

## 🔁 Running with SSE (Local Mode)

```bash
env SSE_LOCAL=true FIRECRAWL_API_KEY=fc-YOUR_API_KEY npx -y firecrawl-mcp
```

> Access at: [http://localhost:3000/sse](http://localhost:3000/sse)

---

## 🛠️ Installing via Smithery (Legacy)

```bash
npx -y @smithery/cli install @mendableai/mcp-server-firecrawl --client claude
```

---

## 💻 Running on VS Code

**One-click install:**
- [Install with NPX in VS Code](#)
- [Install with NPX in VS Code Insiders](#)

### Manual Setup

User Settings (JSON):

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "apiKey",
        "description": "Firecrawl API Key",
        "password": true
      }
    ],
    "servers": {
      "firecrawl": {
        "command": "npx",
        "args": ["-y", "firecrawl-mcp"],
        "env": {
          "FIRECRAWL_API_KEY": "${input:apiKey}"
        }
      }
    }
  }
}
```

### Workspace File: `.vscode/mcp.json`

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "apiKey",
      "description": "Firecrawl API Key",
      "password": true
    }
  ],
  "servers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "${input:apiKey}"
      }
    }
  }
}
```

---

## ⚙️ Configuration

### Required

| Name               | Description                         |
|--------------------|-------------------------------------|
| `FIRECRAWL_API_KEY` | Your Firecrawl API key              |

### Optional (Self-hosted)

| Name               | Description                                      |
|--------------------|--------------------------------------------------|
| `FIRECRAWL_API_URL` | Custom Firecrawl API endpoint                   |

### Retry Configuration

| Variable                        | Default | Description                         |
|----------------------------------|---------|-------------------------------------|
| `FIRECRAWL_RETRY_MAX_ATTEMPTS`   | 3       | Number of retry attempts            |
| `FIRECRAWL_RETRY_INITIAL_DELAY`  | 1000    | Initial delay (ms)                  |
| `FIRECRAWL_RETRY_MAX_DELAY`      | 10000   | Maximum delay (ms)                  |
| `FIRECRAWL_RETRY_BACKOFF_FACTOR` | 2       | Exponential backoff factor          |

### Credit Monitoring

| Variable                             | Default |
|--------------------------------------|---------|
| `FIRECRAWL_CREDIT_WARNING_THRESHOLD` | 1000    |
| `FIRECRAWL_CREDIT_CRITICAL_THRESHOLD`| 100     |

### Example:

```bash
export FIRECRAWL_API_KEY=your-api-key

# Retry config
export FIRECRAWL_RETRY_MAX_ATTEMPTS=5
export FIRECRAWL_RETRY_INITIAL_DELAY=2000
export FIRECRAWL_RETRY_MAX_DELAY=30000
export FIRECRAWL_RETRY_BACKOFF_FACTOR=3

# Credit thresholds
export FIRECRAWL_CREDIT_WARNING_THRESHOLD=2000
export FIRECRAWL_CREDIT_CRITICAL_THRESHOLD=500
```

---

## 🧠 System Defaults

```js
const CONFIG = {
  retry: {
    maxAttempts: 3,
    initialDelay: 1000,
    maxDelay: 10000,
    backoffFactor: 2,
  },
  credit: {
    warningThreshold: 1000,
    criticalThreshold: 100,
  },
};
```

---

## 📦 Available Tools Overview
- **firecrawl_scrape** — Single page content extraction  
- **firecrawl_map** — URL discovery on websites  
- **firecrawl_crawl** — Multi-page extraction *(returns job ID)*  
- **firecrawl_check_crawl_status** — Monitor crawl progress  
- **firecrawl_search** — Web search with optional content scraping  
- **firecrawl_extract** — Structured data extraction to JSON  

---

## 🔧 Key Usage Examples
The examples show proper parameter usage for common scenarios like:
- Basic page scraping with content filtering  
- Web search with scraped results  
- Structured data extraction with custom schemas  

---

## 🔎 Decision Tree
Great guidance on tool selection based on needs:
- **Known URL** → `scrape`  
- **Find URLs** → `map`  
- **Search web** → `search`  
- **Extract structured data** → `extract`  
- **Full site coverage** → `crawl` + `status check`  

---

# ⚡ Performance Optimization
Valuable tips:
- Use `maxAge` for caching  
- Use `onlyMainContent` for efficiency  

---

## 🧪 Prompt Examples

- Scrape:  
  *“Get the content of https://example.com.”*

- Search:  
  *“Find 2023 papers on AI.”*

- Extract:  
  *“Extract product name, price, description from [urls].”*

- Deep research:  
  *“Research environmental impact of EVs vs gas cars.”*

---

## 📄 License

MIT © Firecrawl Team

---
## 🚩 Claim this MCP server. Contact info.
**All credits to the original authors of:** [https://github.com/mendableai/firecrawl-mcp-server](https://github.com/mendableai/firecrawl-mcp-server)  
**Contact contact:** [ai@apify.com](mailto:ai@apify.com)
