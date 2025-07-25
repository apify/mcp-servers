# Contributing to MCP Servers

This project is developed and maintained by the Apify team. We don't expect code contributions to this repository, but we encourage the community to build and develop their own MCP servers.

## 🤝 How to contribute

### Building your own MCP servers

We encourage developers to create their own MCP servers! Here are some resources to get started:

- **[Python MCP server template](https://apify.com/templates/python-mcp-server)** - For Python-based MCP servers
- **[TypeScript MCP server template](https://apify.com/templates/ts-mcp-server)** - For TypeScript-based MCP servers
- **[MCP Documentation](https://modelcontextprotocol.io/)** - Official MCP specification and guides
- **[Apify MCP Documentation](https://mcp.apify.com/)** - Learn about publishing MCP servers on Apify

### Reporting issues

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a new issue, please include:

- A clear and descriptive title
- A detailed description of the problem
- Steps to reproduce the issue
- Expected vs actual behavior
- Environment information (OS, Node.js/Python version, etc.)
- Any relevant error messages or logs

### Suggesting enhancements

We welcome feature requests! When suggesting enhancements:

- Describe the feature in detail
- Explain why this feature would be useful
- Provide examples of how it would work
- Consider implementation complexity

### Claiming a server

If you are the original developer of any MCP server in this collection and would like to claim ownership or have any concerns, please write to [ai@apify.com](mailto:ai@apify.com).

## 🏗️ Project structure

This monorepo contains multiple MCP servers:

- **TypeScript servers**: `*-mcp-server/` directories with Node.js/TypeScript implementations
- **Python servers**: `*-mcp-server/` directories with Python implementations
- **Shared resources**: Common configurations and utilities

Each server should be self-contained with its own:
- `package.json` or `requirements.txt`
- `Dockerfile`
- `README.md`
- Tests and documentation

## 🐛 Bug reports

When reporting bugs, please include:

- Server name and version
- MCP client being used
- Complete error messages
- Steps to reproduce
- Environment details

## 🚀 Getting help

- Check existing issues and discussions
- Join our community channels
- Review the documentation for each server
- Visit [mcp.apify.com](https://mcp.apify.com) for comprehensive MCP resources

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for your interest in our MCP servers! 🎉 