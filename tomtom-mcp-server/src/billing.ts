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

    const eventNames = [
        'actor-start',
        'tomtom-geocode',
        'tomtom-reverse-geocode',
        'tomtom-fuzzy-search',
        'tomtom-poi-search',
        'tomtom-nearby',
        'tomtom-routing',
        'tomtom-waypoint-routing',
        'tomtom-reachable-range',
        'tomtom-traffic',
        'tomtom-static-map'
    ] as const;

    // See https://modelcontextprotocol.io/specification/2025-06-18/server for more details
    // on the method names and protocol messages
    const knownEventName = eventNames.find((eventName) => method.includes(eventName));
    if (knownEventName) {
        await Actor.charge({ eventName: knownEventName });
        log.info(`Charged for ${knownEventName} request: ${method}`);
    } else {
        log.info(`Not charging for method: ${method}`);
    }
}
