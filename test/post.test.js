'use strict';

const roi = require('../lib/roi');

const FakeServer = require('./fake-server');
const FakeRedirectionServer = require('./fake-redirection-server');

test('POST.', () => {
  expect.assertions(1);
  const server = FakeServer.create(3058);
  const foo = {};
  return roi.post('http://localhost:3058/posts', foo)
    .then(response => {
      expect(response.statusCode).toBe(201);
      server.close();
    }).catch(e => {
      console.error(e);
      server.close();
    });
});

test('POST - Redirect.', () => {
  expect.assertions(1);
  const redirectServer = FakeRedirectionServer.create();
  const server = FakeServer.create(3000);

  const foo = {
    title: 'foo-json',
    author: 'bgold'
  };

  return roi.post('http://localhost:3001/01.html', foo)
    .then(response => {
      expect(response.statusCode).toBe(201);
      redirectServer.close();
      server.close();
    }).catch(e => {
      console.error(e);
      server.close();
    });
});

test('POST - Succeed to 404.', () => {
  expect.assertions(1);
  const server = FakeServer.create(3059);
  return roi.post('http://localhost:3059/foo.html')
    .then(response => {
      expect(response.statusCode).toBe(404);
      server.close();
    })
    .catch(e => {
      console.error(e);
      server.close();
    });
});
