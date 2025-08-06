## Perplexity Sonar MCP Server

An MCP server that enables Claude to perform real-time web searches using the Perplexity Sonar API.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

---

## Available Tools

### `perplexity_ask`

Engage in a conversation with the Sonar API for live web searches.

**Inputs:**

- `messages` (array of objects): Each message must include:
  - `role` (string): One of `system`, `user`, or `assistant`
  - `content` (string): The message content

## High-level System Architecture

Credits: DeepWiki powered by Devin

## Configuration

### Step 1:

Clone this repository:

```bash
git clone git@github.com:ppl-ai/modelcontextprotocol.git
```

Navigate to the perplexity-ask directory and install the necessary dependencies:

```bash
cd modelcontextprotocol/perplexity-ask && npm install
```

### Step 2: Get a Sonar API Key

Sign up for a Sonar API account.

Follow the account setup instructions and generate your API key from the developer dashboard.

Set the API key in your environment as `PERPLEXITY_API_KEY`.

### Step 3: Configure Claude Desktop

Download Claude desktop here.

Add this to your `claude_desktop_config.json`:

**Docker**

```json
{
  "mcpServers": {
    "perplexity-ask": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "PERPLEXITY_API_KEY",
        "mcp/perplexity-ask"
      ],
      "env": {
        "PERPLEXITY_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

**NPX**

```json
{
  "mcpServers": {
    "perplexity-ask": {
      "command": "npx",
      "args": [
        "-y",
        "server-perplexity-ask"
      ],
      "env": {
        "PERPLEXITY_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

You can access the file using:

```bash
vim ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### Step 4: Build the Docker Image

Docker build:

```bash
docker build -t mcp/perplexity-ask:latest -f Dockerfile .
```

### Step 5: Testing

Make sure Claude for Desktop is picking up the tools we've exposed in the perplexity-ask server. You can do this by looking for the hammer icon:

After clicking on the hammer icon, you should see the tools that come with the Filesystem MCP Server.

If you see both tools, the integration is active. This means Claude can now ask Perplexity just like it would on the Perplexity web app.

### Step 6: Advanced parameters

Currently, the search parameters used are the default ones. You can modify any search parameter in the API call directly in the `index.ts` script. For this, please refer to the official API documentation.

## Troubleshooting

The Claude documentation provides an excellent troubleshooting guide. You can also reach out to us at api@perplexity.ai for additional support or to file a bug.

## Cursor integration

You can also use this MCP server with Cursor or any other app that supports MCP. To use Sonar with Cursor, follow these steps:

**Step 1:** Navigate to your Cursor settings

**Step 2:** Navigate to the MCP directory

Click on *Add new global MCP server*

**Step 3:** Insert the MCP Server Configuration from above

You should then see the application as part of your available tools.

## License

This MCP server is licensed under the MIT License. You are free to use, modify, and distribute the software, subject to the terms of the MIT License. See the LICENSE file in the project repository for details.

## 🚩 Claim this MCP server

All credits to the original authors of [https://github.com/ppl-ai/modelcontextprotocol](https://github.com/ppl-ai/modelcontextprotocol)

To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

## References

To learn more about Apify and Actors, take a look at the following resources:

- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
