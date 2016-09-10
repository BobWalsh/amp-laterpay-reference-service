const Hapi = require('hapi');
const good = require('good');
const inert = require('inert');

const server = new Hapi.Server({
  debug: {request: ['read']}
});

let authorized = false;

server.connection({
    host: 'localhost',
    port: 8080
});

server.register([
    inert,
    {
      register: good,
      options: {
        reporters: {
          consoleReporter: [{
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{ log: '*', response: '*' }]
          }, {
              module: 'good-console'
          }, 'stdout']
        }
      }
    },
  ], (err) => {

  if (err) { throw err; }

  server.route({
    method: 'GET',
    path: '/buy-article.html',
    handler: (request, reply) => {
      authorized = true;
      return reply
      .redirect(`${request.query.return}#success=true`)
    }
  });

  server.route({
    method: 'GET',
    path: '/logout',
    handler: (request, reply) => {
      authorized = false;
      return reply
      .redirect('index.html')
    }
  });

  server.route({
    method: 'GET',
    path: '/authorization.json',
    handler: (request, reply) => {
      if (authorized) {
        return reply({access: true, error: false})
        .header('AMP-Access-Control-Allow-Source-Origin', 'http://localhost:8080')
      } else {
        return reply({access: false, error: true})
        .header('AMP-Access-Control-Allow-Source-Origin', 'http://localhost:8080')
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/pingback.json',
    handler: (request, reply) => {
      return reply({ping: 'pong'})
      .header('AMP-Access-Control-Allow-Source-Origin', 'http://localhost:8080')
    }
  })

  server.route({
      method: 'GET',
      path:'/{filename}',
      handler: (request, reply) => {
          return reply
          .file(`./${request.params.filename}`)
          .header('AMP-Access-Control-Allow-Source-Origin', 'http://localhost:8080')
      }
  });

  server.route({
      method: 'GET',
      path:'/',
      handler: (request, reply) => {
          return reply
          .redirect('/index.html')
      }
  });

});

server.start((err) => {
    if (err) { throw err; }
    console.log('Server running at:', server.info.uri);
});
