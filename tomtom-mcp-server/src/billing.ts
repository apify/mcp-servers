/**
 * This module handles billing for different types of protocol requests in the MCP server.
 * It defines a function to charge users based on the type of protocol method invoked.
 */
import { Actor, log } from 'apify';

const CHARGEABLE_EVENT_NAMES = [
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

type ChargeableRequest = {
    method: string;
} | {
    method: string;
    params?: {
        name?: string;
    };
}

/**
 * Charges the user for a message request based on the method type.
 * Supported method types are mapped to specific billing events.
 *
 * @param request - The request object containing the method string.
 * @returns Promise<void>
 */
export async function chargeMessageRequest(request: ChargeableRequest): Promise<void> {
    const method = request.method ?? null;
    const name = 'params' in request ? request.params?.name : null;

    if (!method) {
        log.warning(`Not charging for unknown method`);
        return;
    }

    if (name) {
        const knownEventName = CHARGEABLE_EVENT_NAMES.find(
            (eventName) => name.includes(eventName)
        );

        if (knownEventName) {
            await Actor.charge({ eventName: knownEventName });
            log.info(`Charged for ${knownEventName} request: ${method}`);
        } else {
            log.info(`Not charging for unknown event ${name}.`);
        }
    } else {
        log.info(`Not charging for method: ${method}`);
    }
}
