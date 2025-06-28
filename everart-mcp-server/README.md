## EverArt MCP Server

Image generation server for Claude Desktop using EverArt's API.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

---

### Install

```bash
npm install
export EVERART_API_KEY=your_key_here
```

### Config

#### Usage with Claude Desktop

Add to Claude Desktop config:

**Docker**

```json
{
  "mcpServers": {
    "everart": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "EVERART_API_KEY", "mcp/everart"],
      "env": {
        "EVERART_API_KEY": "your_key_here"
      }
    }
  }
}
```

**NPX**

```json
{
  "mcpServers": {
    "everart": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-everart"],
      "env": {
        "EVERART_API_KEY": "your_key_here"
      }
    }
  }
}
```

### Usage with VS Code

For quick installation, use the one-click installation buttons below...

For manual installation, add the following JSON block to your User Settings (JSON) file in VS Code. You can do this by pressing Ctrl + Shift + P and typing Preferences: Open Settings (JSON). Optionally, you can add it to a file called `.vscode/mcp.json` in your workspace. This will allow you to share the configuration with others. Note that the `mcp` key is needed when using the `.vscode/mcp.json` file.

**Docker**

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "everart_api_key",
        "description": "EverArt API Key",
        "password": true
      }
    ],
    "servers": {
      "everart": {
        "command": "docker",
        "args": ["run", "-i", "--rm", "-e", "EVERART_API_KEY", "mcp/everart"],
        "env": {
          "EVERART_API_KEY": "${input:everart_api_key}"
        }
      }
    }
  }
}
```

**NPX**

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "everart_api_key",
        "description": "EverArt API Key",
        "password": true
      }
    ],
    "servers": {
      "everart": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-everart"],
        "env": {
          "EVERART_API_KEY": "${input:everart_api_key}"
        }
      }
    }
  }
}
```

### Tools

#### `generate_image`

Generates images with multiple model options. Opens result in browser and returns URL.

**Parameters:**

```ts
{
  prompt: string,       // Image description
  model?: string,       // Model ID (default: "207910310772879360")
  image_count?: number  // Number of images (default: 1)
}
```

**Models:**

- 5000: FLUX1.1 (standard)  
- 9000: FLUX1.1-ultra  
- 6000: SD3.5  
- 7000: Recraft-Real  
- 8000: Recraft-Vector  

All images generated at 1024x1024.

**Sample usage:**

```js
const result = await client.callTool({
  name: "generate_image",
  arguments: {
    prompt: "A cat sitting elegantly",
    model: "7000",
    image_count: 1
  }
});
```

**Response format:**

```
Image generated successfully!
The image has been opened in your default browser.

Generation details:
- Model: 7000
- Prompt: "A cat sitting elegantly"
- Image URL: https://storage.googleapis.com/...
```

You can also click the URL above to view the image again.

---

### Building w/ Docker

```bash
docker build -t mcp/everart -f src/everart/Dockerfile .
```

---

🚩 Claim this MCP server. Contact info.  
All credits to the original authors of https://github.com/modelcontextprotocol/servers-archived/tree/main/src/everart

Write to ai@apify.com