'use strict';

/**
* Return the list of candidates matching the emails list
*/

'use strict';

var clientES = require('../../../es.js');

module.exports = function (emails, callback) {

  let numberContacts = 0;

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    body: {
      query: {
        terms: {
          "contacts.email.raw": emails
        }
      },
    }
  }, function getMoreUntilDone(error, response) {

    console.log('error', error);

      const result = [];

      response.hits.hits.forEach(function (contact) {

        let profile = {
          fullname: contact._source.fullname,
          id: contact._id,
          email: contact._source.contacts.email
        };

        result.push(profile);
        numberContacts += 1;
      });

      if (response.hits.total !== numberContacts) {
        clientES.scroll({
          scrollId: response._scroll_id,
          scroll: '30s',
          size: 1000,
        }, getMoreUntilDone);
      } else {

        return callback(error, result);
      }

    });
}
