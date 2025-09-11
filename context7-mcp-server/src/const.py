from enum import Enum


class ChargeEvents(str, Enum):
    """Event types for charging MCP operations.

    These events are used to charge users for different types of MCP operations
    when running as an Apify Actor. Each event corresponds to a specific operation
    that can be charged for.

    The template includes both generic MCP operations and specific Context7 operations
    as examples. You can customize these events based on your specific MCP server needs.
    """

    # Generic MCP operations (can be used for any MCP server)
    ACTOR_START = 'actor-start'
    TOOL_CALL = 'tool-call'

    # Context7-specific operations (example for domain-specific charging)
    RESOLVE_LIBRARY_ID = 'resolve-library-id'
    GET_LIBRARY_DOCS = 'get-library-docs'


# Tool whitelist for MCP server
# Only tools listed here will be present to the user and allowed to execute.
# Format of the dictionary: {tool_name: (charge_event_name, default_count)}
# To add new authorized tools, add an entry with the tool name and its charging configuration.
TOOL_WHITELIST = {
    ChargeEvents.RESOLVE_LIBRARY_ID.value: (ChargeEvents.RESOLVE_LIBRARY_ID.value, 1),
    ChargeEvents.GET_LIBRARY_DOCS.value: (ChargeEvents.GET_LIBRARY_DOCS.value, 1),
}
