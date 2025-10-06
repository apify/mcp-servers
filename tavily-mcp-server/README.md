## Tavily MCP Server

Advanced web search and data extraction capabilities through the Tavily API, providing real-time web search, intelligent data extraction, website mapping, and web crawling tools.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--tavily-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "tavily": {
      "url": "https://mcp-servers--tavily-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## 🚩 Claim this MCP server
All credits to the original authors of https://github.com/tavily-ai/tavily-mcp
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

---

# ![Tavily Crawl Beta](https://github.com/tavily-ai/tavily-mcp/raw/main/assets/Banner_NEW.png)

The Tavily MCP server provides:
- **search** - Real-time web search capabilities through the tavily-search tool
- **extract** - Intelligent data extraction from web pages via the tavily-extract tool
- **map** - Powerful web mapping tool that creates a structured map of website
- **crawl** - Web crawler that systematically explores websites

## Available Tools

### tavily-search
Perform real-time web searches using Tavily's advanced search API. This tool can search the web for current information and return relevant, summarized results.

**Parameters:**
- `query` (string, required): The search query
- `search_depth` (string, optional): "basic" or "advanced" search depth
- `max_results` (number, optional): Maximum number of results to return
- `include_domains` (array, optional): List of domains to include in search
- `exclude_domains` (array, optional): List of domains to exclude from search

### tavily-extract
Extract and analyze content from web pages using Tavily's intelligent extraction capabilities.

**Parameters:**
- `urls` (array, required): List of URLs to extract content from
- `content_type` (string, optional): Type of content to extract

### tavily-map
Create a structured map of a website, showing its hierarchy and organization.

**Parameters:**
- `url` (string, required): The website URL to map
- `depth` (number, optional): How deep to crawl the website

### tavily-crawl
Systematically explore and crawl websites to gather comprehensive information.

**Parameters:**
- `url` (string, required): The starting URL for crawling
- `max_pages` (number, optional): Maximum number of pages to crawl
- `depth` (number, optional): Maximum crawl depth

## Configuration

To use this MCP server, you'll need a Tavily API key. You can obtain one from [tavily.com](https://www.tavily.com/).

The server requires the following environment variable:
- `TAVILY_API_KEY`: Your Tavily API key

## References
To learn more about Apify and Actors, take a look at the following resources:
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
