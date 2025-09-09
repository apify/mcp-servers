from enum import Enum


class ChargeEvents(str, Enum):
    """Event types for charging MCP operations.

    These events are used to charge users for different types of MCP operations
    when running as an Apify Actor. Each event corresponds to a specific operation
    that can be charged for.

    The template includes both generic MCP operations and specific Kiwi operations
    as examples. You can customize these events based on your specific MCP server needs.
    """

    # Generic MCP operations (can be used for any MCP server)
    ACTOR_START = 'actor-start'
    RESOURCE_READ = 'resource-read'
    PROMPT_GET = 'prompt-get'
    TOOL_CALL = 'tool-call'

    # Kiwi-specific operations (domain-specific charging)
    SEARCH_FLIGHT = 'search-flight'


# Tool whitelist for MCP server
# Only tools listed here will be present to the user and allowed to execute.
# Format of the dictionary: {tool_name: (charge_event_name, default_count)}
# To add new authorized tools, add an entry with the tool name and its charging configuration.
TOOL_WHITELIST = {
    ChargeEvents.SEARCH_FLIGHT.value: (ChargeEvents.SEARCH_FLIGHT.value, 1),
}
