const track = document.getElementById('projectCard');
const prevButton = document.getElementById('carouselPrev');
const nextButton = document.getElementById('carouselNext');
const dotsContainer = document.getElementById('carouselDots');
const items = track ? Array.from(track.querySelectorAll('.cards')) : [];
let dots = [];
let currentIndex = items.length ? Math.floor(items.length / 2) : 0;
let scrollTimeout;
let isProgrammaticScroll = false;

function wrapIndex(index) {
    if (!items.length) return 0;
    return ((index % items.length) + items.length) % items.length;
}

function reorderAroundActive(index) {
    if (!track || !items.length) return;
    const activeIndex = wrapIndex(index);
    const startIndex = wrapIndex(activeIndex - 1);
    const ordered = [];

    for (let i = 0; i < items.length; i++) {
        ordered.push(items[wrapIndex(startIndex + i)]);
    }

    ordered.forEach((card) => track.appendChild(card));
    currentIndex = activeIndex;
}

function setActiveCard(index, scrollIntoView = true) {
    if (!items.length || !track) return;
    reorderAroundActive(index);
    const visibleCards = Array.from(track.querySelectorAll('.cards'));
    visibleCards.forEach((card, i) => {
        card.classList.toggle('active', i === 1);
    });
    updateDots();
    if (!scrollIntoView) return;
    const activeCard = visibleCards[1];
    if (activeCard) {
        isProgrammaticScroll = true;
        const offsetLeft = activeCard.offsetLeft - (track.clientWidth - activeCard.clientWidth) / 2;
        window.requestAnimationFrame(() => {
            track.scrollTo({ left: offsetLeft, behavior: 'smooth' });
        });
        window.setTimeout(() => {
            isProgrammaticScroll = false;
        }, 400);
    }
}

function updateActiveOnScroll() {
    if (!items.length || !track) return;
    const visibleCards = Array.from(track.querySelectorAll('.cards'));
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;
    let nearestCard = null;
    let nearestDistance = Infinity;

    visibleCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - trackCenter);
        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestCard = card;
        }
    });

    if (nearestCard) {
        const index = items.indexOf(nearestCard);
        if (index !== -1) {
            setActiveCard(index, false);
        }
    }
}

function createDots() {
    if (!dotsContainer || !items.length) return;
    dotsContainer.innerHTML = '';
    dots = items.map((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Go to project ${index + 1}`);
        dot.addEventListener('click', () => setActiveCard(index));
        dotsContainer.appendChild(dot);
        return dot;
    });
    updateDots();
}

function updateDots() {
    if (!dots.length) return;
    const activeIndex = wrapIndex(currentIndex);
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

function handleCardSelection(event) {
    const card = event.target.closest('.cards');
    if (!card || !track.contains(card)) return;
    const index = items.indexOf(card);
    if (index !== -1) {
        setActiveCard(index);
    }
}

if (track && prevButton && nextButton && items.length) {
    createDots();
    prevButton.addEventListener('click', () => setActiveCard(currentIndex - 1));
    nextButton.addEventListener('click', () => setActiveCard(currentIndex + 1));
    track.addEventListener('click', handleCardSelection);
    track.addEventListener('scroll', () => {
        if (isProgrammaticScroll) return;
        window.clearTimeout(scrollTimeout);
        scrollTimeout = window.setTimeout(updateActiveOnScroll, 120);
    });
    window.addEventListener('resize', () => setActiveCard(currentIndex));
    setTimeout(() => setActiveCard(currentIndex), 0);
}

