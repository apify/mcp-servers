/**
 * This module handles billing for different types of protocol requests in the MCP server.
 * It defines a function to charge users based on the type of protocol method invoked.
 */
import { Actor, log } from 'apify';

/**
 * Charges the user for a message request based on the method type.
 * Supported method types are mapped to specific billing events.
 * For Microsoft Learn MCP Server, specific tools are charged individually.
 *
 * @param request - The request object containing the method string and optional params.
 * @returns Promise<void>
 */
export async function chargeMessageRequest(request: { method: string; params?: any }): Promise<void> {
    const { method, params } = request;

    // Charge for specific Microsoft Learn MCP Server tools
    if (method === 'tools/call' && params?.name) {
        const toolName = params.name;
        if (toolName === 'microsoft_learn_search') {
            await Actor.charge({ eventName: 'microsoft-learn-search' });
            log.info(`Charged for Microsoft Learn search: ${toolName}`);
            return;
        } else if (toolName === 'microsoft_learn_fetch') {
            await Actor.charge({ eventName: 'microsoft-learn-fetch' });
            log.info(`Charged for Microsoft Learn fetch: ${toolName}`);
            return;
        }
    }

    // See https://modelcontextprotocol.io/specification/2025-06-18/server for more details
    // on the method names and protocol messages
    // Charge for list requests (e.g., tools/list, resources/list, etc.)
    if (method.endsWith('/list')) {
        await Actor.charge({ eventName: 'list-request' });
        log.info(`Charged for list request: ${method}`);
    // Charge for tool-related requests (fallback for other tools)
    } else if (method.startsWith('tools/')) {
        await Actor.charge({ eventName: 'tool-request' });
        log.info(`Charged for tool request: ${method}`);
    // Do not charge for other methods
    } else {
        log.info(`Not charging for method: ${method}`);
    }
}
