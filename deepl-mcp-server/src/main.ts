/**
 * MCP Server - Main Entry Point
 *
 * This file serves as the entry point for the MCP Server Actor.
 * It sets up a proxy server that forwards requests to the locally running
 * MCP server, which provides a Model Context Protocol (MCP) interface.
 */

import { Actor, log } from 'apify';

import { startServer } from './server.js';

const MCP_COMMAND = [
    'npx',
    'deepl-mcp-server'
];

// Check if the Actor is running in standby mode
const STANDBY_MODE = process.env.APIFY_META_ORIGIN === 'STANDBY';
const SERVER_PORT = parseInt(process.env.ACTOR_WEB_SERVER_PORT || '3001', 10);

await Actor.init();

if (!process.env.DEEPL_API_KEY) {
    const msg = 'DEEPL_API_KEY environment variable is not set. Please provide a valid DeepL API key.';
    log.error(msg);
    await Actor.exit(msg);
}

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
