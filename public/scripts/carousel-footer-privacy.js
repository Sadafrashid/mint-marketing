// ── TESTIMONIALS CAROUSEL — true seamless infinite loop ──
// A clone of the last card is placed before the first, and a clone of
// the first card after the last, so the track can always keep sliding
// in one direction. When it drifts onto a clone, we snap instantly
// (transition off) back to the matching real card — invisible to the
// eye, but it means the loop never has to "jump backward" to restart.
(function () {
    const track    = document.getElementById('testiTrack');
    const dotsWrap = document.getElementById('testiDots');
    const btnPrev  = document.getElementById('testiBtnPrev');
    const btnNext  = document.getElementById('testiBtnNext');
    if (!track) return;

    const realCards = Array.from(track.querySelectorAll('.testi-card'));
    const total = realCards.length;
    if (total === 0) return;

    const firstClone = realCards[0].cloneNode(true);
    const lastClone  = realCards[total - 1].cloneNode(true);
    firstClone.setAttribute('aria-hidden', 'true');
    lastClone.setAttribute('aria-hidden', 'true');
    track.appendChild(firstClone);
    track.insertBefore(lastClone, realCards[0]);

    const allCards = Array.from(track.querySelectorAll('.testi-card'));
    let working = 1;      // index into allCards (1..total map to the real cards)
    let current = 0;      // real index, drives the dots
    let autoTimer;

    // Build dots (one per real card only)
    realCards.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'testi-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', 'Slide ' + (i + 1));
        d.addEventListener('click', () => userGoTo(i));
        dotsWrap.appendChild(d);
    });
    const dots = Array.from(dotsWrap.querySelectorAll('.testi-dot'));

    function getOffset(workingIdx) {
        const outer     = track.parentElement;
        const outerW    = outer.offsetWidth;
        const cardW     = allCards[0].offsetWidth;
        const gap       = 24;
        const centreOff = (outerW - cardW) / 2;
        return workingIdx * (cardW + gap) - centreOff;
    }

    function render(withTransition) {
        // GUARD — this is the real cause of the "vanishes after a while" bug.
        // getOffset() reads live pixel widths off the DOM. If render() ever
        // runs at a moment when the outer wrapper or a card briefly measures
        // 0px wide — a transient reflow caused by something elsewhere on the
        // page (the Three.js hero resizing, a lazy image landing, a font
        // swap) — the math above divides/multiplies against 0 and produces
        // a huge, bogus translateX. That shove the whole track outside the
        // overflow:hidden wrapper, and since nothing ever re-runs render()
        // with correct numbers afterwards (a real resize event fixes it,
        // which is why "resizing the window brings it back" was the old
        // workaround), it stays invisible indefinitely. So: if a measurement
        // comes back 0/invalid, skip this render entirely and wait for the
        // next legitimate one instead of trusting broken numbers.
        const outer = track.parentElement;
        if (!outer || !outer.offsetWidth || !allCards[0] || !allCards[0].offsetWidth) return;

        track.style.transition = withTransition ? '' : 'none';
        track.style.transform = `translateX(-${Math.max(0, getOffset(working))}px)`;
        allCards.forEach(c => c.classList.remove('active'));
        allCards[working].classList.add('active');
        dots.forEach(d => d.classList.remove('active'));
        dots[current].classList.add('active');
        if (!withTransition) {
            // Force the browser to apply the jump before re-enabling
            // the transition, or it would animate the snap too.
            track.getBoundingClientRect();
            requestAnimationFrame(() => { track.style.transition = ''; });
        }
    }

    function step(dir) {
        working += dir;
        current = (current + dir + total) % total;
        render(true);
    }

    // After each slide, check whether we've drifted onto a clone and,
    // if so, teleport back to the equivalent real card with no transition.
    // Guards added:
    //  - ignore bubbled transitionend events from the cards themselves
    //    (each .testi-card has its own transform/opacity/box-shadow
    //    transitions when the .active class toggles, and those bubble
    //    up through `track`) — only react to the track's own transform.
    //  - use <=/>= instead of strict === so any accumulated drift still
    //    self-corrects instead of getting permanently stuck out of range.
    track.addEventListener('transitionend', (e) => {
        if (e.target !== track || e.propertyName !== 'transform') return;
        if (working <= 0) { working = total; render(false); }
        else if (working >= total + 1) { working = 1; render(false); }
    });

    function userGoTo(realIdx) {
        const dir = realIdx > current ? 1 : (realIdx < current ? -1 : 0);
        working += dir === 0 ? 0 : dir;
        current = realIdx;
        render(true);
        resetAuto();
    }

    function resetAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => { step(1); }, 4500);
    }

    btnPrev.addEventListener('click', () => { step(-1); resetAuto(); });
    btnNext.addEventListener('click', () => { step(1); resetAuto(); });

    // Pause the loop while the visitor is actually looking at a card.
    const wrap = track.closest('.testi-carousel-wrap');
    if (wrap) {
        wrap.addEventListener('mouseenter', () => clearInterval(autoTimer));
        wrap.addEventListener('mouseleave', resetAuto);
    }

    // touch/swipe
    let tx0 = null;
    track.addEventListener('touchstart', e => { tx0 = e.touches[0].clientX; clearInterval(autoTimer); }, { passive: true });
    track.addEventListener('touchend',   e => {
        if (tx0 === null) return;
        const dx = e.changedTouches[0].clientX - tx0;
        if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
        tx0 = null;
        resetAuto();
    });

    let resizeRaf2 = null;
    window.addEventListener('resize', () => {
        if (resizeRaf2) cancelAnimationFrame(resizeRaf2);
        resizeRaf2 = requestAnimationFrame(() => render(false));
    });

    // Pause autoplay while the tab/app is backgrounded (switching tabs,
    // locking the phone, minimizing) and force a clean resync when it
    // becomes visible again, in case anything shifted while unwatched.
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(autoTimer);
        } else {
            render(false);
            resetAuto();
        }
    });

    resetAuto();
    render(false); // init position, no animation on load

    // BUGFIX — testimonials disappearing after full page load:
    // render() positions the track using pixel widths read from the DOM
    // (outer.offsetWidth / card offsetWidth) at the moment it runs. But at
    // that moment the page has NOT necessarily finished settling — web
    // fonts can still be swapping in, images throughout the page are
    // lazy-loading and can shift layout, and the heavy Three.js/GLB scene
    // above this section can change the document's height. None of those
    // fire a `resize` event (only actual viewport size changes do), so the
    // *only* recalculation this carousel used to get was a manual browser
    // resize — meaning if the geometry was even slightly wrong at init,
    // the track stayed translated to the wrong X position forever, which
    // pushes every card outside the `overflow:hidden` track and makes the
    // whole carousel look like it "vanished" once the rest of the page
    // finished loading in behind it.
    // Fix: a ResizeObserver watches the actual pixel box of the track
    // wrapper and re-runs render() (no animation) any time it changes for
    // ANY reason — font swap, image reflow, or a real resize — so the
    // carousel can never get permanently stuck. Two extra one-off passes
    // after `load` and after fonts finish are added as a belt-and-braces
    // correction for engines without ResizeObserver.
    if (window.ResizeObserver) {
        let roRaf = null;
        const ro = new ResizeObserver(() => {
            if (roRaf) cancelAnimationFrame(roRaf);
            roRaf = requestAnimationFrame(() => render(false));
        });
        ro.observe(track.parentElement); // .testi-track-outer
    }
    window.addEventListener('load', () => render(false));
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => render(false));
    }
})();

// Footer — auto year
document.getElementById('footerYear').textContent = new Date().getFullYear();

// Footer nav links smooth-scroll
document.querySelectorAll('.footer-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const t = document.getElementById(link.getAttribute('href').slice(1));
        if (!t) return;
        if (window.mintScrollTo) window.mintScrollTo(t);
        else t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Privacy policy modal
const privacyModal = document.getElementById('privacyModal');
document.getElementById('privacyPolicyLink').addEventListener('click', e => {
    e.preventDefault();
    privacyModal.classList.add('open');
    privacyModal.setAttribute('aria-hidden', 'false');
    if (window.mintLockScroll) window.mintLockScroll();
});
document.querySelector('.privacy-modal-close').addEventListener('click', () => {
    privacyModal.classList.remove('open');
    privacyModal.setAttribute('aria-hidden', 'true');
    if (window.mintUnlockScroll) window.mintUnlockScroll();
});
privacyModal.addEventListener('click', e => {
    if (e.target === privacyModal) {
        privacyModal.classList.remove('open');
        privacyModal.setAttribute('aria-hidden', 'true');
        if (window.mintUnlockScroll) window.mintUnlockScroll();
    }
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && privacyModal.classList.contains('open')) {
        privacyModal.classList.remove('open');
        privacyModal.setAttribute('aria-hidden', 'true');
        if (window.mintUnlockScroll) window.mintUnlockScroll();
    }
});
