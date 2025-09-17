# TomTom MCP Server - Progress Checklist

## Initial Setup
- [x] Check whether the mcp-servers repository is available locally using git status
- [x] Create feat/tomtom-mcp-server branch and switch to it
- [x] Clone the GitHub repository (https://github.com/tomtom-international/tomtom-mcp) as tomtom-mcp-server-tmp
- [x] Examine the source repository to determine language (TypeScript) and type (stdio-based)
- [x] Create Actor using TypeScript template
- [x] Navigate to subdirectory
- [x] Create progress checklist file

## Programming Language & Server Type
- [x] Determined: TypeScript-based, stdio server
- [x] Selected template: ts-mcp-server

## Stdio-based Configuration
- [x] Install the MCP server package (@tomtom-org/tomtom-mcp)
- [x] Remove unused packages from template
- [x] Configure run command in src/main.ts
- [x] Update checklist with completed tasks

## Actor README file
- [x] Create comprehensive README with TomTom MCP Server title
- [x] Add short description
- [x] Include connection URL
- [x] Add links to repositories and documentation
- [x] Include claim contact info
- [x] Add Apify badge
- [x] Copy relevant content from source repository README
- [x] Update Actor description in .actor/actor.json

## Pricing Information
- [x] Check source server tools
- [x] Modify src/billing.ts to match server tools (current structure works well)
- [x] Update .actor/pay_per_event.json with estimated prices
- [x] Rename tools to match actual server tools (using descriptive TomTom geospatial pricing)

## Final Steps
- [x] Update main README.md with new server entry
- [x] Test the actor (manually in Console)
- [x] Clean up temporary files
