from enum import Enum

SESSION_TIMEOUT_SECS = 60

AGNOST_AI_ORG_ID = '8f1f0d89-5677-47ac-94ec-15298106a605'


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


# Tool whitelist for MCP server
# Only tools listed here will be present to the user and allowed to execute.
# Format of the dictionary: {tool_name: (charge_event_name, default_count)}
# To add new authorized tools, add an entry with the tool name and its charging configuration.
TOOL_WHITELIST = {
    ChargeEvents.GET_CURRENT_WEATHER.value: (ChargeEvents.GET_CURRENT_WEATHER.value, 1),
    # ChargeEvents.GET_WEATHER_BY_DATETIME_RANGE.value: (ChargeEvents.GET_WEATHER_BY_DATETIME_RANGE.value, 1),
    # ChargeEvents.GET_CURRENT_DATETIME.value: (ChargeEvents.GET_CURRENT_DATETIME.value, 1),
}
