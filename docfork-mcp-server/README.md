# Docfork MCP Server

[![Apify Actor Badge](https://apify.com/actor-badge?actor=mcp-servers/docfork-mcp-server)](https://apify.com/actor/mcp-servers/docfork-mcp-server)

🌿 Access @latest documentation and code examples from 9000+ libraries in a single tool call.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--docfork-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "docfork": {
      "url": "https://mcp-servers--docfork-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## Links
- **GitHub Repository**: https://github.com/docfork/docfork-mcp
- **Actor Repository**: https://github.com/apify/mcp-servers
- **Apify MCP Documentation**: https://mcp.apify.com

## 🚩 Claim this MCP server
All credits to the original authors of https://github.com/docfork/docfork-mcp
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

---

## ❌ The Problem: Expired Knowledge

- Out of date code examples & stale data from year-old model training
- Hallucinated syntax & APIs
- Old or mismatched versions

## ✅ The Solution: @latest docs at warp speed

- Always in sync with the latest version of docs
- Accurate descriptions and code examples
- Sub-second retrieval results (500ms @ p95) in your AI code editor

Docfork MCP pulls @latest documentation and code examples straight from the source - and adds them right into your context.

Just tell Cursor to **`use docfork`**:

```txt
Create a basic Next.js app with the App Router. use docfork
```

## 🛠️ Available Tools

Docfork MCP provides the following tool that LLMs can use:

- `get-library-docs`: Searches the library and returns its documentation.
  - `libraryName` (required): The name of the library to search for
  - `topic` (required): Focus the docs on a specific topic (e.g., "routing", "hooks")
  - `tokens` (optional, default 10000, max 50000): Max number of tokens to return. Values less than the configured `DEFAULT_MINIMUM_TOKENS` value or the default value of 10000 are automatically increased to that value.

## 💡 Tips

### Add a Rule

If you don't want to add `use docfork` to every prompt, you can define a simple rule from your `Cursor Settings > Rules` section in Cursor (or the equivalent in your MCP client) to auto-invoke Docfork on any code question:

```markdown
---
alwaysApply: true
---

when the user requests code examples, setup or configuration steps, or library/API documentation
use docfork.
```

From then on you'll get Docfork's docs in any related conversation without typing anything extra. You can add your use cases to the match part.

### Use Specific Library Names

When you know exactly which library you want to use, be specific in your prompts. This helps Docfork find the right documentation faster and more accurately:

```txt
implement basic authentication with supabase. use docfork
```

```txt
create a Next.js middleware for rate limiting. use docfork
```

```txt
configure Tailwind CSS with custom typography. use docfork
```

The more specific you are about the library and what you want to accomplish, the better documentation you'll receive.

## ⚠️ Disclaimer

Docfork is an open, community-driven catalogue. Although we review submissions, we make no warranties—express or implied—about the accuracy, completeness, or security of any linked documentation or code. Projects listed here are created and maintained by their respective authors, not by Docfork.

If you spot content that is suspicious, inappropriate, or potentially harmful, please contact us.

By using Docfork, you agree to do so at your own discretion and risk.

## 🌟 Let's Connect!

Stay in the loop and meet the community:

- 🐦 Follow us on [X](https://x.com/docfork_ai) for product news and updates
- 🌐 Visit our [Website](https://docfork.com)

## References
To learn more about Apify and Actors, take a look at the following resources:
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)