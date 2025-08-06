import { Actor, log } from 'apify';

const PERPLEXITY_REQUEST_PRICE_USD = 0.001;

interface McpToolCallRequest {
    method: string;
    params?: {
        name?: string;
    };
}

/**
 * Validates that the requested tool is allowed and charges for it.
 * Throws an error if an unauthorized tool is requested.
 */
export async function validateAndChargeMcpResponse(request: McpToolCallRequest): Promise<void> {
    const { method, params } = request;

    if (method === 'tools/call') {
        const toolName = params?.name;

        // Check if the requested tool is the one we allow and charge for. We can add more tools here as needed.
        if (toolName === 'perplexity_ask') {
            await Actor.charge({ eventName: 'perplexity-ask' });
            log.info(`Charged $${PERPLEXITY_REQUEST_PRICE_USD} for authorized tool call: ${toolName}`);
        } else {
            // If the tool is unknown or not allowed, throw an error to block it
            log.error(`Blocking unauthorized tool call for: ${toolName || 'unknown tool'}`);
            throw new Error(`The requested tool '${toolName || 'unknown'}' is not authorized.`);
        }
    } else {
        log.info(`Not a tool call, skipping charge for method: ${method}`);
    }
}
