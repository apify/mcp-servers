import { Actor, log } from 'apify';

export async function chargeMcpResponse(args: { method: string }): Promise<void> {
    await Actor.charge({ eventName: 'mcp-response' });
    log.info(`Charged for MCP response (method: ${args.method})`);
}