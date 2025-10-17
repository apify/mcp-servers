from enum import Enum

SESSION_TIMEOUT_SECS = 300  # 5 minutes


class ChargeEvents(str, Enum):
    """Event types for charging MCP operations for OSP MCP server.

    These events are used to charge users for different types of MCP operations
    when running as an Apify Actor. Each event corresponds to a specific operation
    that can be charged for.

    The OSP server includes both generic MCP operations and specific OSP operations
    for marketing tools and content generation.
    """

    # Generic MCP operations (can be used for any MCP server)
    TOOL_CALL = 'tool-call'

    # OSP-specific operations for marketing tools
    GENERATE_VALUE_MAP = 'generate-value-map'
    GENERATE_META_INFO = 'generate-meta-info'
    EDIT_CONTENT = 'edit-content'
    WRITE_TECHNICAL_GUIDE = 'write-technical-guide'
    SEO_GUIDE = 'seo-guide'


# Tool whitelist for OSP MCP server
# Only tools listed here will be present to the user and allowed to execute.
# Format of the dictionary: {tool_name: (charge_event_name, default_count)}
# To add new authorized tools, add an entry with the tool name and its charging configuration.
TOOL_WHITELIST = {
    'get_value_map_positioning_guide': (ChargeEvents.GENERATE_VALUE_MAP.value, 1),
    'get_meta_guide': (ChargeEvents.GENERATE_META_INFO.value, 1),
    'get_editing_codes': (ChargeEvents.EDIT_CONTENT.value, 1),
    'get_writing_guide': (ChargeEvents.WRITE_TECHNICAL_GUIDE.value, 1),
    'get_on_page_seo_guide': (ChargeEvents.SEO_GUIDE.value, 1),
}
