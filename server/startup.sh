#!/bin/bash

# Azure App Service startup script for Node.js applications
echo "Starting Gomoku AI Server..."

# Set default port if not provided by Azure
export PORT=${PORT:-8080}

# Set production environment
export NODE_ENV=production

# Start the application with CommonJS version for better Azure compatibility
echo "Starting server on port $PORT"
node server.cjs