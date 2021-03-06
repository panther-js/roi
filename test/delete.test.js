'use strict';

const roi = require('../lib/roi');

const FakeServer = require('./fake-server');
const FakeRedirectionServer = require('./fake-redirection-server');

test('DELETE - Succeed to 404.', () => {
  expect.assertions(1);
  const server = FakeServer.create(6000);
  return roi.del('http://localhost:6000/foo.html')
    .then(response => {
      expect(response.statusCode).toBe(404);
      server.close();
    })
    .catch(e => {
      console.error(e);
      server.close();
    });
});

test('DELETE - Redirect and delete.', () => {
  expect.assertions(1);
  const redirectServer = FakeRedirectionServer.create();
  const server = FakeServer.create(3000);
  return roi.del('http://localhost:3001/01.html')
    .then(response => {
      expect(response.statusCode).toBe(200);
      redirectServer.close();
      server.close();
    }).catch(e => {
      console.error(e);
      server.close();
      redirectServer.close();
    });
});
