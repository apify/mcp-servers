import { Actor, log } from 'apify';

// Make sure to change the price in the pay_per_event.json too
// if you change the const
const LARA_TOOL_USAGE_PRICE_USD = 0.01;

export async function chargeMcpResponse(args: {
    method: string;
    params?: {
        name: string;
    };
}): Promise<void> {
    const { method, params } = args;
    const toolName = params?.name;

    if (method === 'tools/call') {
        if (toolName === 'translate') {
            await Actor.charge({ eventName: 'lara-tool-usage' });
            log.info(`Charged $${LARA_TOOL_USAGE_PRICE_USD} for Lara tool usage: ${toolName}`);
        }
    } else {
        log.info(`Not charging for non-Lara tool method: ${method}`);
    }
}
