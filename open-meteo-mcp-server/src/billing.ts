
import { Actor, log } from 'apify';
// PPE (Pay Per Event) mapping for Apify monetization
export const BILLABLE_EVENTS = {
    weather_forecast: { price: 0.0001 },
    weather_archive: { price: 0.0001 },
    air_quality: { price: 0.0001 },
    marine_weather: { price: 0.0001 },
    elevation: { price: 0.0001 },
    geocoding: { price: 0.0001 },
    dwd_icon_forecast: { price: 0.0001 },
    gfs_forecast: { price: 0.0001 },
    meteofrance_forecast: { price: 0.0001 },
    ecmwf_forecast: { price: 0.0001 },
    jma_forecast: { price: 0.0001 },
    metno_forecast: { price: 0.0001 },
    gem_forecast: { price: 0.0001 },
    flood_forecast: { price: 0.0001 },
    seasonal_forecast: { price: 0.0001 },
    climate_projection: { price: 0.0001 },
    ensemble_forecast: { price: 0.0001 }
};
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
export async function chargeMessageRequest(request: { method: string }): Promise<void> {
    const { method } = request;

    // See https://modelcontextprotocol.io/specification/2025-06-18/server for more details
    // on the method names and protocol messages
    // Charge for list requests (e.g., tools/list, resources/list, etc.)
    if (method.endsWith('/list')) {
        await Actor.charge({ eventName: 'list-request' });
        log.info(`Charged for list request: ${method}`);
    // Charge for tool-related requests
    } else if (method.startsWith('tools/')) {
        await Actor.charge({ eventName: 'tool-request' });
        log.info(`Charged for tool request: ${method}`);
    // Charge for resource-related requests
    } else if (method.startsWith('resources/')) {
        await Actor.charge({ eventName: 'resource-request' });
        log.info(`Charged for resource request: ${method}`);
    // Charge for prompt-related requests
    } else if (method.startsWith('prompts/')) {
        await Actor.charge({ eventName: 'prompt-request' });
        log.info(`Charged for prompt request: ${method}`);
    // Charge for completion-related requests
    } else if (method.startsWith('completion/')) {
        await Actor.charge({ eventName: 'completion-request' });
        log.info(`Charged for completion request: ${method}`);
    // Do not charge for other methods
    } else {
        log.info(`Not charging for method: ${method}`);
    }
}
