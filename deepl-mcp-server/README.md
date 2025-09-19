## DeepL MCP Server

A Model Context Protocol (MCP) server that provides translation capabilities using the DeepL API.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com)..

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--deepl-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "playwright": {
      "url": "https://mcp-servers--deepl-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## 🚩 Claim this MCP server
All credits to the original authors of [https://github.com/DeepLcom/deepl-mcp-server/tree/main](https://github.com/DeepLcom/deepl-mcp-server/tree/main)
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

## Features

- Translate text between numerous languages
- Rephrase text using DeepL's capabilities
- Access to all DeepL API languages and features
- Automatic language detection
- Formality control for supported languages

## Available Tools

This server provides the following tools:

- `get-source-languages`: Get list of available source languages for translation
- `get-target-languages`: Get list of available target languages for translation
- `translate-text`: Translate text to a target language
- `rephrase-text`: Rephrase text in the same or different language

## Tool Details

### translate-text

This tool translates text between languages using the DeepL API.

Parameters:

- `text`: The text to translate
- `targetLang`: Target language code (e.g., 'en-US', 'de', 'fr')
- `formality` (optional): Controls formality level of the translation:
    - `'less'`: use informal language
    - `'more'`: use formal, more polite language
    - `'default'`: use default formality
    - `'prefer_less'`: use informal language if available, otherwise default
    - `'prefer_more'`: use formal language if available, otherwise default

### rephrase-text

This tool rephrases text in the same or different language using the DeepL API.

Parameters:

- `text`: The text to rephrase
- `style`: (optional): Style of rephrasing:
    - `'default'`
    - `'academic'`
    - `'business'`
    - `'casual'`
- `tone`: (optional): Tone of rephrasing:
    - `'default'`
    - `'confident'`
    - `'diplomatic'`
    - `'enthusiastic'`
    - `'friendly'`

Note: You can use the `get-writing-styles-and-tones` tool to see all available styles and tones.

## Supported Languages

The DeepL API supports a wide variety of languages for translation. You can use the `get-source-languages` and `get-target-languages` tools to see all currently supported languages.

Some examples of supported languages include:

- English (en, en-US, en-GB)
- German (de)
- Spanish (es)
- French (fr)
- Italian (it)
- Japanese (ja)
- Chinese (zh)
- Portuguese (pt-BR, pt-PT)
- Russian (ru)
- And many more

## References
To learn more about Apify and Actors, take a look at the following resources:
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
