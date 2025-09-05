# Weather MCP Server

A Model Context Protocol (MCP) server that provides weather information using the Open-Meteo API.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--weather-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "weather": {
      "url": "https://mcp-servers--weather-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## Links
- **GitHub Repository**: https://github.com/isdaniel/mcp_weather_server
- **Actor Repository**: https://github.com/apify/mcp-servers
- **Apify MCP Documentation**: https://mcp.apify.com

## 🚩 Claim this MCP server
All credits to the original authors of https://github.com/isdaniel/mcp_weather_server
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

---

# Weather MCP Server

A Model Context Protocol (MCP) server that provides weather information using the Open-Meteo API.

## Features

* Get current weather information for a specified city.

## Installation

Pip Installation and Usage, This package can be installed using pip:

```bash
pip install mcp_weather_server
```

This server is designed to be installed manually by adding its configuration to the `cline_mcp_settings.json` file.

1.  Add the following entry to the `mcpServers` object in your `cline_mcp_settings.json` file:

```json
{
  "mcpServers": {
    "weather": {
      "command": "python",
      "args": [
        "-m",
        "mcp_weather_server"
      ],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

2. Save the `cline_mcp_settings.json` file.

## Configuration

This server does not require an API key. It uses the Open-Meteo API, which is free and open-source.

## Usage

This server provides several tools: `get_weather`, `get_weather_by_datetime_range`, and `get_current_datetime`.

### `get_weather`

Retrieves the current weather information for a given city.

**Parameters:**

*   `city` (string, required): The name of the city.

**Example:**

To get the weather in Taipei, you would use the tool like this:

```
<use_mcp_tool>
<server_name>weather</server_name>
<tool_name>get_weather</tool_name>
<arguments>
{
  "city": "Taipei"
}
</arguments>
</use_mcp_tool>
```

### `get_weather_by_datetime_range`

Retrieves weather information for a specified city between start and end dates.

**Parameters:**

*   `city` (string, required): The name of the city.
*   `start_date` (string, required): Start date in format YYYY-MM-DD (ISO 8601).
*   `end_date` (string, required): End date in format YYYY-MM-DD (ISO 8601).

**Example:**

To get the weather in London between 2024-01-01 and 2024-01-07, you would use the tool like this:

```
<use_mcp_tool>
<server_name>weather</server_name>
<tool_name>get_weather_by_datetime_range</tool_name>
<arguments>
{
  "city": "London",
  "start_date": "2024-01-01",
  "end_date": "2024-01-07"
}
</arguments>
</use_mcp_tool>
```

### `get_current_datetime`

Retrieves the current time in a specified timezone.

**Parameters:**

*   `timezone_name` (string, required): IANA timezone name (e.g., 'America/New_York', 'Europe/London'). Use UTC timezone if no timezone provided by the user.

**Example:**

To get the current time in New York, you would use the tool like this:

```
<use_mcp_tool>
<server_name>weather</server_name>
<tool_name>get_current_datetime</tool_name>
<arguments>
{
  "timezone_name": "America/New_York"
}
</arguments>
</use_mcp_tool>
```

## Available Tools

This MCP server provides the following tools:

1. **get_weather** - Get current weather information for a specified city
2. **get_weather_by_datetime_range** - Get weather information for a city within a date range
3. **get_current_datetime** - Get current time in a specified timezone

## For developers

Change Working Directory Before Running Python

```
python -m mcp_weather_server
```

Or if you want Python to find your package no matter where you run from, you can set PYTHONPATH:

```
set PYTHONPATH=C:\xxx\mcp_weather_server\src
python -m mcp_weather_server
```

## References
To learn more about Apify and Actors, take a look at the following resources:
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)