## Exa MCP Server

HTTP MCP proxy to Exa's hosted MCP server at https://mcp.exa.ai/mcp. This Actor exposes a streamable HTTP endpoint so MCP clients can connect using an Apify-hosted URL with Bearer auth.

## How to use

This server uses mcp-remote to connect to Exa and supports optional EXA_API_KEY (appended to the URL as exaApiKey).

## Connection URL

MCP clients can connect to this server at:

https://mcp-servers--exa-mcp-server.apify.actor/mcp

## Client Configuration

Use this configuration in your MCP client (replace your-apify-token with your token from Apify Console):

{
    "mcpServers": {
        "exa": {
            "type": "http",
            "url": "https://mcp-servers--exa-mcp-server.apify.actor/mcp",
            "headers": {
                "Authorization": "Bearer YOUR_APIFY_TOKEN"
            }
        }
    }
}

Optionally set EXA_API_KEY as an Actor environment variable to use your Exa key.

### Pay per event

This Actor uses the [Pay Per Event (PPE)](https://docs.apify.com/platform/actors/publishing/monetize#pay-per-event-pricing-model) model. Exa tool calls map to events defined in [.actor/pay_per_event.json](.actor/pay_per_event.json) such as `exa-get-code-context`, `exa-web-search`, etc. Unknown tools fall back to `tool-request`.

To charge users, define events in JSON format and save them on the Apify platform. Here is an example schema with the `tool-request` event:

Event charging is performed in `src/billing.ts` based on the MCP method and tool name.

To set up the PPE model: in Actor Monetization settings, choose Pay per event and paste the content of [.actor/pay_per_event.json](.actor/pay_per_event.json).

## Credits and links

- [What is Anthropic's Model Context Protocol?](https://blog.apify.com/what-is-model-context-protocol/)
- [How to use MCP with Apify Actors](https://blog.apify.com/how-to-use-mcp/)
- All credits to the original authors of https://github.com/exa-labs/exa-mcp-server (or hosted Exa at https://mcp.exa.ai/mcp)
- Claim this MCP server – write to ai@apify.com.
- [Apify MCP servers monorepo](https://github.com/apify/mcp-servers)
- [Apify MCP server](https://mcp.apify.com)
- [Apify MCP server documentation](https://docs.apify.com/platform/integrations/mcp)
- [Apify MCP client](https://apify.com/jiri.spilka/tester-mcp-client)
- [Model Context Protocol documentation](https://modelcontextprotocol.io)
- [TypeScript tutorials in Academy](https://docs.apify.com/academy/node-js)
- [Apify SDK documentation](https://docs.apify.com/sdk/js/)


## Getting started

For complete information [see this article](https://docs.apify.com/platform/actors/development#build-actor-locally). To run the Actor use the following command:

```bash
apify run
```

## Deploy to Apify

### Connect Git repository to Apify

If you've created a Git repository for the project, you can easily connect to Apify:

1. Go to [Actor creation page](https://console.apify.com/actors/new)
2. Click on **Link Git Repository** button

### Push project on your local machine to Apify

You can also deploy the project on your local machine to Apify without the need for the Git repository.

1. Log in to Apify. You will need to provide your [Apify API Token](https://console.apify.com/account/integrations) to complete this action.

    ```bash
    apify login
    ```

2. Deploy your Actor. This command will deploy and build the Actor on the Apify Platform. You can find your newly created Actor under [Actors -> My Actors](https://console.apify.com/actors?tab=my).

    ```bash
    apify push
    ```

## Documentation reference

To learn more about Apify and Actors, take a look at the following resources:

- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
