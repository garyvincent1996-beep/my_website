(() => {
    const track = document.getElementById('projectCard');
    const prev = document.getElementById('carouselPrev');
    const next = document.getElementById('carouselNext');
    const dotsContainer = document.getElementById('carouselDots');
    if (!track || !prev || !next || !dotsContainer) return;
    const originals = Array.from(track.querySelectorAll('.cards'));
    const count = originals.length;
    if (!count) return;
    const looping = count > 1;
    if (looping) {
        const leading = originals[count - 1].cloneNode(true);
        const trailing = originals[0].cloneNode(true);
        [leading, trailing].forEach(card => {
            card.classList.add('clone');
            card.setAttribute('aria-hidden', 'true');
            card.querySelectorAll('a, button, input, [tabindex]').forEach(el => el.tabIndex = -1);
        });
        track.prepend(leading);
        track.append(trailing);
    }
    const cards = Array.from(track.querySelectorAll('.cards'));
    let current = looping ? 1 : 0;
    let settling;
    let moving = false;
    const realIndex = () => (current - (looping ? 1 : 0) + count) % count;
    const dots = originals.map((card, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Go to book ${index + 1}`);
        dot.addEventListener('click', () => navigate(index + (looping ? 1 : 0)));
        return dot;
    });
    dotsContainer.replaceChildren(...dots);
    function update() {
        cards.forEach((card, i) => card.classList.toggle('active', i === current));
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === realIndex());
            dot.setAttribute('aria-current', i === realIndex() ? 'true' : 'false');
        });
    }
    function center(behavior) {
        const card = cards[current];
        // Layout offsets exclude the active card's scale transform.
        track.scrollTo({left: card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2, behavior});
    }
    function normalize() {
        if (!looping) return;
        if (current === 0 || current === cards.length - 1) {
            current = current === 0 ? count : 1;
            update();
            center('instant');
        }
    }
    function settle() {
        clearTimeout(settling);
        moving = false;
        const centerX = track.getBoundingClientRect().left + track.clientWidth / 2;
        let distance = Infinity;
        cards.forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            const delta = Math.abs(rect.left + rect.width / 2 - centerX);
            if (delta < distance) { distance = delta; current = i; }
        });
        update();
        normalize();
    }
    function navigate(index) {
        clearTimeout(settling);
        current = Math.max(0, Math.min(cards.length - 1, index));
        moving = true;
        update();
        center(matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth');
        settling = setTimeout(settle, 180);
    }
    function step(direction) {
        normalize();
        navigate(current + direction);
    }
    prev.disabled = next.disabled = !looping;
    prev.addEventListener('click', () => step(-1));
    next.addEventListener('click', () => step(1));
    track.addEventListener('scroll', () => {
        clearTimeout(settling);
        settling = setTimeout(settle, 150);
    }, {passive: true});
    track.addEventListener('scrollend', settle);
    // Let a user interrupt an arrow/dot animation with a swipe or wheel gesture.
    const interrupt = () => {
        if (moving) { track.scrollTo({left: track.scrollLeft, behavior: 'instant'}); moving = false; }
    };
    track.addEventListener('pointerdown', interrupt);
    track.addEventListener('wheel', interrupt, {passive: true});
    track.addEventListener('keydown', event => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        step(event.key === 'ArrowLeft' ? -1 : 1);
    });
    window.addEventListener('resize', () => { clearTimeout(settling); update(); center('instant'); });
    update();
    center('instant');
})();
