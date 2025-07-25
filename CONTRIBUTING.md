# Contributing to MCP Servers

Thank you for your interest in contributing to the Apify MCP Servers monorepo! This document provides guidelines and information for contributors, including a comprehensive checklist for MCP server actorization.

## 🤝 How to contribute

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

### Code contributions

#### Prerequisites

- Node.js (for TypeScript servers)
- Python 3.8+ (for Python servers)
- Docker (for containerized deployments)
- Git
- Apify CLI

#### Development setup

1. Fork the repository
2. Clone your fork locally
3. Install dependencies for the specific server you're working on:
   ```bash
   # For TypeScript servers
   cd <server-name>
   npm install
   
   # For Python servers
   cd <server-name>
   pip install -r requirements.txt
   ```

#### Coding standards

- **TypeScript servers**: Follow the existing ESLint configuration
- **Python servers**: Follow PEP 8 style guidelines
- Write clear, descriptive commit messages
- Include tests for new functionality
- Update documentation as needed

#### Testing

Before submitting a pull request:

- Run existing tests: `npm test` or `python -m pytest`
- Test the server manually with an MCP client
- Ensure Docker builds work correctly
- Verify the server works in different environments

#### Pull request process

1. Create a feature branch from `main`
2. Make your changes with clear commit messages
3. Add or update tests as needed
4. Update documentation if required
5. Ensure all tests pass
6. Submit a pull request with a clear description

### Documentation

We welcome contributions to improve documentation:

- README files for each server
- API documentation
- Usage examples
- Troubleshooting guides

## 🚁 MCP server actorization checklist

### Setup
- [ ] Choose MCP server from registry and test it works
- [ ] Create Actor using template: `apify create service-mcp-server --template ts-mcp-server`
- [ ] Install server dependencies and remove template packages
- [ ] Configure run command in `src/main.ts` or `src/main.py`

### Testing
- [ ] Test locally: `APIFY_META_ORIGIN='STANDBY' ACTOR_WEB_SERVER_PORT=3002 apify run -p`
- [ ] Test with MCP inspector or tester
- [ ] Deploy to Apify: `apify push`

### Documentation
- [ ] Update README with server description, URL, and credits
- [ ] Add Apify badge and MCP client configuration
- [ ] Update `.actor/actor.json` description

### Publication
- [ ] Create PR to `apify/mcp-servers` repository
- [ ] Build Actor in Apify Console (enable standby, set memory/scaling)
- [ ] Test with [Apify MCP tester](https://apify.com/jiri.spilka/tester-mcp-client)
- [ ] Make Actor public

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

## 📝 Code of conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🚀 Getting help

- Check existing issues and discussions
- Join our community channels
- Review the documentation for each server

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to the MCP ecosystem! 🎉 