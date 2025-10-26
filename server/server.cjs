const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

console.log('🚀 Starting Gomoku AI Server (CommonJS version)...');
console.log('📍 Current working directory:', process.cwd());
console.log('🔧 Node version:', process.version);
console.log('📦 Environment:', process.env.NODE_ENV || 'development');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check first
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    node: process.version,
    env: process.env.NODE_ENV || 'development'
  });
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

// Serve static files from the client build
const publicPath = path.join(__dirname, 'public');
console.log('📁 Public directory path:', publicPath);

// Check if public directory exists
const fs = require('fs');
if (fs.existsSync(publicPath)) {
  console.log('✅ Public directory found');
  const indexPath = path.join(publicPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('✅ index.html found');
  } else {
    console.log('⚠️ index.html not found in public directory');
  }
} else {
  console.log('❌ Public directory not found');
}

app.use(express.static(publicPath));

// Simple AI endpoints without imports for now
app.get('/api/ai/status', (req, res) => {
  res.json({
    status: {
      classic: 'available',
      gemini: process.env.GEMINI_API_KEY ? 'available' : 'not-configured'
    },
    timestamp: new Date().toISOString()
  });
});

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    const indexFile = path.join(__dirname, 'public', 'index.html');
    if (fs.existsSync(indexFile)) {
      res.sendFile(indexFile);
    } else {
      res.status(404).send('Client application not found. Please ensure the build files are present.');
    }
  } else {
    res.status(404).json({ error: 'API endpoint not found' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Global error handlers
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(PORT, () => {
  console.log(`🚀 Gomoku AI Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💡 API available at http://localhost:${PORT}/api`);
}).on('error', (error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});