# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Make sure the main script is executable
RUN chmod +x dist/main.js

# Expose the port the app runs on (default 3000)
EXPOSE 3000

# Define the command to run the application
CMD ["node", "dist/main.js"]
