/**
 * This module handles billing for different types of protocol requests in the MCP server.
 * It defines a function to charge users based on the type of protocol method invoked.
 */
import { Actor, log } from 'apify';

import type { ChargeableRequest, ChargeEventName, ToolName } from './types.js';

const TOOL_TO_EVENT_NAME_MAP: Record<ToolName, ChargeEventName | undefined> = {
    get_backlinks: 'get_backlinks',
    get_domain_info: 'get_domain_info',
    get_domain_emails: 'get_domain_emails',
    get_playwright_mcp: 'get_playwright_mcp',
    get_webpage_seo_analysis: 'get_webpage_seo_analysis',
    get_webpage_ai_analysis: 'get_webpage_ai_analysis',
    generate_wordpress_content: 'generate_content',
    generate_social_content: 'generate_content',
    get_moz_analysis: 'get_moz_analysis',
    get_keywords_search_volume: 'get_keywords_search_volume',
    get_keywords_suggestions: 'get_keywords_suggestions',
    get_long_tail_keywords: 'get_long_tail_keywords',
    get_serp_results: 'get_serp_results',
    get_serp_html: 'get_serp_results',
    get_serp_text: 'get_serp_results',
    get_serp_ai_mode: 'get_serp_ai_mode',
    check_page_indexation: 'check_page_indexation',
    get_domain_ranking: 'get_domain_ranking',
    scrape_webpage: 'scrape_domain_or_webpage',
    scrape_domain: 'scrape_domain_or_webpage',
    scrape_webpage_js: 'scrape_webpage_js',
    scrape_webpage_js_proxy: 'scrape_webpage_js_proxy',
    get_user_info: undefined,
};

/**
 * Charges the user for a message request based on the method type.
 * Supported method types are mapped to specific billing events.
 *
 * @param request - The request object containing the method string.
 * @returns Promise<void>
 */
export async function chargeMessageRequest(request: ChargeableRequest): Promise<void> {
    const { method, params } = request
    const name = params?.name;

    if (!method) {
        log.warning('No method provided in the request, cannot charge.');
        return;
    }

    if (name) {
        const chargeEventName = TOOL_TO_EVENT_NAME_MAP[name as ToolName];

        if (chargeEventName) {
            await Actor.charge({ eventName: chargeEventName });
            log.info(`Charged for tool: ${name}`);
        } else {
            log.info(`Not charging for tool: ${name}`);
        }
    } else {
        log.warning(`Not charging for method: ${method}`)
    }
}
