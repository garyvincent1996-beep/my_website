import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../front_end/', import.meta.url));
const files = await readdir(root);
const html = new Map();
for (const file of files.filter(file => file.endsWith('.html'))) html.set(file, await readFile(path.join(root, file), 'utf8'));
assert(html.has('index.html'), 'Missing root entry index.html');
assert(html.has('404.html'), 'Missing 404 page');
const idsFor = source => [...source.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)].map(match => match[1]);
async function checkLink(file, link) {
    if (/^(?:https?:|mailto:|data:|tel:)/i.test(link)) return;
    assert(!link.startsWith('/'), `${file}: use a relative reference: ${link}`);
    const [targetWithQuery, fragment] = link.split('#');
    const target = decodeURIComponent(targetWithQuery.split('?')[0]);
    const resolved = path.resolve(root, path.dirname(file), target || path.basename(file));
    const relative = path.relative(root, resolved);
    assert(!relative.startsWith('..') && !path.isAbsolute(relative), `${file}: reference escapes published directory`);
    assert((await stat(resolved).catch(() => null))?.isFile(), `${file}: missing ${link}`);
    if (fragment && path.extname(resolved) === '.html') {
        const source = await readFile(resolved, 'utf8');
        assert(idsFor(source).includes(decodeURIComponent(fragment)), `${file}: missing anchor ${link}`);
    }
}
const titles = new Set();
const descriptions = new Set();
for (const [file, source] of html) {
    assert.equal([...source.matchAll(/<h1\b/gi)].length, 1, `${file}: expected one h1`);
    assert.equal([...source.matchAll(/<main\b/gi)].length, 1, `${file}: expected one main`);
    assert(source.includes('name="viewport"'), `${file}: missing viewport`);
    const ids = idsFor(source);
    assert.equal(ids.length, new Set(ids).size, `${file}: duplicate IDs`);
    assert(ids.includes('content'), `${file}: missing content target`);
    if (file !== '404.html') assert.equal([...source.matchAll(/aria-current="page"/g)].length, 1, `${file}: active navigation`);
    const title = source.match(/<title>(.*?)<\/title>/s)?.[1];
    const description = source.match(/<meta\s+name="description"\s+content="([^"]+)"/s)?.[1];
    assert(title && !titles.has(title), `${file}: missing or duplicate title`); titles.add(title);
    assert(description && !descriptions.has(description), `${file}: missing or duplicate description`); descriptions.add(description);
    for (const match of source.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/g)) await checkLink(file, match[1]);
    assert(!source.includes('homePage.html'), `${file}: outdated homepage link`);
    console.log(`PASS ${file}: structure, metadata, links and assets`);
}
for (const file of files.filter(file => file.endsWith('.css'))) {
    const source = await readFile(path.join(root, file), 'utf8');
    assert.equal((source.match(/{/g) ?? []).length, (source.match(/}/g) ?? []).length, `${file}: unbalanced braces`);
    for (const match of source.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) await checkLink(file, match[1]);
}
console.log('PASS CSS asset references and brace balance');
console.log('Static checks passed. Browser, keyboard, content, and live deployment checks remain manual.');
