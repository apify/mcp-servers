/**
 * MCP Server - Main Entry Point
 *
 * This file serves as the entry point for the MCP Server Actor.
 * It sets up a proxy server that forwards requests to the locally running
 * MCP server, which provides a Model Context Protocol (MCP) interface.
 */

import { Actor, log } from 'apify';

import { startServer } from './server.js';

// Configuration constants for the MCP server
// Command to run the Everything MCP Server
const MCP_COMMAND = ['npx', 'https://github.com/fetchSERP/fetchserp-mcp-server-node/archive/8fe13dbc9219dddbb8c53bf4fe8becfd3d5f69df.tar.gz'];

// Check if the Actor is running in standby mode
const STANDBY_MODE = process.env.APIFY_META_ORIGIN === 'STANDBY';
const SERVER_PORT = parseInt(process.env.ACTOR_WEB_SERVER_PORT || '3001', 10);

// Initialize the Apify Actor environment
// The init() call configures the Actor for its environment. It's recommended to start every Actor with an init()
await Actor.init();

if (!process.env.FETCHSERP_API_TOKEN) {
    const msg = 'The MCP server is misconfigured. Please notify the developer about this issue. Error code #10.';
    log.error(msg);
    await Actor.exit({ statusMessage: msg, exitCode: 10 });
}

if (!STANDBY_MODE) {
    // If the Actor is not in standby mode, we should not run the MCP server
    const msg = 'Actor is not designed to run in the NORMAL mode. Use MCP server URL to connect to the server.\n'
        + 'Connect to {url}/mcp to establish a connection.\n'
        + 'Learn more at https://mcp.apify.com/';
    log.error(msg);
    await Actor.exit({ statusMessage: msg });
}

await startServer({
    serverPort: SERVER_PORT,
    command: MCP_COMMAND,
});
