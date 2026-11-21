(() => {
    const pages = [
        {name:'Home',url:'index.html',terms:'home welcome introduction'},
        {name:'About',url:'aboutPage.html',terms:'about developer person story background'},
        {name:'Books',url:'books_page.html',terms:'books writing self a self b self c falling star family apoccalypse apocalypse stories'},
        {name:'Career',url:'careerPage.html',terms:'career work software front end back end open source development'},
        {name:'Contact',url:'referencesPage.html',terms:'contact connect hello opportunities'}
    ];
    const form = document.querySelector('.site-search form');
    form?.addEventListener('submit', event => {
        event.preventDefault();
        const query = form.querySelector('input').value.trim().toLowerCase();
        const results = form.querySelector('.search-results');
        results.replaceChildren();
        const matches = query ? pages.filter(page => query.split(/\s+/).every(term => page.terms.includes(term))) : [];
        matches.forEach(page => {
            const link = document.createElement('a');
            link.href = page.url;
            link.textContent = `${page.name} ↗`;
            results.append(link);
        });
        if (!matches.length) {
            const message = document.createElement('p');
            message.textContent = 'No matching pages. Try “books”, “about”, or “career”.';
            results.append(message);
        }
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            const search = document.querySelector('.site-search');
            if (search?.open) {search.open = false; search.querySelector('summary').focus();}
        }
    });
    if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
            });
        }, {threshold:0.08});
        document.querySelectorAll('.collection, .crawlStep, .closing, .career-grid article').forEach(section => {
            section.classList.add('reveal-ready'); observer.observe(section);
        });
    }
})();
