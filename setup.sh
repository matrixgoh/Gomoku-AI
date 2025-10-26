#!/bin/bash

# Gomoku AI - Setup Script
# This script installs dependencies and sets up the development environment

echo "🎯 Setting up Gomoku AI application..."
echo ""

# Check if we're in the right directory
if [ ! -d "client" ] || [ ! -d "server" ]; then
    echo "❌ Error: This script must be run from the root directory containing 'client' and 'server' folders"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
if npm install; then
    echo "✅ Server dependencies installed successfully"
else
    echo "❌ Failed to install server dependencies"
    exit 1
fi

# Install client dependencies
echo ""
echo "📦 Installing client dependencies..."
cd ../client
if npm install; then
    echo "✅ Client dependencies installed successfully"
else
    echo "❌ Failed to install client dependencies"
    exit 1
fi

# Return to server directory
cd ../server

# Set up environment file
echo ""
echo "⚙️  Setting up environment configuration..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ Created .env file from template"
    echo ""
    echo "📝 IMPORTANT: Edit server/.env file and add your Gemini API key:"
    echo "   GEMINI_API_KEY=your_actual_api_key_here"
    echo ""
    echo "   Get your API key from: https://makersuite.google.com/app/apikey"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Add your Gemini API key to server/.env (optional but recommended)"
echo "   2. Build and start the application:"
echo ""
echo "      cd server"
echo "      npm run build    # Build client and copy to server"
echo "      npm start        # Start the server"
echo ""
echo "   3. Open http://localhost:3001 in your browser"
echo ""
echo "🔧 For development mode:"
echo "      npm run dev      # Start server with auto-reload"
echo ""
echo "📚 See README.md for more detailed instructions"
echo "🎮 Have fun playing Gomoku!"