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
export async function chargeMessageRequest(request: { method: string; params: { name?: string } }): Promise<void> {
    const { method, params: { name = '' } } = request;
    if (method !== 'tools/call') {
        log.info(`Not charging for method: ${method}`);
        return;
    }

    if (name.includes('lol_')) {
        await Actor.charge({ eventName: 'lol-tool-request' });
        log.info(`Charged for LoL tool request: ${method}`);
        // Charge for Teamfight Tactics tool requests
    } else if (name.includes('tft_')) {
        await Actor.charge({ eventName: 'tft-tool-request' });
        log.info(`Charged for TFT tool request: ${method}`);
        // Charge for Valorant tool requests
    } else if (name.includes('valorant_')) {
        await Actor.charge({ eventName: 'valorant-tool-request' });
        log.info(`Charged for Valorant tool request: ${method}`);
        // Charge for Esports tool requests
    } else {
        log.info(`No billing event matched for tool name: ${name} - not charging`);
    }
}
