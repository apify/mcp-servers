from enum import Enum


class ChargeEvents(str, Enum):
    """Event types for charging MCP operations.

    These events are used to charge users for different types of MCP operations
    when running as an Apify Actor. Each event corresponds to a specific operation
    that can be charged for.

    The template includes both generic MCP operations and specific arXiv operations
    as examples. You can customize these events based on your specific MCP server needs.
    """

    # Generic MCP operations (can be used for any MCP server)
    ACTOR_START = 'actor-start'
    RESOURCE_READ = 'resource-read'
    TOOL_LIST = 'tool-list'
    PROMPT_GET = 'prompt-get'
    TOOL_CALL = 'tool-call'

    # Financial Datasets-specific operations
    GET_INCOME_STATEMENTS = 'get_income_statements'
    GET_BALANCE_SHEETS = 'get_balance_sheets'
    GET_CASH_FLOW_STATEMENTS = 'get_cash_flow_statements'
    GET_CURRENT_STOCK_PRICE = 'get_current_stock_price'
    GET_HISTORICAL_STOCK_PRICES = 'get_historical_stock_prices'
    GET_COMPANY_NEWS = 'get_company_news'
    GET_AVAILABLE_CRYPTO_TICKERS = 'get_available_crypto_tickers'
    GET_CRYPTO_PRICES = 'get_crypto_prices'
    GET_HISTORICAL_CRYPTO_PRICES = 'get_historical_crypto_prices'
    GET_CURRENT_CRYPTO_PRICE = 'get_current_crypto_price'


# Tool whitelist for MCP server
# Only tools listed here will be present to the user and allowed to execute.
# Format of the dictionary: {tool_name: (charge_event_name, default_count)}
# To add new authorized tools, add an entry with the tool name and its charging configuration.
TOOL_WHITELIST = {
    ChargeEvents.GET_INCOME_STATEMENTS.value: (ChargeEvents.GET_INCOME_STATEMENTS.value, 1),
    ChargeEvents.GET_BALANCE_SHEETS.value: (ChargeEvents.GET_BALANCE_SHEETS.value, 1),
    ChargeEvents.GET_CASH_FLOW_STATEMENTS.value: (ChargeEvents.GET_CASH_FLOW_STATEMENTS.value, 1),
    ChargeEvents.GET_CURRENT_STOCK_PRICE.value: (ChargeEvents.GET_CURRENT_STOCK_PRICE.value, 1),
    ChargeEvents.GET_HISTORICAL_STOCK_PRICES.value: (ChargeEvents.GET_HISTORICAL_STOCK_PRICES.value, 1),
    ChargeEvents.GET_COMPANY_NEWS.value: (ChargeEvents.GET_COMPANY_NEWS.value, 1),
    ChargeEvents.GET_AVAILABLE_CRYPTO_TICKERS.value: (ChargeEvents.GET_AVAILABLE_CRYPTO_TICKERS.value, 1),
    ChargeEvents.GET_CRYPTO_PRICES.value: (ChargeEvents.GET_CRYPTO_PRICES.value, 1),
    ChargeEvents.GET_HISTORICAL_CRYPTO_PRICES.value: (ChargeEvents.GET_HISTORICAL_CRYPTO_PRICES.value, 1),
    ChargeEvents.GET_CURRENT_CRYPTO_PRICE.value: (ChargeEvents.GET_CURRENT_CRYPTO_PRICE.value, 1),
}
