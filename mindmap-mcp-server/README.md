## Mindmap MCP Server

A Model Context Protocol (MCP) server for converting Markdown content to interactive mindmaps.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--mindmap-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "mindmap": {
      "url": "https://mcp-servers--mindmap-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).


## 🚩 Claim this MCP server
All credits to the original authors of https://github.com/YuChenSSR/mindmap-mcp-server
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

---

# Mindmap MCP Server

<p align="center">
  <img src="https://raw.githubusercontent.com/YuChenSSR/pics/master/imgs/2025-03-21/JMi7Mn89Hw5ikd9z.jpeg" alt="mindmap_mcp" width="50%">
</p>

A Model Context Protocol (MCP) server for converting Markdown content to interactive mindmaps.

### Available Tools

- `convert_markdown_to_mindmap` - Convert Markdown content to a mindmap mind map.

## License

mindmap-mcp-server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.

## Features

This server provides a tool for converting Markdown content to mindmaps using the `markmap-cli` library:

- Convert Markdown to interactive mindmap HTML
- Option to create offline-capable mindmaps
- Option to hide the toolbar
- Return either HTML content or file path

## Example

In Claude, you can ask:

1.
"**give a mindmap for the following markdown code, using a mindmap tool:**
```
# Project Planning
## Research
### Market Analysis
### Competitor Review
## Design
### Wireframes
### Mockups
## Development
### Frontend
### Backend
## Testing
### Unit Tests
### User Testing
```
"


if you want to save the mindmap to a file, and then open it in your browser using the iTerm MCP server:

2.
"**give a mindmap for the following markdown input_code using a mindmap tool,
after that,use iterm to open the generated html file.
input_code:**
```
markdown content
```
"


3.
"**Think about the process of putting an elephant into a refrigerator, and provide a mind map. Open it with a terminal.**"

<details>

<summary>see the result</summary>

![aiworkflow](https://raw.githubusercontent.com/YuChenSSR/pics/master/imgs/2025-03-22/QUjGnpmUcPfd3lBI.png)

![mindmapinbrowser](https://raw.githubusercontent.com/YuChenSSR/pics/master/imgs/2025-03-22/w7DZ4shFhLoQZruq.png)

 </details>


**and more**

## References
To learn more about Apify and Actors, take a look at the following resources:
- [MCP Server Calculator](https://github.com/githejie/mcp-server-calculator)
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
