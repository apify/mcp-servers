## Explorium MCP Server (Apify Actor)

Unlock the power of the **Explorium Business Data Hub** via the Model Context Protocol (MCP). This Apify Actor provides AI clients with **real-time access to comprehensive company, contact, and market intelligence**—automating data enrichment, company/person lookups, feature discovery, and web search capabilities from Explorium’s vast data universe. Use your Apify credits to run this server; no fine-tuning required. 📈

The Explorium MCP Server acts as a remote proxy, enabling clients like GitHub Copilot and other AI agents to enrich entities and discover predictive features from Explorium’s third‑party data ecosystem. It supports streamable HTTP transport for robust and efficient client usage.

**Key Capabilities:**
*   **Data Enrichment:** Enrich companies and people with detailed firmographics, technographics, professional, and contact attributes.
*   **Feature Discovery:** Generate model-ready features for machine learning and analytical use cases.
*   **Dynamic Querying:** Search and retrieve attributes for entities by various identifiers.
*   **Real-time Web Search:** Access live, up-to-date web searches from Perplexity Sonar API.

About this MCP Server: To understand how to connect to and utilize MCP servers, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--explorium-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "explorium": {
      "url": "https://mcp-servers--explorium-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

Note: Replace `YOUR_APIFY_TOKEN` with your actual Apify API token (find it in the [Apify Console](https://console.apify.com/account/integrations)). Direct remote connections to Explorium’s public MCP endpoint (`https://mcp.explorium.ai/mcp`) typically use an OAuth-based authorization managed by the client (like `mcp-remote`) rather than a direct API key in headers. Your Apify Actor transparently handles this connection.

## 🚩 Claim this MCP server
All credits to the original authors of the Explorium MCP server implementation.
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

---

## 🛠️ Available Tools

Your AI tool will have access to the following capabilities, enabling comprehensive business intelligence:

| Tool Name                       | Description                                                                     |
| :------------------------------ | :------------------------------------------------------------------------------ |
| `match-business`                | Get Explorium business IDs from business name and/or domain in bulk.            |
| `fetch-businesses`              | Get detailed firmographics, technographics, and business intelligence.          |
| `fetch-businesses-statistics`   | Access technology stack, funding history, and growth signals.                   |
| `fetch-businesses-events`       | Track funding rounds, office changes, hiring trends, and company developments.  |
| `match-prospects`               | Search for professionals and contacts within companies.                         |
| `fetch-prospects`               | Fetch professional contact information and profiles.                            |
| `fetch-prospects-events`        | Track role changes, company moves, and career milestones.                       |
| `fetch-prospects-statistics`    | Access professional profile statistics and insights.                            |
| `enrich-prospects`              | Enrich professional contact information, work history, and profiles.            |
| `autocomplete`                  | Provides auto-completion suggestions for various search queries.                |
| `web-search`                    | Perform a live web search using Perplexity Sonar API for real-time information. |

Note: Exact tool parameters are detailed in the Actor’s input schema, accessible via the Apify Console or your MCP client.

### ✨ Example Usage

Your AI assistant should automatically use these tools for data enrichment, feature discovery, and information retrieval.

#### Quick Enrichment & Lookup
- "Enrich Apple Inc. with company size, revenue, and primary tech stack." (Uses `fetch-businesses`)
- "Find the LinkedIn profile and job title for Sundar Pichai at Google." (Uses `fetch-prospects` or `match-prospects`)
- "What are the recent AI development trends?" (Uses `web-search`)

#### Business & Prospect Insights
- "List recent funding rounds for companies in the FinTech sector." (Uses `fetch-businesses-events`)
- "Find prospects working in marketing at SaaS companies with over 500 employees." (Uses `match-prospects` or `fetch-prospects`)
- "Get statistics on employee growth for Microsoft." (Uses `fetch-businesses-statistics`)

## References
To learn more about Apify and Actors, take a look at the following resources:
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Model Context Protocol documentation](https://mcp.apify.com)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)

### Notes and Best Practices

*   **Authentication:** Accessing this Apify Actor requires your Apify API token. The Actor itself connects to the Explorium MCP via `mcp-remote`, which manages its own OAuth-based authorization with Explorium transparently. For direct Docker self-hosting of Explorium, an API key (`API_ACCESS_TOKEN`) would be required, but this is not applicable when using this Apify Actor.
*   **Rate Limits and Quotas:** Explorium APIs and your Actor may enforce rate limits. Implement backoff/retry where appropriate.
*   **Field Selection:** Use the fields parameter to minimize payloads and speed up responses.
*   **Compliance:** Ensure your usage of enriched attributes complies with your organization’s data governance and Explorium’s terms.
