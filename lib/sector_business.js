var es = require('./es.js');
var getList = require('./handlers/sectors/get_list.js');

exports.register = function (server, option, next) {

  server.route(
    {
      method: 'GET',
      path: '/sectors/list',
      config: {
        description: 'return list of sector business',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: getList
      }
    }
    
  );
  return next();
}

exports.register.attributes = {
  name: 'Sectors'
}
