# ---- Build stage ----
FROM apify/actor-node:22 AS builder
WORKDIR /usr/src/app

# Copy whole repo (dist/node_modules ignored by .dockerignore)
COPY . .

# Install root deps from lockfile (includes dev deps for building)
RUN npm ci --include=dev --audit=false

# Build inner MCP server (supports single or double nested layout)
RUN set -eux; \
    if [ -d "flightradar24-mcp-server/flightradar24-mcp-server" ]; then \
        INNER="flightradar24-mcp-server/flightradar24-mcp-server"; \
    elif [ -d "flightradar24-mcp-server" ]; then \
        INNER="flightradar24-mcp-server"; \
    else \
        echo "Inner MCP server folder not found" >&2; exit 1; \
    fi; \
    npm ci --include=dev --audit=false --prefix "$INNER"; \
    npm run build --prefix "$INNER"; \
    test -f "$INNER/dist/index.js" || (echo "Missing $INNER/dist/index.js" >&2; ls -R "$INNER"; exit 1)

# Build outer actor (TypeScript -> dist)
RUN npm run build

# ---- Runtime stage ----
FROM apify/actor-node:22
WORKDIR /usr/src/app

# Copy built app and node_modules from builder
COPY --from=builder /usr/src/app /usr/src/app

# Production env
ENV NODE_ENV=production

# Optionally prune dev deps to slim image (safe even if none)
RUN npm prune --omit=dev || true

# Start the Actor (HTTP MCP proxy server)
CMD ["node", "dist/main.js"]
