// var es = require('../lib/es.js');
require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('api /profile', function () {

  it('updates profile', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var profile = {
        "url": "https://uk.linkedin.com/in/fakeprofile1",
        "connections": 500,
        "fullname": "David Dupont",
        "location": "London, United Kingdom",
        "current": "The best company ever",
        "picture": "https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_150x150_v1.png",
        "contacts": { "email": "fakecontact1@gmail.com","phone":"+44777777777 (Mobile)","im": [ "contactskype (SKYPE)", "ircContact (IRC)"],"address": "London" },
        "summary": "This is the summary of the first profile",
        "skills":[{ "level": 0, "skill": "Agile Methodologies" },{ "level": 0,"skill": "JavaScript" },{ "level": 0, "skill": "Node.js" }],
        "languages":[{"lang": "English", "fluency": "Native or bilingual proficiency"},{"lang" : "French" , "fluency": "Elementary proficiency" } ],
        "experience":{
          "current": [{"title": "JS developer","org": "the best company","date": "October 2014 – Present (1 year 2 months)","desc": "I work as a developer and I'm creating some cool stuff","location": "London, United Kingdom"},{   "title": "Gardener","org": "The lovely tree","date": "October 2013 – Present (2 years 2 months)","desc": "I work as a gardener on my spare time","location": "London, United Kingdom"}],
          "past":[{  "title": "Guitar player","org": "Pink Floyd","date": "October 1984 – October 1985 (1 year)","desc": "I was a guitar hero","location": "The world"},{   "title": "Tennis player","org": "National French Team","date": "October 2010 – October 2013 (3 years)","desc": "I was the number 1","location": "Paris, France"}]}};

      var options = {
        method: 'POST',
        url: '/profile',
        payload: profile
    };

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(200);

        setTimeout(server.inject('/candidate/1' , function (res) {

        expect(res.statusCode).to.equal(200);

        server.stop(done);
      }), 3000);

        // server.stop(done);

      });


    });
  });
});
