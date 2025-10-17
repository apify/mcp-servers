#!/bin/bash

# Simple MCP Servers Deployment Script
# Usage: ./deploy_servers.sh [python|typescript|all] [server1 server2 ...]

# dictionary is not working
# docfork is not working

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Server configurations: "server_name:type:env_vars"
declare -A SERVERS=(
    # Python servers
    ["weather-mcp-server"]="python:"
    ["calculator-MCP-server"]="python:"
    ["context7-mcp-server"]="python:CONTEXT7_API_KEY"
    ["dictionary-mcp-server"]="python:"
    ["docfork-mcp-server"]="python:"
    ["financial-datasets-mcp-server"]="python:FINANCIAL_DATASETS_API_KEY"
    ["kiwi-mcp-server"]="python:"
    ["mindmap-mcp-server"]="python:"
    ["open-strategy-partners-mcp-server"]="python:"
    ["pubmed-mcp-server"]="python:"
    ["pypi-mcp-server"]="python:PYPI_INDEX_URL,PYPI_INDEX_URLS,PYPI_EXTRA_INDEX_URLS,PYPI_CACHE_TTL,PYPI_LOG_LEVEL,PYPI_REQUEST_TIMEOUT,PYPI_PRIVATE_PYPI_URL,PYPI_PRIVATE_PYPI_USERNAME,PYPI_PRIVATE_PYPI_PASSWORD,PYPI_DEPENDENCY_MAX_DEPTH,PYPI_DEPENDENCY_MAX_CONCURRENT,PYPI_ENABLE_SECURITY_ANALYSIS"
    ["slide-speak-mcp-server"]="python:SLIDESPEAK_API_KEY"
    ["time-mcp-server"]="python:"
    ["wikipedia-mcp-server"]="python:WIKIPEDIA_LANGUAGE"
    
    # TypeScript servers
    ["antvis-chart-mcp-server"]="typescript:"
    ["brave-search-mcp-server"]="typescript:"
    ["browserbase-mcp-server"]="typescript:"
    ["chart-MCP-server"]="typescript:"
    ["deepl-mcp-server"]="typescript:DEEPL_API_KEY"
    ["everart-mcp-server"]="typescript:"
    ["exa-mcp-server"]="typescript:"
    ["explorium-mcp-server"]="typescript:EXPLORIUM_API_KEY"
    ["fetchserp-mcp-server"]="typescript:FETCHSERP_API_TOKEN"
    ["firecrawl-mcp-server"]="typescript:"
    ["flightradar24-mcp-server"]="typescript:"
    ["forevervm-mcp-server"]="typescript:FOREVERVM_TOKEN"
    ["lara-translate-mcp-server"]="typescript:"
    ["microsoft-learn-mcp-server"]="typescript:"
    ["n8n-documentation-mcp-server"]="typescript:"
    ["national-parks"]="typescript:"
    ["olostep-mcp-server"]="typescript:"
    ["op-gg-mcp-server"]="typescript:"
    ["open-meteo-mcp-server"]="typescript:"
    ["perplexity-mcp-server"]="typescript:"
    ["pure-md-mcp-server"]="typescript:PUREMD_API_KEY"
    ["sequentialthinking-mcp-server"]="typescript:"
    ["stagehand-browserbase-mcp-server"]="typescript:OPENAI_API_KEY"
    ["tavily-mcp-server"]="typescript:"
    ["texttoolkit-mcp-server"]="typescript:"
    ["tomtom-mcp-server"]="typescript:TOMTOM_API_KEY"
    ["winston-mcp-server"]="typescript:"
)

# Load .env file
if [[ -f ".env" ]]; then
    set -a
    source .env
    set +a
    echo -e "${GREEN}Loaded .env file${NC}"
fi

# Add secrets for a server
add_secrets() {
    local server="$1"
    local env_vars="$2"
    
    if [[ -z "$env_vars" ]]; then
        return
    fi
    
    IFS=',' read -ra VARS <<< "$env_vars"
    for var in "${VARS[@]}"; do
        var=$(echo "$var" | xargs)
        local value="${!var}"
        if [[ -n "$value" ]]; then
            echo "Adding secret: $var"
            apify secrets add "$var" "$value" > /dev/null 2>&1 || echo "Secret $var already exists"
        fi
    done
}

# Deploy a single server
deploy_server() {
    local server="$1"
    local config="${SERVERS[$server]}"
    
    if [[ -z "$config" ]]; then
        echo -e "${RED}Unknown server: $server${NC}"
        return 1
    fi
    
    local type="${config%%:*}"
    local env_vars="${config#*:}"
    
    echo -e "${BLUE}Deploying [$type] $server${NC}"
    
    if [[ ! -d "$server" ]]; then
        echo -e "${RED}Directory not found: $server${NC}"
        return 1
    fi
    
    cd "$server"
    add_secrets "$server" "$env_vars"
    
    if apify push; then
        echo -e "${GREEN}Deployed $server${NC}"
        # Try to get actor info to find the standby URL
        local actor_info=$(apify actors info "$server" --json 2>/dev/null || echo "")
        if [[ -n "$actor_info" ]]; then
            local standby_url=$(echo "$actor_info" | jq -r '.defaultRunOptions.build' 2>/dev/null || echo "")
            if [[ -n "$standby_url" && "$standby_url" != "null" ]]; then
                echo "Standby URL: $standby_url"
            else
                echo "Console: https://console.apify.com/actors/$server"
            fi
        else
            echo "Console: https://console.apify.com/actors/$server"
        fi
    else
        echo -e "${RED}Failed to deploy $server${NC}"
    fi
    
    cd ..
}

# Main function
main() {
    local filter="${1:-all}"
    shift
    
    if [[ "$filter" == "python" ]]; then
        for server in "${!SERVERS[@]}"; do
            if [[ "${SERVERS[$server]}" == python:* ]]; then
                deploy_server "$server"
            fi
        done
    elif [[ "$filter" == "typescript" ]]; then
        for server in "${!SERVERS[@]}"; do
            if [[ "${SERVERS[$server]}" == typescript:* ]]; then
                deploy_server "$server"
            fi
        done
    elif [[ "$filter" == "all" ]]; then
        for server in "${!SERVERS[@]}"; do
            deploy_server "$server"
        done
    else
        # Deploy specific servers
        for server in "$filter" "$@"; do
            deploy_server "$server"
        done
    fi
}

main "$@"