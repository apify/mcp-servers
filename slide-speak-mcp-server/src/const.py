from enum import Enum


class ChargeEvents(str, Enum):
    """Event types for charging MCP operations.

    These events are used to charge users for different types of MCP operations
    when running as an Apify Actor. Each event corresponds to a specific operation
    that can be charged for.
    """

    ACTOR_START = 'actor-start'
    GET_TEMPLATES = 'get-templates'
    GENERATE_SLIDE = 'generate-slide'