# Weather MCP Server Checklist

## Progress Tracking

- [x] Check whether the mcp-servers repository is available locally using git status
- [x] Navigate to the mcp-servers directory
- [x] Check if the 'feat/weather-mcp-server' branch exists locally
- [x] Create and switch to 'feat/weather-mcp-server' branch
- [x] Examine the source repository to determine programming language and server type
- [x] Clone source repository as weather-mcp-server-tmp
- [x] Select appropriate template based on server type (Python stdio-based)
- [x] Initialize the Actor using Apify-CLI
- [x] Create weather-mcp-server-checklist.md file
- [x] Configure the MCP server based on type (stdio vs remote)
- [x] Install the MCP server and its dependencies
- [x] Remove unused packages from template
- [x] Configure the run command
- [x] Test the server locally
- [x] Update README with proper Actor format following guidelines
- [x] Update .actor/actor.json with proper description
- [x] **💰Add pricing information into the code**
  - [x] Check the source server tools (get_current_weather, get_weather_by_datetime_range, get_current_datetime)
  - [x] Modify `src/const.py` to match the weather server tools
  - [x] Update `.actor/pay_per_event.json` with estimated prices for each event
  - [x] Rename tools to match the actual server tools
  - [x] Make event names descriptive and match the actual functionality being charged
- [x] **🌐Add HTML page functionality**
  - [x] Add SERVER_NAME constant to main.py
  - [x] Update ProxyServer constructor to include server_name parameter
  - [x] Add browser detection functionality
  - [x] Add HTML page generation with server information
  - [x] Update routes to serve HTML page for browser requests

## Server Details
- **Source Repository**: https://github.com/isdaniel/mcp_weather_server
- **Server Type**: Python stdio-based
- **Package Name**: mcp_weather_server
- **Run Command**: `python -m mcp_weather_server`
- **Actor Name**: Weather MCP Server

## Configuration Notes
- No API key required (uses Open-Meteo API)
- Provides tools: get_current_weather, get_weather_by_datetime_range, get_current_datetime
- Includes HTML page for browser access with server information and MCP client configuration

## Pricing Configuration
- **Actor startup**: $0.01 (one-time fee when starting the server)
- **get_current_weather**: $0.005 per weather lookup
- **get_weather_by_datetime_range**: $0.01 per historical weather data request
- **get_current_datetime**: $0.001 per datetime lookup