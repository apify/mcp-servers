/**
 * This module handles billing for different types of protocol requests in the MCP server.
 * It defines a function to charge users based on the type of protocol method invoked.
 */
import { Actor, log } from 'apify';

/**
 * Charges the user for a message request based on the method type.
 * Supported method types are mapped to specific billing events for OP.GG MCP server.
 *
 * @param request - The request object containing the method string.
 * @returns Promise<void>
 */
export async function chargeMessageRequest(request: { method: string }): Promise<void> {
    const { method } = request;

    // See https://modelcontextprotocol.io/specification/2025-06-18/server for more details
    // on the method names and protocol messages
    // Charge for League of Legends tool requests
    if (method.startsWith('tools/call') && method.includes('lol-')) {
        await Actor.charge({ eventName: 'lol-tool-request' });
        log.info(`Charged for LoL tool request: ${method}`);
        // Charge for Teamfight Tactics tool requests
    } else if (method.startsWith('tools/call') && method.includes('tft-')) {
        await Actor.charge({ eventName: 'tft-tool-request' });
        log.info(`Charged for TFT tool request: ${method}`);
        // Charge for Valorant tool requests
    } else if (method.startsWith('tools/call') && method.includes('valorant-')) {
        await Actor.charge({ eventName: 'valorant-tool-request' });
        log.info(`Charged for Valorant tool request: ${method}`);
        // Charge for Esports tool requests
    } else if (method.startsWith('tools/call') && method.includes('esports-')) {
        await Actor.charge({ eventName: 'esports-tool-request' });
        log.info(`Charged for Esports tool request: ${method}`);
        // Do not charge for other methods
    } else {
        log.info(`Not charging for method: ${method}`);
    }
}
