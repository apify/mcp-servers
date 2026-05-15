## Wolfram MCP Server

The Wolfram MCP Service provides immediate consumer-level access to Wolfram's sophisticated computations and trusted knowledgebase. This Apify Actor exposes Wolfram's hosted MCP service ([wolfram.com/artificial-intelligence/mcp-service](https://www.wolfram.com/artificial-intelligence/mcp-service/)) over a streamable HTTP endpoint so any MCP client can connect via an Apify URL with Bearer auth.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--wolfram-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "wolfram": {
      "url": "https://mcp-servers--wolfram-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## 🚩 Claim this MCP server
All credits to the original authors of https://www.wolfram.com/artificial-intelligence/mcp-service/
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

---

## Available Tools

| Tool | Description |
|------|-------------|
| `WolframContext` | Semantic search over Wolfram resources. Call this first in a new conversation (or whenever the topic shifts) to ground subsequent tool calls with up-to-date relevant information. Input is natural-language context, not a search query. |
| `WolframLanguageEvaluator` | Evaluate Wolfram Language code in a kernel. Supports symbolic (`Solve[...]`), numerical (`N[Pi, 50]`), and unit-aware (`UnitConvert[...]`) computations. Accepts `\[FreeformPrompt]["..."]` for natural-language input that expands like a macro before evaluation. Optional `timeConstraint` (seconds, default 60). |
| `WolframAlpha` | Natural-language Wolfram\|Alpha queries for computational answers across chemistry, physics, geography, history, art, astronomy, and more. |

### ✨ Example Usage

#### Symbolic & numerical math
> "Solve `x^2 + 3x - 4 == 0` for x, then give me the numerical value of `Pi` to 50 digits."

#### Real-world data & units
> "Convert 100 miles to kilometers, and tell me the current population of Tokyo."

#### Live computational knowledge
> "What's the distance from Earth to Mars right now, and what's the molecular weight of caffeine?"

## References
To learn more about Apify and Actors, take a look at the following resources:
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
