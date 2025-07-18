## SlideSpeak MCP Server

An MCP Server that allows you to create PowerPoint presentations. Powered by SlideSpeak, you can now create presentations using the SlideSpeak MCP. Automate reports, presentations and other slide decks. Start today!

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

---

### Usage with Claude Desktop

To use this with Claude Desktop, add the following to your `claude_desktop_config.json`:

#### Remote MCP

This is the easiest way to run the MCP. This approach requires you to have Node.js installed on your system.
(Download Node.js for free [here](https://nodejs.org/en/download/))

```json
{
  "mcpServers": {
    "slidespeak": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.slidespeak.co/mcp",
        "--header",
        "Authorization: Bearer YOUR-SLIDESPEAK-API-KEY-HERE"
      ],
      "timeout": 300000
    }
  }
}
```

#### Docker

This will allow you to run the MCP Server on your own computer. This approach requires Docker to be installed on your system.
(Download Docker Desktop for free [here](https://www.docker.com/products/docker-desktop/))

```json
{
  "mcpServers": {
    "slidespeak": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "SLIDESPEAK_API_KEY",
        "slidespeak/slidespeak-mcp:latest"
      ],
      "env": {
        "SLIDESPEAK_API_KEY": "YOUR-SLIDESPEAK-API-KEY-HERE"
      }
    }
  }
}
```

### Getting an API key

Visit this page in order to get an API key for Slidespeak: [https://slidespeak.co/slidespeak-api/](https://slidespeak.co/slidespeak-api/)

### Development of SlideSpeak MCP

The following information is related to development of the SlideSpeak MCP. These steps are not needed to use the MCP.

#### Building the Docker Image

This is for local testing, if you want to publish a new docker container check out the "Making a new version" section below.

```bash
docker build . -t slidespeak/slidespeak-mcp:TAG-HERE
```

#### Development

**Install uv**

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Create virtual environment and activate it**

```bash
uv venv
source .venv/bin/activate
```

**Install dependencies**

```bash
uv pip install -r requirements.txt
```

#### Using the server directly without Docker

Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "slidespeak": {
      "command": "/path/to/.local/bin/uv",
      "args": [
        "--directory",
        "/path/to/slidespeak-mcp",
        "run",
        "slidespeak.py"
      ],
      "env": {
        "SLIDESPEAK_API_KEY": "API-KEY-HERE"
      }
    }
  }
}
```

#### Making a new release

Version naming should be in the format of `MAJOR.MINOR.PATCH` (e.g., `1.0.0`).  
The version needs to be updated in the following files:

- `pyproject.toml` → `version`  
- `slidespeak.py` → `USER_AGENT`

Make a new release in GitHub and tag it with the version number. This will trigger a GitHub Action. The release will be automatically built and pushed to Docker Hub.  
[https://hub.docker.com/r/slidespeak/slidespeak-mcp](https://hub.docker.com/r/slidespeak/slidespeak-mcp)

-----

## 🚩 Claim this MCP server. Contact info.

All credits to the original authors of [https://github.com/SlideSpeak/slidespeak-mcp](https://github.com/SlideSpeak/slidespeak-mcp)

Write to [ai@apify.com](mailto:ai@apify.com)

**Original project URL:** [https://github.com/SlideSpeak/slidespeak-mcp](https://github.com/SlideSpeak/slidespeak-mcp)
