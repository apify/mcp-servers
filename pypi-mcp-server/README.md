## PyPI Query MCP Server

A Model Context Protocol (MCP) server that lets AI agents explore and analyze Python packages from PyPI (and private indexes). It’s deployed as an Apify Actor and proxies the excellent open-source **pypi-query-mcp-server** over Streamable HTTP, with optional per-tool charging and a configurable whitelist.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

---

## Connection URL

MCP clients can connect to this server at:

```text
https://mcp-servers--pypi-query-mcp-server.apify.actor/mcp
```

---

## Client Configuration

Add this to your MCP client configuration:

```json
{
  "mcpServers": {
    "pypi-query": {
      "url": "https://mcp-servers--pypi-query-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your Apify API token (find it in the [Apify Console](https://console.apify.com/account/integrations)).

---

## 🚩 Claim this MCP server

All credit to the original authors of **pypi-query-mcp-server**: <https://github.com/loonghao/pypi-query-mcp-server>  
To claim this server on Apify, please email [ai@apify.com](mailto:ai@apify.com).

---

## What this server does

- Proxies the **PyPI Query MCP Server** to HTTP so any MCP client can connect.
- Supports **per-tool charging** (via Apify’s `Actor.charge`) and a **tool whitelist**.
- Passes through environment variables for public mirrors and **private package indexes**.
- Runs reliably in **Apify Standby** with an `/mcp` endpoint and a small helper HTML page at `/`.

---

## Features

- Look up package info, versions, dependencies, and compatibility.
- Resolve dependency trees and detect conflicts.
- Gather download stats, trends, and top packages.
- Analyze package quality and security (if enabled upstream).
- Plan upgrades, migrations, and environment updates.

---

## Available Tools

This server exposes the PyPI tools provided by the upstream server (whitelisted by default). Tool identifiers:

- `get_package_info`
- `get_package_versions`
- `get_package_dependencies`
- `check_package_python_compatibility`
- `get_package_compatible_python_versions`
- `resolve_dependencies`
- `download_package`
- `get_download_statistics`
- `get_download_trends`
- `get_top_downloaded_packages`
- `analyze_package_quality`
- `compare_packages`
- `suggest_alternatives`
- `resolve_dependency_conflicts`
- `plan_version_upgrade`
- `audit_security_risks`
- `plan_package_migration`
- `generate_migration_checklist`
- `analyze_environment_dependencies`
- `check_outdated_packages`
- `generate_update_plan`
- `analyze_daily_trends`
- `find_trending_packages`
- `track_package_updates`

> Note: The exact set may evolve with upstream releases. This proxy can be configured to allow all tools or only a curated subset.

---

## Environment Variables

The proxy launches the upstream server via `uvx` (stdio) and forwards these environment variables:

- Public indexes & mirrors  
  - `PYPI_INDEX_URL` (default: `https://pypi.org/pypi`)  
  - `PYPI_INDEX_URLS`, `PYPI_EXTRA_INDEX_URLS` (comma-separated)
- Caching & logging  
  - `PYPI_CACHE_TTL` (default: `3600`)  
  - `PYPI_LOG_LEVEL` (default: `INFO`)
- Networking  
  - `PYPI_REQUEST_TIMEOUT` (default: `30`)
- Private repository support (optional)  
  - `PYPI_PRIVATE_PYPI_URL`  
  - `PYPI_PRIVATE_PYPI_USERNAME`  
  - `PYPI_PRIVATE_PYPI_PASSWORD`
- Advanced (optional)  
  - `PYPI_DEPENDENCY_MAX_DEPTH` (default: `5`)  
  - `PYPI_DEPENDENCY_MAX_CONCURRENT` (default: `10`)  
  - `PYPI_ENABLE_SECURITY_ANALYSIS` (`true`|`false`, default: `false`)

Set these in your Apify Actor (Secrets / Environment) as needed.

---

## Usage Examples

Ask your MCP client to:

- “Get info for `requests`.” → `get_package_info`
- “Show versions for `pydantic`.” → `get_package_versions`
- “Resolve dependencies for `fastapi==0.115.0`.” → `resolve_dependencies`
- “Are `httpx 0.27` and Python 3.12 compatible?” → `check_package_python_compatibility`
- “Top downloads last week” → `get_top_downloaded_packages`
- “Compare `requests` vs `httpx`” → `compare_packages`

---

## Pricing / Charging (optional)

This server can charge per MCP operation. Defaults are defined in code (`src/const.py`) and can be tuned per tool (e.g., heavier “resolve” or “download” operations can cost more). If you don’t want charging, remove or relax the whitelist and omit charging hooks.

---

## Local development & debugging

- This Actor only serves in **STANDBY** on Apify. When running locally you can still start it, but the HTTP `/mcp` endpoint is designed for Standby on the platform.
- The server logs a ready-to-copy MCP JSON snippet with the endpoint URL at startup.

---

## References

To learn more:

- [Apify SDK for Python](https://docs.apify.com/sdk/python)  
- [Apify Platform](https://docs.apify.com/platform)  
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)  
- [Model Context Protocol docs](https://mcp.apify.com)  
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)  
- [Join the Apify developer community on Discord](https://discord.com/invite/jyEM2PRvMU)  

--- 

**Attribution:** Built as a proxy over the open-source **pypi-query-mcp-server**.
