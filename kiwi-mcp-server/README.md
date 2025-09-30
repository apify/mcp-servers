# Kiwi MCP Server

Search and book flights directly from your favorite AI assistant using the Kiwi.com flight search engine!

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--kiwi-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "kiwi-mcp-server": {
      "url": "https://mcp-servers--kiwi-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## Links
- **Actor Repository**: https://github.com/apify/actor-kiwi-mcp-server
- **Apify MCP Documentation**: https://mcp.apify.com

All credits to https://github.com/alpic-ai/kiwi-mcp-server-public

---

# Kiwi.com Flight Search

This is the Kiwi.com flight search MCP server. Search and book flights directly from your favorite AI assistant!

## About this MCP Server

The [Kiwi.com](https://kiwi.com) MCP server allow you to search and book for flights using the Kiwi.com flights search engine.

The MCP server exposes a single tool: search-flight. This allows you to get instant access to a curated list of the best flights for your trip based on:

1.  Round-trip or one-way flight
2.  Origin / destination (city or airport)
3.  Travel dates
4.  Flexibility up to +/- 3 days
5.  Number and types of passengers (adult, child, infant)
6.  Cabin class (economy, premium economy, business, first class)

Simply ask your AI assistant something like:

*   "Can you help me book a first-class ticket from Paris to Rome tomorrow?"
*   "Find me the best options for our family vacation. I need a round-trip flight for my husband, me and our two children from Vienna to London, August 3 to 10."

You can also narrow your query by choosing your preferred airport, or enlarge it by specifying that your dates are flexible. Each result includes a booking link directly to the flight chosen.

## Available Tools

### search-flight
Search for flights using the Kiwi.com flight search engine. This tool allows you to:
- Search for round-trip or one-way flights
- Specify origin and destination (city or airport codes)
- Set travel dates with flexibility up to +/- 3 days
- Configure passenger details (adults, children, infants)
- Select cabin class (economy, premium economy, business, first class)
- Get booking links for selected flights

## References
To learn more about Apify and Actors, take a look at the following resources:
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
