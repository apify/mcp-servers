/**
 * This module handles billing for different types of protocol requests in the MCP server.
 * It defines a function to charge users based on the type of protocol method invoked.
 */
import { Actor, log } from 'apify';

type TOOLS = 'get-source-languages' | 'get-target-languages' | 'get-writing-style-guides' | 'translate-text' | 'rephrase-text';

/**
 * Charges the user for a message request based on the method type.
 * Supported method types are mapped to specific billing events.
 *
 * @param request - The request object containing the method string.
 * @returns Promise<void>
 */
export async function chargeMessageRequest(request: { method: string, params?: { name?: TOOLS }}): Promise<void> {
    const { method, params } = request;
    const { name } = params || {};

    if (name) {
        // Charge for the specific tool
        await Actor.charge({ eventName: name });
        log.info(`Charged for tool: ${name}`);
    } else {
        log.info(`No charge applied. Unrecognized tool name in method: ${method}`);
    }
}
