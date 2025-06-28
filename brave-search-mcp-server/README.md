## Brave MCP Server

An MCP server implementation that integrates the Brave Search API, providing both web and local search capabilities.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

---

### Features

* **Web Search:** General queries, news, articles, with pagination and freshness controls  
* **Local Search:** Find businesses, restaurants, and services with detailed information  
* **Flexible Filtering:** Control result types, safety levels, and content freshness  
* **Smart Fallbacks:** Local search automatically falls back to web when no results are found  

### Tools

* `brave_web_search`  
    * Execute web searches with pagination and filtering  
    * Inputs:  
        * `query` (string): Search terms  
        * `count` (number, optional): Results per page (max 20)  
        * `offset` (number, optional): Pagination offset (max 9)  
* `brave_local_search`  
    * Search for local businesses and services  
    * Inputs:  
        * `query` (string): Local search terms  
        * `count` (number, optional): Number of results (max 20)  
    * Automatically falls back to web search if no local results found  

### Configuration

#### Getting an API Key

* Sign up for a [Brave Search API account](https://brave.com/search/api/)  
* Choose a plan (Free tier available with 2,000 queries/month)  
* Generate your API key from the developer dashboard  

#### Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

**Docker**

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "BRAVE_API_KEY",
        "mcp/brave-search"
      ],
      "env": {
        "BRAVE_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

**NPX**

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-brave-search"
      ],
      "env": {
        "BRAVE_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

### Usage with VS Code

For quick installation, use the one-click installation buttons below...

For manual installation, add the following JSON block to your **User Settings (JSON)** file in VS Code.  
You can do this by pressing `Ctrl + Shift + P` and typing **Preferences: Open User Settings (JSON)**.  
Optionally, you can add it to a file called `.vscode/mcp.json` in your workspace.  
This will allow you to share the configuration with others.  
Note that the `mcp` key is not needed in the `.vscode/mcp.json` file.

**Docker**

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "brave_api_key",
        "description": "Brave Search API Key",
        "password": true
      }
    ],
    "servers": {
      "brave-search": {
        "command": "docker",
        "args": [
          "run",
          "-i",
          "--rm",
          "-e",
          "BRAVE_API_KEY",
          "mcp/brave-search"
        ],
        "env": {
          "BRAVE_API_KEY": "${input:brave_api_key}"
        }
      }
    }
  }
}
```

**NPX**

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "brave_api_key",
        "description": "Brave Search API Key",
        "password": true
      }
    ],
    "servers": {
      "brave-search": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-brave-search"],
        "env": {
          "BRAVE_API_KEY": "${input:brave_api_key}"
        }
      }
    }
  }
}
```

### Build

Docker build:

```bash
docker build -t mcp/brave-search:latest -f src/brave-search/Dockerfile .
```

### License

This MCP server is licensed under the MIT License.  
This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License.  
For more details, please see the LICENSE file in the project repository.

---

🚩 Claim this MCP server. Contact info.  
All credits to the original authors of https://github.com/modelcontextprotocol/servers-archived/tree/main/src/brave-search

Write to ai@apify.com

Original project URL: https://github.com/modelcontextprotocol/servers-archived/tree/main/src/brave-search
