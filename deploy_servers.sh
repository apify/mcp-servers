#!/bin/bash
# Simple MCP Servers Deployment Script
# Usage: ./deploy_servers.sh [python|typescript|all] [server1 server2 ...]
# Vibe-coded!!! Please take with a grain of salt.

# dictionary - when run it install dependencies
# docfork is not working - NO TOOLS
# pubmed - Failed to parse JSONRPC message from server:

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Server configurations: "server_name:type:env_vars"
declare -A SERVERS=(
    # Python servers
    ["calculator-MCP-server"]="python:"
    ["context7-mcp-server"]="python:CONTEXT7_API_KEY"
    ["dictionary-mcp-server"]="python:"
    ["docfork-mcp-server"]="python:"
    ["financial-datasets-mcp-server"]="python:FINANCIAL_DATASETS_API_KEY"
    ["kiwi-mcp-server"]="python:"
    ["mindmap-mcp-server"]="python:"
    ["open-strategy-partners-mcp-server"]="python:"
    ["pubmed-mcp-server"]="python:"
    ["pypi-mcp-server"]="python:"
    ["slide-speak-mcp-server"]="python:SLIDESPEAK_API_KEY"
    ["time-mcp-server"]="python:"
    ["weather-mcp-server"]="python:"
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

# Update actor with standby configuration
update_actor_standby() {
    local server="$1"
    
    # Get username from auth file
    local username=$(jq -r '.username' ~/.apify/auth.json 2>/dev/null || echo "")
    
    # Get actor name from actor.json file
    local actor_name=$(jq -r '.name' ".actor/actor.json" 2>/dev/null || echo "")
    
    if [[ -z "$username" || -z "$actor_name" ]]; then
        echo -e "${RED}Could not get username or actor name for $server${NC}"
        return 1
    fi
    
    # Construct full actor name
    local full_actor_name="$username/$actor_name"
    
    # Get actor ID from apify CLI
    local actor_id=$(apify actors info "$full_actor_name" --json 2>/dev/null | jq -r '.id' 2>/dev/null || echo "")
    
    if [[ -z "$actor_id" || "$actor_id" == "null" ]]; then
        echo -e "${RED}Could not get actor ID for $server${NC}"
        return 1
    fi
    
    # Get API token from apify auth file
    local api_token=$(jq -r '.token' ~/.apify/auth.json 2>/dev/null || echo "")
    
    if [[ -z "$api_token" ]]; then
        echo -e "${RED}Could not get API token${NC}"
        return 1
    fi
    
    # Prepare standby configuration JSON
    local standby_config='{
        "actorStandby": {
            "isEnabled": true,
            "disableStandbyFieldsOverride": false,
            "maxRequestsPerActorRun": 100,
            "desiredRequestsPerActorRun": 50,
            "idleTimeoutSecs": 300,
            "build": "latest",
            "memoryMbytes": 512,
            "shouldPassActorInput": false
        }
    }'
    
    echo "Updating actor standby configuration for $server..."
    
    # Update actor using Apify API
    local response=$(curl -s -L -X PUT "https://api.apify.com/v2/acts/$actor_id" \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer $api_token" \
        -d "$standby_config" 2>/dev/null)
    
    if [[ $? -eq 0 ]]; then
        echo -e "${GREEN}Successfully updated standby configuration for $server${NC}"
        
        # Extract standby URL from response
        local standby_url=$(echo "$response" | jq -r '.data.standbyUrl' 2>/dev/null || echo "")
        
        if [[ -n "$standby_url" && "$standby_url" != "null" ]]; then
            # Append /mcp to the standby URL
            local mcp_url="${standby_url}/mcp"
            echo "Standby URL: $standby_url"
            echo "MCP URL: $mcp_url"
            
            # Create or append to standby_urls.json in the root directory
            local standby_file="../standby_urls.json"
            
            # Create file if it doesn't exist
            if [[ ! -f "$standby_file" ]]; then
                echo '{"mcpUrls": []}' > "$standby_file"
            fi
            
            # Add URL to mcpUrls array with deduplication
            jq --arg url "$mcp_url" '.mcpUrls = (.mcpUrls + [$url] | unique)' "$standby_file" > "$standby_file.tmp" && mv "$standby_file.tmp" "$standby_file"
            
            echo -e "${GREEN}Added MCP URL to standby_urls.json${NC}"
        else
            echo -e "${RED}Could not extract standby URL from response${NC}"
        fi
    else
        echo -e "${RED}Failed to update standby configuration for $server${NC}"
        return 1
    fi
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
    
    pushd "$server" > /dev/null
    add_secrets "$server" "$env_vars"
    
    if apify push; then
        echo -e "${GREEN}Deployed $server${NC}"
        
        # Update actor with standby configuration
        update_actor_standby "$server"
    else
        echo -e "${RED}Failed to deploy $server${NC}"
    fi
    
    popd > /dev/null
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