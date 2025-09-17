from enum import Enum


class ChargeEvents(str, Enum):
    """Event types for charging MCP operations for OSP MCP server."""

    # Generic MCP events used by the gateway
    ACTOR_START = "actor-start"
    TOOL_LIST = "tool-list"
    TOOL_CALL = "tool-call"
    RESOURCE_LIST = "resource-list"
    RESOURCE_READ = "resource-read"
    PROMPT_LIST = "prompt-list"
    PROMPT_GET = "prompt-get"

    # Domain-specific events for OSP
    GENERATE_VALUE_MAP = "generate-value-map"
    GENERATE_META_INFO = "generate-meta-info"
    EDIT_CONTENT = "edit-content"
    WRITE_TECHNICAL_GUIDE = "write-technical-guide"
    SEO_GUIDE = "seo-guide"


# Tool whitelist for OSP MCP server (must match actual tool names in the MCP server)
TOOL_WHITELIST = {
    "get_value_map_positioning_guide": (ChargeEvents.GENERATE_VALUE_MAP.value, 1),
    "get_meta_guide": (ChargeEvents.GENERATE_META_INFO.value, 1),
    "get_editing_codes": (ChargeEvents.EDIT_CONTENT.value, 1),
    "get_writing_guide": (ChargeEvents.WRITE_TECHNICAL_GUIDE.value, 1),
    "get_on_page_seo_guide": (ChargeEvents.SEO_GUIDE.value, 1),
}
