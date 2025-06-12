## MCP server template

A template for running and monetizing a [Model Context Protocol](https://modelcontextprotocol.io) server over [stdio](https://modelcontextprotocol.io/docs/concepts/transports#standard-input%2Foutput-stdio) on [Apify platform](https://docs.apify.com/platform).
This allows you to run any stdio MCP server as a [standby Actor](https://docs.apify.com/platform/actors/development/programming-interface/standby) and connect via [SSE transport](https://modelcontextprotocol.io/docs/concepts/transports#server-sent-events-sse) with an [MCP client](https://modelcontextprotocol.io/clients).

## How to use

Change the `MCP_COMMAND` to spawn your stdio MCP server in `src/main.ts`, and don't forget to install the required MCP server in the `package.json` (using `npm install ...`).
By default, this template runs a [Sequential Thinking MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking) server using the following command:
```
npx @modelcontextprotocol/server-sequential-thinking
```

Feel free to configure billing logic in `.actor/pay_per_event.json` and `src/billing.ts`.

[Push your Actor](https://docs.apify.com/academy/deploying-your-code/deploying) to the Apify platform, configure [standby mode](https://docs.apify.com/platform/actors/development/programming-interface/standby), and then connect to the Actor standby URL with your MCP client (e.g., `https://me--my-mcp-server.apify.actor/sse`).

### Pay per event

This template uses the [Pay Per Event (PPE)](https://docs.apify.com/platform/actors/publishing/monetize#pay-per-event-pricing-model) monetization model, which provides flexible pricing based on defined events.

To charge users, define events in JSON format and save them on the Apify platform. Here is an example schema with the `tool-request` event:

```json
[
    {
        "tool-request": {
            "eventTitle": "Price for completing a tool request",
            "eventDescription": "Flat fee for completing a tool request.",
            "eventPriceUsd": 0.05
        }
    }
]
```

In the Actor, trigger the event with:

```typescript
await Actor.charge({ eventName: 'tool-request' });
```

This approach allows you to programmatically charge users directly from your Actor, covering the costs of execution and related services.

To set up the PPE model for this Actor:

- **Configure Pay Per Event**: establish the Pay Per Event pricing schema in the Actor's **Monetization settings**. First, set the **Pricing model** to `Pay per event` and add the schema. An example schema can be found in [pay_per_event.json](.actor/pay_per_event.json).

## Resources

- [What is Anthropic's Model Context Protocol?](https://blog.apify.com/what-is-model-context-protocol/)
- [How to use MCP with Apify Actors](https://blog.apify.com/how-to-use-mcp/)
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
