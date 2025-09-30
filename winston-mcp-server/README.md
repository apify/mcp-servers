## Winston AI MCP Server (Apify Actor)

Run the **Winston AI Model Context Protocol (MCP) server** via this Apify Actor, giving language models **real-time access to advanced AI text and image detection, plagiarism checks, and sophisticated text comparison capabilities**. Use your Apify credits to integrate Winston AI's powerful detection features into your AI workflows—no fine-tuning required. ⚡️

This Actor proxies the Winston AI MCP Server, allowing AI clients to integrate directly with Winston AI's detection and analysis capabilities. It requires a valid Winston AI API Key for authentication.

About this MCP Server: To understand how to connect to and utilize MCP servers, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--winston-ai-mcp-server.apify.actor/mcp
```

## Client configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "winston-ai": {
      "url": "https://mcp-servers--winston-ai-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      },
      "env": {
        "WINSTONAI_API_KEY": "YOUR_WINSTON_AI_API_KEY"
      }
    }
  }
}
```

Note: Replace `YOUR_APIFY_TOKEN` with your actual Apify API token (find it in the [Apify Console](https://console.apify.com/account/integrations)). Also, set `WINSTONAI_API_KEY` with your actual Winston AI API Key, which you can obtain at [https://dev.gowinston.ai](https://dev.gowinston.ai). This key is essential for the Actor to authenticate with the Winston AI service.

## 🚩 Claim this MCP server
All credits to the original authors of the Winston AI MCP server implementation.
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

---

## 🛠️ Available Tools

Your AI tool will have access to the following detection and analysis capabilities from Winston AI:

| Tool Name                | Description                                                          |
| :----------------------- | :------------------------------------------------------------------- |
| `ai-text-detection`      | Classify text as human-generated or AI-generated, with sentence-level analysis. |
| `ai-image-detection`     | Identify AI-generated images, including C2PA metadata and watermark detection. |
| `plagiarism-detection`   | Perform internet-scale plagiarism scans with detailed source reports. |
| `text-compare`           | Conduct bidirectional similarity analysis between two texts.        |

Note: Refer to the Winston AI API Documentation (https://docs.gowinston.ai/api-reference/mcp-server) for detailed input parameters and usage of each tool.

### ✨ Example Usage

Your AI assistant should automatically use these tools for content analysis and detection.

#### AI Content Detection
- "Check if this article about quantum computing was written by an AI or a human." (Uses `ai-text-detection`)
- "Analyze this image: [image URL]. Is it AI-generated?" (Uses `ai-image-detection`)

#### Plagiarism & Comparison
- "Scan this essay for plagiarism against online sources." (Uses `plagiarism-detection`)
- "Compare these two text snippets for similarity: 'First text...' and 'Second text...'" (Uses `text-compare`)

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

*   **Authentication:** This Apify Actor requires your Apify API token for access. The Actor itself authenticates with the Winston AI service using the `WINSTONAI_API_KEY` provided as an environment variable to the Actor. This key is crucial for the Actor's functionality. Obtain yours at [https://dev.gowinston.ai](https://dev.gowinston.ai).
*   **Rate Limits and Quotas:** Winston AI APIs and your Actor may enforce rate limits and have associated credit costs. Implement backoff/retry where appropriate and monitor your usage.
*   **Content Limits:** Be aware of minimum and maximum character/text/image size limits for Winston AI tools.
*   **Compliance:** Ensure your usage complies with your organization’s data governance and Winston AI’s terms of service.
