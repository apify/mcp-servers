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
    if (method.includes('actor-start')) {
        await Actor.charge({ eventName: 'actor-start' });
        log.info(`Charged for actor-start request: ${method}`);
        // Charge for tool-related requests tomtom-geocode requests
    } else if (method.includes('tomtom-geocode')) {
        await Actor.charge({ eventName: 'tomtom-geocode' });
        log.info(`Charged for tomtom-geocode request: ${method}`);
        // Charge for tool-related requests tomtom-reverse-geocode requests
    } else if (method.includes('tomtom-reverse-geocode')) {
        await Actor.charge({ eventName: 'tomtom-reverse-geocode' });
        log.info(`Charged for tomtom-reverse-geocode request: ${method}`);
        // Charge for tool-related requests tomtom-fuzzy-search requests
    } else if (method.includes('tomtom-fuzzy-search')) {
        await Actor.charge({ eventName: 'tomtom-fuzzy-search' });
        log.info(`Charged for tomtom-fuzzy-search request: ${method}`);
        // Charge for tool-related requests tomtom-poi-search requests
    } else if (method.includes('tomtom-poi-search')) {
        await Actor.charge({ eventName: 'tomtom-poi-search' });
        log.info(`Charged for tomtom-poi-search request: ${method}`);
        // Charge for tool-related requests tomtom-nearby requests
    } else if (method.includes('tomtom-nearby')) {
        await Actor.charge({ eventName: 'tomtom-nearby' });
        log.info(`Charged for tomtom-nearby request: ${method}`);
        // Charge for tool-related requests tomtom-routing requests
    } else if (method.includes('tomtom-routing')) {
        await Actor.charge({ eventName: 'tomtom-routing' });
        log.info(`Charged for tomtom-routing request: ${method}`);
        // Charge for tool-related requests tomtom-waypoint-routing requests
    } else if (method.includes('tomtom-waypoint-routing')) {
        await Actor.charge({ eventName: 'tomtom-waypoint-routing' });
        log.info(`Charged for tomtom-waypoint-routing request: ${method}`);
        // Charge for tool-related requests tomtom-reachable-range requests
    } else if (method.includes('tomtom-reachable-range')) {
        await Actor.charge({ eventName: 'tomtom-reachable-range' });
        log.info(`Charged for tomtom-reachable-range request: ${method}`);
        // Charge for tool-related requests tomtom-traffic requests
    } else if (method.includes('tomtom-traffic')) {
        await Actor.charge({ eventName: 'tomtom-traffic' });
        log.info(`Charged for tomtom-traffic request: ${method}`);
        // Charge for tool-related requests tomtom-static-map requests
    } else if (method.includes('tomtom-static-map')) {
        await Actor.charge({ eventName: 'tomtom-static-map' });
        log.info(`Charged for tomtom-static-map request: ${method}`);
        // Do not charge for other methods
    } else {
        log.info(`Not charging for method: ${method}`);
    }
}
