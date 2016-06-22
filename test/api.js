var assert = require('assert'),
    http = require('http');

describe('/schools', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:8000/api/schools', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('/doctors', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:8000/api/doctors', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});