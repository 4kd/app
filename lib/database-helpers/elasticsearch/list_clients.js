'use strict';

var clientES = require('../../es.js');

/**
* Return list of clients in alphabetical order
* @param {Function} callback - function with error and the  result - list of clients
*/

// $lab:coverage:off$
const compare = function (a,b) {
  if (a.name < b.name)
    return -1;
  else if (a.name > b.name)
    return 1;
  else
    return 0;
}
// $lab:coverage:on$

module.exports = function (callback) {

  var numberClients = 0;

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_CLIENTS,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    body: {
      query: {
        match_all: {},
      },
      sort: { "name": {"order": "asc"}}
    }
  }, function getMoreUntilDone(error, response) {

      var result = [];

      response.hits.hits.forEach(function (clientObject) {
        const client = clientObject._source;
        client.id = clientObject._id;
        result.push(client);
        numberClients += 1;
      });

      if (response.hits.total !== numberClients) {
        clientES.scroll({
          scrollId: response._scroll_id,
          scroll: '30s',
          size: 1000,
        }, getMoreUntilDone);
      } else {

        result = result.sort(compare);
        return callback(error, result);
      }

    });
}
