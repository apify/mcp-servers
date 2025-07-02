import { Actor, log } from 'apify';

import { getLogger } from './lib/getLogger.js';
import { stdioToSse } from './lib/server.js';

const MCP_COMMAND = 'npx -y brave-search-mcp';

// Check if the Actor is running in standby mode
const STANDBY_MODE = process.env.APIFY_META_ORIGIN === 'STANDBY';
const SERVER_PORT = parseInt(process.env.ACTOR_WEB_SERVER_PORT || '', 10);

// Logger configuration
const LOG_LEVEL = 'info';
const OUTPUT_TRANSPORT = 'sse';

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

const logger = getLogger({
    logLevel: LOG_LEVEL,
    outputTransport: OUTPUT_TRANSPORT,
});
await stdioToSse({
    port: SERVER_PORT,
    stdioCmd: MCP_COMMAND,
    logger,
});
