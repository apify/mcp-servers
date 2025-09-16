"""OSP Marketing Tools server implementation."""

import os
import asyncio
import json
from typing import Dict, Any, List

from mcp.server.fastmcp import FastMCP
from mcp.types import TextContent

def get_logger(name: str):
    import logging
    logger = logging.getLogger(name)
    return logger

logger = get_logger(__name__)

# Create server instance using FastMCP
mcp = FastMCP("osp_marketing_tools")

@mcp.tool()
async def health_check() -> dict:
    """Check if the server is running and can access its resources"""
    return {
        "status": "healthy",
        "resources": ["osp://marketing-tools"],
        "version": "0.1.0"
    }

@mcp.tool()
async def get_editing_codes() -> dict:
    """Get the Open Strategy Partners (OSP) editing codes documentation and usage protocol for editing texts."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    try:
        with open(os.path.join(script_dir, 'codes-llm.md'), 'r') as f:
            content = f.read()
            return {
                "success": True,
                "data": {
                    "content": content
                }
            }
    except FileNotFoundError:
        return {
            "success": False,
            "error": "Required file 'codes-llm.md' not found in script directory"
        }

@mcp.tool()
async def get_writing_guide() -> dict:
    """Get the Open Strategy Partners (OSP) writing guide and usage protocol for editing texts."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    try:
        with open(os.path.join(script_dir, 'guide-llm.md'), 'r') as f:
            content = f.read()
            return {
                "success": True,
                "data": {
                    "content": content
                }
            }
    except FileNotFoundError:
        return {
            "success": False,
            "error": "Required file 'writing-llm.md' not found in script directory"
        }   

@mcp.tool()
async def get_meta_guide() -> dict:
    """Get the Open Strategy Partners (OSP) Web Content Meta Information Generation System (titles, meta-titles, slugs)."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    try:
        with open(os.path.join(script_dir, 'meta-llm.md'), 'r') as f:
            content = f.read()
            return {
                "success": True,
                "data": {
                    "content": content
                }
            }
    except FileNotFoundError:
        return {
            "success": False,
            "error": "Required file 'meta-llm.md' not found in script directory"
        }

@mcp.tool()
async def get_value_map_positioning_guide() -> dict:
    """Get the Open Strategy Partners (OSP) Product Communications Value Map Generation System for Product Positioning (value cases, feature extraction, taglines)."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    try:
        with open(os.path.join(script_dir, 'product-value-map-llm.md'), 'r') as f:
            content = f.read()
            return {
                "success": True,
                "data": {
                    "content": content
                }
            }
    except FileNotFoundError:
        return {
            "success": False,
            "error": "Required file 'product-value-map-llm.md' not found in script directory"
        }

@mcp.tool()
async def get_on_page_seo_guide() -> dict:
    """Get the Open Strategy Partners (OSP) On-Page SEO Optimization Guide."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    try:
        with open(os.path.join(script_dir, 'on-page-seo-guide.md'), 'r') as f:
            content = f.read()
            return {
                "success": True,
                "data": {
                    "content": content
                }
            }
    except FileNotFoundError:
        return {
            "success": False,
            "error": "Required file 'on-page-seo-guide.md' not found in script directory"
        }


def main() -> None:
    """Run the MCP server."""
    try:
        mcp.run()
    except Exception as e:
        print(f"Error starting server: {str(e)}")
        raise

if __name__ == "__main__":
    main()
