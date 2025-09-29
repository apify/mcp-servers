import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import {
    JSONRPCMessage,
    JSONRPCRequest,
    JSONRPCNotification,
} from '@modelcontextprotocol/sdk/types.js';
import { log } from 'apify';
import { chargeMcpResponse } from '../billing.js';
import { Logger } from './getLogger.js';

interface StdioToSseOptions {
    port: number;
    stdioCmd: string | string[];
    logger: Logger;
}

// Type guards
function isJSONRPCRequest(msg: JSONRPCMessage): msg is JSONRPCRequest {
    return 'method' in msg && 'id' in msg;
}

function isJSONRPCNotification(msg: JSONRPCMessage): msg is JSONRPCNotification {
    return 'method' in msg && !('id' in msg);
}

function hasMethod(msg: JSONRPCMessage): msg is JSONRPCRequest | JSONRPCNotification {
    return 'method' in msg;
}

export async function stdioToSse(options: StdioToSseOptions): Promise<void> {
    const { port, stdioCmd, logger } = options;

    // Parse command
    const cmdArray = typeof stdioCmd === 'string' ? stdioCmd.split(' ') : stdioCmd;
    const command = cmdArray[0];
    const args = cmdArray.slice(1);
    const fullCommand = `${command} ${args.join(' ')}`;

    logger.info(`Starting MCP server with command: ${fullCommand}`);
    logger.info(`Port: ${port}`);

    // Spawn the MCP process once and keep it running
    const mcpProcess: ChildProcessWithoutNullStreams = spawn(command, args, {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: {
            ...process.env,
            FOREVERVM_TOKEN: process.env.FOREVERVM_TOKEN,
            NODE_ENV: 'production',
            DEBUG: '',
            VERBOSE: '0',
        },
    });

    mcpProcess.on('exit', (code, signal) => {
        logger.error(`MCP process exited: code=${code}, signal=${signal}`);
        process.exit(code ?? 1);
    });

    // Create MCP Server instance
    const server = new Server({ name: 'forevervm', version: '1.0.0' }, { capabilities: {} });

    // Track SSE sessions
    const sessions: Record<string, { transport: SSEServerTransport }> = {};

    // Create Express app
    const app = express();

    // Handle Apify readiness probe
    app.use((req: Request, res: Response, next: NextFunction) => {
        if (req.headers['x-apify-container-server-readiness-probe']) {
            res.writeHead(200);
            res.end('ok');
            return;
        }
        return next();
    });

    app.use(bodyParser.json());

    // CORS middleware
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }
        next();
    });

    // Health check endpoint
    app.get('/health', (req: Request, res: Response) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // SSE endpoint
    app.get('/sse', async (req: Request, res: Response) => {
        logger.info(`New SSE connection from ${req.ip}`);

        const sseTransport = new SSEServerTransport('/message', res);
        await server.connect(sseTransport);

        const { sessionId } = sseTransport;
        if (sessionId) {
            sessions[sessionId] = { transport: sseTransport };
        }

        sseTransport.onmessage = async (msg: JSONRPCMessage) => {
            logger.info(`SSE → MCP Process (session ${sessionId}): ${JSON.stringify(msg)}`);

            // Handle billing for tool calls using type guards
            if (hasMethod(msg) && msg.method === 'tools/call') {
                const params = (msg as any).params;
                if (params?.name) {
                    await chargeMcpResponse({
                        method: msg.method,
                        toolName: params.name,
                    });
                }
            }

            mcpProcess.stdin.write(`${JSON.stringify(msg)}\n`);
        };

        sseTransport.onclose = () => {
            logger.info(`SSE connection closed (session ${sessionId})`);
            delete sessions[sessionId];
        };

        sseTransport.onerror = (err) => {
            logger.error(`SSE error (session ${sessionId}):`, err);
            delete sessions[sessionId];
        };

        req.on('close', () => {
            logger.info(`Client disconnected (session ${sessionId})`);
            delete sessions[sessionId];
        });
    });

    // Message endpoint for SSE
    app.post('/message', async (req: Request, res: Response) => {
        const body = req.body as { method: string };

        // Handle billing
        await chargeMcpResponse(body);

        const sessionId = req.query.sessionId as string;

        if (!sessionId) {
            return res.status(400).send('Missing sessionId parameter');
        }

        const session = sessions[sessionId];
        if (session?.transport?.handlePostMessage) {
            logger.info(`POST to SSE transport (session ${sessionId})`);
            await session.transport.handlePostMessage(req, res, body);
        } else {
            res.status(503).send(`No active SSE connection for session ${sessionId}`);
        }
    });

    // HTTP-streamable endpoint (direct POST)
    app.post('/mcp', async (req: Request, res: Response) => {
        try {
            const requestData = req.body;
            logger.info('Received HTTP MCP request:', requestData);

            // Handle billing for tool calls
            if (requestData.method === 'tools/call' && requestData.params?.name) {
                await chargeMcpResponse({
                    method: requestData.method,
                    toolName: requestData.params.name,
                });
            }

            // Check if this is a notification (no response expected)
            const isNotification = isNotificationMethod(requestData.method) || !requestData.id;

            // Send to MCP process
            mcpProcess.stdin.write(JSON.stringify(requestData) + '\n');

            if (isNotification) {
                // For notifications, we don't expect a JSON response
                logger.info('Processed notification, no response expected');
                res.json({}); // Empty response for notifications
            } else {
                // For requests, we wait for a response
                // This is handled by the stdout listener below
                pendingRequests.set(requestData.id, res);
            }
        } catch (error) {
            logger.error('Error handling HTTP MCP request:', error);
            res.status(500).json({
                error: 'Internal server error',
                details: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    });

    // Track pending HTTP requests
    const pendingRequests = new Map<string | number, express.Response>();

    // Handle MCP process stdout (responses)
    let buffer = '';
    mcpProcess.stdout.on('data', (chunk: Buffer) => {
        buffer += chunk.toString('utf8');
        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop() ?? '';

        lines.forEach((line) => {
            if (!line.trim()) return;

            try {
                const jsonMsg = JSON.parse(line);
                logger.info('MCP Process → Response:', JSON.stringify(jsonMsg));

                // Send to SSE sessions
                for (const [sid, session] of Object.entries(sessions)) {
                    try {
                        session.transport.send(jsonMsg).catch((err) => {
                            logger.error(`Failed to send to SSE session ${sid}:`, err);
                        });
                    } catch (err) {
                        logger.error(`Failed to send to SSE session ${sid}:`, err);
                        delete sessions[sid];
                    }
                }

                // Send to pending HTTP requests
                if (jsonMsg.id && pendingRequests.has(jsonMsg.id)) {
                    const res = pendingRequests.get(jsonMsg.id);
                    if (res) {
                        res.json(jsonMsg);
                        pendingRequests.delete(jsonMsg.id);
                    }
                }
            } catch {
                logger.error(`MCP Process non-JSON output: ${line}`);
            }
        });
    });

    mcpProcess.stderr.on('data', (chunk: Buffer) => {
        const stderrStr = chunk.toString('utf8');
        if (!stderrStr.includes('INFO') && !stderrStr.includes('using options')) {
            logger.error(`MCP Process stderr: ${stderrStr}`);
        }
    });

    // Start the server
    return new Promise((resolve, reject) => {
        app.listen(port, () => {
            logger.info(`MCP server listening on port ${port}`);
            logger.info(`SSE endpoint: http://localhost:${port}/sse`);
            logger.info(`HTTP endpoint: http://localhost:${port}/mcp`);
            logger.info(`Health check: http://localhost:${port}/health`);

            // Log configurations for both transports
            const sseConfig = {
                mcpServers: {
                    forevervm: {
                        type: 'sse',
                        url: `http://localhost:${port}/sse`,
                    },
                },
            };

            const httpConfig = {
                mcpServers: {
                    forevervm: {
                        type: 'http',
                        url: `http://localhost:${port}/mcp`,
                        headers: {
                            Authorization: 'Bearer your-apify-token',
                        },
                    },
                },
            };

            logger.info(`SSE Configuration: ${JSON.stringify(sseConfig)}`);
            logger.info(`HTTP Configuration: ${JSON.stringify(httpConfig)}`);

            resolve();
        });

        app.on('error', (error) => {
            logger.error('Server error:', error);
            reject(error);
        });
    });
}

function isNotificationMethod(method: string): boolean {
    return method.startsWith('notifications/') || method === 'initialized';
}
