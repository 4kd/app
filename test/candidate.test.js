require('env2')('.env');
var JWT = require('jsonwebtoken');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('Attempt to return the first candidate: /candidate/1 without authorization', function () {

  it('checks status code 302 of /candidate/1', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject('/candidate/1' , function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});


describe('Return the first candidate: /candidate/1', function () {

  it('checks status code 200 of /candidate/1', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "GET",
      url: "/candidate/1",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true}
    };

    Server.init(0, function (err, server) {

      var redisClient = require('redis-connection')();

      redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
        server.inject(options, function(res) {
          expect(err).to.not.exist();
          expect(res.statusCode).to.equal(200);
          server.stop(done);
        });
      });
    });
  });
});

describe('Return the first candidate: /candidate/1/London and highlight London' , function () {

  it('checks status code 200 of /candidate/1/London and highlight London', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "GET",
      url: "/candidate/1/London",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true}
    };

    Server.init(0, function (err, server) {

      var redisClient = require('redis-connection')();

      redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
        server.inject(options, function(res) {
          expect(err).to.not.exist();
          expect(res.statusCode).to.equal(200);
          server.stop(done);
        });
      });
    });
  });
});