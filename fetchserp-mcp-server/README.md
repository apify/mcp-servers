## FetchSERP MCP Server

A Model Context Protocol (MCP) server that exposes the FetchSERP API for SEO, SERP analysis, web scraping, and keyword research.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com)..

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--fetchserp-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "playwright": {
      "url": "https://mcp-servers--fetchserp-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## 🚩 Claim this MCP server
All credits to the original authors of [https://github.com/fetchSERP/fetchserp-mcp-server-node#seo--analysis](https://github.com/fetchSERP/fetchserp-mcp-server-node#seo--analysis)
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

## Features

This MCP server provides access to all FetchSERP API endpoints:

### SEO & Analysis
- **Domain Analysis**: Get backlinks, domain info (DNS, WHOIS, SSL, tech stack)
- **Keyword Research**: Search volume, suggestions, long-tail keyword generation
- **SEO Analysis**: Comprehensive webpage SEO analysis
- **AI Analysis**: AI-powered webpage analysis with custom prompts
- **Moz Integration**: Domain authority and Moz metrics

### SERP & Search
- **Search Results**: Get SERP results from Google, Bing, Yahoo, DuckDuckGo
- **AI Overview**: Google's AI overview with JavaScript rendering
- **Enhanced Results**: SERP with HTML or text content
- **Ranking Check**: Domain ranking for specific keywords
- **Indexation Check**: Verify if pages are indexed

### Web Scraping
- **Basic Scraping**: Scrape webpages without JavaScript
- **JS Scraping**: Execute custom JavaScript on pages
- **Proxy Scraping**: Scrape with country-specific proxies
- **Domain Scraping**: Scrape multiple pages from a domain

## Available Tools

### Domain & SEO Analysis

#### `get_backlinks`
Get backlinks for a domain
- **domain** (required): Target domain
- **search_engine**: google, bing, yahoo, duckduckgo (default: google)
- **country**: Country code (default: us)
- **pages_number**: Pages to search 1-30 (default: 15)

#### `get_domain_info`
Get comprehensive domain information
- **domain** (required): Target domain

#### `get_domain_emails`
Extract emails from a domain
- **domain** (required): Target domain
- **search_engine**: Search engine (default: google)
- **country**: Country code (default: us)
- **pages_number**: Pages to search 1-30 (default: 1)

#### `get_playwright_mcp`
Use GPT-4.1 to remote control a browser via a Playwright MCP server
- **prompt** (required): The prompt to use for remote control of the browser

*This endpoint uses GPT-4.1 to remote control a browser via a Playwright MCP server.*

#### `get_webpage_seo_analysis`
Comprehensive SEO analysis of a webpage
- **url** (required): URL to analyze

#### `get_webpage_ai_analysis`
AI-powered webpage analysis
- **url** (required): URL to analyze
- **prompt** (required): Analysis prompt

#### `generate_wordpress_content`
Generate WordPress content using AI with customizable prompts and models
- **user_prompt** (required): The user prompt
- **system_prompt** (required): The system prompt
- **ai_model**: The AI model (default: gpt-4.1-nano)

*Generates SEO-optimized WordPress content including title and content (800-1500 words) with keyword targeting in the first 100 words.*

#### `generate_social_content`
Generate social media content using AI with customizable prompts and models
- **user_prompt** (required): The user prompt
- **system_prompt** (required): The system prompt
- **ai_model**: The AI model (default: gpt-4.1-nano)

*Generates engaging social media content optimized for various platforms and audiences.*

#### `get_moz_analysis`
Get Moz domain authority and metrics
- **domain** (required): Target domain

### Keyword Research

#### `get_keywords_search_volume`
Get search volume for keywords
- **keywords** (required): Array of keywords
- **country**: Country code

#### `get_keywords_suggestions`
Get keyword suggestions
- **url**: URL to analyze (optional if keywords provided)
- **keywords**: Array of seed keywords (optional if url provided)
- **country**: Country code

#### `get_long_tail_keywords`
Generate long-tail keywords
- **keyword** (required): Seed keyword
- **search_intent**: informational, commercial, transactional, navigational (default: informational)
- **count**: Number to generate 1-500 (default: 10)

### SERP & Search

#### `get_serp_results`
Get search engine results
- **query** (required): Search query
- **search_engine**: google, bing, yahoo, duckduckgo (default: google)
- **country**: Country code (default: us)
- **pages_number**: Pages to search 1-30 (default: 1)

#### `get_serp_html`
Get SERP results with HTML content
- Same parameters as `get_serp_results`

#### `get_serp_text`
Get SERP results with text content
- Same parameters as `get_serp_results`

#### `get_serp_ai_mode`
Get SERP with AI Overview and AI Mode response
- **query** (required): Search query
- **country**: Country code (default: us)

*Returns AI overview and AI mode response for the query. Less reliable than the 2-step process but returns results in under 30 seconds.*

#### `check_page_indexation`
Check if domain is indexed for keyword
- **domain** (required): Target domain
- **keyword** (required): Search keyword

#### `get_domain_ranking`
Get domain ranking for keyword
- **keyword** (required): Search keyword
- **domain** (required): Target domain
- **search_engine**: Search engine (default: google)
- **country**: Country code (default: us)
- **pages_number**: Pages to search 1-30 (default: 10)

### Web Scraping

#### `scrape_webpage`
Scrape webpage without JavaScript
- **url** (required): URL to scrape

#### `scrape_domain`
Scrape multiple pages from domain
- **domain** (required): Target domain
- **max_pages**: Maximum pages to scrape, up to 200 (default: 10)

#### `scrape_webpage_js`
Scrape webpage with custom JavaScript
- **url** (required): URL to scrape
- **js_script** (required): JavaScript code to execute

#### `scrape_webpage_js_proxy`
Scrape webpage with JavaScript and proxy
- **url** (required): URL to scrape
- **country** (required): Proxy country
- **js_script** (required): JavaScript code to execute

## References
To learn more about Apify and Actors, take a look at the following resources:
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
