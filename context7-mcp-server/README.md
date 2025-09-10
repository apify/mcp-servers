# Context7 MCP Server

Context7 MCP Server provides up-to-date, version-specific documentation and code examples straight from the source for any programming library or framework. Get working code answers with the latest APIs and best practices.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--context7-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp-servers--context7-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## 🚩 Claim this MCP server
All credits to the original authors of https://github.com/upstash/context7
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

---

## Context7 MCP - Up-to-date Code Docs For Any Prompt

## ❌ Without Context7

LLMs rely on outdated or generic information about the libraries you use. You get:

- ❌ Code examples are outdated and based on year-old training data
- ❌ Hallucinated APIs that don't even exist
- ❌ Generic answers for old package versions

## ✅ With Context7

Context7 MCP pulls up-to-date, version-specific documentation and code examples straight from the source — and places them directly into your prompt.

Add `use context7` to your prompt in Cursor:

```txt
Create a Next.js middleware that checks for a valid JWT in cookies and redirects unauthenticated users to `/login`. use context7
```

```txt
Configure a Cloudflare Worker script to cache JSON API responses for five minutes. use context7
```

Context7 fetches up-to-date code examples and documentation right into your LLM's context.

- 1️⃣ Write your prompt naturally
- 2️⃣ Tell the LLM to `use context7`
- 3️⃣ Get working code answers

No tab-switching, no hallucinated APIs that don't exist, no outdated code generation.

## 🔨 Available Tools

Context7 MCP provides the following tools that LLMs can use:

- `resolve-library-id`: Resolves a general library name into a Context7-compatible library ID.
  - `libraryName` (required): The name of the library to search for

- `get-library-docs`: Fetches documentation for a library using a Context7-compatible library ID.
  - `context7CompatibleLibraryID` (required): Exact Context7-compatible library ID (e.g., `/mongodb/docs`, `/vercel/next.js`)
  - `topic` (optional): Focus the docs on a specific topic (e.g., "routing", "hooks")
  - `tokens` (optional, default 5000): Max number of tokens to return. Values less than 1000 are automatically increased to 1000.

## 🛟 Tips

### Add a Rule

> If you don't want to add `use context7` to every prompt, you can define a simple rule in your MCP client's rule section:
>
> - For Windsurf, in `.windsurfrules` file
> - For Cursor, from `Cursor Settings > Rules` section
> - For Claude Code, in `CLAUDE.md` file
>
> Or the equivalent in your MCP client to auto-invoke Context7 on any code question.
>
> Example Rule:
>
> ```toml
> Always use context7 when I need code generation, setup or configuration steps, or
> library/API documentation. This means you should automatically use the Context7 MCP
> tools to resolve library id and get library docs without me having to explicitly ask.
> ```
>
> From then on, you'll get Context7's docs in any related conversation without typing anything extra. You can alter the rule to match your use cases.

### Use Library Id

> If you already know exactly which library you want to use, add its Context7 ID to your prompt. That way, Context7 MCP server can skip the library-matching step and directly continue with retrieving docs.
>
> ```txt
> Implement basic authentication with Supabase. use library /supabase/supabase for API and docs.
> ```
>
> The slash syntax tells the MCP tool exactly which library to load docs for.

## References
To learn more about Apify and Actors, take a look at the following resources:

- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)