import { Actor, log } from 'apify';

const BRAVE_TOOL_USAGE_PRICE_USD = 0.05;

export async function chargeMcpResponse(args: { method: string }): Promise<void> {
    const { method } = args;

    // Charge ONLY if the method corresponds to a Brave search tool
    if (method === 'tool/brave_web_search' || method === 'tool/brave_local_search' || method === 'tools/call') {
        await Actor.charge({ eventName: 'brave-tool-usage' });
        log.info(`Charged $${BRAVE_TOOL_USAGE_PRICE_USD} for Brave tool usage: ${method}`);
    } else {
        log.info(`Not charging for non-Brave tool method: ${method}`);
    }
}