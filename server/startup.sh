#!/bin/bash

# Azure App Service startup script for Node.js applications
set -euo pipefail
echo "Starting Gomoku AI Server..."

# Set default port if not provided by Azure
export PORT=${PORT:-8080}

# Set production environment
export NODE_ENV=${NODE_ENV:-production}

echo "Starting server on port $PORT (NODE_ENV=$NODE_ENV)"

# Prefer ESM entrypoint if present, otherwise fall back to CommonJS
if [ -f "$(pwd)/server.js" ]; then
	echo "Using ESM entrypoint: server.js"
	exec node server.js
elif [ -f "$(pwd)/server.cjs" ]; then
	echo "Using CommonJS entrypoint: server.cjs"
	exec node server.cjs
elif [ -f "$(pwd)/simple-server.cjs" ]; then
	echo "Using fallback simple-server.cjs"
	exec node simple-server.cjs
else
	echo "No server entrypoint found (server.js | server.cjs | simple-server.cjs). Exiting." >&2
	exit 1
fi