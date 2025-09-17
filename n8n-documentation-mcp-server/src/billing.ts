import { Actor, log } from 'apify';

const TOOL_USAGE_PRICE_USD = 0.001;

export async function chargeMcpResponse(args: { method: string }): Promise<void> {
    const { method } = args;

    // Charge ONLY if the method corresponds to a tool call
    if (method === 'tools/call') {
        await Actor.charge({ eventName: 'n8n-documentation-tool-usage' });
        log.info(`Charged $${TOOL_USAGE_PRICE_USD} for tool usage: ${method}`);
    } else {
        log.info(`Not charging for non-tool-call method: ${method}`);
    }
}