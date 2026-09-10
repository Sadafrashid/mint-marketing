// ── OUR EXPERTISE — floating 3D portfolio gallery ──────────────────────
(function () {
    const stageRoot = document.getElementById('servicesSlider');
    if (!stageRoot) return;

    const SERVICES = [
        { img: '/service-slide-01-social-media.png', name: 'Social Media Management', desc: 'Strategy-led content calendars and community growth across every platform that matters.' },
        { img: '/service-slide-02.png',              name: 'Photography',              desc: 'Editorial-grade product and brand photography styled for scroll-stopping feeds.' },
        { img: '/service-slide-03.png',              name: 'Branding & Identity',       desc: 'Distinct visual systems, from logotype to guidelines, built to travel across every touchpoint.' },
        { img: '/service-slide-04.png',              name: 'Influencer Marketing',      desc: 'Curated creator partnerships that turn reach into genuine, trusted engagement.' },
        { img: '/service-slide-05.png',              name: 'Content Creation',          desc: 'Reels, motion graphics and short-form video crafted to hold attention and drive shares.' },
        { img: '/service-slide-06.png',              name: 'Web Development',          desc: 'Fast, conversion-focused websites engineered with the same craft as the brand behind them.' },
        { img: '/service-slide-07.png',              name: 'Digital Marketing',         desc: 'Performance campaigns across search and social, measured against real business outcomes.' }
    ];
    const total = SERVICES.length;

    const track   = document.getElementById('galleryTrack');
    const tilt    = document.getElementById('galleryTilt');
    const stage   = stageRoot.querySelector('.gallery-stage');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    const navRoot = document.getElementById('galleryNav');
    const copyEl  = document.getElementById('galleryCopy');
    const nameEl  = document.getElementById('galleryName');
    const descEl  = document.getElementById('galleryDesc');
    const idxEl   = document.getElementById('galleryIndexLabel');

    let current = 0;
    let timer = null;
    const AUTOPLAY_MS = 5200;

    // Build cards
    SERVICES.forEach((s, i) => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.dataset.index = i;
        const webpSrc = s.img.replace(/\.png$/i, '.webp');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-face">
                    <picture>
                        <source srcset="${webpSrc}" type="image/webp">
                        <img src="${s.img}" alt="${s.name}" loading="lazy" decoding="async" draggable="false">
                    </picture>
                    <div class="card-sheen"></div>
                </div>
                <div class="card-reflection" aria-hidden="true">
                    <picture>
                        <source srcset="${webpSrc}" type="image/webp">
                        <img src="${s.img}" alt="" loading="lazy" decoding="async" draggable="false">
                    </picture>
                </div>
            </div>`;
        card.addEventListener('click', () => {
            if (parseInt(card.dataset.index, 10) !== current) goTo(i);
        });
        track.appendChild(card);
    });
    const cards = Array.from(track.querySelectorAll('.gallery-card'));

    // Build nav dots
    SERVICES.forEach((s, i) => {
        const dot = document.createElement('button');
        dot.className = 'gallery-dot';
        dot.setAttribute('aria-label', 'Go to ' + s.name);
        dot.innerHTML = `<span class="dot-num">${String(i + 1).padStart(2, '0')}</span><i class="dot-rail"><b></b></i>`;
        dot.addEventListener('click', () => goTo(i));
        navRoot.appendChild(dot);
    });
    const dots = Array.from(navRoot.querySelectorAll('.gallery-dot'));

    // Position every card relative to the active index, wrapping around
    function layout() {
        cards.forEach((card, i) => {
            let offset = i - current;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const abs = Math.abs(offset);
            let tx = 0, tz = 0, ry = 0, scale = 1, opacity = 1, z = 10, visible = true;

            if (abs === 0) {
                tx = 0; tz = 0; ry = 0; scale = 1; opacity = 1; z = 10;
            } else if (abs === 1) {
                tx = 62 * offset; tz = -200; ry = -26 * offset; scale = 0.8; opacity = 0.6; z = 8;
            } else if (abs === 2) {
                tx = 108 * offset; tz = -420; ry = -32 * offset; scale = 0.62; opacity = 0.3; z = 6;
            } else {
                tx = 130 * offset; tz = -600; ry = -34 * offset; scale = 0.5; opacity = 0; z = 1; visible = false;
            }

            card.style.transform = `translate3d(${tx}%, 0, ${tz}px) rotateY(${ry}deg) scale(${scale})`;
            card.style.opacity = opacity;
            card.style.zIndex = z;
            card.style.filter = abs === 0 ? 'none' : `blur(${Math.min(abs, 2)}px) brightness(${1 - abs * 0.12})`;
            card.classList.toggle('is-active', abs === 0);
            card.dataset.visible = visible;
        });

        dots.forEach((d, i) => d.classList.toggle('active', i === current));

        idxEl.textContent = `${String(current + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

        copyEl.classList.add('swap');
        setTimeout(() => {
            nameEl.textContent = SERVICES[current].name;
            descEl.textContent = SERVICES[current].desc;
            copyEl.classList.remove('swap');
        }, 180);
    }

    function goTo(i) {
        current = ((i % total) + total) % total;
        layout();
        restartAutoplay();
    }
    function next() { goTo(current + 1); }
    function prevCard() { goTo(current - 1); }

    function restartAutoplay() {
        clearInterval(timer);
        dots.forEach(d => { const b = d.querySelector('.dot-rail b'); b.style.transition = 'none'; b.style.width = '0%'; });
        void navRoot.offsetWidth;
        const activeRail = dots[current].querySelector('.dot-rail b');
        activeRail.style.transition = `width ${AUTOPLAY_MS}ms linear`;
        requestAnimationFrame(() => { activeRail.style.width = '100%'; });
        timer = setInterval(next, AUTOPLAY_MS);
    }

    prevBtn.addEventListener('click', prevCard);
    nextBtn.addEventListener('click', next);

    // Desktop mouse-parallax tilt on the whole arrangement
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        stage.addEventListener('mousemove', (e) => {
            const r = stage.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            tilt.style.transform = `rotateY(${px * 10}deg) rotateX(${-py * 8}deg)`;
        });
        stage.addEventListener('mouseleave', () => { tilt.style.transform = 'rotateY(0deg) rotateX(0deg)'; });
    }

    stageRoot.addEventListener('mouseenter', () => clearInterval(timer));
    stageRoot.addEventListener('mouseleave', restartAutoplay);

    // Keyboard nav
    stageRoot.setAttribute('tabindex', '0');
    stageRoot.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prevCard();
    });

    // Unified pointer drag (mouse + touch) — pans the whole arrangement,
    // then snaps forward/back based on drag distance, or springs back.
    let dragging = false, startX = 0, dragPx = 0;
    const DRAG_THRESHOLD = 60;

    function onPointerDown(e) {
        dragging = true;
        startX = (e.touches ? e.touches[0].clientX : e.clientX);
        dragPx = 0;
        track.classList.add('dragging');
        clearInterval(timer);
    }
    function onPointerMove(e) {
        if (!dragging) return;
        const x = (e.touches ? e.touches[0].clientX : e.clientX);
        dragPx = x - startX;
        track.style.transform = `translateX(${dragPx * 0.4}px)`;
    }
    function onPointerUp() {
        if (!dragging) return;
        dragging = false;
        track.classList.remove('dragging');
        track.style.transform = '';
        if (Math.abs(dragPx) > DRAG_THRESHOLD) {
            (dragPx < 0) ? next() : prevCard();
        } else {
            restartAutoplay();
        }
        dragPx = 0;
    }

    stage.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    stage.addEventListener('touchstart', onPointerDown, { passive: true });
    stage.addEventListener('touchmove', onPointerMove, { passive: true });
    stage.addEventListener('touchend', onPointerUp);

    layout();
    restartAutoplay();
})();
