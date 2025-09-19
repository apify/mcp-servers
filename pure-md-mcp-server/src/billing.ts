/**
 * This module handles billing for different types of protocol requests in the MCP server.
 * It defines a function to charge users based on the type of protocol method invoked.
 */
import { Actor, log } from 'apify';

/**
 * Charges the user for a message request based on the method type.
 * Supported method types are mapped to specific billing events for Pure.md tools.
 *
 * @param request - The request object containing the method string and params.
 * @returns Promise<void>
 */
export async function chargeMessageRequest(request: { method: string; params?: any }): Promise<void> {
    const { method, params } = request;

    // See https://modelcontextprotocol.io/specification/2025-06-18/server for more details
    // on the method names and protocol messages
    // Charge for specific Pure.md tool calls
    if (method === 'tools/call' && params?.name === 'unblock-url') {
        await Actor.charge({ eventName: 'unblock-url' });
        log.info(`Charged for unblock-url tool: ${params.arguments?.url}`);
    } else if (method === 'tools/call' && params?.name === 'search-web') {
        await Actor.charge({ eventName: 'search-web' });
        log.info(`Charged for search-web tool: ${params.arguments?.query}`);
    // Do not charge for other methods
    } else {
        log.info(`Not charging for method: ${method}`);
    }
}
