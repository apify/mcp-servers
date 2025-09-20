
# ⏰ Time MCP Server (Apify Actor)

This Actor provides a Model Context Protocol (MCP) server for time and timezone conversion, running on the Apify platform. It enables LLMs and other clients to get current time information and perform timezone conversions using IANA timezone names, with automatic system timezone detection.

---

## Features

- **Current time lookup** in any IANA timezone
- **Timezone conversion** between arbitrary IANA timezones
- **Automatic system timezone detection** (can be overridden)
- **Stdio MCP server** integration (runs `mcp-server-time` via `uvx`)
- **Pay Per Event (PPE) billing** for each tool call
- **Ready for Claude, Zed, VS Code, and other MCP clients**

---

## Available Tools

- `get_current_time` – Get current time in a specific timezone or system timezone
        - Arguments: `timezone` (string, IANA name, e.g. 'Europe/London')
- `convert_time` – Convert time between timezones
        - Arguments: `source_timezone` (string), `time` (string, HH:MM), `target_timezone` (string)

---

## Usage

### Local run

```sh
apify run -p
```

### MCP Client Config Example

```json
{
    "mcpServers": {
        "time": {
            "type": "stdio",
            "command": "uvx",
            "args": ["mcp-server-time"]
        }
    }
}
```

### Example Interactions

**Get current time:**

```json
{
    "name": "get_current_time",
    "arguments": { "timezone": "Europe/Warsaw" }
}
```

**Convert time:**

```json
{
    "name": "convert_time",
    "arguments": {
        "source_timezone": "America/New_York",
        "time": "16:30",
        "target_timezone": "Asia/Tokyo"
    }
}
```

---

## Configuration

By default, the Actor launches `mcp-server-time` via `uvx` (recommended). To override the system timezone, set the `--local-timezone` argument in the command.

For pip installs, adjust the command to `python` and args to `['-m', 'mcp_server_time']` in both `src/main.py` and your client config.

---

## Billing (Pay Per Event)

Each tool call is billed per event. See `.actor/pay_per_event.json` and `src/const.py`:

```json
{
    "get_current_time": { "price": 0.0005 },
    "convert_time": { "price": 0.0005 }
}
```

---

## Links & Resources

- [MCP servers repo](https://github.com/apify/mcp-servers)
- [MCP docs](https://mcp.apify.com)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Apify SDK for Python](https://docs.apify.com/sdk/python)

---

## Credits & License

Maintained by Apify. MIT License.
