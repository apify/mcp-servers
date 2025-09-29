export type ToolName =
    | 'get_backlinks'
    | 'get_domain_info'
    | 'get_domain_emails'
    | 'get_playwright_mcp'
    | 'get_webpage_seo_analysis'
    | 'get_webpage_ai_analysis'
    | 'generate_wordpress_content'
    | 'generate_social_content'
    | 'get_moz_analysis'
    | 'get_keywords_search_volume'
    | 'get_keywords_suggestions'
    | 'get_long_tail_keywords'
    | 'get_serp_results'
    | 'get_serp_html'
    | 'get_serp_text'
    | 'get_serp_ai_mode'
    | 'check_page_indexation'
    | 'get_domain_ranking'
    | 'scrape_webpage'
    | 'scrape_domain'
    | 'scrape_webpage_js'
    | 'scrape_webpage_js_proxy'
    | 'get_user_info';

export type ChargeEventName =
    | 'get_backlinks'
    | 'get_domain_info'
    | 'get_domain_emails'
    | 'get_playwright_mcp'
    | 'get_webpage_seo_analysis'
    | 'get_webpage_ai_analysis'
    | 'generate_content'
    | 'get_moz_analysis'
    | 'get_keywords_search_volume'
    | 'get_keywords_suggestions'
    | 'get_long_tail_keywords'
    | 'get_serp_results'
    | 'get_serp_ai_mode'
    | 'check_page_indexation'
    | 'get_domain_ranking'
    | 'scrape_domain_or_webpage'
    | 'scrape_webpage_js'
    | 'scrape_webpage_js_proxy';

export type ChargeableRequest = {
    method?: string;
    params?: {
        name?: string;
    }
}
