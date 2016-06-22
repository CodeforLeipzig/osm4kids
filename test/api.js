var assert = require('assert'),
var http = require('http');

describe('HTTP status code after GET api/playgrounds/', function () {
  it('should be 200', function (done) {
    http.get('http://localhost:8000/api/playgrounds', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('HTTP status code after GET api/schools/', function () {
  it('should be 200', function (done) {
    http.get('http://localhost:8000/api/schools', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('HTTP status code after GET api/doctors/', function () {
  it('should be 200', function (done) {
    http.get('http://localhost:8000/api/doctors', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});