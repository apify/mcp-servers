## OP.GG MCP Server

An Apify Actor that provides access to OP.GG gaming data through the Model Context Protocol (MCP). This server enables AI agents to retrieve League of Legends, Teamfight Tactics, Valorant, and Esports data from OP.GG.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--op-gg-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "opgg": {
      "url": "https://mcp-servers--op-gg-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## Available Tools

The OP.GG MCP Server provides access to 20+ tools across multiple gaming platforms:

### League of Legends
- **lol-champion-leader-board**: Get ranking board data for League of Legends champions
- **lol-champion-analysis**: Provides analysis data for League of Legends champions (counter and ban/pick data available in the "weakCounters" field)
- **lol-champion-meta-data**: Retrieves meta data for a specific champion, including statistics and performance metrics
- **lol-champion-skin-sale**: Retrieves information about champion skins that are currently on sale
- **lol-summoner-search**: Search for League of Legends summoner information and stats
- **lol-champion-positions-data**: Retrieves position statistics data for League of Legends champions, including win rates and pick rates by position
- **lol-summoner-game-history**: Retrieve recent game history for a League of Legends summoner
- **lol-summoner-renewal**: Refresh and update League of Legends summoner match history and stats

### Esports (League of Legends)
- **esports-lol-schedules**: Get upcoming LoL match schedules
- **esports-lol-team-standings**: Get team standings for a LoL league

### Teamfight Tactics (TFT)
- **tft-meta-trend-deck-list**: TFT deck list tool for retrieving current meta decks
- **tft-meta-item-combinations**: TFT tool for retrieving information about item combinations and recipes
- **tft-champion-item-build**: TFT tool for retrieving champion item build information
- **tft-recommend-champion-for-item**: TFT tool for retrieving champion recommendations for a specific item
- **tft-play-style-comment**: This tool provides comments on the playstyle of TFT champions

### Valorant
- **valorant-meta-maps**: Valorant map meta data
- **valorant-meta-characters**: Valorant character meta data
- **valorant-leaderboard**: Fetch Valorant leaderboard by region
- **valorant-agents-composition-with-map**: Retrieve agent composition data for a Valorant map
- **valorant-characters-statistics**: Retrieve character statistics data for Valorant, optionally filtered by map
- **valorant-player-match-history**: Retrieve match history for a Valorant player using their game name and tag line

## Features

- **Real-time Gaming Data**: Access current game statistics, leaderboards, and meta information
- **Multi-Game Support**: Covers League of Legends, Teamfight Tactics, Valorant, and Esports
- **Player Analytics**: Get detailed player statistics and match histories
- **Meta Analysis**: Retrieve current meta trends, champion builds, and strategic data
- **Competitive Insights**: Access professional esports schedules and team standings

## 🚩 Claim this MCP server
All credits to the original authors of [https://github.com/opgginc/opgg-mcp](https://github.com/opgginc/opgg-mcp)

## References
To learn more about Apify and Actors, take a look at the following resources:
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)

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
