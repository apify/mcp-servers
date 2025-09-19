
# PubMed MCP Server

A server implementing the Model Context Protocol (MCP) for accessing and processing PubMed biomedical literature data.

[![Apify Actor Badge](https://apify.com/actor-badge?actor=mcp-server/pubmed-mcp-server)](https://apify.com/mcp-server/pubmed-mcp-server)

**About this MCP Server:**  
To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL

MCP clients can connect to this server at:

```text
https://mcp-servers--pubmed-mcp-server.apify.actor/mcp
```

## Client Configuration

To connect to this MCP server, use the following configuration in your MCP client:

```json
{
    "mcpServers": {
        "pubmed": {
            "url": "https://mcp-servers--pubmed-mcp-server.apify.actor/mcp",
            "headers": {
                "Authorization": "Bearer YOUR_APIFY_TOKEN"
            }
        }
    }
}
```
**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## Available Tools

- `search_pubmed_key_words`: Search PubMed articles by keywords.
- `search_pubmed_advanced`: Advanced search on PubMed articles.
- `get_pubmed_article_metadata`: Retrieve metadata for a PubMed article.
- `download_pubmed_pdf`: Download a PubMed article PDF.
- `deep_paper_analysis`: Run deep analysis on a PubMed paper.

## 🚩 Claim this MCP server

All credits to the original authors of [https://github.com/JackKuo666/PubMed-MCP-Server](https://github.com/JackKuo666/PubMed-MCP-Server)  
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

## References

- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
- [mcp-servers GitHub repository](https://github.com/apify/mcp-servers)
- [Apify MCP docs](http://mcp.apify.com)
