'use strict';

const getList = require('./handlers/activities/get_list');

exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/activities',
    config: {
      description: 'return the list of activites in json',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: getList

    }

  });

  return next();
};

exports.register.attributes = {
  name: 'Activities'
};
