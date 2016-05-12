'use strict'

const getStatus = require('./helpers/get_status');

module.exports = function (request, reply) {

  getStatus(request.payload.user, status => {

    return reply.view('gmdasboard', status);
  })

}
