const EventEmitter = require('events').EventEmitter;
const channel = new EventEmitter();
channel.on('join', () => {
  console.log('Welcome!');
});
channel.on('join', () => {
  console.log('Hello!');
});

channel.emit('join');

channel.on('error', err => {
  console.log('ERROR:', err.message);
});

channel.emit('error', '');

process.on('uncaughtException', err => {
  console.log('uncaught exception');
  console.log(err.stack);
  process.exit(1);
});

throw new Error('global error');
