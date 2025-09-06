from enum import Enum


class ChargeEvents(str, Enum):
    """Event types for charging MCP operations.

    These events are used to charge users for different types of MCP operations
    when running as an Apify Actor. Each event corresponds to a specific operation
    that can be charged for.

    The template includes both generic MCP operations and specific SlideSpeak operations
    as examples. You can customize these events based on your specific MCP server needs.
    """

    # Generic MCP operations (can be used for any MCP server)
    ACTOR_START = 'actor-start'
    RESOURCE_READ = 'resource-read'
    TOOL_LIST = 'tool-list'
    PROMPT_GET = 'prompt-get'
    TOOL_CALL = 'tool-call'

    # SlideSpeak-specific operations (example for domain-specific charging)
    GET_TEMPLATES = 'get-templates'
    GENERATE_SLIDE = 'generate-slide'
    GENERATE_SLIDE_BY_SLIDE = 'generate-slide-by-slide'
    GET_TASK_STATUS = 'get-task-status'


# Authorized tools list for MCP server
# Only tools listed here will be allowed to execute.
# To add new authorized tools, simply add the tool value to this list.
AUTHORIZED_TOOLS = [
    'generatePowerpoint',
    'getAvailableTemplates',
    'generateSlideBySlide',
    'getTaskStatus',
]

# Helper function to get ChargeEvents enum from tool name
def get_charge_event(tool_name: str) -> ChargeEvents | None:
    """Get the ChargeEvents enum member from a tool name string."""
    # Map tool names to charge events
    tool_to_event = {
        'generatePowerpoint': ChargeEvents.GENERATE_SLIDE,
        'getAvailableTemplates': ChargeEvents.GET_TEMPLATES,
        'generateSlideBySlide': ChargeEvents.GENERATE_SLIDE_BY_SLIDE,
        'getTaskStatus': ChargeEvents.GET_TASK_STATUS,
    }
    return tool_to_event.get(tool_name)
#