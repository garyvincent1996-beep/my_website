"""Check the site's pages, local links, assets, and basic accessibility hooks."""
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / 'front_end'
class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.links = []
        self.current = 0
        self.h1 = 0
        self.main = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            assert a['id'] not in self.ids, f'Duplicate ID: {a["id"]}'
            self.ids.add(a['id'])
        if tag == 'h1': self.h1 += 1
        if tag == 'main': self.main += 1
        if a.get('aria-current') == 'page': self.current += 1
        for key in ('href', 'src'):
            if key in a: self.links.append(a[key])

pages = [file for file in ROOT.glob('*.html') if file.name != '404.html']
assert (ROOT / 'index.html').is_file()
assert len(pages) == 5
for file in pages:
    page = Page()
    page.feed(file.read_text(encoding='utf-8-sig'))
    assert page.h1 == 1 and page.main == 1 and page.current == 1, file.name
    assert 'content' in page.ids
    for link in page.links:
        if link.startswith(('https:', 'http:', 'mailto:', 'data:')): continue
        target, _, anchor = link.partition('#')
        assert not target or (ROOT / target).is_file(), f'{file.name}: missing {target}'
        if not target and anchor: assert anchor in page.ids, f'{file.name}: missing #{anchor}'
    print(f'PASS {file.name}: landmarks, active navigation, unique IDs, links, assets')
for file in ROOT.glob('*.css'):
    css = file.read_text(encoding='utf-8-sig')
    assert css.count('{') == css.count('}'), file.name
print('PASS CSS brace balance')
