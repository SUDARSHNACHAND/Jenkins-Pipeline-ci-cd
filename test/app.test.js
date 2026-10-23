const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('../src/app.js');

let server;
let baseUrl;

test.before((t, done) => {
  server = http.createServer(app);
  server.listen(0, '127.0.0.1', () => {
    const port = server.address().port;
    baseUrl = `http://127.0.0.1:${port}`;
    done();
  });
});

test.after((t, done) => {
  server.close(done);
});

test('GET /health returns 200 and status UP', async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.strictEqual(res.status, 200);

  const data = await res.json();
  assert.strictEqual(data.status, 'UP');
  assert.ok(typeof data.uptime === 'number');
  assert.ok(data.timestamp);
});

test('GET /api/info returns portfolio metadata', async () => {
  const res = await fetch(`${baseUrl}/api/info`);
  assert.strictEqual(res.status, 200);

  const data = await res.json();
  assert.strictEqual(data.role, 'DevOps Engineer');
  assert.ok(data.name.includes('SUDARSHNA CHAND'));
});

test('GET / returns HTML dashboard with resume details', async () => {
  const res = await fetch(`${baseUrl}/`);
  assert.strictEqual(res.status, 200);
  assert.match(res.headers.get('content-type'), /text\/html/);

  const html = await res.text();
  assert.ok(html.includes('SUDARSHNA CHAND M S'));
  assert.ok(html.includes('DevOps Engineer'));
  assert.ok(html.includes('Jenkins CI/CD Automation'));
  assert.ok(html.includes('DEPLOYED &amp; HEALTHY'));
});
