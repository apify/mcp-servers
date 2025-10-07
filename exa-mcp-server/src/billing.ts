/**
 * This module handles billing for different types of protocol requests in the MCP server.
 * It defines a function to charge users based on the type of protocol method invoked.
 */
import { Actor, log } from 'apify';

type MCPRequestParams = {
    name?: string;
    toolName?: string;
    tool?: { name?: string };
};

/**
 * Charges the user for a message request based on the method type.
 * Supported method types are mapped to specific billing events.
 *
 * @param request - The request object containing the method string.
 * @returns Promise<void>
 */
export async function chargeMessageRequest(request: { method: string; params?: MCPRequestParams }): Promise<void> {
    const { method } = request;

    // See https://modelcontextprotocol.io/specification/2025-06-18/server for more details
    // on the method names and protocol messages
    // Charge for list requests (e.g., tools/list, resources/list, etc.)
    if (method.endsWith('/list')) {
        const result = await Actor.charge({ eventName: 'list-request' });
        log.info(`Charged for list request: ${method}`);
        await handleChargeLimit(result);
        // Charge for tool-related requests
    } else if (method.startsWith('tools/')) {
        // Try to infer specific tool name from request params for better pricing transparency
    const toolName = request.params?.name ?? request.params?.toolName ?? request.params?.tool?.name ?? 'unknown';

        // Map Exa tools to specific events when recognized
        const exaToolToEvent: Record<string, string> = {
            get_code_context_exa: 'exa-get-code-context',
            web_search_exa: 'exa-web-search',
            company_research: 'exa-company-research',
            crawling: 'exa-crawling',
            crawling_exa: 'exa-crawling',
            linkedin_search: 'exa-linkedin-search',
            deep_researcher_start: 'exa-deep-research-start',
            deep_researcher_check: 'exa-deep-research-check',
        };
        const eventName = exaToolToEvent[toolName] || 'tool-request';
        const result = await Actor.charge({ eventName });
        log.info(`Charged for tool request: ${method} -> ${eventName} (tool=${toolName})`);
        await handleChargeLimit(result);
        // Charge for resource-related requests
    } else if (method.startsWith('resources/')) {
        const result = await Actor.charge({ eventName: 'resource-request' });
        log.info(`Charged for resource request: ${method}`);
        await handleChargeLimit(result);
        // Charge for prompt-related requests
    } else if (method.startsWith('prompts/')) {
        const result = await Actor.charge({ eventName: 'prompt-request' });
        log.info(`Charged for prompt request: ${method}`);
        await handleChargeLimit(result);
        // Charge for completion-related requests
    } else if (method.startsWith('completion/')) {
        const result = await Actor.charge({ eventName: 'completion-request' });
        log.info(`Charged for completion request: ${method}`);
        await handleChargeLimit(result);
        // Do not charge for other methods
    } else {
        log.info(`Not charging for method: ${method}`);
    }
}

// If the event or overall limit is reached, gracefully end the Actor.
async function handleChargeLimit(result: {
    eventChargeLimitReached?: boolean;
    chargeableWithinLimit?: Record<string, number>;
}) {
    // Only act on explicit eventChargeLimitReached to avoid false positives when PPE is disabled
    if (result.eventChargeLimitReached) {
        log.warning('Charging limit reached for this event. Finishing the Actor run.');
        await Actor.exit();
        return;
    }
    if (result.chargeableWithinLimit) {
        log.info('Chargeable within limit state', { chargeableWithinLimit: result.chargeableWithinLimit });
    }
}
