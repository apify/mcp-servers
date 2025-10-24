from enum import Enum

SESSION_TIMEOUT_SECS = 300  # 5 minutes


class ChargeEvents(str, Enum):
    """Event types for charging MCP operations (time-mcp-server)."""

    # Generic MCP operations
    TOOL_CALL = 'tool-call'
    TOOL_LIST = 'tool-list'

    # Time MCP-specific events
    GET_CURRENT_TIME = 'get_current_time'
    CONVERT_TIME = 'convert_time'


# Tool whitelist for MCP server
# Only tools listed here will be present to the user and allowed to execute.
# Format of the dictionary: {tool_name: (charge_event_name, default_count)}
# To add new authorized tools, add an entry with the tool name and its charging configuration.
TOOL_WHITELIST = {
    ChargeEvents.GET_CURRENT_TIME.value: (ChargeEvents.GET_CURRENT_TIME.value, 1),
    ChargeEvents.CONVERT_TIME.value: (ChargeEvents.CONVERT_TIME.value, 1),
}

# PPE (Pay Per Event) mapping for Apify monetization
BILLABLE_EVENTS = {
    'get_current_time': {'price': 0.0005},
    'convert_time': {'price': 0.0005},
}
