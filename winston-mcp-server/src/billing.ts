// src/billing.ts
import { Actor, log } from 'apify';

// Based on tier 3,000,000 credits for 150 EUR
export const EVENT_PRICING = {
    'winston-ai-credits-consumed': { price: 0.000058, currency: 'USD', unit: 'credit' },
    'tool-request': { price: 0.0005, currency: 'USD', unit: 'call' },
};

// Try to extract an integer credits_used from any embedded JSON in a text block
function extractCreditsUsedFromContent(response: any): number | undefined {
    try {
        const content = response?.content;
        if (!Array.isArray(content)) return undefined;

        const text = content.find((c: any) => c && c.type === 'text')?.text;
        if (typeof text !== 'string') return undefined;

        // Look for a JSON object inside the text. The text looks like a pretty-printed string.
        // Find the first '{' and last '}' and try to parse that slice.
        const start = text.indexOf('{');
        const end = text.lastIndexOf('}');
        if (start === -1 || end === -1 || end <= start) return undefined;

        const jsonSlice = text.slice(start, end + 1);
        const parsed = JSON.parse(jsonSlice);

        const cu = parsed?.credits_used;
        if (typeof cu === 'number' && Number.isFinite(cu) && cu >= 0) return cu;
    } catch {
        // ignore parse errors
    }
    return undefined;
}

/**
 * Apply charges based on a Winston AI MCP client-style response.
 * This function MUST be called only for tool executions (tools/call).
 * It can handle either:
 * - A wrapped content response with text containing JSON including "credits_used"
 * - A generic/errored/malformed response (fallback billed once)
 */
export async function chargeEvent(response: any): Promise<void> {
    // Explicitly avoid ever billing tools/list or any non-tool method
    const method = response?.method;
    if (method === 'tools/list') {
        log.info('Skipping charge for tools/list.');
        return;
    }

    // If we got an LLM-style wrapped response, try extracting credits_used from content[].text
    const creditsFromContent = extractCreditsUsedFromContent(response);
    if (typeof creditsFromContent === 'number') {
        if (creditsFromContent > 0) {
            await Actor.charge({ eventName: 'winston-ai-credits-consumed', count: creditsFromContent });
            log.info(`Charged Winston AI credits via content parse (creditCount: ${creditsFromContent}, price: ${EVENT_PRICING['winston-ai-credits-consumed'].price * creditsFromContent})`);
            return;
        }
        // credits_used = 0 => no charge
        log.info('credits_used = 0 (from content parse). No charge applied.');
        return;
    }

    // Fallback: bill a single tool-request only for tool executions.
    if (method === 'tools/call') {
        await Actor.charge({ eventName: 'tool-request', count: 1 });
        log.warning(
            `Missing/invalid credits_used for tools/call. Applied fallback 'tool-request' charge (count: 1, price: ${EVENT_PRICING["tool-request"].price}).`
        , response);
        return;
    }

    // Otherwise do not charge
    log.info(`No charge applied (method: ${method || 'unknown'})`);
}
