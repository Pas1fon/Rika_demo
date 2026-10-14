import { createServer } from 'node:http';
import { createReadStream, realpathSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { dirname, extname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const options = { host: '127.0.0.1', port: 4173 };
const args = process.argv.slice(2);

function usage() {
  console.log('RIKA frontend prototype\nUsage: node server.mjs [--port 4173] [--host 127.0.0.1]');
}

for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];
  if (arg === '--help' || arg === '-h') {
    usage();
    process.exit(0);
  }
  const [key, ...inlineValue] = arg.split('=');
  if (key !== '--port' && key !== '--host') {
    console.error(`Unknown option: ${arg}`);
    usage();
    process.exit(1);
  }
  const value = inlineValue.length ? inlineValue.join('=') : args[++index];
  if (!value || value.startsWith('--')) {
    console.error(`Missing value for ${key}`);
    process.exit(1);
  }
  options[key.slice(2)] = value;
}

if (!/^\d+$/.test(String(options.port)) || Number(options.port) < 1 || Number(options.port) > 65535) {
  console.error('Port must be an integer between 1 and 65535.');
  process.exit(1);
}
options.port = Number(options.port);

let root;
try {
  root = realpathSync(resolve(dirname(fileURLToPath(import.meta.url)), 'dist'));
} catch {
  console.error('Cannot find dist/. Keep server.mjs next to the dist folder.');
  process.exit(1);
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
};

function insideRoot(path) {
  const location = relative(root, path);
  return location !== '..' && !location.startsWith(`..${sep}`) && !isAbsolute(location);
}

function respond(request, response, status, message, extraHeaders = {}) {
  response.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Length': Buffer.byteLength(message),
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-store',
    ...extraHeaders,
  });
  response.end(request.method === 'HEAD' ? undefined : message);
}

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    respond(request, response, 405, 'This prototype only serves files; no data is submitted.\n', { Allow: 'GET, HEAD' });
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent((request.url ?? '/').split('?')[0]);
  } catch {
    respond(request, response, 400, 'Invalid request path.\n');
    return;
  }
  // Check the original decoded path before resolution so traversal is rejected,
  // including encoded separators and Windows paths. Hidden files are not served.
  if (!pathname.startsWith('/') || /[\0\\:]/.test(pathname) || pathname.split('/').some(part => part.startsWith('.'))) {
    respond(request, response, 403, 'Forbidden.\n');
    return;
  }

  try {
    let target = resolve(root, `.${pathname}`);
    if (!insideRoot(target)) {
      respond(request, response, 403, 'Forbidden.\n');
      return;
    }
    let info = await stat(target);
    if (info.isDirectory()) {
      target = resolve(target, 'index.html');
    }
    target = realpathSync(target);
    if (!insideRoot(target)) {
      respond(request, response, 403, 'Forbidden.\n');
      return;
    }
    info = await stat(target);
    if (!info.isFile()) {
      respond(request, response, 404, 'Not found.\n');
      return;
    }
    response.writeHead(200, {
      'Content-Type': mimeTypes[extname(target).toLowerCase()] ?? 'application/octet-stream',
      'Content-Length': info.size,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-store',
    });
    if (request.method === 'HEAD') {
      response.end();
      return;
    }
    const stream = createReadStream(target);
    stream.on('error', () => response.destroy());
    response.on('close', () => stream.destroy());
    stream.pipe(response);
  } catch (error) {
    const status = error.code === 'ENOENT' || error.code === 'ENOTDIR' ? 404 : 500;
    respond(request, response, status, status === 404 ? 'Not found.\n' : 'Unable to read file.\n');
  }
});

server.on('error', error => {
  console.error(error.code === 'EADDRINUSE'
    ? `Port ${options.port} is already in use. Try: node server.mjs --port ${options.port < 65535 ? options.port + 1 : 4173}`
    : `Could not start server: ${error.message}`);
  process.exitCode = 1;
});

server.listen(options.port, options.host, () => {
  const address = options.host.includes(':') ? `[${options.host}]` : options.host;
  console.log(`\nRIKA frontend prototype\nOpen http://${address}:${options.port}/\nPress Ctrl+C to stop.\n`);
});
