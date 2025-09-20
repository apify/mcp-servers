/**
 * This module handles billing for different types of protocol requests in the MCP server.
 * It defines a function to charge users based on the type of protocol method invoked.
 */
import { Actor, log } from 'apify';

/**
 * Charges the user for a message request based on the method type.
 * Supported method types are mapped to specific billing events.
 *
 * @param request - The request object containing the method string.
 * @returns Promise<void>
 */
export async function chargeMessageRequest(request: { method: string }): Promise<void> {
    const { method } = request;

    // See https://modelcontextprotocol.io/specification/2025-06-18/server for more details
    // on the method names and protocol messages
    // Charge for list requests (e.g., tools/list, resources/list, etc.)
    // We charge a fixed price for a browserbase tool call,
    // we simply assume it is a browser request and browserbase also charges for proxy at rate of 0.012 USD per MB. In this case we assume user is visiting a bloated page of 3 MB.
    if (method.startsWith('tools/call')) {
        await Actor.charge({ eventName: 'browserbase-tool-call' });
        log.info(`Charged browserbase-tool-call for method: ${method}`);
    }
}
