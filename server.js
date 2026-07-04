// Server-side logic
const express = require('express');
const app = express();
const config = require('./config');
const utils = require('./utils');

// Set up rate limiter
let requests = 0;
let lastRequestTime = 0;

app.use((req, res, next) => {
  const now = new Date().getTime();
  if (now - lastRequestTime > 1000) {
    requests = 0;
  }
  lastRequestTime = now;
  requests++;

  if (requests > config.rateLimit) {
    res.status(429).send('Rate limit exceeded');
    return;
  }

  next();
});

// API endpoints
app.get('/api/rate-limit', (req, res) => {
  res.send(`Rate limit: ${config.rateLimit}`);
});

app.post('/api/rate-limit', (req, res) => {
  const newRateLimit = req.body.rateLimit;
  config.rateLimit = newRateLimit;
  res.send(`Rate limit updated to ${newRateLimit}`);
});

app.get('/api/stats', (req, res) => {
  res.send(`Requests: ${requests}`);
});

// Error handling
app.use((err, req, res, next) => {
  utils.handleError(err);
  res.status(500).send('Internal server error');
});

// Start server
app.listen(config.port, () => {
  utils.log(`Server started on port ${config.port}`);
});