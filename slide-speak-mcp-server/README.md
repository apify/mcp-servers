## SlideSpeak MCP Server

[![Apify Actor](https://apify.com/actor-badge?actor=mcp-servers/slidespeak-mcp-server)](https://apify.com/actor/mcp-servers/slidespeak-mcp-server)

An MCP server that enables Claude or other MCP-compatible apps to generate PowerPoint presentations from natural language prompts using the SlideSpeak API.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL
MCP clients can connect to this server at:

```text
https://mcp-servers--slidespeak-mcp-server.apify.actor/mcp
```

## Client Configuration
To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "slidespeak": {
      "url": "https://mcp-servers--slidespeak-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

---

## Available Tools

### `generatePowerpoint`

Generates a PowerPoint or PDF presentation based on text, length, and template with extensive customization options.

**Required Inputs:**
- `plain_text` (string): The topic to generate a presentation about
- `length` (integer): The number of slides
- `template` (string): Template name or ID

**Optional Inputs:**
- `document_uuids` (list[string]): UUIDs of uploaded documents to use
- `language` (string): Language code (default: 'ORIGINAL')
- `fetch_images` (boolean): Include stock images (default: True)
- `use_document_images` (boolean): Include images from documents (default: False)
- `tone` (string): Text tone - 'default', 'casual', 'professional', 'funny', 'educational', 'sales_pitch' (default: 'default')
- `verbosity` (string): Text length - 'concise', 'standard', 'text-heavy' (default: 'standard')
- `custom_user_instructions` (string): Custom generation instructions
- `include_cover` (boolean): Include cover slide (default: True)
- `include_table_of_contents` (boolean): Include TOC slides (default: True)
- `add_speaker_notes` (boolean): Add speaker notes (default: False)
- `use_general_knowledge` (boolean): Expand with related info (default: False)
- `use_wording_from_document` (boolean): Use document wording (default: False)
- `response_format` (string): 'powerpoint' or 'pdf' (default: 'powerpoint')
- `use_branding_logo` (boolean): Include brand logo (default: False)
- `use_branding_fonts` (boolean): Apply brand fonts (default: False)
- `use_branding_color` (boolean): Apply brand colors (default: False)
- `branding_logo` (string): Custom logo URL
- `branding_fonts` (dict): The object of brand fonts to be used in the slides

**Returns:**
- A downloadable `.pptx` or `.pdf` file URL or a shareable link.

### `getAvailableTemplates`

Gets all available presentation templates from SlideSpeak.

**Inputs:**
- None

**Returns:**
- A formatted list of available presentation templates with their names, cover images, and content images.

### `generateSlideBySlide`

Generate a PowerPoint presentation using Slide-by-Slide input with precise control over each slide.

**Required Inputs:**
- `template` (string): The name of the template or the ID of a custom template
- `slides` (list[dict]): A list of slides, each defined as a dictionary with:
  - `title` (string): The title of the slide
  - `layout` (string): The layout type for the slide
  - `item_amount` (integer): Number of items for the slide (must match the layout constraints)
  - `content` (string): The content that will be used for the slide

**Optional Inputs:**
- `language` (string): Language code like 'ENGLISH' or 'ORIGINAL'
- `fetch_images` (boolean): Whether to include stock images (default: True)

**Available Layouts:**
- `items`: 1-5 items
- `steps`: 3-5 items
- `summary`: 1-5 items
- `comparison`: exactly 2 items
- `big-number`: 1-5 items
- `milestone`: 3-5 items
- `pestel`: exactly 6 items
- `swot`: exactly 4 items
- `pyramid`: 1-5 items
- `timeline`: 3-5 items
- `funnel`: 3-5 items
- `quote`: 1 item
- `cycle`: 3-5 items
- `thanks`: 0 items

**Returns:**
- A downloadable `.pptx` file URL or a shareable link.

### `getTaskStatus`

Get the current task status and result by task_id for any SlideSpeak operation.

**Required Inputs:**
- `task_id` (string): The task ID returned from a generation operation

**Returns:**
- JSON object containing the current task status, progress, and result (if completed).

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

---

### Getting an API key

Visit this page in order to get an API key for Slidespeak: [https://slidespeak.co/slidespeak-api/](https://slidespeak.co/slidespeak-api/)

---

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

---

## 🚩 Claim this MCP server. Contact info.

All credits to the original authors of [https://github.com/SlideSpeak/slidespeak-mcp](https://github.com/SlideSpeak/slidespeak-mcp)

Write to [ai@apify.com](mailto:ai@apify.com)

**Original project URL:** [https://github.com/SlideSpeak/slidespeak-mcp](https://github.com/SlideSpeak/slidespeak-mcp)

---

## References

To learn more about Apify and Actors, take a look at the following resources:

- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
