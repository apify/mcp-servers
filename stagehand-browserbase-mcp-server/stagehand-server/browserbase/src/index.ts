import dotenv from "dotenv";
dotenv.config();

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { Tool } from "./tools/tool.js";

import navigate from "./tools/navigate.js";
import snapshot from "./tools/snapshot.js";
import keyboard from "./tools/keyboard.js";
import getText from "./tools/getText.js";
import session from "./tools/session.js";
import common from "./tools/common.js";
import contextTools from "./tools/context.js";

import { Context } from "./context.js";
import type { Config } from "./config.js";

// Configuration schema for Smithery - matches existing Config interface
export const configSchema = z.object({
  browserbaseApiKey: z.string().describe("The Browserbase API Key to use"),
  browserbaseProjectId: z.string().describe("The Browserbase Project ID to use"),
  proxies: z.boolean().optional().describe("Whether or not to use Browserbase proxies"),
  advancedStealth: z.boolean().optional().describe("Use advanced stealth mode. Only available to Browserbase Scale Plan users"),
  context: z.object({
    contextId: z.string().optional().describe("The ID of the context to use"),
    persist: z.boolean().optional().describe("Whether or not to persist the context")
  }).optional(),
  viewPort: z.object({
    browserWidth: z.number().optional().describe("The width of the browser"),
    browserHeight: z.number().optional().describe("The height of the browser")
  }).optional(),
  cookies: z.array(z.object({ // Playwright Cookies Type in Zod format
    name: z.string(),
    value: z.string(),
    domain: z.string(),
    path: z.string().optional(),
    expires: z.number().optional(),
    httpOnly: z.boolean().optional(),
    secure: z.boolean().optional(),
    sameSite: z.enum(['Strict', 'Lax', 'None']).optional()
  })).optional().describe("Cookies to inject into the Browserbase context"),
  server: z.object({
    port: z.number().optional().describe("The port to listen on for SSE or MCP transport"),
    host: z.string().optional().describe("The host to bind the server to. Default is localhost. Use 0.0.0.0 to bind to all interfaces")
  }).optional(),
  tools: z.object({
    browserbase_take_screenshot: z.object({
      omitBase64: z.boolean().optional().describe("Whether to disable base64-encoded image responses")
    }).optional()
  }).optional()
});

// Default function for Smithery
export default function ({ config }: { config: z.infer<typeof configSchema> }) {
  if (!config.browserbaseApiKey) {
    throw new Error('browserbaseApiKey is required');
  }
  if (!config.browserbaseProjectId) {
    throw new Error('browserbaseProjectId is required');
  }

  const server = new McpServer({
    name: 'Browserbase MCP Server',
    version: '1.0.6'
  });

  const internalConfig: Config = config as Config;

  // Create the context, passing server instance and config
  const context = new Context(server.server, internalConfig);

  const tools: Tool<any>[] = [
    ...common,
    ...snapshot,
    ...keyboard,
    ...getText,
    ...navigate,
    ...session,
    ...contextTools,
  ];

  // Register each tool with the Smithery server
  tools.forEach(tool => {
    if (tool.schema.inputSchema instanceof z.ZodObject) {
      server.tool(
        tool.schema.name,
        tool.schema.description,
        tool.schema.inputSchema.shape,
        async (params: z.infer<typeof tool.schema.inputSchema>) => {
          try {
            const result = await context.run(tool, params);
            return result;
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            process.stderr.write(`[Smithery Error] ${new Date().toISOString()} Error running tool ${tool.schema.name}: ${errorMessage}\n`);
            throw new Error(`Failed to run tool '${tool.schema.name}': ${errorMessage}`);
          }
        }
      );
    } else {
      console.warn(
        `Tool "${tool.schema.name}" has an input schema that is not a ZodObject. Schema type: ${tool.schema.inputSchema.constructor.name}`
      );
    }
  });

  return server.server;
}