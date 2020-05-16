const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.server({
  host: 'localhost',
  port: 8000
});

server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, h) => {
    return 'hello world';
  }
});

const init = async () => {
  await server.register(Inert);

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true
      }
    }
  });

  await server.start();
  
  console.log('Server running at: ', server.info.uri);
};

init();
