// src/billing.ts
import { Actor, log } from 'apify';

/**
 * @param request - The request object containing the method string and optional params.
 * @returns Promise<void>
 */
export async function chargeMessageRequest(request: { method: string; params?: any }): Promise<void> {
    const { method, params } = request;

    // Charge for specific Explorium MCP Server tools
    if (method === 'tools/call' && params?.name) {
        const toolName = params.name;
        switch (toolName) {
            case 'match-business':
            case 'fetch-businesses':
            case 'fetch-businesses-statistics':
            case 'fetch-businesses-events':
            case 'match-prospects':
            case 'fetch-prospects':
            case 'fetch-prospects-events':
            case 'fetch-prospects-statistics':
            case 'enrich-prospects':
            case 'autocomplete':
            case 'web-search':
                await Actor.charge({ eventName: toolName });
                log.info(`Charged for Explorium tool: ${toolName}`);
                return;
            default:
                // Fallback for any unknown specific tool not explicitly listed above
                log.info(`Unknown tool called, falling back to generic tool charge: ${toolName}`);
                await Actor.charge({ eventName: 'tool-request' });
                return;
        }
    }

    // Do not charge for list requests (e.g., tools/list, resources/list, etc.)
    // Charge for other generic tool-related requests (fallback for non-'tools/call' methods like 'tools/info')
    if (method.startsWith('tools/') && !method.endsWith('/list')) {
        await Actor.charge({ eventName: 'tool-request' });
        log.info(`Charged for generic tool request: ${method}`);
        // Do not charge for other methods (e.g., 'server/info', 'server/version')
    } else {
        log.info(`Not charging for method: ${method}`);
    }
}
