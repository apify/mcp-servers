## Calculator MCP Server

A Model Context Protocol server for calculating. This server enables LLMs to use calculator for precise numerical calculations.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--calculator-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "calculator": {
      "url": "https://mcp-servers--calculator-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).


## 🚩 Claim this MCP server
All credits to the original authors of https://github.com/githejie/mcp-server-calculator
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

---

# Calculator MCP Server

A Model Context Protocol server for calculating. This server enables LLMs to use calculator for precise numerical calculations.

### Available Tools

- `calculate` - Calculates/evaluates the given expression.
  - `expression` (string, required): Expression to be calculated

## License

mcp-server-calculator is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.

## References
To learn more about Apify and Actors, take a look at the following resources:
- [MCP Server Calculator](https://github.com/githejie/mcp-server-calculator)
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
