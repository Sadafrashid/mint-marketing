(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const depthEls = Array.from(document.querySelectorAll('[data-depth]'));
  if (!depthEls.length) return;

  const RANGE = 14; // px — top end of the 5–15px brief target
  const pointer = { tx: 0, ty: 0, x: 0, y: 0 };

  window.addEventListener('mousemove', e => {
    pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function tick() {
    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;
    depthEls.forEach(el => {
      const depth = parseFloat(el.dataset.depth) || 0;
      const dx = pointer.x * RANGE * depth;
      const dy = pointer.y * RANGE * depth;
      el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
    });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
