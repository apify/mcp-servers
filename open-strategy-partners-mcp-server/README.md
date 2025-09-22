


## Open Strategy Partners MCP Server

The Open Strategy Partners (OSP) MCP server provides automated access to OSP's marketing and content strategy tools via the Model Context Protocol (MCP), enabling LLM clients and automation workflows to generate value maps, meta information, editing codes, technical writing guides, and SEO guides.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--open-strategy-partners-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
	"mcpServers": {
		"open-strategy-partners": {
			"url": "https://mcp-servers--open-strategy-partners-mcp-server.apify.actor/mcp",
			"headers": {
				"Authorization": "Bearer YOUR_APIFY_TOKEN"
			}
		}
	}
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## 🚩 Claim this MCP server
All credits to the original authors of the OSP methodology and tools. To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

---

## Available Tools

- `get_value_map_positioning_guide`: Generate a product value map
- `get_meta_guide`: Generate meta information
- `get_editing_codes`: Generate editing codes for content
- `get_writing_guide`: Generate a technical writing guide
- `get_on_page_seo_guide`: Generate an on-page SEO guide

See `.actor/pay_per_event.json` for event pricing and details.

## References
To learn more about Apify and Actors, take a look at the following resources:
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)

