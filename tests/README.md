# LLM Testing for Actorized MCP Servers

This directory provides a framework for automated testing of Actorized MCP servers deployed to the Apify platform.

> **⚠️ IMPORTANT NOTICE:**
> 
> **Tests must NEVER be run in parallel. Only one test should run at a time for a single user. Running multiple tests concurrently may cause unpredictable results or failures. Always ensure tests are executed sequentially.**
> 
> **LLM runs in YOLO mode and can do anything it wants - run commands, remove files, or perform any action. You must trust the LLM gods 🙏 that it does not brick your device. Proceed at your own risk!**

## How It Works

- MCP server configuration is added to the Amazon Q Developer CLI configuration.
- The CLI is executed with a prompt to run a simple test on all the exposed MCP server tools and then gives a final verdict based on the output.
- The CLI must output a final verdict in the format:
    ```
    VERDICT: OK
    or
    VERDICT: FAILED
    ```
- If `VERDICT: OK` is found in the evaluation output, the test passes; otherwise, it fails.

## Usage

### Prerequisites

- [Amazon Q Developer CLI](https://github.com/aws/amazon-q-developer-cli) must be installed and configured. See the [official documentation](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/command-line.html).

### Running Tests

To run the tests, use the following command:

```bash
APIFY_TOKEN="your-apify-token" node run.js "<mcp-server-url>"
```

For example:
```bash
APIFY_TOKEN="your-apify-token" node run.js "https://your-mcp-server.apify.com/mcp"
APIFY_TOKEN="your-apify-token" node run.js "https://your-mcp-server.apify.com/sse"
```

The script will print the evaluation and final verdict.
