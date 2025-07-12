## Perplexity Sonar MCP Server

An MCP server implementation that integrates the Sonar API to provide Claude with unparalleled real-time, web-wide research.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

---

Please refer to the official [DeepWiki page](https://deepwiki.ai/docs/perplexity-ask-mcp-server) for assistance with implementation.

### High-level System Architecture

Credits: DeepWiki powered by Devin

### Tools

* `perplexity_ask`
    * Engage in a conversation with the Sonar API for live web searches.
    * Inputs:
        * `messages` (array): An array of conversation messages. Each message must include:
            * `role` (string): The role of the message (e.g., `system`, `user`, `assistant`).
            * `content` (string): The content of the message.

### Configuration

#### Step 1:

Clone this repository:

```bash
git clone git@github.com:ppl-ai/modelcontextprotocol.git
```

Navigate to the perplexity-ask directory and install the necessary dependencies:

```bash
cd modelcontextprotocol/perplexity-ask && npm install
```

#### Step 2: Get a Sonar API Key

Sign up for a Sonar API account.

Follow the account setup instructions and generate your API key from the developer dashboard.

Set the API key in your environment as `PERPLEXITY_API_KEY`.

#### Step 3: Configure Claude Desktop

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

#### Step 4: Build the Docker Image

Docker build:

```bash
docker build -t mcp/perplexity-ask:latest -f Dockerfile .
```

#### Step 5: Testing

Let's make sure Claude for Desktop is picking up the two tools we've exposed in our perplexity-ask server. You can do this by looking for the hammer icon:

After clicking on the hammer icon, you should see the tools that come with the Filesystem MCP Server:

If you see both of these this means that the integration is active. Congratulations! This means Claude can now ask Perplexity. You can then simply use it as you would use the Perplexity web app.

#### Step 6: Advanced parameters

Currently, the search parameters used are the default ones. You can modify any search parameter in the API call directly in the `index.ts` script. For this, please refer to the official API documentation.

### Troubleshooting

The Claude documentation provides an excellent troubleshooting guide you can refer to. However, you can still reach out to us at api@perplexity.ai for any additional support or file a bug.

### Cursor integration

You can also use our MCP with Cursor (or any other app that supports this). To use Sonar with Cursor, you can follow the following steps.

**Step 1:** Navigate to your Cursor settings

**Step 2:** Navigate to the MCP directory

And click on *Add new global MCP server*

**Step 3:** Insert the MCP Server Configuration from above

This is the same configuration you would use for any other application that supports MCP. You should then see the application being part of your available tools like this:

### License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.

---

🚩 Claim this MCP server. Contact info.

All credits to the original authors of https://github.com/ppl-ai/modelcontextprotocol

Write to ai@apify.com