## Microsoft Learn MCP Server

The Microsoft Learn MCP Server enables AI clients to access trusted and up-to-date information directly from Microsoft's official documentation. It provides semantic search and document retrieval capabilities from Microsoft Learn.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--microsoft-learn-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "microsoft-learn": {
      "url": "https://mcp-servers--microsoft-learn-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## 🚩 Claim this MCP server
All credits to the original authors of https://github.com/MicrosoftDocs/mcp
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

---

# 🌟 Microsoft Learn MCP Server

The Microsoft Learn MCP Server is a remote MCP Server that enables clients like GitHub Copilot and other AI agents to bring trusted and up-to-date information directly from Microsoft's official documentation. It supports streamable http transport, which is lightweight for clients to use.

## 🎯 Overview

### ✨ Key Capabilities

- **High-Quality Content Retrieval**: Search and retrieve relevant content from Microsoft's official documentation in markdown format.
- **Semantic Understanding**: Uses advanced vector search to find the most contextually relevant documentation for any query.
- **Real-time Updates**: Access the latest Microsoft documentation as it's published.

## 🛠️ Currently Supported Tools

| Tool Name                | Description | Input Parameters |
|--------------------------|-------------|------------------|
| `microsoft_learn_search` | Performs semantic search against Microsoft official technical documentation | `query` (string): The search query for retrieval |
| `microsoft_learn_fetch`  | Fetch and convert a Microsoft documentation page into markdown format | `url` (string): URL of the documentation page to read |

### ✨ Example Usage

Your AI assistant should automatically use these tools for Microsoft-related topics. With both search and fetch capabilities, you can get quick answers or comprehensive deep dives.

#### **Quick Search & Reference**

> "Give me the Azure CLI commands to create an Azure Container App with a managed identity. **search Microsoft Learn**"

> "Is gpt-4.1-mini available in EU regions? **fetch full doc**"

#### **Code Verification & Best Practices**

> "Are you sure this is the right way to implement `IHttpClientFactory` in a .NET 8 minimal API? **search Microsoft Learn and fetch full doc**"

> "Show me the complete guide for implementing authentication in ASP.NET Core. **fetch full doc**"

#### **Comprehensive Learning & Deep Dive**

> "I need to understand Azure Functions end-to-end. **search Microsoft Learn and deep dive**"

> "Get me the full step-by-step tutorial for deploying a .NET application to Azure App Service. **search Microsoft Learn and deep dive**"

## References
To learn more about Apify and Actors, take a look at the following resources:
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
