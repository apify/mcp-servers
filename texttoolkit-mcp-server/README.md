## TextToolkit MCP Server

A Model Context Protocol (MCP) server that provides text transformation, formatting, and analysis tools for AI workflows.

**About this MCP Server:** For details on connecting and using this MCP server, see the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--formatter-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
    "mcpServers": {
        "text-toolkit": {
            "url": "https://mcp-servers--formatter-mcp-server.apify.actor/mcp",
            "headers": {
                "Authorization": "Bearer YOUR_APIFY_TOKEN"
            }
        }
    }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## 🚩 Claim this MCP server
All credits to the original authors of [https://github.com/Cicatriiz/text-toolkit](https://github.com/Cicatriiz/text-toolkit)
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

## Features

- Transform, format, and analyze text
- Case conversions (camelCase, snake_case, etc.)
- String encoding/decoding (Base64, URL, HTML)
- JSON, XML, SQL, HTML formatting
- Text analysis (character, word, line count, readability)
- String manipulation (trim, substring, replace, split, join)
- UUID generation and validation
- Hash generation (MD5, SHA, HMAC)
- Lorem Ipsum generation
- Regex pattern testing and manipulation

## Available Tools

This server provides the following tools:

- `case_to_camel`: Convert text to camelCase
- `case_to_pascal`: Convert text to PascalCase
- `case_to_snake`: Convert text to snake_case
- `case_to_kebab`: Convert text to kebab-case
- `case_to_constant`: Convert text to CONSTANT_CASE
- `case_to_dot`: Convert text to dot.case
- `case_to_no`: Convert text to no case
- `case_to_pascal_snake`: Convert text to Pascal_Snake_Case
- `case_to_path`: Convert text to path/case
- `case_to_sentence`: Convert text to Sentence case
- `case_to_train`: Convert text to Train-Case
- `case_to_capital`: Convert text to Capital Case
- `encode_base64`: Encode text to Base64
- `decode_base64`: Decode Base64 to text
- `encode_url`: Encode text for URLs
- `decode_url`: Decode URL-encoded text
- `encode_html`: Encode HTML entities
- `decode_html`: Decode HTML entities
- `format_json`: Format and beautify JSON
- `format_xml`: Format and beautify XML
- `format_sql`: Format and beautify SQL
- `format_html`: Format and beautify HTML
- `count_characters`: Count characters in text
- `count_words`: Count words in text
- `count_lines`: Count lines in text
- `analyze_readability`: Calculate readability metrics
- `string_trim`: Trim whitespace from text
- `string_substring`: Extract a substring
- `string_replace`: Replace text
- `string_split`: Split text into an array
- `string_join`: Join an array into text
- `generate_uuid`: Generate a UUID
- `validate_uuid`: Validate a UUID
- `generate_md5`: Generate MD5 hash
- `generate_sha1`: Generate SHA-1 hash
- `generate_sha256`: Generate SHA-256 hash
- `generate_sha512`: Generate SHA-512 hash
- `generate_hmac`: Generate HMAC hash
- `generate_lorem_ipsum`: Generate lorem ipsum text
- `regex_test`: Test a regex pattern against text
- `regex_replace`: Replace text using a regex pattern
- `regex_extract`: Extract matches using a regex pattern
- `regex_split`: Split text using a regex pattern

## Tool Details

### Example: case_to_camel
Converts text to camelCase.

Parameters:
- `text`: The text to transform
- `delimiter` (optional): The character to use between words
- `locale` (optional): Locale for case conversion
- `mergeAmbiguousCharacters` (optional): Whether to merge ambiguous characters

Example:
```json
{
    "text": "hello world test"
}
```
Response:
```json
{
    "result": "helloWorldTest"
}
```

### Example: format_json
Formats and beautifies JSON.

Parameters:
- `text`: The JSON text to format
- `indent_size` (optional): Number of spaces for indentation (1-8). Defaults to 2.

Example:
```json
{
    "text": "{\"name\":\"John\",\"age\":30,\"city\":\"New York\"}",
    "indent_size": 4
}
```
Response:
```json
{
    "result": "{\n    \"name\": \"John\",\n    \"age\": 30,\n    \"city\": \"New York\"\n}"
}
```

## References
To learn more about Apify and Actors, take a look at the following resources:
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
