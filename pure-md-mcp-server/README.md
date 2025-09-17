## Pure.md MCP Server

A Model Context Protocol server that provides web content extraction and search capabilities powered by Pure.md. This server converts URLs to clean markdown content and performs web searches, making web content easily accessible to AI assistants.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL

MCP clients can connect to this server at:

```text
https://mcp-servers--pure-md-mcp-server.apify.actor/mcp
```

## Client Configuration

To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "pure-md": {
      "url": "https://mcp-servers--pure-md-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## 🚩 Claim this MCP server

All credits to the original authors of https://github.com/puremd/puremd-mcp

To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

## Available Tools

### unblock-url
Converts any URL to clean, readable markdown content. Perfect for extracting article content, documentation, or any web page text.

**Parameters:**
- `url` (string): The URL to convert to markdown

**Usage:** Provide any web URL and get back clean markdown content without ads, navigation, or other clutter.

### search-web
Performs web searches and returns results in markdown format. Get search results formatted for easy consumption by AI assistants.

**Parameters:**
- `query` (string): The search query to execute

**Usage:** Enter any search query and receive formatted search results in markdown.

## Environment Variables

- `PUREMD_API_KEY`: Optional API key for Pure.md service. Authentication is optional but may provide enhanced features or rate limits.

### Pay per event

This template uses the [Pay Per Event (PPE)](https://docs.apify.com/platform/actors/publishing/monetize#pay-per-event-pricing-model) monetization model, which provides flexible pricing based on defined events.

To charge users, define events in JSON format and save them on the Apify platform. Here is an example schema with the `tool-request` event:

```json
[
    {
        "tool-request": {
            "eventTitle": "Price for completing a tool request",
            "eventDescription": "Flat fee for completing a tool request.",
            "eventPriceUsd": 0.05
        }
    }
]
```

In the Actor, trigger the event with:

```typescript
await Actor.charge({ eventName: 'tool-request' });
```

This approach allows you to programmatically charge users directly from your Actor, covering the costs of execution and related services.

To set up the PPE model for this Actor:

- **Configure Pay Per Event**: establish the Pay Per Event pricing schema in the Actor's **Monetization settings**. First, set the **Pricing model** to `Pay per event` and add the schema. An example schema can be found in [pay_per_event.json](.actor/pay_per_event.json).

## References

To learn more about Apify and Actors, take a look at the following resources:

- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
