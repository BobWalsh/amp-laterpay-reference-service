const Hapi = require('hapi');
const good = require('good');
const inert = require('inert');

const server = new Hapi.Server({
  debug: {request: ['read']}
});

let authorized = false;
let timepass = null;

server.connection({
    port: process.env.NODE_ENV === 'production' ? process.env.PORT : 8080,
    routes: {
      cors: {
        credentials: true,
        additionalExposedHeaders: ['AMP-Access-Control-Allow-Source-Origin']
      }
    }
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
    path: '/dialog/add',
    handler: (request, reply) => {
      authorized = true;
      return reply
      .redirect(`${request.query.return}#success=true`)
    }
  });

  server.route({
    method: 'GET',
    path: '/dialog/buy',
    handler: (request, reply) => {
      authorized = true;
      timepass = 'week';
      return reply
      .redirect(`${request.query.return}#success=true`)
    }
  });

  server.route({
    method: 'GET',
    path: '/logout',
    handler: (request, reply) => {
      authorized = false;
      timepass = null;
      return reply
      .redirect('index.html')
    }
  });

  server.route({
    method: 'GET',
    path: '/api/public/amp',
    handler: (request, reply) => {
      if (authorized) {
        return reply({
          access: true,
          error: false
        })
        .header('AMP-Access-Control-Allow-Source-Origin', 'http://localhost:8000')
        .header('Access-Control-Allow-Origin', 'http://localhost:8000')
      } else {
        return reply({
          access: false,
          apl: 'http://localhost:8080/already_purchased',
          timepasses: [
            {
              title: 'Weekly pass',
              description: 'This pass allows access to the content for a week',
              price: {
                EUR: 390
              },
              purchase_type: 'sis',
              purchase_url: 'http://localhost:8080/dialog/buy/timepass/weekly',
              tp_title: 'TP',
              validity_unit: 'd',
              validity_value: 1
            }
          ],
          premiumcontent: {
            price: {
              EUR: 39
            },
            purchase_url: 'http://localhost:8080/dialog/add',
            purchase_type: 'ppu'
          }
        })
        .code(402)
        .header('AMP-Access-Control-Allow-Source-Origin', request.query['__amp_source_origin'], {override: true})
        .header('Access-Control-Allow-Origin', request.query['__amp_source_origin'], {override: true})
      }
    }
  })

  server.route({
      method: 'GET',
      path:'/{filename*}',
      handler: (request, reply) => {
          return reply
          .file(`./${request.params.filename}`)
          //.header('AMP-Access-Control-Allow-Source-Origin', 'http://localhost:8080')
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
