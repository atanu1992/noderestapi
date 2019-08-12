const http  = require('http');
const app = require('./app');
const config  = require('config');
const port  = config.get('configuration.webServer.PORT') || 3000;

// creating server
const server  = http.createServer(app);
server.listen(port);