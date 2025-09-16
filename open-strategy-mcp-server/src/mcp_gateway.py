# This file is copied from the latest Python MCP Actor template.
# Integrate or adapt as needed for your project.




import logging

from mcp import server

from .models import ServerType

logger = logging.getLogger('apify')


def create_mcp_gateway(server_type: ServerType, **kwargs: object) -> server.Server:
    """Create the MCP server instance based on the server type."""
    if server_type == ServerType.HTTP:
        logger.info('Creating HTTP MCP server...')
        # ...template logic for HTTP server...
        return server.Server(**kwargs)
    if server_type == ServerType.STDIO:
        logger.info('Creating STDIO MCP server...')
        # ...template logic for STDIO server...
        return server.Server(**kwargs)
    raise ValueError(f'Unsupported server type: {server_type}')
