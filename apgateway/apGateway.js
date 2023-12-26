const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy middleware for forwarding requests to the appropriate services
const locationManagementProxy = createProxyMiddleware({
  target: 'http://localhost:3001', // Replace with the location management service URL
  changeOrigin: true,
});
const userAuthProxy = createProxyMiddleware({
  target: 'http://localhost:3002', // Replace with the user authentication service URL
  changeOrigin: true,
});

// Forward requests to the respective services based on the URL path
app.use('/location', locationManagementProxy);
app.use('/auth', userAuthProxy);

// Start the API Gateway server
app.listen(4000, () => {
  console.log('API Gateway server is running on port 4000');
});
