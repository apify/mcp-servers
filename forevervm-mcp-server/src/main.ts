import { Actor, log } from 'apify';
import { getLogger } from './lib/getLogger.js';
import { stdioToSse } from './lib/server.js';

// Define input interface
interface ActorInput {
    foreverVmToken?: string;
}

// ForeverVM MCP command - uses the forevervm-mcp package
const MCP_COMMAND = ['npx', 'forevervm-mcp', 'run'];

const STANDBY_MODE = process.env.APIFY_META_ORIGIN === 'STANDBY';
const SERVER_PORT = parseInt(process.env.ACTOR_WEB_SERVER_PORT || '3000', 10);

const LOG_LEVEL = 'info';
const OUTPUT_TRANSPORT = 'sse';

async function main() {
    await Actor.init();

    // Charge for actor start
    await Actor.charge({ eventName: 'actor-start' });

    // Get ForeverVM token from input or environment
    const input = (await Actor.getInput()) as ActorInput || {};
    const foreverVmToken = input.foreverVmToken || process.env.FOREVERVM_TOKEN;

    if (!foreverVmToken) {
        const errorMsg = 'ForeverVM token is required. Please provide it in the input or set FOREVERVM_TOKEN environment variable.';
        log.error(errorMsg);
        await Actor.exit({ statusMessage: errorMsg });
        return;
    }

    // Set the token in environment for the MCP process
    process.env.FOREVERVM_TOKEN = foreverVmToken;

    if (!STANDBY_MODE) {
        const successMessage = 'This Actor is intended to run in standby mode. Please use an MCP client to connect.';
        
        // Single-line configuration for easy copying
        const mcpConfig = '{"mcpServers":{"forevervm":{"type":"http","url":"https://your-actor-name.apify.actor/mcp","headers":{"Authorization":"Bearer your-apify-token"}}}}';
        
        log.info('ForeverVM MCP Server');
        log.info('Available tools: create-python-repl, run-python-in-repl');
        log.info(`MCP Configuration: ${mcpConfig}`);
        
        await Actor.exit({ statusMessage: successMessage });
        return;
    }

    log.info('Starting ForeverVM MCP Server in standby mode');
    log.info(`ForeverVM token configured: ${foreverVmToken.substring(0, 10)}...`);

    const logger = getLogger({
        logLevel: LOG_LEVEL,
        outputTransport: OUTPUT_TRANSPORT,
    });

    try {
        await stdioToSse({
            port: SERVER_PORT,
            stdioCmd: MCP_COMMAND,
            logger,
        });

        log.info('ForeverVM MCP Server is running successfully');
        log.info(`Available tools: create-python-repl, run-python-in-repl`);
        
        // Log configuration for users
        const configInfo = {
            mcpServers: {
                forevervm: {
                    type: 'http',
                    url: `http://localhost:${SERVER_PORT}/mcp`,
                    headers: {
                        Authorization: 'Bearer your-apify-token'
                    }
                }
            }
        };
        log.info('MCP Client Configuration:', configInfo);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        log.error('Failed to start ForeverVM MCP Server:', { error: errorMessage });
        await Actor.exit({ statusMessage: 'Failed to start MCP server' });
    }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
    log.info('Received SIGINT, shutting down gracefully');
    await Actor.exit();
});

process.on('SIGTERM', async () => {
    log.info('Received SIGTERM, shutting down gracefully');
    await Actor.exit();
});

// Start the application
main().catch(async (error) => {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    log.error('Fatal error in main function:', { error: errorMessage });
    await Actor.exit({ statusMessage: 'Fatal error occurred' });
});
