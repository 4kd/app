'use strict';

/**
* Just return the login page for the clients
*/

module.exports = function(request, reply) {

  return reply.view('loginClient', {title: 'Login'}, { layout: 'client' });
}
