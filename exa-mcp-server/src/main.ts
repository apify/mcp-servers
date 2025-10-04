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
// EXA_API_KEY is optional; if provided, it's appended as exaApiKey query param.
const { EXA_API_KEY } = process.env;
const EXA_URL_BASE = 'https://mcp.exa.ai/mcp';
const EXA_URL = EXA_API_KEY ? `${EXA_URL_BASE}?exaApiKey=${encodeURIComponent(EXA_API_KEY)}` : EXA_URL_BASE;
const MCP_COMMAND = ['npx', 'mcp-remote', EXA_URL, '--transport', 'streamable-only'];

// Check if the Actor is running in standby mode
const STANDBY_MODE = process.env.APIFY_META_ORIGIN === 'STANDBY';
const SERVER_PORT = parseInt(process.env.ACTOR_WEB_SERVER_PORT || '3001', 10);

// Initialize the Apify Actor environment
// The init() call configures the Actor for its environment. It's recommended to start every Actor with an init()
await Actor.init();

// Charge for Actor start
await Actor.charge({ eventName: 'actor-start' });

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
    const msg = `This Actor is intended to run in standby mode. Please use an MCP client to connect. Client config (single line): ${JSON.stringify(
        cfg,
    )}`;
    log.info(msg);
    await Actor.exit({ statusMessage: msg });
}

// In standby mode, log the MCP client configuration to help users connect
log.info(`Standby mode: MCP client config (single line): ${JSON.stringify({
    mcpServers: {
        exa: {
            type: 'http',
            url: 'https://mcp-servers--exa-mcp-server.apify.actor/mcp',
            headers: { Authorization: 'Bearer your-apify-token' },
        },
    },
})}`);

await startServer({
    serverPort: SERVER_PORT,
    command: MCP_COMMAND,
});
