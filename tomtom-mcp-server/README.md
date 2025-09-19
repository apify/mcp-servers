## TomTom MCP Server

The TomTom MCP Server simplifies geospatial development by providing seamless access to TomTom's location services, including search, routing, traffic and static maps data. It enables easy integration of precise and accurate geolocation data into AI workflows and development environments.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--tomtom-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "tomtom": {
      "url": "https://mcp-servers--tomtom-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

## 🚩 Claim this MCP server
All credits to the original authors of https://github.com/tomtom-international/tomtom-mcp
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

---

## Available Tools

| Tool | Description | Documentation |
|------|-------------|---------------|
| `tomtom-geocode` | Convert addresses to coordinates with global coverage | https://developer.tomtom.com/geocoding-api/documentation/geocode |
| `tomtom-reverse-geocode` |  Get addresses from GPS coordinates | https://developer.tomtom.com/reverse-geocoding-api/documentation/reverse-geocode |
| `tomtom-fuzzy-search` | Intelligent search with typo tolerance | https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search |
| `tomtom-poi-search` | Find specific business categories | https://developer.tomtom.com/search-api/documentation/search-service/points-of-interest-search |
| `tomtom-nearby` | Discover services within a radius | https://developer.tomtom.com/search-api/documentation/search-service/nearby-search |
| `tomtom-routing` | Calculate optimal routes between locations | https://developer.tomtom.com/routing-api/documentation/tomtom-maps/calculate-route |
| `tomtom-waypoint-routing` | Multi-stop route planning Routing API | https://developer.tomtom.com/routing-api/documentation/tomtom-maps/calculate-route |
| `tomtom-reachable-range` | Determine coverage areas by time/distance | https://developer.tomtom.com/routing-api/documentation/tomtom-maps/calculate-reachable-range |
| `tomtom-traffic` | Real-time incidents data | https://developer.tomtom.com/traffic-api/documentation/traffic-incidents/traffic-incidents-service  |
| `tomtom-static-map` | Generate custom map images | https://developer.tomtom.com/map-display-api/documentation/raster/static-image |

## References
To learn more about Apify and Actors, take a look at the following resources:
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
