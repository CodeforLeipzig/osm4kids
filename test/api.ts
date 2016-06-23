/// <reference path="../typings/main.d.ts" />

import chai = require('chai');
import http = require('http');
var app = require('../index');

var expect = chai.expect;
var base_url = 'http://localhost:8000';

describe('/api/schools', function () {
  it('should return 200', function (done) {
    http.get(base_url + '/api/schools', function (res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

describe('/api/doctors', function () {
  it('should return 200', function (done) {
    http.get(base_url + '/api/schools', function (res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

describe('/api/playgrounds', function () {
  it('should return 200', function (done) {
    http.get(base_url + '/api/playgrounds', function (res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});