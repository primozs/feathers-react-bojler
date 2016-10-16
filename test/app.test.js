const request = require('request');
process.env.NODE_ENV = 'test';
const app = require('../server/app');

describe('Feathers application tests', function() {
  beforeAll(function(done) {
    this.server = app.listen(3030);
    this.server.once('listening', () => done());
  });

  afterAll(function(done) {
    this.server.close(done);
  });

  it('starts and shows the index page', function(done) {
    request('http://localhost:3030', function(err, res, body) {
      expect(body.indexOf('<html>')).not.toBe(-1);
      done(err);
    });
  });

  describe('404', function() {
    it('shows a 404 HTML page', function(done) {
      request({
        url: 'http://localhost:3030/path/to/nowhere',
        headers: {
          'Accept': 'text/html'
        }
      }, function(err, res, body) {
        expect(res.statusCode).toBe(404);
        expect(body.indexOf('<html>')).not.toBe(-1);
        done(err);
      });
    });

    it('shows a 404 JSON error without stack trace', function(done) {
      request({
        url: 'http://localhost:3030/path/to/nowhere',
        json: true
      }, function(err, res, body) {
        expect(res.statusCode).toBe(404);
        expect(body.code).toBe(404);
        expect(body.message).toBe('Page not found');
        expect(body.name).toBe('NotFound');
        done(err);
      });
    });
  });
});

delete process.env.NODE_ENV;
