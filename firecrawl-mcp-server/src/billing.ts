import { Actor, log } from 'apify';

const FIRECRAWL_TOOL_USAGE_PRICE_USD = 0.001;

export async function chargeMcpResponse(args: { method: string }): Promise<void> {
    const { method } = args;

    if (method === 'tools/call') {
        await Actor.charge({ eventName: 'firecrawl-scraping-tool' });
        log.info(`Charged $${FIRECRAWL_TOOL_USAGE_PRICE_USD} for Firecrawl tool usage: ${method}`);
    } else {
        log.info(`Not charging for non-Firecrawl tool method: ${method}`);
    }
}