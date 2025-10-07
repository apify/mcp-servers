# OP.GG MCP Server Actorization Checklist

## Progress Tracking

- [x] ✅ **Examine source repository** - Analyzed https://github.com/opgginc/opgg-mcp, identified it as a TypeScript stdio-based proxy server connecting to https://mcp-api.op.gg/mcp with 20+ tools for LoL, TFT, Valorant data
- [x] ✅ **Configure MCP command** - Updated src/main.ts to use 'npx opgg-mcp' and proper standby mode message
- [x] ✅ **Install dependencies** - Installed opgg-mcp from GitHub, removed @modelcontextprotocol/server-everything
- [x] ✅ **Update billing configuration** - Modified src/billing.ts to include specific events for LoL, TFT, Valorant, and Esports tool requests
- [x] ✅ **Create comprehensive README** - Wrote README.md with connection URL, client configuration, and original repository information
- [x] ✅ **Update actor configuration** - Updated .actor/actor.json description and pay_per_event.json with game-specific pricing tiers
- [x] ✅ **Test locally** - Successfully tested server locally using APIFY_META_ORIGIN='STANDBY' ACTOR_WEB_SERVER_PORT=3002 apify run -p
- [x] ✅ **Create progress checklist** - Created this checklist to track actorization progress

## Next Steps (for deployment)

- [ ] **Create GitHub PR** - Push to feat/op-gg-mcp-server branch and create PR to https://github.com/apify/mcp-servers
- [ ] **Deploy to Apify Platform** - Create Actor in mcp-servers organization
- [ ] **Configure environment variables** - Set up any required API tokens (none needed for OP.GG)
- [ ] **Enable Actor Standby** - Configure standby mode in Apify Console
- [ ] **Set up scaling** - Configure Max requests per run and memory limits
- [ ] **Publish Actor** - Make public in Apify Store with MCP servers category
- [ ] **Test end-to-end** - Use Apify MCP tester or MCP inspector to verify functionality

## Technical Details

- **Source Repository**: https://github.com/opgginc/opgg-mcp
- **Server Type**: stdio-based (proxy to remote OP.GG API)
- **Programming Language**: TypeScript
- **Install Command**: `npm install https://github.com/opgginc/opgg-mcp.git --save`
- **Run Command**: `npx opgg-mcp`
- **Tools Count**: 20+ tools across LoL, TFT, Valorant, Esports

## Available Tools

### League of Legends (8 tools)
- lol-champion-leader-board
- lol-champion-analysis
- lol-champion-meta-data
- lol-champion-skin-sale
- lol-summoner-search
- lol-champion-positions-data
- lol-summoner-game-history
- lol-summoner-renewal

### Esports (2 tools)
- esports-lol-schedules
- esports-lol-team-standings

### Teamfight Tactics (5 tools)
- tft-meta-trend-deck-list
- tft-meta-item-combinations
- tft-champion-item-build
- tft-recommend-champion-for-item
- tft-play-style-comment

### Valorant (6 tools)
- valorant-meta-maps
- valorant-meta-characters
- valorant-leaderboard
- valorant-agents-composition-with-map
- valorant-characters-statistics
- valorant-player-match-history

## Notes

- OP.GG MCP server doesn't require API keys - it's a free service
- The server acts as a proxy to https://mcp-api.op.gg/mcp
- Pricing is set lower than template defaults since no external API costs
- All games data is real-time from OP.GG platform
