# 🅱️ Browserbase MCP Server

[![Browserbase MCP Server](https://apify.com/actor-badge?actor=mcp-servers/browserbase-mcp-server)](https://apify.com/mcp-servers/browserbase-mcp-server)

This Actor is a wrapper for the [browserbase](https://github.com/browserbase/mcp-server-browserbase) MCP server.

This server provides cloud browser automation capabilities using [Browserbase](https://www.browserbase.com/). This server enables LLMs to interact with web pages, and take screenshots, in a cloud browser environment.

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--browserbase-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "browserbase": {
      "url": "https://mcp-servers--browserbase-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## 🚩 Claim this MCP server

All credits to the original authors of https://github.com/browserbase/mcp-server-browserbase

To claim this server, please write to [ai@apify.com](mailto:ai@apify.com)

## 🚀 Features

| Feature            | Description                               |
| ------------------ | ----------------------------------------- |
| Browser Automation | Control and orchestrate cloud browsers    |
| Data Extraction    | Extract structured data from any webpage  |
| Console Monitoring | Track and analyze browser console logs    |
| Screenshots        | Capture full-page and element screenshots |
| JavaScript         | Execute custom JS in the browser context  |
| Web Interaction    | Navigate, click, and fill forms with ease |

## 🔍 Use cases

- 🌐 Web navigation and form filling
- 📋 Structured data extraction
- 🧪 LLM-driven automated testing
- 🤖 Browser automation for AI agents

## 🧰 Tools

| Tool Name                          | Description                                                                 |
| ---------------------------------- | --------------------------------------------------------------------------- |
| multi_browserbase_stagehand_session_create | Creates multiple browser sessions for parallel tasks like data scraping or A/B testing. Each session is isolated with its own cookies and state. |
| multi_browserbase_stagehand_session_list | Lists all active browser sessions with their IDs, names, and details for easy management. |
| multi_browserbase_stagehand_session_close | Closes a specific browser session to free up resources and avoid extra charges. |
| multi_browserbase_stagehand_navigate_session | Navigates to a URL in a specific browser session. |
| multi_browserbase_stagehand_act_session | Performs simple actions on page elements, like clicking buttons or typing text, in a specific session. |
| multi_browserbase_stagehand_extract_session | Pulls structured data or text from a web page based on your instructions, for a specific session. |
| multi_browserbase_stagehand_observe_session | Finds interactive elements on a page, like buttons or forms, to help with actions, for a specific session. |
| multi_browserbase_stagehand_get_url_session | Retrieves the current URL of a specific browser session. |
| browserbase_stagehand_get_all_urls | Gets the current URLs for all active browser sessions. |
| browserbase_session_create         | Sets up a single browser session for basic web automation tasks. |
| browserbase_session_close          | Closes the current browser session and cleans up resources. |
| browserbase_stagehand_navigate     | Navigates to a URL in the browser. |
| browserbase_stagehand_act          | Performs simple actions on page elements, like clicking buttons or typing text. |
| browserbase_stagehand_extract      | Pulls structured data or text from a web page based on your instructions. |
| browserbase_stagehand_observe      | Finds interactive elements on a page, like buttons or forms, to help with actions. |
| browserbase_screenshot             | Captures a screenshot of the current page for reference. |
| browserbase_stagehand_get_url      | Retrieves the current URL of the browser page. |

## 💸 Pricing

| Event                              | Description                                                   | Price (USD) |
| ---------------------------------- | ------------------------------------------------------------- | ----------- |
| Actor start                        | Flat fee for starting an Actor run.                           | $0.10       |
| Actor runtime per minute           | Flat fee for each minute of Actor runtime.                   | $0.003       |
| Browserbase tool call              | Fixed fee for each browser automation tool call. | $0.036      |
