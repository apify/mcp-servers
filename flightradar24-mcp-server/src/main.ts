/**
 * MCP Server - Main Entry Point
 *
 * This file serves as the entry point for the MCP Server Actor.
 * It sets up a proxy server that forwards requests to the locally running
 * MCP server, which provides a Model Context Protocol (MCP) interface.
 */

// Apify SDK - toolkit for building Apify Actors (Read more at https://docs.apify.com/sdk/js/)
// This is an ESM project, and as such, it requires you to specify extensions in your relative imports
// Read more about this here: https://nodejs.org/docs/latest-v18.x/api/esm.html#mandatory-file-extensions
// Note that we need to use `.js` even when inside TS files
// import { router } from './routes.js';
// Configuration constants for the MCP server
// Command to run the Flightradar24 MCP Server (local subfolder)
import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Actor, log } from 'apify';

import { startServer } from './server.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const ROOT = path.resolve(dirname, '..'); // /usr/src/app

function resolveInnerServerPath(): string {
    const candidates = [
        './flightradar24-mcp-server/flightradar24-mcp-server/dist/index.js',
        './flightradar24-mcp-server/dist/index.js',
    ];
    for (const rel of candidates) {
        const abs = path.resolve(ROOT, rel);
        if (existsSync(abs)) {
            console.log('[MCP] Using inner server:', rel);
            return rel;
        }
    }
    // helpful diagnostics
    console.error('[MCP] Could not find inner server dist/index.js in either location.');
    console.error(
        '[MCP] Tree of flightradar24-mcp-server:',
        readdirSync(path.resolve(ROOT, 'flightradar24-mcp-server')),
    );
    console.error(
        '[MCP] Tree of double-nested:',
        readdirSync(path.resolve(ROOT, 'flightradar24-mcp-server', 'flightradar24-mcp-server')),
    );
    throw new Error('Inner MCP dist not found. Check Docker build & paths.');
}

const MCP_COMMAND = ['node', resolveInnerServerPath()];

// Check if the Actor is running in standby mode
const STANDBY_MODE = process.env.APIFY_META_ORIGIN === 'STANDBY';
const SERVER_PORT = parseInt(process.env.ACTOR_WEB_SERVER_PORT || '3001', 10);

// Initialize the Apify Actor environment
// The init() call configures the Actor for its environment. It's recommended to start every Actor with an init()
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
