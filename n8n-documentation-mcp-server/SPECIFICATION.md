Part 1: n8n-MCP Server Specification

This server provides AI assistants with access to n8n node documentation and operations.

🚀 Quick Start

There are several options to run the server. You must use Option 1.

Option 1: npx (Fastest - No Installation!) 🚀

Prerequisites: Node.js installed on your system.

Run directly with npx:
npx n8n-mcp

Example MCP client config:
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "npx",
      "args": ["n8n-mcp"]
    }
  }
}

Part 2: New Billing Logic

This is the new content for src/billing.ts. The {service} placeholder has been replaced with n8n.

import { Actor, log } from 'apify';

const TOOL_USAGE_PRICE_USD = 0.05;

export async function chargeMcpResponse(args: { method: string }): Promise<void> {
    const { method } = args;

    // Charge ONLY if the method corresponds to a tool call
    if (method === 'tools/call') {
        await Actor.charge({ eventName: 'n8n-tool-usage' });
        log.info(`Charged $${TOOL_USAGE_PRICE_USD} for tool usage: ${method}`);
    } else {
        log.info(`Not charging for non-tool-call method: ${method}`);
    }
}