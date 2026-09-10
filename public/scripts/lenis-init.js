(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && window.Lenis) {
    const lenis = new Lenis({
      duration: 1.15,
      easing: t => 1 - Math.pow(1 - t, 3), // gentle ease-out — no bounce, no overshoot
      smoothWheel: true,
      touchMultiplier: 1.2,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    window.__lenis = lenis;
  }
  // Single entry point every in-page anchor/CTA routes through: rides
  // Lenis's easing when available, otherwise falls back to the native
  // smooth-scroll behavior untouched.
  window.mintScrollTo = function (target, opts) {
    if (window.__lenis) {
      window.__lenis.scrollTo(target, Object.assign({ offset: 0 }, opts || {}));
    } else if (target && target.scrollIntoView) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Shared lock/unlock for any full-page modal (case study, privacy
  // policy, etc). Remembers exactly where the page was scrolled to and
  // restores it explicitly on unlock — toggling `overflow:hidden` on
  // <html>/<body> to lock the background scroll can otherwise leave
  // Lenis's internal scroll target out of sync with the real page
  // position, and it "corrects" itself by jumping back to the top the
  // next time it runs. Forcing both the native scroll and Lenis back to
  // the saved position before restarting avoids that jump entirely.
  var mintScrollLockY = 0;
  window.mintLockScroll = function () {
    mintScrollLockY = window.scrollY || window.pageYOffset || 0;
    document.documentElement.classList.add('modal-open');
    if (window.__lenis) window.__lenis.stop();
  };
  window.mintUnlockScroll = function () {
    document.documentElement.classList.remove('modal-open');
    window.scrollTo(0, mintScrollLockY);
    if (window.__lenis) {
      window.__lenis.scrollTo(mintScrollLockY, { immediate: true });
      window.__lenis.start();
    }
  };
})();
