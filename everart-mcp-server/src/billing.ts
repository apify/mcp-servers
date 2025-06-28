import { Actor, log } from 'apify';

export async function chargeMessageRequest(args: { method: string }): Promise<void> {
    const { method } = args;

    if (method === 'tool/generate_image') {
        await Actor.charge({ eventName: 'image-generation-tool' });
        log.info(`Charged for image generation tool: ${method}`);
    } else {
        log.info(`MCP method "${method}" is not the "tool/generate_image" method. No charge applied.`);
    }
}