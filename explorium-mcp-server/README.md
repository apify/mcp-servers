## Explorium MCP Server (Apify Actor)

The Explorium MCP Server enables AI clients to access Explorium’s external data enrichment and feature discovery capabilities via the Model Context Protocol. It provides programmatic access to data enrichment, company/person lookups, and feature generation from Explorium’s data universe.

About this MCP Server: To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at mcp.apify.com (https://mcp.apify.com).

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
    "Explorium": {
      "url": "https://apify.com/actor-badge?actor=mcp-server/explorium-mcp-server",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

Note: Replace YOUR_APIFY_TOKEN with your actual Apify API token (find it in the Apify Console: https://console.apify.com/account/integrations) and YOUR_EXPLORIUM_API_KEY with your Explorium API key/credential. If your Explorium deployment uses OAuth or a different auth mechanism, configure the corresponding headers as required.

## 🚩 Claim this MCP server
All credits to the original authors of the Explorium MCP server implementation.
To claim this server, please write to ai@apify.com (mailto:ai@apify.com).

---

# 🌟 Explorium MCP Server

The Explorium MCP Server is a remote MCP Server that enables clients like GitHub Copilot and other AI agents to enrich entities and discover predictive features from Explorium’s third‑party data ecosystem. It supports streamable HTTP transport for lightweight client usage.

## 🎯 Overview

### ✨ Key Capabilities

- Data Enrichment: Enrich companies, people, and locations with firmographics, technographics, and other third‑party attributes.
- Feature Discovery: Generate model‑ready features from Explorium’s feature marketplace for ML and analytics use cases.
- Dynamic Querying: Search and retrieve attributes for entities by name, domain, email, or identifiers.

## 🛠️ Currently Supported Tools

| Tool Name                   | Description | Input Parameters |
|----------------------------|-------------|------------------|
| `explorium_enrich_company` | Enrich a company with firmographic and technographic attributes | `domain` (string) or `company_name` (string); optional `fields` (string[]) |
| `explorium_enrich_person`  | Enrich a person by email or name with professional and contact attributes | `email` (string) or (`first_name`, `last_name`, `company`) ; optional `fields` (string[]) |
| `explorium_feature_discovery` | Discover and score features relevant to a prediction task | `target` (string), `entity_type` (string), optional `hints` (string[]), `limit` (number) |
| `explorium_search`         | Search the Explorium catalog for available datasets/attributes | `query` (string); optional `entity_type` (string), `limit` (number) |
| `explorium_fetch_attributes` | Retrieve specific attributes for an entity | `entity_type` (string), `identifier` (object with keys like `domain`, `email`, or `id`), `fields` (string[]) |

Note: Exact tool names and parameters may vary based on your deployment. Refer to your Actor’s input schema for authoritative parameter definitions.

### ✨ Example Usage

Your AI assistant should automatically use these tools for enrichment, feature discovery, and data retrieval.

#### Quick Enrichment & Lookup

- “Enrich acme.com with company size, revenue, and tech stack. search and enrich”
- “Find LinkedIn and job title for jane.doe@contoso.com. enrich person”

#### Feature Discovery for ML

- “I’m building a lead scoring model; suggest top predictive features for B2B conversion. feature discovery”
- “List datasets with intent signals for cybersecurity buyers. search catalog”

#### Attribute Retrieval & Validation

- “Get firmographic attributes for Contoso Ltd by name, then fetch HQ location and employee range. search and fetch attributes”
- “Verify if acme.com uses AWS or Azure. fetch attributes: cloud provider”

## References
To learn more about Apify and Actors, take a look at the following resources:
- Apify SDK for JavaScript documentation: https://docs.apify.com/sdk/js
- Apify SDK for Python documentation: https://docs.apify.com/sdk/python
- Apify Platform documentation: https://docs.apify.com/platform
- Apify MCP Server: https://docs.apify.com/platform/integrations/mcp
- Webinar: Building and Monetizing MCP Servers on Apify: https://www.youtube.com/watch?v=w3AH3jIrXXo
- Join our developer community on Discord: https://discord.com/invite/jyEM2PRvMU

## Notes and Best Practices
- Authentication: Provide both your Apify token and your Explorium credentials via headers. Avoid hardcoding secrets; use your client’s secret manager or environment variables.
- Rate Limits and Quotas: Explorium APIs and your Actor may enforce rate limits. Implement backoff/retry where appropriate.
- Field Selection: Use the fields parameter to minimize payloads and speed up responses.
- Compliance: Ensure your usage of enriched attributes complies with your organization’s data governance and Explorium’s terms.
