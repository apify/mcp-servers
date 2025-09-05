from enum import Enum


class ChargeEvents(str, Enum):
    """Event types for charging MCP operations.

    These events are used to charge users for different types of MCP operations
    when running as an Apify Actor. Each event corresponds to a specific operation
    that can be charged for.

    The template includes both generic MCP operations and specific weather operations
    for the weather MCP server.
    """

    # Generic MCP operations (can be used for any MCP server)
    ACTOR_START = 'actor-start'
    RESOURCE_READ = 'resource-read'
    TOOL_LIST = 'tool-list'
    PROMPT_GET = 'prompt-get'
    TOOL_CALL = 'tool-call'

    # Weather-specific operations
    GET_CURRENT_WEATHER = 'get_current_weather'
    GET_WEATHER_BY_DATETIME_RANGE = 'get_weather_by_datetime_range'
    GET_CURRENT_DATETIME = 'get_current_datetime'


# Authorized tools list for MCP server
# Only tools listed here will be allowed to execute.
# To add new authorized tools, simply add the tool value to this list.
AUTHORIZED_TOOLS = [
    ChargeEvents.GET_CURRENT_WEATHER.value,
    # ChargeEvents.GET_WEATHER_BY_DATETIME_RANGE.value,
    # ChargeEvents.GET_CURRENT_DATETIME.value,
]


# Helper function to get ChargeEvents enum from tool name
def get_charge_event(tool_name: str) -> ChargeEvents | None:
    """Get the ChargeEvents enum member from a tool name string."""
    for event in ChargeEvents:
        if event.value == tool_name:
            return event
    return None
