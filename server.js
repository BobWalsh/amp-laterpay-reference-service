const Hapi = require('hapi');
const good = require('good');
const inert = require('inert');
const fs = require('fs');

const HOST = process.env.NODE_ENV === 'production' ?
    'https://amp-laterpay-demo.herokuapp.com' :
    'http://localhost:8080'

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

function renderTemplate(filePath, data) {
  return new Promise((resolve) => {
    fs.readFile(filePath, 'utf-8', (err, fileData) => {
      const template = new Function('o', 'return `' + fileData + '`')
      resolve(template(data));
    })
  })
}

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
      return reply(renderTemplate('add.html', {
        returnUrl: request.query.return
      }))
    }
  });

  server.route({
    method: 'GET',
    path: '/authorize/add',
    handler: (request, reply) => {
      authorized = true;
      return reply
      .redirect(`${request.query.return}#success=true`)
    }
  });

  server.route({
    method: 'GET',
    path: '/dialog/buy/timepass/{type}',
    handler: (request, reply) => {
      return reply(renderTemplate('buy.html', {
        timepassType: request.params.type,
        returnUrl: request.query.return
      }))
    }
  });

  server.route({
    method: 'GET',
    path: '/authorize/buy/timepass/{type}',
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
      .redirect('/index.html')
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
        .header('Cache-Control', 'no-cache no-store must-revalidate')
        .header('Pragma', 'no-cache')
        .header('Expires', 0)
        .header('AMP-Access-Control-Allow-Source-Origin', HOST)
        .header('Access-Control-Allow-Origin', HOST)
      } else {
        return reply({
          access: false,
          apl: HOST + '/already_purchased',
          timepasses: [
            {
              title: '',
              description: 'This pass allows access to the content for a week',
              price: {
                USD: 99
              },
              purchase_type: 'sis',
              purchase_url: HOST + '/dialog/buy/timepass/weekly',
              tp_title: 'Weekly pass',
              validity_unit: 'd',
              validity_value: 1
            }
          ],
          premiumcontent: {
            price: {
              USD: 15
            },
            purchase_url: HOST + '/dialog/add',
            purchase_type: 'ppu'
          }
        })
        .header('Cache-Control', 'no-cache no-store must-revalidate')
        .header('Pragma', 'no-cache')
        .header('Expires', 0)
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
