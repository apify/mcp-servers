import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { DEFAULT_REQUEST_TIMEOUT_MSEC } from '@modelcontextprotocol/sdk/shared/protocol.js';
import {
    ClientNotificationSchema,
    ClientRequestSchema,
    ResultSchema,
    ServerNotificationSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { log } from 'apify';

import { chargeEvent } from './billing.js';

/**
 * Creates and configures an MCP server instance.
 *
 * - Registers all protocol capabilities except experimental.
 * - Spawns a proxy client to forward requests and notifications.
 * - Sets up handlers for requests and notifications between the server and proxy client.
 * - Handles server shutdown and proxy client cleanup.
 *
 * @param command - The command to start the MCP proxy process.
 * @param options - Optional configuration (e.g., request timeout, env).
 * @returns A Promise that resolves to a configured McpServer instance.
 */
export async function getMcpServer(
    command: string[],
    options?: {
        timeout?: number;
        env?: NodeJS.ProcessEnv;
    },
): Promise<McpServer> {
    // Create the MCP server instance
    const server = new McpServer({
        name: 'mcp-server',
        version: '1.0.0',
    });

    // Register all capabilities except experimental
    server.server.registerCapabilities({
        tools: {},
        prompts: {},
        resources: {},
        completions: {},
        logging: {},
    });

    // Spawn MCP proxy client for the stdio MCP server, pass env
    const proxyClient = await getMcpProxyClient(command, options?.env);

    // Register request handlers for all client requests
    for (const schema of ClientRequestSchema.options) {
        server.server.setRequestHandler(schema as any, async (req: any) => {
            const method: string | undefined = req?.method;

            if (method === 'initialize') {
                // Handle the 'initialize' request separately and do not forward it to the proxy client
                return {
                    capabilities: proxyClient.getServerCapabilities(),
                    // Return back the client protocolVersion
                    protocolVersion: req?.params?.protocolVersion,
                    serverInfo: {
                        name: 'Apify MCP proxy server',
                        title: 'Apify MCP proxy server',
                        version: '1.0.0',
                    },
                };
            }

            try {
                const response = await proxyClient.request(req, ResultSchema, {
                    timeout: options?.timeout || DEFAULT_REQUEST_TIMEOUT_MSEC,
                });

                // Bill ONLY based on the response (credits_used or fallback for tools/call)
                if (req?.method === 'tools/call') {
                    await chargeEvent(response);
                }
                return response;
            } catch (error: any) {
                // Apply fallback billing only for tool execution calls
                await chargeEvent({
                    jsonrpc: '2.0',
                    id: req?.id,
                    method,
                    error: {
                        code: error?.code || -32001,
                        message: error?.message || 'Proxy request failed',
                    },
                });
                throw error;
            }
        });
    }

    // Register notification handlers for all client notifications
    for (const schema of ClientNotificationSchema.options) {
        const method = (schema as any).shape?.method?.value as string | undefined;
        server.server.setNotificationHandler(schema as any, async (notification) => {
            if (notification.method === 'notifications/initialized') {
                // Do not forward the 'notifications/initialized' notification
                return;
            }
            log.info('Received MCP notification', {
                method,
                notification,
            });
            await proxyClient.notification(notification);
        });
    }

    // Register notification handlers for all proxy client notifications
    for (const schema of ServerNotificationSchema.options) {
        const method = (schema as any).shape?.method?.value as string | undefined;
        proxyClient.setNotificationHandler(schema as any, async (notification) => {
            log.info('Sending MCP notification', {
                method,
                notification,
            });
            await server.server.notification(notification);
        });
    }

    // Handle server shutdown and cleanup proxy client
    server.server.onclose = () => {
        log.info('MCP Server is closing, shutting down the proxy client');
        proxyClient.close().catch((error) => {
            log.error('Error closing MCP Proxy Client', {
                error,
            });
        });
    };

    return server;
}

/**
 * Creates and connects an MCP Proxy Client using a given command.
 *
 * This function splits the provided command string into the executable and its arguments,
 * initializes a StdioClientTransport for communication, and then creates a Client instance.
 * It connects the client to the transport and returns the connected client.
 *
 * @param command - The command to start the MCP proxy process (e.g., 'node server.js').
 * @param env - Optional environment variables to pass to the child process.
 * @returns A Promise that resolves to a connected Client instance.
 */
export async function getMcpProxyClient(command: string[], env?: NodeJS.ProcessEnv): Promise<Client> {
    log.info('Starting MCP Proxy Client', {
        command,
        env: env ? Object.keys(env).filter((key) => env[key] !== undefined) : undefined,
    });

    // Ensure env is Record<string, string> for the transport
    const cleanEnv: Record<string, string> | undefined = env
        ? (Object.fromEntries(Object.entries(env).filter(([, v]) => v !== undefined)) as Record<string, string>)
        : undefined;

    // Create a stdio transport for the proxy client
    const transport = new StdioClientTransport({
        command: command[0],
        args: command.slice(1),
        env: cleanEnv,
    });

    // Create the MCP proxy client instance
    const client = new Client({
        name: 'mcp-proxy-client',
        version: '1.0.0',
    });

    // Connect the client to the transport
    await client.connect(transport);
    log.info('MCP Proxy Client started successfully');
    return client;
}
