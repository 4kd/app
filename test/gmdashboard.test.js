require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');
var JWT = require('jsonwebtoken');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('/dashboard', function () {

  it('redirect not authenticated user to the login page', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/dashboard', function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('/dashboard', function () {

  it('display dashboard for authenticated users', function (done) {

    var options = {
      method: "GET",
      url: "/dashboard",
      credentials: { id: "12", "name": "Simon", valid: true}
    };

     Server.init(0, function (err, server) {

      server.inject(options, function(res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});

describe('Access /dashboard/user with authorization', function () {

  it('return dashboard for the user', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var options = {
        method: "POST",
        url: "/dashboard/user",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true, scope: "admin"},
        payload: {user: '12'}
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});

describe('Access /dashboard/client/4', function () {

  it('return dashboard for the user', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var options = {
        method: "POST",
        url: "/dashboard/client/4",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true, scope: "admin"},
        payload: {idUser: '12'}
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});
