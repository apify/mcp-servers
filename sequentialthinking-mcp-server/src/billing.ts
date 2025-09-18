/**
 * This module handles billing for different types of protocol requests in the MCP server.
 * It defines a function to charge users based on the type of protocol method invoked.
 */
import { Actor, log } from 'apify';

// Pay-per-event mapping for Apify MCP Actor monetization
export const BILLABLE_EVENTS = {
    sequential_thinking: { price: 0.05 }
};

/**
 * Charges the user for a message request based on the method type.
 * Only charges for the sequential_thinking tool.
 */
export async function chargeMessageRequest(request: { method: string }): Promise<void> {
    const { method } = request;
    if (method === 'tools/sequential_thinking/invoke') {
        await Actor.charge({ eventName: 'sequential_thinking' });
        log.info(`Charged for sequential_thinking tool request: ${method}`);
    } else if (method === 'actor-start') {
        await Actor.charge({ eventName: 'actor-start' });
        log.info(`Charged for actor start: ${method}`);
    } else {
        log.info(`Not charging for method: ${method}`);
    }
}
