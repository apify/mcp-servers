## Lara Translate MCP Server

A Model Context Protocol (MCP) Server for Lara Translate API, enabling powerful translation capabilities with support for language detection, context-aware translations and translation memories.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

---

### 📚 Table of Contents

* [📖 Introduction](#-introduction)
* [🛠 Available Tools](#-available-tools)
* [🚀 Getting Started](#-getting-started)
* [📋 Requirements](#-requirements)
* [🔌 Installation](#-installation)
* [🧩 Installation Engines](#-installation-engines)
* [💻 Popular Clients that supports MCPs](#-popular-clients-that-supports-mcps)
* [🆘 Support](#-support)

---

### 📖 Introduction

**What is MCP?**

**How Lara Translate MCP Works**

**Why use Lara inside an LLM?**

---

### 🛠 Available Tools

**Translation Tools**

* `translate` - Translate text between languages

**Translation Memories Tools**

* `list_memories` - List saved translation memories
* `create_memory` - Create a new translation memory
* `update_memory` - Update translation memory name
* `delete_memory` - Delete a translation memory
* `add_translation` - Add a translation unit to memory
* `delete_translation` - Delete a translation unit from memory
* `import_tmx` - Import a TMX file into a memory
* `check_import_status` - Checks the status of a TMX file import

---

### 🚀 Getting Started

#### 📋 Requirements

* **Lara Translate API Credentials** (refer to the [Official Documentation](https://laratranslate.com/docs))
* An **LLM client that supports Model Context Protocol (MCP)**, such as Claude Desktop, Cursors, or GitHub Copilot
* **NPX or Docker** (depending on your preferred installation method)

#### 🔌 Installation

**Introduction**

The installation process is standardized across all MCP clients. It involves manually adding a configuration object to your client's MCP configuration JSON file. If you're unsure how to configure an MCP with your client, please refer to your MCP client's official documentation. Lara Translate MCP supports multiple installation methods, including NPX and Docker. Below, we'll use NPX as an example.

**Installation & Configuration**

1.  **Step 1:** Open your client's MCP configuration JSON file with a text editor, then copy and paste the following snippet:

    ```json
    {
      "mcpServers": {
        "lara-translate": {
          "command": "npx",
          "args": [
            "-y",
            "@translated/lara-mcp@latest"
          ],
          "env": {
            "LARA_ACCESS_KEY_ID": "<YOUR_ACCESS_KEY_ID>",
            "LARA_ACCESS_KEY_SECRET": "<YOUR_ACCESS_KEY_SECRET>"
          }
        }
      }
    }
    ```

2.  **Step 2:** Replace `<YOUR_ACCESS_KEY_ID>` and `<YOUR_ACCESS_KEY_SECRET>` with your Lara Translate API credentials (refer to the [Official Documentation](https://laratranslate.com/docs) for details).
3.  **Step 3:** **Restart your MCP client.**

**Verify Installation**

After restarting your MCP client, you should see Lara Translate MCP in the list of available MCPs. The method for viewing installed MCPs varies by client. Please consult your MCP client's documentation. To verify that Lara Translate MCP is working correctly, try translating with a simple prompt:

`Translate with Lara "Hello world" to Spanish`

Your MCP client will begin generating a response. If Lara Translate MCP is properly installed and configured, your client will either request approval for the action or display a notification that Lara Translate is being used.

---

### 🧩 Installation Engines

#### Option 1: Using NPX

#### Option 2: Using Docker

#### Option 3: Building from Source

* **Using Node.js**

    Clone the repository:

    ```bash
    git clone [https://github.com/translated/lara-mcp.git](https://github.com/translated/lara-mcp.git)
    cd lara-mcp
    ```

    Install dependencies and build:

    ```bash
    # Install dependencies
    pnpm install
    # Build
    pnpm run build
    ```

    Add the following to your MCP configuration file:

    ```json
    {
      "mcpServers": {
        "lara-translate": {
          "command": "node",
          "args": ["<FULL_PATH_TO_PROJECT_FOLDER>/dist/index.js"],
          "env": {
            "LARA_ACCESS_KEY_ID": "<YOUR_ACCESS_KEY_ID>",
            "LARA_ACCESS_KEY_SECRET": "<YOUR_ACCESS_KEY_SECRET>"
          }
        }
      }
    }
    ```

    Replace:

    * `<FULL_PATH_TO_PROJECT_FOLDER>` with the absolute path to your project folder
    * `<YOUR_ACCESS_KEY_ID>` and `<YOUR_ACCESS_KEY_SECRET>` with your actual Lara API credentials.

* **Building a Docker Image**

    Clone the repository:

    ```bash
    git clone [https://github.com/translated/lara-mcp.git](https://github.com/translated/lara-mcp.git)
    cd lara-mcp
    ```

    Build the Docker image:

    ```bash
    docker build -t lara-mcp .
    ```

    Add the following to your MCP configuration file:

    ```json
    {
      "mcpServers": {
        "lara-translate": {
          "command": "docker",
          "args": [
            "run",
            "-i",
            "--rm",
            "-e",
            "LARA_ACCESS_KEY_ID",
            "-e",
            "LARA_ACCESS_KEY_SECRET",
            "lara-mcp"
          ],
          "env": {
            "LARA_ACCESS_KEY_ID": "<YOUR_ACCESS_KEY_ID>",
            "LARA_ACCESS_KEY_SECRET": "<YOUR_ACCESS_KEY_SECRET>"
          }
        }
      }
    }
    ```

    Replace `<YOUR_ACCESS_KEY_ID>` and `<YOUR_ACCESS_KEY_SECRET>` with your actual credentials.

---

### 💻 Popular Clients that supports MCPs

For a complete list of MCP clients and their feature support, visit the [official MCP clients page](https://modelcontextprotocol.com/clients).

| Client             | Description                                       |
| :----------------- | :------------------------------------------------ |
| Claude Desktop     | Desktop application for Claude AI                 |
| Aixplain           | Production-ready AI Agents                        |
| Cursor             | AI-first code editor                              |
| Cline for VS Code  | VS Code extension for AI assistance               |
| GitHub Copilot MCP | VS Code extension for GitHub Copilot MCP integration |
| Windsurf           | AI-powered code editor and development environment |

---

### 🆘 Support

* For issues with Lara Translate API: Visit [Lara Translate API and Integrations Support](https://translated.com/support)
* For issues with this MCP Server: Open an issue on [GitHub](https://github.com/translated/lara-mcp/issues)

---

## 🚩 Claim this MCP server. Contact info.

All credits to the original authors of [https://github.com/translated/lara-mcp](https://github.com/translated/lara-mcp)

Write to [ai@apify.com](mailto:ai@apify.com)

**Original project URL:** [https://github.com/translated/lara-mcp](https://github.com/translated/lara-mcp)