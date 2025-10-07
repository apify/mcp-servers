/**
 * MCP Server - Main Entry Point
 *
 * This file serves as the entry point for the MCP Server Actor.
 * It sets up a proxy server that forwards requests to the locally running
 * MCP server, which provides a Model Context Protocol (MCP) interface.
 */

// Apify SDK - toolkit for building Apify Actors (Read more at https://docs.apify.com/sdk/js/)
import { Actor, log } from 'apify';

import { startServer } from './server.js';

// This is an ESM project, and as such, it requires you to specify extensions in your relative imports
// Read more about this here: https://nodejs.org/docs/latest-v18.x/api/esm.html#mandatory-file-extensions
// Note that we need to use `.js` even when inside TS files
// import { router } from './routes.js';

// Configuration constants for the MCP server
// Use a remote Exa MCP server via mcp-remote with streamable (http) transport.
// EXA_API_KEY can be included in the URL. Optionally, limit tools via EXA_ENABLED_TOOLS (comma-separated or JSON array).
const { EXA_API_KEY, EXA_ENABLED_TOOLS } = process.env;
const EXA_URL_BASE = 'https://mcp.exa.ai/mcp';
const exaUrlObj = new URL(EXA_URL_BASE);
if (EXA_API_KEY) exaUrlObj.searchParams.set('exaApiKey', EXA_API_KEY);
if (EXA_ENABLED_TOOLS && EXA_ENABLED_TOOLS.trim().length > 0) {
    // Accept comma-separated list or JSON array; always send as JSON array in the URL
    const tools = EXA_ENABLED_TOOLS.trim().startsWith('[')
        ? EXA_ENABLED_TOOLS.trim()
        : JSON.stringify(
              EXA_ENABLED_TOOLS.split(',')
                  .map((s) => s.trim())
                  .filter((s) => s.length > 0),
          );
    exaUrlObj.searchParams.set('enabledTools', tools);
}
const EXA_URL = exaUrlObj.toString();
const MCP_COMMAND = ['npx', 'mcp-remote', EXA_URL, '--transport', 'http-first'];

// Check if the Actor is running in standby mode
const STANDBY_MODE = process.env.APIFY_META_ORIGIN === 'STANDBY';
const SERVER_PORT = parseInt(process.env.ACTOR_WEB_SERVER_PORT || '3001', 10);

// Initialize the Apify Actor environment
// The init() call configures the Actor for its environment. It's recommended to start every Actor with an init()
await Actor.init();

// Note: EXA_API_KEY is optional per Exa docs. When provided, it's appended to the URL.

if (!STANDBY_MODE) {
    // If the Actor is not in standby mode, don't start the server. Print connection config and exit successfully.
    const cfg = {
        mcpServers: {
            exa: {
                type: 'http',
                url: 'https://mcp-servers--exa-mcp-server.apify.actor/mcp',
                headers: { Authorization: 'Bearer your-apify-token' },
            },
        },
    };
    const msg = `This Actor is intended to run in standby mode. Please use an MCP client to connect. Client config: ${JSON.stringify(cfg)}`;
    log.info(msg);
    await Actor.exit({ statusMessage: msg });
}

// In standby mode, log the MCP client configuration to help users connect
{
    const cfg = {
        mcpServers: {
            exa: {
                type: 'http',
                url: 'https://mcp-servers--exa-mcp-server.apify.actor/mcp',
                headers: { Authorization: 'Bearer your-apify-token' },
            },
        },
    };
    log.info(`Standby mode: MCP client config: ${JSON.stringify(cfg)}`);
}

await startServer({
    serverPort: SERVER_PORT,
    command: MCP_COMMAND,
});
