

# Flightradar24 MCP Server

A Model Context Protocol (MCP) server for real-time flight tracking using Flightradar24 data, published as an Apify Actor. This server enables MCP clients to access live flight positions and estimated arrival times via a standardized API.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

[![Apify Badge](https://apify.com/actor-badge?actor=mcp-server/flightradar24-mcp-server)](https://apify.com/mcp-server/flightradar24-mcp-server)

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--flightradar24-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
    "mcpServers": {
        "flightradar24": {
            "url": "https://mcp-servers--flightradar24-mcp-server.apify.actor/mcp",
            "headers": {
                "Authorization": "Bearer YOUR_APIFY_TOKEN"
            }
        }
    }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## 🚩 Claim this MCP server
All credits to the original authors of <https://github.com/sunsetcoder/flightradar24-mcp-server>
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

---

## Available tools

- **get_flight_positions**: Get real-time flight positions with various filtering options (airports, bounds, categories, limit)
- **get_flight_eta**: Get estimated arrival time for a specific flight (by flight number)

## References
To learn more about Apify and Actors, take a look at the following resources:
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)

---

For the full MCP server source code and more details, see the [mcp-servers GitHub repository](https://github.com/apify/mcp-servers).
