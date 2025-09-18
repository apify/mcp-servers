# Pay-per-event (PPE) mapping for Apify monetization
from enum import Enum

PPE_EVENT_MAP = {
    "search_pubmed_key_words": "searchPubmedKeywords",
    "search_pubmed_advanced": "searchPubmedAdvanced",
    "get_pubmed_article_metadata": "getPubmedArticleMetadata",
    "download_pubmed_pdf": "downloadPubmedPdf",
    "deep_paper_analysis": "deepPaperAnalysis",
}


class ChargeEvents(str, Enum):
    """Event types for charging MCP operations.

    These events are used to charge users for different types of MCP operations
    when running as an Apify Actor. Each event corresponds to a specific operation
    that can be charged for.

    The template includes both generic MCP operations and specific arXiv operations
    as examples. You can customize these events based on your specific MCP server needs.
    """

    # Generic MCP operations (can be used for any MCP server)
    ACTOR_START = "actor-start"
    RESOURCE_READ = "resource-read"
    TOOL_LIST = "tool-list"
    PROMPT_GET = "prompt-get"
    TOOL_CALL = "tool-call"

    # arXiv-specific operations (example for domain-specific charging)
    SEARCH_PAPERS = "search_papers"
    LIST_PAPERS = "list_papers"
    DOWNLOAD_PAPER = "download_paper"
    READ_PAPER = "read_paper"


# Tool whitelist for MCP server
# Only tools listed here will be present to the user and allowed to execute.
# Format of the dictionary: {tool_name: (charge_event_name, default_count)}
# To add new authorized tools, add an entry with the tool name and its charging configuration.
TOOL_WHITELIST = {
    "search_pubmed_key_words": ("search_pubmed_key_words", 1),
    "search_pubmed_advanced": ("search_pubmed_advanced", 1),
    "get_pubmed_article_metadata": ("get_pubmed_article_metadata", 1),
    "download_pubmed_pdf": ("download_pubmed_pdf", 1),
    "deep_paper_analysis": ("deep_paper_analysis", 1),
}
