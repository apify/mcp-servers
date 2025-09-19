
import { Actor, log } from 'apify';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

// Load billable events from .actor/pay_per_event.json (sync at startup)
let BILLABLE_EVENTS: Record<string, any> = {};
const payPerEventPath = path.resolve(__dirname, '../.actor/pay_per_event.json');
async function loadBillableEvents() {
    try {
        const data = await readFile(payPerEventPath, 'utf-8');
        BILLABLE_EVENTS = JSON.parse(data);
        log.info('Loaded billable events from pay_per_event.json');
    } catch (err) {
        log.error('Failed to load billable events:', { error: err });
    }
}
// Immediately load on module import
await loadBillableEvents();
/**
 * This module handles billing for different types of protocol requests in the MCP server.
 * It defines a function to charge users based on the type of protocol method invoked.
 */

/**
 * Charges the user for a message request based on the method type.
 * Supported method types are mapped to specific billing events.
 *
 * @param request - The request object containing the method string.
 * @returns Promise<void>
 */
export async function chargeMessageRequest(request: { method: string; params?: { tool?: string } }): Promise<void> {
    const { method } = request;

    if (method === 'tools/call' && request?.params?.tool) {
        const toolName = request.params.tool;
        if (BILLABLE_EVENTS[toolName]) {
            await Actor.charge({ eventName: toolName });
            const event = BILLABLE_EVENTS[toolName];
            log.info(`Charged for tool call: ${toolName} ($${event.eventPriceUsd}) - ${event.eventTitle}`);
        } else {
            await Actor.charge({ eventName: 'tool-call' });
            log.info(`Charged for tool call (unknown tool): ${toolName}`);
        }
    } else if (BILLABLE_EVENTS[method]) {
        await Actor.charge({ eventName: method });
        const event = BILLABLE_EVENTS[method];
        log.info(`Charged for event: ${method} ($${event.eventPriceUsd}) - ${event.eventTitle}`);
    } else {
        log.info(`Not charging for method: ${method}`);
    }
}
