# Pure.md MCP Server Actorization Checklist

## Repository Setup
- [x] Check whether the mcp-servers repository is available locally using git status
- [x] Check if the `feat/pure-md-mcp-server` branch exists locally and switch to it

## Programming Language Analysis
- [x] Examine the source repository to determine if it is Python or TypeScript based code
  - **Result**: TypeScript-based stdio MCP server
- [x] Clone repository in the current working directory with name `pure-md-mcp-server-tmp`
- [x] Select template: TypeScript stdio-based template
- [x] Initialize the Actor using Apify-CLI with `apify create pure-md-mcp-server --template ts-mcp-server`
- [x] Navigate to the subdirectory
- [x] Create progress checklist file

## Server Configuration (Stdio-based)
- [x] Install dependencies: dotenv
- [x] Remove unused packages: @modelcontextprotocol/server-everything
- [x] Configure the run command in main.ts to use tsx src/pure-md-server.ts
- [x] Copy and adapt pure.md server code from source repository
- [x] Fix package.json import issue in pure-md-server.ts

## Actor README file
- [x] Update README with Pure.md MCP Server title
- [x] Add short description
- [x] Include connection URL for MCP clients
- [x] Add links to mcp-servers git repo and Apify MCP docs
- [x] Add claim contact info and credits to original authors
- [x] Add Apify badge
- [x] Include relevant information from source repository README

## Pricing Information
- [x] Check the source server tools (unblock-url, search-web)
- [x] Modify billing.ts to match the source server tools
- [x] Update .actor/pay_per_event.json with estimated prices
- [x] Rename tools to match actual server tools

## Actor Configuration
- [x] Update Actor description in .actor/actor.json

## Final Steps
- [x] Update main README.md with new server entry
- [x] Test the server functionality (builds successfully)
- [ ] Commit and push changes

## Tools Identified
- unblock-url: Converts URLs to markdown content
- search-web: Performs web search and returns markdown results
