const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5050;

console.log('🔎 Starting simple CommonJS test server...');
console.log('📍 cwd:', process.cwd());
console.log('🔧 node version:', process.version);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'simple', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.send('Simple server is running. Use /api/health to check.');
});

app.listen(PORT, () => {
  console.log(`✅ Simple server listening on port ${PORT}`);
});

// basic error handlers
process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err && err.stack ? err.stack : err);
});

process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection', reason);
});
