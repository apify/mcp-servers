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

const WOLFRAM_MCP_API_KEY = process.env.WOLFRAM_MCP_API_KEY;
if (!WOLFRAM_MCP_API_KEY) {
    const msg = 'WOLFRAM_MCP_API_KEY env var is required to run this Actor! Set the value in the Environment variables Actor settings and rebuild the Actor.';
    log.error(msg);
    await Actor.exit({ statusMessage: msg });
}

// Configuration constants for the MCP server
// Command to run the Everything MCP Server
const MCP_COMMAND = [
    'npx',
    'mcp-remote',
    'https://services.wolfram.com/api/mcp',
    '--header',
    `Authorization: Bearer ${WOLFRAM_MCP_API_KEY}`,
];

// Check if the Actor is running in standby mode
const STANDBY_MODE = process.env.APIFY_META_ORIGIN === 'STANDBY';
const SERVER_PORT = parseInt(process.env.ACTOR_WEB_SERVER_PORT || '3001', 10);

// Initialize the Apify Actor environment
// The init() call configures the Actor to correctly work with the Apify-provided environment - mainly the storage infrastructure. It is necessary that every Actor performs an init() call.
await Actor.init();

// Charge for Actor start
await Actor.charge({ eventName: 'actor-start' });

if (!STANDBY_MODE) {
    // If the Actor is not in standby mode, we should not run the MCP server
    const msg = 'This Actor is not meant to be run directly. It should be run in standby mode.';
    log.error(msg);
    await Actor.exit({ statusMessage: msg });
}

await startServer({
    serverPort: SERVER_PORT,
    command: MCP_COMMAND,
});