const http = require('http');

const server = http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello Node.js');
});

server.listen(3000, 'localhost');

server.on('listening', () => {
  console.log('Server is listening');
  // server.close();
});

server.on('connection', () => {
  console.log('Client is connected');
});

server.on('close', () => {
  console.log('Server is closed');
});

console.log('Node Server started on port 3000');