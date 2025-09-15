# ForeverVM MCP Server

A Model Context Protocol (MCP) server that integrates with ForeverVM for secure Python code execution in stateful sandboxes. This server enables AI agents to create Python REPLs and execute code with persistent state.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

---

## ✨ Features

- **Secure Python execution** in isolated sandboxes
- **Stateful REPLs** that maintain state between executions
- **Long-running sessions** with ForeverVM's persistent sandboxes
- **Built-in library support** (numpy, pandas, matplotlib, requests, etc.)
- **Multiple transport protocols** (HTTP-streamable and SSE)
- **Pay-per-use pricing** with transparent billing
- **Enterprise-grade reliability** via Apify platform

---

## 🔌 Connection Options

### HTTP-Streamable Transport (Recommended)

```json
{
  "mcpServers": {
    "forevervm": {
      "type": "http",
      "url": "https://your-actor-name.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

### SSE Transport (Legacy Support)

```json
{
  "mcpServers": {
    "forevervm": {
      "type": "sse",
      "url": "https://your-actor-name.apify.actor/sse"
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

---

## 🔧 Available Tools

### `create-python-repl`

Creates a new Python REPL environment with persistent state.

**Parameters:** None

**Returns:** A unique REPL ID string that can be used for subsequent code execution.

**Example:**
```javascript
{
  "name": "create-python-repl",
  "arguments": {}
}
```

### `run-python-in-repl`

Executes Python code in a specific REPL environment.

**Parameters:**
- `pythonCode` (string): The Python code to execute
- `replId` (string): The ID of the REPL environment (from `create-python-repl`)

**Returns:** 
- Execution output, results, and any errors
- Images (if matplotlib plots are generated)

**Example:**
```javascript
{
  "name": "run-python-in-repl",
  "arguments": {
    "pythonCode": "import numpy as np\ndata = np.array([1, 2, 3, 4, 5])\nprint(f'Mean: {data.mean()}')",
    "replId": "your-repl-id-here"
  }
}
```

---

## 🚀 Usage Examples

### Basic Data Analysis
```python
# Step 1: Create a REPL
repl_id = create_python_repl()

# Step 2: Import libraries and load data
run_python_in_repl(
  code="import pandas as pd\nimport numpy as np\ndata = pd.DataFrame({'x': [1,2,3], 'y': [4,5,6]})",
  replId=repl_id
)

# Step 3: Analyze the data (state is preserved!)
run_python_in_repl(
  code="print(data.describe())\ncorrelation = data.corr()\nprint(correlation)",
  replId=repl_id
)
```

### Data Visualization
```python
# Create visualization (state persists from previous example)
run_python_in_repl(
  code="""
import matplotlib.pyplot as plt
plt.figure(figsize=(10, 6))
plt.scatter(data['x'], data['y'])
plt.title('Sample Data Visualization')
plt.xlabel('X values')
plt.ylabel('Y values')
plt.show()
""",
  replId=repl_id
)
```

---

## ⚙️ Configuration

### Required Configuration

You need a **ForeverVM API token** to use this service:

1. **Sign up for ForeverVM**: Visit [ForeverVM](https://forevervm.com) and create an account
2. **Get your API token**: Generate an API token from your ForeverVM dashboard
3. **Configure the Actor**: Add your token in the Actor's input configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `FOREVERVM_TOKEN` | Your ForeverVM API token | Yes |
| `ACTOR_WEB_SERVER_PORT` | Port for the MCP server (default: 3000) | No |

---

## 🌐 Transport Protocols

This server supports both MCP transport protocols:

### **HTTP-Streamable (Recommended)**
- Modern, efficient request/response over HTTP
- Better error handling and debugging
- Supports authentication headers
- Used by most new MCP clients

### **SSE (Server-Sent Events)**
- Legacy transport for backward compatibility
- Real-time streaming communication
- Used by older MCP clients
- No authentication headers

**Endpoints:**
- **HTTP**: `POST /mcp` - Direct HTTP requests
- **SSE**: `GET /sse` - Server-sent events connection
- **Health**: `GET /health` - Health check endpoint

---

## 💰 Pricing

This service uses pay-per-event pricing:

- **Actor Initialization**: $0.001 per run start
- **REPL Creation**: $0.005 per new Python REPL
- **Code Execution**: $0.002 per code execution

**Note:** You will also incur ForeverVM compute costs based on your usage. See [ForeverVM pricing](https://forevervm.com/pricing) for details.

---

## 🔍 Supported Libraries

ForeverVM comes with many popular Python libraries pre-installed:

- **Data Science**: `numpy`, `pandas`, `scipy`, `scikit-learn`
- **Visualization**: `matplotlib`, `seaborn`, `plotly`
- **Web & APIs**: `requests`, `urllib3`, `httpx`
- **Utilities**: `json`, `os`, `sys`, `datetime`, `re`
- **Machine Learning**: `tensorflow`, `torch`, `transformers` (on larger instances)

Additional packages can be installed using `pip` within your REPL sessions.

---

## 🛡️ Security & Sandboxing

- **Isolated execution**: Each REPL runs in a secure, isolated container
- **Network access**: Limited outbound network access for API calls
- **Resource limits**: Memory and CPU limits prevent resource exhaustion  
- **Stateful persistence**: REPLs maintain state but are automatically cleaned up when idle
- **No filesystem persistence**: Files are not persisted between Actor runs

---

## 🧪 Testing the Server

### Using Apify MCP Tester

1. Visit the [Apify MCP Tester](https://apify.com/jiri.spilka/tester-mcp-client)
2. Run the tester and follow the link to the chat UI
3. Test with prompts like:
   - `"Connect to forevervm server and create a Python REPL"`
   - `"Calculate the mean of [1,2,3,4,5] using numpy"`
   - `"Create a simple plot using matplotlib"`

### Local Testing

#### HTTP Transport
```bash
# Set your ForeverVM token
export FOREVERVM_TOKEN="your-forevervm-token"

# Run in standby mode
APIFY_META_ORIGIN="STANDBY" ACTOR_WEB_SERVER_PORT=3000 npm start
```

Then connect using MCP Inspector at `http://localhost:3000/mcp`.

#### SSE Transport
```bash
# Same setup as above
export FOREVERVM_TOKEN="your-forevervm-token"
APIFY_META_ORIGIN="STANDBY" ACTOR_WEB_SERVER_PORT=3000 npm start
```

Then connect using MCP Inspector at `http://localhost:3000/sse`.

---

## 🔧 Client Configuration Examples

### Claude Desktop (HTTP)
```json
{
  "mcpServers": {
    "forevervm": {
      "command": "npx",
      "args": ["forevervm-mcp", "run"],
      "env": {
        "FOREVERVM_TOKEN": "your-token-here"
      }
    }
  }
}
```

### Web Clients (HTTP)
```json
{
  "mcpServers": {
    "forevervm": {
      "type": "http",
      "url": "https://your-actor-name.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer your-apify-token"
      }
    }
  }
}
```

### Legacy Clients (SSE)
```json
{
  "mcpServers": {
    "forevervm": {
      "type": "sse",
      "url": "https://your-actor-name.apify.actor/sse"
    }
  }
}
```

---

## 🚩 Claim this MCP server

All credits to the original authors of [ForeverVM](https://github.com/jamsocket/forevervm) and the [ForeverVM MCP Server](https://github.com/jamsocket/forevervm/tree/main/javascript/mcp-server).

To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

---

## 📖 References

To learn more about Apify and Actors, take a look at the following resources:

- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)

---

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.
