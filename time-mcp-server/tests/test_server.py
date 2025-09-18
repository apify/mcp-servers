import subprocess
import sys
import time

def test_server_launch():
    """Basic test: launches the MCP server and checks it starts."""
    proc = subprocess.Popen(
        ["uvx", "mcp-server-time"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    try:
        # Wait briefly for server to start
        time.sleep(2)
        assert proc.poll() is None, "Server process exited early"
    finally:
        proc.terminate()
        proc.wait(timeout=5)
