from enum import Enum

SESSION_TIMEOUT_SECS = 300  # 5 minutes


class ChargeEvents(str, Enum):
    """Event types for charging MCP operations for Wikipedia MCP server."""

    # Generic MCP operations
    TOOL_CALL = 'tool-call'

    # Wikipedia MCP tool events
    SEARCH_WIKIPEDIA = 'search_wikipedia'
    GET_ARTICLE = 'get_article'
    GET_SUMMARY = 'get_summary'
    GET_SECTIONS = 'get_sections'
    GET_LINKS = 'get_links'
    GET_RELATED_TOPICS = 'get_related_topics'
    SUMMARIZE_ARTICLE_FOR_QUERY = 'summarize_article_for_query'
    SUMMARIZE_ARTICLE_SECTION = 'summarize_article_section'
    EXTRACT_KEY_FACTS = 'extract_key_facts'


# Tool whitelist for MCP server
# Only tools listed here will be present to the user and allowed to execute.
# Format of the dictionary: {tool_name: (charge_event_name, default_count)}
# To add new authorized tools, add an entry with the tool name and its charging configuration.
TOOL_WHITELIST = {
    ChargeEvents.SEARCH_WIKIPEDIA.value: (ChargeEvents.SEARCH_WIKIPEDIA.value, 1),
    ChargeEvents.GET_ARTICLE.value: (ChargeEvents.GET_ARTICLE.value, 1),
    ChargeEvents.GET_SUMMARY.value: (ChargeEvents.GET_SUMMARY.value, 1),
    ChargeEvents.GET_SECTIONS.value: (ChargeEvents.GET_SECTIONS.value, 1),
    ChargeEvents.GET_LINKS.value: (ChargeEvents.GET_LINKS.value, 1),
    ChargeEvents.GET_RELATED_TOPICS.value: (ChargeEvents.GET_RELATED_TOPICS.value, 1),
    ChargeEvents.SUMMARIZE_ARTICLE_FOR_QUERY.value: (ChargeEvents.SUMMARIZE_ARTICLE_FOR_QUERY.value, 1),
    ChargeEvents.SUMMARIZE_ARTICLE_SECTION.value: (ChargeEvents.SUMMARIZE_ARTICLE_SECTION.value, 1),
    ChargeEvents.EXTRACT_KEY_FACTS.value: (ChargeEvents.EXTRACT_KEY_FACTS.value, 1),
}
