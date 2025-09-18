
# Open-Meteo MCP Server

> Apify Actor for Open-Meteo Model Context Protocol (MCP) server. Provides weather and forecast data from the Open-Meteo API via the Model Context Protocol.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--open-meteo-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
    "mcpServers": {
        "open-meteo": {
            "url": "https://mcp-servers--open-meteo-mcp-server.apify.actor/mcp",
            "headers": {
                "Authorization": "Bearer YOUR_APIFY_TOKEN"
            }
        }
    }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## 🚩 Claim this MCP server
All credits to the original authors of [Open-Meteo MCP Server](https://github.com/cmer81/open-meteo-mcp).
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

---

## Available tools

This MCP server exposes weather and forecast data from the [Open-Meteo API](https://open-meteo.com/en/docs) via the Model Context Protocol. It is designed for programmatic access to weather information for any location worldwide.

- **Weather forecast**: Get current weather, hourly, and daily forecasts for a given latitude and longitude.
- **Historical weather**: Retrieve past weather data for a specific location and time range.
- **Air quality**: Access air quality index and related data (if supported by Open-Meteo API).

Pricing is based on the [Pay Per Event (PPE)](https://docs.apify.com/platform/actors/publishing/monetize#pay-per-event-pricing-model) model. See `.actor/pay_per_event.json` for tool pricing.

---

## References
To learn more about Apify and Actors, take a look at the following resources:
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
