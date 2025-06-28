// Apify SDK - toolkit for building Apify Actors (Read more at https://docs.apify.com/sdk/js/)
import { Actor, log } from 'apify';

import { getLogger } from './lib/getLogger.js';
import { stdioToSse } from './lib/server.js';

const MCP_COMMAND = 'npx -y @modelcontextprotocol/server-everart';

// Check if the Actor is running in standby mode
const STANDBY_MODE = process.env.APIFY_META_ORIGIN === 'STANDBY';
const SERVER_PORT = parseInt(process.env.ACTOR_WEB_SERVER_PORT || '', 10);

// Logger configuration
const LOG_LEVEL = 'info';
const OUTPUT_TRANSPORT = 'sse';

// Initialize the Apify Actor environment
await Actor.init();

// Charge for Actor start
await Actor.charge({ eventName: 'actor-start' });

if (!STANDBY_MODE) {
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
