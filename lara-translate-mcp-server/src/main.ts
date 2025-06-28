import { Actor, log } from 'apify';

import { getLogger } from './lib/getLogger.js';
import { stdioToSse } from './lib/server.js';

const MCP_COMMAND = 'npx -y @translated/lara-mcp@latest';

const STANDBY_MODE = process.env.APIFY_META_ORIGIN === 'STANDBY';
const SERVER_PORT = parseInt(process.env.ACTOR_WEB_SERVER_PORT || '', 10);

const LOG_LEVEL = 'info';
const OUTPUT_TRANSPORT = 'sse';

await Actor.init();

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
