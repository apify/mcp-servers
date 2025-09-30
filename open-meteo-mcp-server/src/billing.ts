import { Actor, log } from 'apify';

const TOOL_PRICING: Record<string, { eventPriceUsd: number; eventTitle: string }> = {
    "actor-start": {
        eventPriceUsd: 0.1,
        eventTitle: "Price for Actor start",
    },
    "weather_forecast": {
        eventPriceUsd: 0.0001,
        eventTitle: "Weather forecast tool",
    },
    "weather_archive": {
        eventPriceUsd: 0.0001,
        eventTitle: "Weather archive tool",
    },
    "air_quality": {
        eventPriceUsd: 0.0001,
        eventTitle: "Air quality tool",
    },
    "marine_weather": {
        eventPriceUsd: 0.0001,
        eventTitle: "Marine weather tool",
    },
    "elevation": {
        eventPriceUsd: 0.0001,
        eventTitle: "Elevation tool",
    },
    "geocoding": {
        eventPriceUsd: 0.0001,
        eventTitle: "Geocoding tool",
    },
    "dwd_icon_forecast": {
        eventPriceUsd: 0.0001,
        eventTitle: "DWD ICON forecast tool",
    },
    "gfs_forecast": {
        eventPriceUsd: 0.0001,
        eventTitle: "NOAA GFS forecast tool",
    },
    "meteofrance_forecast": {
        eventPriceUsd: 0.0001,
        eventTitle: "Météo-France forecast tool",
    },
    "ecmwf_forecast": {
        eventPriceUsd: 0.0001,
        eventTitle: "ECMWF forecast tool",
    },
    "jma_forecast": {
        eventPriceUsd: 0.0001,
        eventTitle: "JMA forecast tool",
    },
    "metno_forecast": {
        eventPriceUsd: 0.0001,
        eventTitle: "MET Norway forecast tool",
    },
    "gem_forecast": {
        eventPriceUsd: 0.0001,
        eventTitle: "Environment Canada GEM forecast tool",
    },
    "flood_forecast": {
        eventPriceUsd: 0.0001,
        eventTitle: "Flood forecast tool",
    },
    "seasonal_forecast": {
        eventPriceUsd: 0.0001,
        eventTitle: "Seasonal forecast tool",
    },
    "climate_projection": {
        eventPriceUsd: 0.0001,
        eventTitle: "Climate projection tool",
    },
    "ensemble_forecast": {
        eventPriceUsd: 0.0001,
        eventTitle: "Ensemble forecast tool",
    }
};
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
        if (TOOL_PRICING[toolName]) {
            await Actor.charge({ eventName: toolName });
            const event = TOOL_PRICING[toolName];
            log.info(`Charged for tool call: ${toolName} ($${event.eventPriceUsd}) - ${event.eventTitle}`);
        } else {
            await Actor.charge({ eventName: 'tool-call' });
            log.info(`Charged for tool call (unknown tool): ${toolName}`);
        }
    } else if (TOOL_PRICING[method]) {
        await Actor.charge({ eventName: method });
        const event = TOOL_PRICING[method];
        log.info(`Charged for event: ${method} ($${event.eventPriceUsd}) - ${event.eventTitle}`);
    } else {
        log.info(`Not charging for method: ${method}`);
    }
}
