'use strict';

const getEmailForm = require('./handlers/email/get_email');
const postSendemail = require('./handlers/email/post_sendmail');

exports.register = function (server, options, next) {

  server.route([
  {
    method: 'POST',
    path: '/email',
    config: {
      description: 'create email',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: getEmailForm
    }

  },
  {
    method: 'POST',
    path: '/sendemail',
    config: {
      description: 'send email',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },

      handler: postSendemail

    }
  }
]);

  return next();
};

exports.register.attributes = {
  name: 'Email'
};
