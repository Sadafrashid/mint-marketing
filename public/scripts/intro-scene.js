// PERFORMANCE FIX: the cursor + 3D-scene code below depends on THREE, which
// now loads with `defer` (see above) instead of blocking. Wrapping everything
// in DOMContentLoaded guarantees THREE is ready by the time this runs — defer
// scripts always finish, in order, before DOMContentLoaded fires — while this
// wrapper itself is just registering a listener, so it costs nothing up front
// and no longer blocks the parser.
document.addEventListener('DOMContentLoaded', function () {
// ── CURSOR ──────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx = window.innerWidth/2, my = window.innerHeight/2;   // raw pointer position
let dx = mx, dy = my;   // dot's displayed (lerped) position
let rx = mx, ry = my;   // ring's displayed (lerped) position
const cursorReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// PREMIUM ENHANCEMENT: the dot now eases toward the pointer (fast lerp,
// still feels tightly bound) instead of snapping to it instantly, and
// the ring can be magnetically pulled toward a hovered link/button's
// centre — see the magnetEl logic below.
const INTERACTIVE_SELECTOR = 'a, button, .cta-btn, .hamburger, input, textarea, select, [onclick], .falling-leaf, #fiPhone';
const MAGNETIC_SELECTOR = 'a, button, .cta-btn, .hamburger, [onclick], #fiPhone';
let magnetEl = null;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (cursorReduceMotion) {
    // Reduced motion: skip the eased rAF loop entirely, snap both layers.
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    cursorRing.style.left = mx + 'px'; cursorRing.style.top = my + 'px';
  }
});

function animateCursor() {
  if (!cursorReduceMotion) {
    dx += (mx - dx) * 0.35;
    dy += (my - dy) * 0.35;
    cursor.style.left = dx + 'px';
    cursor.style.top = dy + 'px';

    let targetX = mx, targetY = my;
    if (magnetEl) {
      const r = magnetEl.getBoundingClientRect();
      targetX = r.left + r.width / 2;
      targetY = r.top + r.height / 2;
    }
    rx += (targetX - rx) * 0.14;
    ry += (targetY - ry) * 0.14;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top = ry + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor grows whenever it's over anything clickable, anywhere on the
// site — small bit of feedback that makes the whole page feel interactive.
// Links/buttons additionally get the magnetic pull described above.
document.addEventListener('mouseover', e => {
  if (e.target.closest(INTERACTIVE_SELECTOR)) {
    cursor.classList.add('cursor-hover');
    cursorRing.classList.add('cursor-hover');
  }
  const magEl = e.target.closest(MAGNETIC_SELECTOR);
  if (magEl) { magnetEl = magEl; cursorRing.classList.add('cursor-magnetic'); }
});
document.addEventListener('mouseout', e => {
  if (e.target.closest(INTERACTIVE_SELECTOR)) {
    cursor.classList.remove('cursor-hover');
    cursorRing.classList.remove('cursor-hover');
  }
  const magEl = e.target.closest(MAGNETIC_SELECTOR);
  if (magEl && magEl === magnetEl) { magnetEl = null; cursorRing.classList.remove('cursor-magnetic'); }
});

// ── PARTICLES ───────────────────────────────────────────
const pCanvas = document.getElementById('particles');
const pCtx = pCanvas.getContext('2d');
let particles = [];

function resizeP() {
  pCanvas.width = window.innerWidth;
  pCanvas.height = window.innerHeight;
}
resizeP();

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * pCanvas.width;
    this.y = Math.random() * pCanvas.height;
    this.size = Math.random() * 1.2 + 0.2;
    this.speedX = (Math.random() - 0.5) * 0.15;
    this.speedY = (Math.random() - 0.5) * 0.15 - 0.1;
    this.opacity = Math.random() * 0.4 + 0.05;
    this.life = Math.random() * 300 + 100;
    this.maxLife = this.life;
    this.gold = Math.random() > 0.6;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
    if (this.life <= 0) this.reset();
  }
  draw() {
    const t = this.life / this.maxLife;
    const alpha = this.opacity * Math.sin(t * Math.PI);
    pCtx.beginPath();
    pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    pCtx.fillStyle = this.gold
      ? `rgba(30,87,0,${alpha})`
      : `rgba(45,82,60,${alpha * 0.4})`;
    pCtx.fill();
  }
}

for (let i = 0; i < 120; i++) {
  const p = new Particle();
  p.life = Math.random() * p.maxLife;
  particles.push(p);
}

let particlesRunning = false;
let particlesRafId = null;
function animateP() {
  pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  particlesRafId = requestAnimationFrame(animateP);
}
function startParticles() {
  if (particlesRunning) return;
  particlesRunning = true;
  animateP();
}
function stopParticles() {
  particlesRunning = false;
  if (particlesRafId) cancelAnimationFrame(particlesRafId);
}
startParticles();

window.addEventListener('resize', resizeP);

// ── THREE.JS SCENE ───────────────────────────────────────
const canvas3d = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas3d, antialias: true, alpha: true });

function getPanelSize() {
  const rect = canvas3d.getBoundingClientRect();
  return { w: rect.width, h: rect.height };
}

let panelSize = getPanelSize();
renderer.setSize(panelSize.w, panelSize.h);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, panelSize.w / panelSize.h, 0.1, 100);
camera.position.set(0, 0, 3.5);

// LIGHTING — premium studio setup
const ambient = new THREE.AmbientLight(0xffffff, 0.15);
scene.add(ambient);

// Key light — warm gold from upper right
const keyLight = new THREE.DirectionalLight(0xFFF6E8, 2.5);
keyLight.position.set(3, 4, 3);
keyLight.castShadow = true;
scene.add(keyLight);

// Fill light — cool blue from left
const fillLight = new THREE.DirectionalLight(0x9FB8A8, 0.8);
fillLight.position.set(-4, 2, 2);
scene.add(fillLight);

// Rim light — gold edge from behind
const rimLight = new THREE.DirectionalLight(0x7FB585, 1.8);
rimLight.position.set(0, -2, -4);
scene.add(rimLight);

// Top accent
const topLight = new THREE.PointLight(0xFFF6E0, 1.2, 10);
topLight.position.set(0, 5, 2);
scene.add(topLight);

// Exact, glitch-free background fill — a raw clear color bypasses tone mapping
// entirely, so this matches the page's #f8f4e9 pixel-for-pixel on both sides.
renderer.setClearColor(0xF8F4E9, 1);

// ── LOAD GLB ────────────────────────────────────────────
// We'll use the inline GLTFLoader since we can't import modules
let model = null;
let modelGroup = new THREE.Group();
scene.add(modelGroup);

// Target & current rotation for smooth cursor tracking
let targetRotX = 0, targetRotY = 0;
let currentRotX = 0, currentRotY = 0;
let autoRotateY = 0;
let modelLoaded = false;

// The GLB now streams from an external file (your-file.glb) instead of a
// multi-megabyte inline base64 string. This lets the browser cache it,
// download it in parallel with everything else, and parse it off a real
// binary buffer (much faster than atob() on an 8MB string). The canvas
// stays invisible until the model is centered/scaled and the first frame
// is rendered, so refreshing never shows it "pop" into place mid-flight.
// A premium fallback sculpture is built only if fetching/parsing ever fails.

function buildFallbackModel() {
  // Premium icosahedral sculpture with gold materials
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0x2D523C,
    metalness: 0.95,
    roughness: 0.08,
    envMapIntensity: 1.5,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x1A1610,
    metalness: 0.9,
    roughness: 0.2,
  });
  const crystalMat = new THREE.MeshStandardMaterial({
    color: 0xCFE8D3,
    metalness: 1.0,
    roughness: 0.02,
    transparent: true,
    opacity: 0.85,
  });

  // Core icosahedron
  const coreGeo = new THREE.IcosahedronGeometry(0.6, 1);
  const core = new THREE.Mesh(coreGeo, crystalMat);
  modelGroup.add(core);

  // Middle ring
  const ringGeo = new THREE.TorusGeometry(0.9, 0.03, 16, 80);
  const ring1 = new THREE.Mesh(ringGeo, goldMat);
  ring1.rotation.x = Math.PI / 4;
  modelGroup.add(ring1);

  const ring2 = new THREE.Mesh(ringGeo, goldMat);
  ring2.rotation.x = -Math.PI / 4;
  ring2.rotation.z = Math.PI / 3;
  modelGroup.add(ring2);

  // Outer dodecahedron frame (wireframe)
  const outerGeo = new THREE.DodecahedronGeometry(1.15, 0);
  const outer = new THREE.Mesh(outerGeo, new THREE.MeshStandardMaterial({
    color: 0x1E5700,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  }));
  modelGroup.add(outer);

  // Floating orbs
  const orbGeo = new THREE.SphereGeometry(0.06, 16, 16);
  const orbPositions = [
    [1.1, 0.4, 0.2], [-1.0, -0.3, 0.4], [0.3, 1.1, -0.2],
    [-0.4, -1.0, 0.3], [0.8, -0.7, 0.5], [-0.7, 0.8, -0.3]
  ];
  orbPositions.forEach(([x, y, z]) => {
    const orb = new THREE.Mesh(orbGeo, goldMat.clone());
    orb.position.set(x, y, z);
    orb.userData.offset = Math.random() * Math.PI * 2;
    orb.userData.speed = 0.4 + Math.random() * 0.4;
    orb.userData.radius = Math.sqrt(x*x + y*y + z*z);
    orb.userData.basePos = [x, y, z];
    modelGroup.add(orb);
  });

  modelLoaded = true;
  return { core, ring1, ring2, outer };
}

let rings = null;
const GLB_URL = '/your-file.glb';

// Reveal the canvas only once, on the very first completed frame after the
// model (real or fallback) is fully positioned — this is what stops the
// "misplaced on refresh" flash, since nothing is ever shown mid-setup.
function revealCanvas() {
  if (canvas3d.style.opacity === '1') return;
  canvas3d.style.opacity = '1';
}

function applyLoadedModel(loaded) {
  // Center and scale to fit nicely in frame
  const box = new THREE.Box3().setFromObject(loaded);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 1.8 / maxDim;
  loaded.scale.setScalar(scale);
  loaded.position.sub(center.multiplyScalar(scale));

  loaded.traverse(child => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) {
        // Keep the model's real colors/textures — just give it a touch more
        // life under the studio lighting without turning it metallic.
        child.material.envMapIntensity = 1.2;
      }
    }
  });

  modelGroup.add(loaded);
  modelLoaded = true;
  requestAnimationFrame(() => { renderer.render(scene, camera); revealCanvas(); });
}

function tryLoadGLB() {
  if (typeof THREE.GLTFLoader === 'undefined') {
    console.warn('GLTFLoader not available — using fallback geometry');
    rings = buildFallbackModel();
    requestAnimationFrame(() => { renderer.render(scene, camera); revealCanvas(); });
    return;
  }
  const loader = new THREE.GLTFLoader();
  fetch(GLB_URL)
    .then(res => {
      if (!res.ok) throw new Error('GLB fetch failed: ' + res.status);
      return res.arrayBuffer();
    })
    .then(buffer => {
      loader.parse(
        buffer,
        '',
        (gltf) => applyLoadedModel(gltf.scene),
        (err) => {
          console.error('GLB parse error, using fallback geometry', err);
          rings = buildFallbackModel();
          requestAnimationFrame(() => { renderer.render(scene, camera); revealCanvas(); });
        }
      );
    })
    .catch(err => {
      console.warn('GLB fetch error, using fallback geometry', err);
      rings = buildFallbackModel();
      requestAnimationFrame(() => { renderer.render(scene, camera); revealCanvas(); });
    });

  // Safety net: never leave the canvas hidden indefinitely, even if the
  // fetch stalls on a slow connection.
  setTimeout(() => { if (!modelLoaded) { rings = rings || buildFallbackModel(); revealCanvas(); } }, 4000);
}

tryLoadGLB();

// ── CURSOR → 3D ROTATION ────────────────────────────────
// Clamping the normalized inputs (and the resulting target angles)
// stops fast or off-canvas mouse moves from sending the model into a
// huge rotation delta that the smoothing then has to "catch up" to —
// that catch-up was reading as a glitch/snap during movement.
function setRotationTarget(clientX, clientY) {
  const nx = Math.max(-1, Math.min(1, (clientX / window.innerWidth) * 2 - 1));
  const ny = Math.max(-1, Math.min(1, -(clientY / window.innerHeight) * 2 + 1));
  targetRotY = nx * Math.PI;       // full 360° left/right sweep
  targetRotX = ny * Math.PI;       // full 360° up/down sweep

  // Direct, instant response — the model's rotation is set right here,
  // straight from the cursor position, with no lerp/lag in between. The
  // animate() loop below still runs and will keep this smooth/breathing,
  // but this guarantees the model visibly turns the moment the mouse moves,
  // even on the very first event, with no dependency on timing elsewhere.
  currentRotX = targetRotX;
  currentRotY = targetRotY;
  if (modelGroup) {
    modelGroup.rotation.x = currentRotX;
    modelGroup.rotation.y = currentRotY + autoRotateY;
  }
  // PERFORMANCE FIX: this used to call renderer.render() directly, every
  // single time the handler fired. Combined with the duplicate bindings
  // below, that meant a full shadow-mapped scene render (not cheap — this
  // scene has shadows + tone mapping) on every raw mousemove/pointermove
  // event, on top of the render the animate() rAF loop already does every
  // frame. On a fast/high-poll-rate pointer that's dozens of extra full
  // renders per second, and it's exactly the kind of "expensive work on
  // every mousemove" that causes visible jank. The rotation is still
  // applied instantly above (no lerp/lag), so animate()'s next frame —
  // at most ~16ms away — paints it; nothing about the feel changes.
}
// PERFORMANCE FIX: previously bound on BOTH document and window, for BOTH
// 'mousemove' and 'pointermove', all with capture:true — four listeners
// firing (up to 4x setRotationTarget calls) per single physical pointer
// move. One passive 'pointermove' listener on window covers mouse input
// (pointermove fires for mouse too) without the redundant firing.
window.addEventListener('pointermove', e => setRotationTarget(e.clientX, e.clientY), { passive: true });
document.addEventListener('touchmove', e => {
  if (e.touches && e.touches[0]) {
    setRotationTarget(e.touches[0].clientX, e.touches[0].clientY);
  }
}, { passive: true });

// ── NATURAL SCROLL ───────────────────────────────────────
// The intro is just a normal section now — the page scrolls freely from
// the moment it loads. The CTA button and nav links simply smooth-scroll
// to the relevant section instead of "unlocking" anything.
function goToSection(targetId) {
  const targetEl = targetId ? document.getElementById(targetId) : null;
  if (!targetEl) return;
  if (window.mintScrollTo) window.mintScrollTo(targetEl);
  else targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const ctaBtn = document.querySelector('.cta-btn');
if (ctaBtn) {
  ctaBtn.addEventListener('click', e => {
    e.preventDefault();
    goToSection('contact');
  });
}

// Nav links — always just smooth-scroll to their target section.
document.querySelectorAll('#intro-hero nav .nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').replace('#', '');
    goToSection(targetId);
    // Close the mobile dropdown menu, if open
    const hamburgerEl = document.getElementById('hamburger');
    const navLinksEl = document.getElementById('nav-links');
    if (hamburgerEl) hamburgerEl.classList.remove('active');
    if (navLinksEl) navLinksEl.classList.remove('active');
  });
});



// ── LOADER ANIMATION ────────────────────────────────────
const loaderEl = document.getElementById('loader');
const loaderBar = document.getElementById('loader-bar');
const loaderNum = document.getElementById('loader-num');

// Scrolling is locked via the `is-loading` class already sitting on <html>
// in the markup. Also stop Lenis's virtual scroll (if it's running) so it
// can't fight the lock, then release both once the loader finishes.
if (window.__lenis) window.__lenis.stop();

function finishLoading() {
  document.documentElement.classList.remove('is-loading');
  if (window.__lenis) window.__lenis.start();
}

let loadProgress = 0;
const loadInterval = setInterval(() => {
  loadProgress += Math.random() * 3 + 0.5;
  if (loadProgress >= 100) {
    loadProgress = 100;
    clearInterval(loadInterval);
    loaderBar.style.width = '100%';
    loaderNum.textContent = '100%';
    setTimeout(() => {
      loaderEl.classList.add('hidden');
      finishLoading();
    }, 500);
  }
  loaderBar.style.width = loadProgress + '%';
  loaderNum.textContent = Math.floor(loadProgress) + '%';
}, 30);

// ── RENDER LOOP ─────────────────────────────────────────
const clock = new THREE.Clock();
let floatOrbs = [];
let heroRafId = null;
let heroLoopRunning = false;

function animate() {
  heroRafId = requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  // Frame-rate independent smoothing — this is what removes the
  // "glitchy jump" feeling on movement: without delta-time the lerp
  // speed used to vary with the monitor's refresh rate, so a 144Hz
  // screen snapped harder than a 60Hz one. Clamping delta also stops
  // a single dropped/huge frame (tab switch, GC pause) from causing
  // the model to jerk or spin.
  const rawDelta = clock.getDelta();
  const delta = Math.min(rawDelta, 1 / 30);
  const smoothing = 1 - Math.pow(0.00000005, delta); // faster still

  currentRotX += (targetRotX - currentRotX) * smoothing;
  currentRotY += (targetRotY - currentRotY) * smoothing;

  // Auto slow rotation — kept very subtle now so the cursor-driven rotation
  // (above) is what visibly drives the model, instead of being masked by
  // a constant spin.
  autoRotateY += 0.02 * delta;

  if (modelGroup) {
    modelGroup.rotation.x = currentRotX;
    modelGroup.rotation.y = currentRotY + autoRotateY;

    // Float up/down
    modelGroup.position.y = Math.sin(t * 0.5) * 0.05;

    // Gentle breathing scale — keeps the model alive even when the cursor sits still
    const breathe = 1 + Math.sin(t * 0.8) * 0.015;
    modelGroup.scale.setScalar(breathe);

    // Animate rings if fallback
    modelGroup.children.forEach(child => {
      if (child.userData.offset !== undefined) {
        // Floating orbs
        const bp = child.userData.basePos;
        const spd = child.userData.speed;
        const off = child.userData.offset;
        child.position.set(
          bp[0] + Math.sin(t * spd + off) * 0.08,
          bp[1] + Math.cos(t * spd * 0.7 + off) * 0.08,
          bp[2] + Math.sin(t * spd * 0.5 + off + 1) * 0.05
        );
        child.material.emissive = new THREE.Color(0x1E5700);
        child.material.emissiveIntensity = 0.1 + Math.sin(t * spd * 2 + off) * 0.05;
      }
    });
  }

  // Animate key light
  keyLight.intensity = 2.2 + Math.sin(t * 0.8) * 0.3;

  renderer.render(scene, camera);
}
function startHeroLoop() {
  if (heroLoopRunning) return;
  heroLoopRunning = true;
  animate();
}
function stopHeroLoop() {
  heroLoopRunning = false;
  if (heroRafId) cancelAnimationFrame(heroRafId);
}
startHeroLoop();

// PERFORMANCE FIX: without this, the WebGL render loop (shadows + tone
// mapping, every frame) and the 2D particle canvas loop kept running
// forever at 60fps even after scrolling past the hero into the rest of
// the page — pure wasted GPU/CPU for a canvas the visitor can no longer
// see. An IntersectionObserver pauses both loops the moment the hero
// scrolls out of view and resumes them the moment it's back, with no
// visible effect since a fully off-screen canvas was never rendering
// anything visible anyway.
const introHeroEl = document.getElementById('intro-hero');
if (introHeroEl && 'IntersectionObserver' in window) {
  const heroVisibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startHeroLoop();
        startParticles();
      } else {
        stopHeroLoop();
        stopParticles();
      }
    });
  }, { threshold: 0 });
  heroVisibilityObserver.observe(introHeroEl);
}

// Also pause both loops while the tab/window is hidden — most browsers
// already throttle rAF in background tabs, but this makes it explicit
// and immediate rather than relying on that heuristic.
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopHeroLoop();
    stopParticles();
  } else if (introHeroEl && introHeroEl.getBoundingClientRect().bottom > 0 &&
             introHeroEl.getBoundingClientRect().top < window.innerHeight) {
    startHeroLoop();
    startParticles();
  }
});

// ── RESIZE ───────────────────────────────────────────────
// Debounced: resizing the renderer's draw buffer on literally every
// resize/orientation tick (e.g. during a drag-resize or a mobile
// browser's address-bar show/hide) is itself a source of visible
// flicker. We settle for ~80ms of quiet before reallocating.
let resizeRaf = null;
window.addEventListener('resize', () => {
  if (resizeRaf) cancelAnimationFrame(resizeRaf);
  resizeRaf = requestAnimationFrame(() => {
    const size = getPanelSize();
    if (size.w < 2 || size.h < 2) return;
    camera.aspect = size.w / size.h;
    camera.updateProjectionMatrix();
    renderer.setSize(size.w, size.h);
  });
});

}); // end DOMContentLoaded wrapper
