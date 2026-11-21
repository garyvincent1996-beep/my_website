import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../front_end/', import.meta.url));
const port = Number(process.argv[2] ?? 8080);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Use a port from 1 to 65535.');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
const server = http.createServer(async (req, res) => {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return; }
    let filename;
    try {
        const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
        filename = path.resolve(root, '.' + pathname);
        const relative = path.relative(root, filename);
        if (relative.startsWith('..') || path.isAbsolute(relative) || pathname.includes('\\')) {
            res.writeHead(403); res.end('Forbidden'); return;
        }
        if ((await stat(filename)).isDirectory()) filename = path.join(filename, 'index.html');
        const body = await readFile(filename);
        res.writeHead(200, { 'Content-Type': types[path.extname(filename)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
        res.end(req.method === 'HEAD' ? undefined : body);
    } catch (error) {
        if (error instanceof URIError) { res.writeHead(400); res.end('Invalid URL'); return; }
        if (!['ENOENT', 'ENOTDIR'].includes(error.code)) { console.error(error.message); res.writeHead(500); res.end('Preview error'); return; }
        const body = (await readFile(path.join(root, '404.html'), 'utf8').catch(() => 'Page not found')).replace('href="index.html"', 'href="/"');
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(req.method === 'HEAD' ? undefined : body);
    }
});
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`Preview: http://127.0.0.1:${port} (Ctrl+C to stop)`));
