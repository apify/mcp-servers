import { Actor, log } from 'apify';

export async function chargeMessageRequest(args: { method: string }): Promise<void> {
    const { method } = args;

    await Actor.charge({ eventName: 'mcp-response' });
    log.info(`Charged for MCP response (method: ${method})`);
}