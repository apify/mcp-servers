/**
 * This module handles billing for different types of protocol requests in the MCP server.
 * It defines a function to charge users based on the type of protocol method invoked, using the pay_per_event.json mapping.
 */
import fs from 'node:fs';
import path from 'node:path';

import { Actor, log } from 'apify';

// Load event mapping from pay_per_event.json
const payPerEventPath = path.join(__dirname, '../.actor/pay_per_event.json');
let payPerEvent: Record<string, { eventTitle: string; eventDescription: string; eventPriceUsd: number }> = {};
try {
    payPerEvent = JSON.parse(fs.readFileSync(payPerEventPath, 'utf-8'));
} catch (err) {
    log.warning('Could not load pay_per_event.json, billing will not work as expected.', { error: err });
}

/**
 * Charges the user for a message request based on the method type, using the mapping from pay_per_event.json.
 *
 * @param request - The request object containing the method string.
 * @returns Promise<void>
 */
export async function chargeMessageRequest(request: { method: string }): Promise<void> {
    const { method } = request;

    // Map protocol method to event name in pay_per_event.json
    let eventName: string | undefined;
    if (method === 'actor-start') {
        eventName = 'actor-start';
    } else if (method === 'get_flight_positions') {
        eventName = 'get_flight_positions';
    } else if (method === 'get_flight_eta') {
        eventName = 'get_flight_eta';
    }

    if (eventName && payPerEvent[eventName]) {
        await Actor.charge({ eventName });
        log.info(`Charged for event: ${eventName} (${payPerEvent[eventName].eventTitle})`);
    } else {
        log.info(`Not charging for method: ${method}`);
    }
}
