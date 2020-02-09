const net = require('net');
const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    socket.write(data);
  });
});
server.listen(8888);

const server2 = net.createServer((socket) => {
  socket.once('data', (data) => {
    socket.write(data);
  });
});
server2.listen(9999);