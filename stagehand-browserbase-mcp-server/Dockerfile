# Use the Node.js 20 base image
FROM apify/actor-node:20

# --- 1. Install ALL dependencies needed for building ---

# Install all dependencies (including dev) for the main actor
COPY package*.json ./
RUN npm install --production=false

# Install all dependencies for Stagehand
COPY stagehand-server/stagehand/package*.json ./stagehand-server/stagehand/
RUN cd stagehand-server/stagehand && npm install --production=false --ignore-scripts

# --- 2. Copy source and build ---
COPY . .

# Build Stagehand
RUN cd stagehand-server/stagehand && npx tsc
RUN chmod +x stagehand-server/stagehand/dist/*.js

# Build the main Actor
RUN npm run build

# --- 3. Prune dev dependencies for a smaller production image ---
RUN npm prune --production

# --- 4. Set the final start command ---
CMD [ "npm", "start" ]