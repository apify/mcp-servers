# Olostep MCP Server

A Model Context Protocol (MCP) server implementation that integrates with [Olostep](https://olostep.com) for web scraping, content extraction, and search capabilities.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--olostep-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "olostep": {
      "url": "https://mcp-servers--olostep-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## 🚩 Claim this MCP server
All credits to the original authors of https://github.com/olostep/olostep-mcp-server
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

---

## Features

- Web page content extraction with clean markdown formatting
- Google search results with structured data extraction
- Website URL discovery and mapping
- Country-specific request routing for geo-targeted content
- Configurable wait times for JavaScript-heavy websites
- Comprehensive error handling and reporting
- Simple API key configuration

## Available Tools

### 1. Get Webpage Content (`get_webpage_content`)

Retrieves webpage content in clean markdown format with support for JavaScript rendering.

```json
{
  "name": "get_webpage_content",
  "arguments": {
    "url_to_scrape": "https://example.com",
    "wait_before_scraping": 1000,
    "country": "US"
  }
}
```

#### Parameters:

- `url_to_scrape`: The URL of the webpage to scrape (required)
- `wait_before_scraping`: Time to wait in milliseconds before starting the scrape (default: 0)
- `country`: Residential country to load the request from (e.g., US, CA, GB) (optional)

### 2. Get Website URLs (`get_website_urls`)

Search and retrieve relevant URLs from a website, sorted by relevance to your query.

```json
{
  "name": "get_website_urls",
  "arguments": {
    "url": "https://example.com",
    "search_query": "your search term"
  }
}
```

#### Parameters:

- `url`: The URL of the website to map (required)
- `search_query`: The search query to sort URLs by (required)

### 3. Google Search (`google_search`)

Retrieve structured data from Google search results.

```json
{
  "name": "google_search",
  "arguments": {
    "query": "your search query",
    "country": "US"
  }
}
```

#### Parameters:

- `query`: The search query to perform (required)
- `country`: Country code for localized results (e.g., US, GB) (default: "US")

#### Response includes:

- Organic search results with titles, links, and snippets
- Knowledge graph data when available
- Related questions (People Also Ask)
- Related searches
- Rich snippets and other structured data

## Configuration

### Environment Variables

- `OLOSTEP_API_KEY`: Your Olostep API key (required)
- `ORBIT_KEY`: An optional key for using Orbit to route requests

## Error Handling

The server provides robust error handling:

- Detailed error messages for API issues
- Network error reporting
- Authentication failure handling
- Rate limit information

## References
To learn more about Apify and Actors, take a look at the following resources:
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
