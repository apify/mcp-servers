/**
 * This module handles billing for different types of protocol requests in the MCP server.
 * It defines a function to charge users based on the type of protocol method invoked.
 */
import { Actor, log } from 'apify';

const TOOLS = {
    LIST_TOOLS: 'list-tools',
    GET_SOURCE_LANGUAGES: 'get-source-languages',
    GET_TARGET_LANGUAGES: 'get-target-languages',
    GET_WRITING_STYLE_GUIDES: 'get-writing-style-guides',
    TRANSLATE_TEXT: 'translate-text',
    REPHRASE_TEXT: 'rephrase-text',
} as const;

/**
 * Charges the user for a message request based on the method type.
 * Supported method types are mapped to specific billing events.
 *
 * @param request - The request object containing the method string.
 * @returns Promise<void>
 */
export async function chargeMessageRequest(request: { method: string, params?: { name?: typeof TOOLS[keyof typeof TOOLS]} }): Promise<void> {
    const { method, params } = request;
    const { name } = params || {};

    if (name) {
        // Charge for the specific tool
        await Actor.charge({ eventName: name });
        log.info(`Charged for tool: ${name}`);
    } else if (method === 'tools/list') {
        // Charge for listing tools
        await Actor.charge({ eventName: TOOLS.LIST_TOOLS });
        log.info(`Charged for tool: ${TOOLS.LIST_TOOLS}`);
    } else {
        log.warning(`No charge applied. Unrecognized tool name in method: ${method}`);
    }
}
