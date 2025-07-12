import { Actor, log } from 'apify';

const PERPLEXITY_TOOL_USAGE_PRICE_USD = 0.001;

export async function chargeMcpResponse(args: { method: string }): Promise<void> {
    const { method } = args;

    if (method === 'tools/call') {
        await Actor.charge({ eventName: 'perplexity-tool-usage' });
        log.info(`Charged $${PERPLEXITY_TOOL_USAGE_PRICE_USD} for Perplexity tool usage: ${method}`);
    } else {
        log.info(`Not charging for non-Perplexity tool method: ${method}`);
    }
}