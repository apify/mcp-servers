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
    """Event types for charging PubMed MCP operations."""

    ACTOR_START = "actor-start"
    SEARCH_PUBMED_KEYWORDS = "searchPubmedKeywords"
    SEARCH_PUBMED_ADVANCED = "searchPubmedAdvanced"
    GET_PUBMED_ARTICLE_METADATA = "getPubmedArticleMetadata"
    DOWNLOAD_PUBMED_PDF = "downloadPubmedPdf"
    DEEP_PAPER_ANALYSIS = "deepPaperAnalysis"


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
