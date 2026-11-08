    document.addEventListener('DOMContentLoaded', function () {
    (function () {
        var stage = document.getElementById('csStage');
        if (!stage) return;
        if (stage.dataset.csInit) return; // never register the listeners twice
        stage.dataset.csInit = '1';

        // ── YOUR PROJECTS ────────────────────────────────────────────
        // Slide 1 is real (carried over from the old book section).
        // Slides 2–5 are placeholders — replace image/tag/name/services/
        // desc/metrics with your own clients whenever you're ready.
        var CASE_STUDIES = [
            {
                image: '/IMG_8132.PNG',
                tag: 'Case Study 01',
                name: 'Pro Ultimate Gym, Nirala Nagar',
                services: 'Social Media Marketing &middot; Content Creation &middot; Branding &middot; Video Production',
                desc: 'Pro Ultimate Gym wanted to strengthen its local presence and become a premium fitness destination. We tested content formats to find what actually drove reach, then built a premium visual identity around the gym\'s ambience and equipment &mdash; turning it into one of the most recognized fitness brands in the area.',
                metrics: [
                    { value: 53, suffix: '%', label: 'More Active Members' },
                    { value: 189, suffix: '%', label: 'More Inquiries' },
                    { value: 133, suffix: '%', label: 'More Memberships' },
                    { value: 38, suffix: '%', label: 'Revenue Growth' }
                ],
                full: {
                    client: 'Pro Ultimate Gym, Nirala Nagar',
                    industry: 'Fitness',
                    services: 'Social Media Marketing &middot; Content Creation &middot; Branding &middot; Video Production',
                    challengeIntro: 'Pro Ultimate Gym wanted to strengthen its local presence, attract more membership inquiries, and establish itself as a premium fitness destination in the city through a strategic social media presence.',
                    results: [
                        { icon: '\uD83D\uDCC8', text: '53% Increase in Active Members (180 &rarr; 275)' },
                        { icon: '\uD83D\uDCE9', text: '189% Increase in Monthly Inquiries (45 &rarr; 130)' },
                        { icon: '\uD83D\uDCB3', text: '133% Increase in Monthly Memberships (18 &rarr; 42)' },
                        { icon: '\uD83D\uDCB0', text: '38% Growth in Revenue' }
                    ],
                    strategy: [
                        { title: 'Brand & Audience Analysis', desc: 'We started by understanding the gym\'s positioning, target audience, and local competition to build a strategy tailored for its market.' },
                        { title: 'Data-Driven Content Testing', desc: 'Instead of relying on assumptions, we tested multiple content formats during the first month to identify what consistently generated the highest reach, engagement, and audience interaction.' },
                        { title: 'Premium Brand Positioning', desc: 'We showcased the gym\'s ambience, equipment, and overall experience through high-quality visuals, positioning it as a luxury fitness destination.' },
                        { title: 'Strategic Content Mix', desc: 'We created a balanced combination of quirky &amp; entertaining content, workout and fitness-focused videos, cinematic ambience reels, and informative promotional videos &mdash; keeping the content engaging while continuously driving awareness and inquiries.' },
                        { title: 'Creating Local Hype', desc: 'Through consistent storytelling, strong branding, and visually appealing content, we built excitement around the gym and increased its visibility, making it one of the most recognized fitness brands in the area.' }
                    ],
                    takeaways: [
                        'Data-backed content strategy instead of guesswork.',
                        'Premium visual branding that enhanced brand perception.',
                        'Content designed to both engage audiences and generate leads.',
                        'Consistent growth in memberships, inquiries, and overall business performance.'
                    ]
                }
            },
            {
                image: '/IMG_8133.PNG',
                tag: 'Case Study 02',
                name: 'Aqsa Beauty Collection',
                services: 'Social Media Management &middot; Content Strategy &middot; Video Production &middot; Organic Growth',
                desc: 'A local beauty store in Aminabad, Lucknow with under 700 followers and content topping out at a few hundred views. We rebuilt the content approach around scroll-stopping hooks and a recognizable face for the brand &mdash; 100% organic, no paid ads &mdash; and it translated into real store footfall, not just numbers on a screen.',
                metrics: [
                    { value: 5000, suffix: '+', label: 'Organic Followers' },
                    { value: 230, suffix: 'K+', label: 'Highest Reel Views' },
                    { value: 5000, suffix: '%', label: 'Engagement Growth' }
                ],
                full: {
                    client: 'Aqsa Beauty Collection',
                    industry: 'Beauty & Cosmetics',
                    location: 'Aminabad, Lucknow',
                    duration: '10+ Months and Ongoing',
                    services: 'Social Media Management &middot; Content Strategy &middot; Video Production &middot; Editing &middot; Organic Growth',
                    challengeIntro: 'When we took over Aqsa Beauty Collection\'s social media, the account had approximately 600&ndash;700 followers. Although active, its content was generating only around 200&ndash;500 views per video and lacked the elements needed to capture attention, educate the audience, and encourage interaction. The goal was clear: build Aqsa Beauty Collection into a recognizable local beauty brand through organic social media.',
                    challengeList: [
                        'Low social media reach', 'Low quality videos', 'Slow follower growth', 'Low engagement',
                        'Limited online awareness', 'Low store footfall', 'Lack of strong brand positioning',
                        'Content that wasn\u2019t connecting with the target audience'
                    ],
                    strategyIntro: 'Instead of relying on paid advertising, we focused on building the brand 100% organically. The client specifically wanted organic growth, so no paid ads were used throughout the journey.',
                    strategy: [
                        { title: 'Content That Stops the Scroll', desc: 'We moved away from dull, conventional product posts and introduced content built around strong hooks, scroll-stopping openings, suspense-driven videos, relatable beauty problems, trending formats, and offers &amp; festive campaigns &mdash; every piece designed to make people stop, watch, remember the brand, and eventually visit the store.' },
                        { title: 'Making the Brand Human', desc: 'We turned an employee of the store into the online face of Aqsa Beauty Collection, building familiarity &rarr; trust &rarr; engagement &rarr; store visits, rather than presenting the account as just another product catalogue.' },
                        { title: 'Trend + Strategy', desc: 'We adapted trending formats to Aqsa\u2019s niche &mdash; makeup, skincare, nails, hair and salon products, beauty tips and offers &mdash; making trending content genuinely relevant to the people most likely to shop at Aqsa.' },
                        { title: 'Content Production', desc: 'We handled the complete pipeline &mdash; strategy, concept, shoot, edit, caption, publishing, optimization &mdash; continuously testing content and evolving the strategy based on performance rather than repeating the same format.' }
                    ],
                    results: [
                        { icon: '\uD83D\uDCC8', text: '600&ndash;700 &rarr; 5,000+ Followers, entirely through organic content.' },
                        { icon: '\uD83C\uDFA5', text: '200&ndash;500 &rarr; 10K&ndash;12K typical views per video, with multiple videos crossing 100K+ and a highest of 230K+ organic views.' },
                        { icon: '\uD83D\uDE80', text: 'Multiple viral reels crossed 100K+ organic views, reaching audiences across Lucknow far beyond the existing follower base.' },
                        { icon: '\uD83D\uDD25', text: '+5,000% growth in overall account engagement.' },
                        { icon: '\uD83D\uDECD\uFE0F', text: 'A drastic increase in store footfall, with customers telling the team they discovered or visited the store because of its Instagram content.' }
                    ],
                    transformation: {
                        before: ['600&ndash;700 followers', '200&ndash;500 average video views', 'Low engagement', 'Limited online awareness', 'Dull & non-interactive content', 'Low social-driven footfall'],
                        after: ['5,000+ organic followers', '10K&ndash;12K typical video views', '100K+ multiple viral reels', '230K+ highest organic reel', '+5,000% account engagement', 'Significant increase in Instagram-driven store visits']
                    },
                    impact: 'Aqsa Beauty Collection didn\u2019t just gain followers &mdash; it gained visibility, recognition and trust within its local market, evolving from a basic product-posting page into a content-driven beauty brand with an identifiable online personality and a highly engaged audience. Most importantly, the growth stayed 100% organic: no paid ads, no artificial reach &mdash; just consistent strategy, relevant content, experimentation and execution. And the journey is still ongoing.'
                }
            },
            {
                image: '/pro-ultimate-gomti-nagar.PNG',
                tag: 'Case Study 03',
                name: 'Pro Ultimate Gym, Gomti Nagar',
                services: 'Social Media Marketing &middot; Content Creation &middot; Branding &middot; Video Production &middot; Meta Ads Management',
                desc: 'Pro Ultimate Gym, Gomti Nagar was still under construction when we began. We built brand awareness and anticipation before launch, positioning it as Lucknow\u2019s Biggest and Most Luxurious Gym &mdash; and turned that excitement into 500+ pre-sales memberships before the gym officially opened.',
                metrics: [
                    { value: 500, suffix: '+', label: 'Pre-Sales Memberships' }
                ],
                full: {
                    client: 'Pro Ultimate Gym, Gomti Nagar',
                    industry: 'Fitness',
                    services: 'Social Media Marketing &middot; Content Creation &middot; Branding &middot; Video Production &middot; Meta Ads Management',
                    challengeIntro: 'Pro Ultimate Gym, Gomti Nagar, was under construction, and the primary challenge was to build brand awareness even before the gym officially opened. The audience had limited awareness about the upcoming gym, and we needed to establish it as Lucknow\u2019s Biggest and Most Luxurious Gym from day one. Our main objective was to create excitement around the upcoming launch, increase local audience reach, and generate pre-sales leads to secure memberships before the gym\u2019s opening.',
                    results: [
                        { icon: '\uD83D\uDCB3', text: '500+ Pre-Sales Memberships Before the Official Gym Opening.' },
                        { icon: '\uD83D\uDCE2', text: 'Successfully Built Brand Awareness Before Launch.' },
                        { icon: '\uD83C\uDFC6', text: 'Established Strong Positioning as Lucknow\u2019s Biggest and Most Luxurious Gym.' },
                        { icon: '\uD83D\uDCE9', text: 'Generated Pre-Launch Leads Through Organic Content and Meta Ads.' },
                        { icon: '\uD83E\uDD1D', text: 'Continued Marketing Partnership After the Gym\u2019s Official Opening.' }
                    ],
                    strategy: [
                        { title: 'Pre-Launch Brand Positioning', desc: 'We positioned Pro Ultimate Gym as Lucknow\u2019s Biggest and Most Luxurious Gym, building the entire communication strategy around this identity to create a strong impression in the local fitness market.' },
                        { title: 'Building Anticipation Through Content', desc: 'Since the gym was still under construction, we created content showcasing its development, upcoming facilities, and vision. This helped audiences understand what was coming and generated curiosity even before the opening.' },
                        { title: 'Strategic Content Creation', desc: 'We developed a content strategy focused on construction and development updates, upcoming gym facilities and features, premium and luxurious gym positioning, informative and promotional videos, and engaging content designed to build excitement.' },
                        { title: 'Organic Marketing &amp; Meta Ads', desc: 'We combined organic social media content with strategically managed Meta Ads to increase local visibility, reach potential members, and generate qualified pre-sales inquiries.' },
                        { title: 'Pre-Sales Lead Generation', desc: 'Our primary focus was converting the excitement and awareness into actual memberships. Through consistent content, promotional campaigns, and paid advertising, we successfully generated 500+ pre-sales before the gym officially opened.' },
                        { title: 'Post-Launch Marketing &amp; Growth', desc: 'Our association with Pro Ultimate Gym continues even after its opening. We currently manage its social media presence, create engaging content, run Meta Ads, and support ongoing lead generation and membership growth.' }
                    ],
                    takeaways: [
                        'Built brand awareness and anticipation before the gym\u2019s official launch.',
                        'Established a strong identity as Lucknow\u2019s Biggest and Most Luxurious Gym.',
                        'Generated 500+ pre-sales before the gym even opened.',
                        'Combined organic content marketing with paid advertising for lead generation.',
                        'Continued marketing support focused on membership growth, brand visibility, and sales.'
                    ]
                }
            },
            
            
            
        ];

        var total = CASE_STUDIES.length;
        var current = 0;
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var hasGSAP = typeof gsap !== 'undefined';
        var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        var section = stage.closest('.cs-section');

        var prevBtn = document.getElementById('csPrev');
        var nextBtn = document.getElementById('csNext');
        var progressFill = document.getElementById('csProgressFill');
        var eyebrowEl = document.getElementById('csEyebrow');
        var nameEl = document.getElementById('csName');
        var descEl = document.getElementById('csDesc');
        var metricsEl = document.getElementById('csMetrics');
        var ctaEl = document.getElementById('csCta');
        var detailsEl = document.getElementById('csDetails');

        // Shared runtime state
        var centerSlot = null;       // slot currently in the centre (set by layout())
        var sectionInView = false;   // driven by an IntersectionObserver, never by measuring
        var stageInView = false;
        var modalOpen = false;

        // Build one .cs-slot per project
        CASE_STUDIES.forEach(function (proj, i) {
            var slot = document.createElement('div');
            slot.className = 'cs-slot';
            slot.dataset.index = i;
            slot.setAttribute('role', 'option');
            var csWebpSrc = proj.image.replace(/\.(png|PNG)$/, '.webp');
            slot.innerHTML =
                '<div class="cs-card">' +
                    '<div class="cs-card-tilt">' +
                        '<div class="cs-card-media">' +
                            '<picture>' +
                                '<source srcset="' + csWebpSrc + '" type="image/webp">' +
                                '<img src="' + proj.image + '" alt="' + proj.name + '" loading="lazy" decoding="async" draggable="false">' +
                            '</picture>' +
                        '</div>' +
                        '<div class="cs-card-foot">' +
                            '<div><span class="cs-card-tag">' + proj.tag + '</span><span class="cs-card-name">' + proj.name + '</span></div>' +
                            '<button type="button" class="cs-card-arrow" aria-label="Next case study"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 18l6-6-6-6"/></svg></button>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            slot.addEventListener('click', function () {
                if (parseInt(slot.dataset.index, 10) !== current) goTo(i);
            });
            // The arrow badge inside the card: on the centered card it advances
            // to the next study (mirrors the removed mobile prev/next buttons);
            // on a side card it just brings that card to center, same as the
            // rest of the card, so stopPropagation isn't needed there.
            slot.querySelector('.cs-card-arrow').addEventListener('click', function (e) {
                e.stopPropagation();
                var idx = parseInt(slot.dataset.index, 10);
                if (idx === current) goTo(current + 1);
                else goTo(idx);
            });
            stage.appendChild(slot);
        });
        var slots = Array.prototype.slice.call(stage.querySelectorAll('.cs-slot'));

        var slots = Array.prototype.slice.call(stage.querySelectorAll('.cs-slot'));
        // Cached once so interaction handlers never need to query the DOM.
        var tiltEls = slots.map(function (slot) { return slot.querySelector('.cs-card-tilt'); });
        var cardEls = slots.map(function (slot) { return slot.querySelector('.cs-card'); });
        var imgEls  = slots.map(function (slot) { return slot.querySelector('img'); });

        // Cached geometry for the tilt / magnetic effects. Re-measured only when
        // something could actually have moved (navigation, scroll while hovering,
        // resize) instead of on every mouse event.
        var tiltRect = null, rectDirty = true, settleUntil = 0;
        var ctaBase = null, ctaDirty = true;
        function markGeometryDirty() { rectDirty = true; ctaDirty = true; }

        // ── Position every card relative to the active index (wraps both ways) ──
        function layout() {
            slots.forEach(function (slot, i) {
                var offset = i - current;
                if (offset > total / 2) offset -= total;
                if (offset < -total / 2) offset += total;
                var abs = Math.abs(offset);

                var tx, tz, ry, scale, opacity, blur, z;
                if (abs === 0)      { tx = 0;             tz = 0;    ry = 0;              scale = 1.2;  opacity = 1;    blur = 0; z = 50; }
                else if (abs === 1) { tx = 62 * offset;    tz = -160; ry = -16 * offset;   scale = 0.85; opacity = 0.6;  blur = 2; z = 40; }
                else if (abs === 2) { tx = 108 * offset;   tz = -320; ry = -22 * offset;   scale = 0.65; opacity = 0.32; blur = 3; z = 30; }
                else                { tx = 140 * offset;   tz = -480; ry = -26 * offset;   scale = 0.5;  opacity = 0;    blur = 4; z = 10; }

                if (abs === 0) centerSlot = slot;

                slot.style.transform = 'translate3d(' + tx + '%, 0, ' + tz + 'px) rotateY(' + ry + 'deg) scale(' + scale + ')';
                slot.style.opacity = opacity;
                slot.style.filter = blur ? 'blur(' + blur + 'px)' : 'none';
                slot.style.zIndex = z;
                slot.dataset.abs = Math.min(abs, 5);
                slot.classList.toggle('is-center', abs === 0);
                slot.setAttribute('aria-hidden', abs === 0 ? 'false' : 'true');
            });
            progressFill.style.width = (100 / total) + '%';
            progressFill.style.transform = 'translateX(' + (current * 100) + '%)';
            markGeometryDirty();
        }

        // ── Pause the always-running float animation when nobody can see it ──
        // (section off-screen, or the full-screen blurred modal is covering it)
        function syncAnimationState() {
            var paused = !sectionInView || modalOpen;
            for (var i = 0; i < cardEls.length; i++) cardEls[i].style.animationPlayState = paused ? 'paused' : '';
        }

        // ── Count-up metrics, replayed every time the centre card changes ──
        // One rAF loop drives every counter, and starting a new one cancels the
        // previous one, so rapid clicking can never stack animations.
        var metricsRaf = 0;
        var metricTargets = [];
        function setMetricsFinal() {
            metricTargets.forEach(function (t) { t.el.textContent = t.value + t.suffix; });
        }
        function stopMetrics(finish) {
            if (metricsRaf) {
                cancelAnimationFrame(metricsRaf);
                metricsRaf = 0;
                if (finish) setMetricsFinal();
            }
        }
        function playMetrics(proj, animate) {
            stopMetrics(false);
            metricsEl.innerHTML = '';
            metricTargets = [];
            var frag = document.createDocumentFragment();
            proj.metrics.forEach(function (m) {
                var wrap = document.createElement('div');
                wrap.className = 'cs-metric';
                wrap.innerHTML = '<span class="cs-metric-num">0' + m.suffix + '</span><span class="cs-metric-label">' + m.label + '</span>';
                frag.appendChild(wrap);
                metricTargets.push({ el: wrap.firstChild, value: m.value, suffix: m.suffix, last: -1 });
            });
            metricsEl.appendChild(frag);

            if (reduceMotion || !animate) { setMetricsFinal(); return; }

            var duration = 1400;
            var start = performance.now();
            function tick(now) {
                var p = Math.max(0, Math.min((now - start) / duration, 1));
                var eased = 1 - Math.pow(1 - p, 3);
                for (var i = 0; i < metricTargets.length; i++) {
                    var t = metricTargets[i];
                    var v = Math.floor(eased * t.value);
                    if (v !== t.last) { t.last = v; t.el.textContent = v + t.suffix; } // only touch the DOM when the number changes
                }
                metricsRaf = p < 1 ? requestAnimationFrame(tick) : 0;
            }
            metricsRaf = requestAnimationFrame(tick);
        }

        // ── Swap the details panel to match the centre card ──
        // `animate` is false for the very first render at page load, which
        // happens far off-screen where nobody could see the count-up or fade.
        function updateDetails(animate) {
            var proj = CASE_STUDIES[current];
            eyebrowEl.innerHTML = proj.services;
            nameEl.textContent = proj.name;
            descEl.innerHTML = proj.desc;
            playMetrics(proj, animate);

            if (animate && hasGSAP && !reduceMotion) {
                gsap.fromTo(detailsEl, { opacity: 0.4, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
            }
        }

        function goTo(i) {
            current = ((i % total) + total) % total;
            settleUntil = performance.now() + 900; // card is mid-transition; geometry is not final yet
            layout();
            updateDetails(true);
        }

        prevBtn.addEventListener('click', function () { goTo(current - 1); });
        nextBtn.addEventListener('click', function () { goTo(current + 1); });

        // Keyboard: arrows only while the carousel is on screen (tracked by an
        // observer, so no layout measurement on every key press).
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                if (csmModal.classList.contains('open')) closeCaseModal();
                return;
            }
            if (!stageInView || modalOpen) return;
            if (e.key === 'ArrowLeft') goTo(current - 1);
            if (e.key === 'ArrowRight') goTo(current + 1);
        });

        // ── Drag / swipe, with a GSAP elastic snap-back on release ──
        // Pointer Events only (they cover mouse, touch and pen), so a touch no
        // longer fires both a pointer handler AND a touch handler. DOM writes are
        // batched to one per animation frame and touch only the centre card.
        var dragging = false, dragStartX = 0, dragDX = 0;
        var dragRaf = 0, dragSlot = null, dragTransitionOff = false, suppressClick = false;

        function applyDrag() {
            dragRaf = 0;
            if (!dragging || !dragSlot) return;
            var pct = Math.max(-1, Math.min(1, dragDX / 220));
            // Same transform the centre card has at rest, with only X shifted.
            dragSlot.style.transform = 'translate3d(' + (pct * 14) + '%, 0, 0px) rotateY(0deg) scale(1.2)';
        }
        function onDragStart(x) {
            dragging = true; dragStartX = x; dragDX = 0;
            dragSlot = centerSlot;
            dragTransitionOff = false;
            stage.style.cursor = 'grabbing';
        }
        function onDragMove(x) {
            if (!dragging) return;
            dragDX = x - dragStartX;
            if (!dragTransitionOff && dragSlot) { dragSlot.style.transition = 'none'; dragTransitionOff = true; } // once per drag, not per event
            if (!dragRaf) dragRaf = requestAnimationFrame(applyDrag);
        }
        function onDragEnd() {
            if (!dragging) return;
            dragging = false;
            if (dragRaf) { cancelAnimationFrame(dragRaf); dragRaf = 0; }
            stage.style.cursor = '';
            var moved = Math.abs(dragDX) > 60;
            // A real drag must not also be treated as a click on the card underneath.
            if (Math.abs(dragDX) > 5) {
                suppressClick = true;
                setTimeout(function () { suppressClick = false; }, 50);
            }
            if (dragSlot) dragSlot.style.transition = '';
            if (moved) goTo(current + (dragDX < 0 ? 1 : -1));
            else layout(); // snap back
            dragDX = 0;
            dragSlot = null;
        }
        stage.addEventListener('click', function (e) {
            if (suppressClick) { e.stopPropagation(); e.preventDefault(); suppressClick = false; }
        }, true);

        if (window.PointerEvent) {
            // Let the browser keep vertical page scrolling; horizontal gestures belong to the carousel.
            stage.style.touchAction = 'pan-y';
            var onPointerMove = function (e) { if (e.isPrimary) onDragMove(e.clientX); };
            var onPointerEnd = function (e) {
                window.removeEventListener('pointermove', onPointerMove);
                window.removeEventListener('pointerup', onPointerEnd);
                window.removeEventListener('pointercancel', onPointerEnd);
                if (e.type === 'pointercancel') dragDX = 0; // browser took over (e.g. page scroll): snap back, don't navigate
                onDragEnd();
            };
            stage.addEventListener('pointerdown', function (e) {
                if (!e.isPrimary || (e.pointerType === 'mouse' && e.button !== 0)) return;
                onDragStart(e.clientX);
                // Move/up listeners exist only for the duration of a drag.
                window.addEventListener('pointermove', onPointerMove);
                window.addEventListener('pointerup', onPointerEnd);
                window.addEventListener('pointercancel', onPointerEnd);
            });
        } else {
            // Very old browsers without Pointer Events: classic mouse + touch.
            stage.addEventListener('mousedown', function (e) { if (e.button === 0) onDragStart(e.clientX); });
            window.addEventListener('mousemove', function (e) { onDragMove(e.clientX); });
            window.addEventListener('mouseup', onDragEnd);
            stage.addEventListener('touchstart', function (e) { onDragStart(e.touches[0].clientX); }, { passive: true });
            stage.addEventListener('touchmove', function (e) { onDragMove(e.touches[0].clientX); }, { passive: true });
            stage.addEventListener('touchend', onDragEnd);
        }

        // ── Hover effects (tilt + magnetic button) ──
        // Scroll/resize only flag the cached geometry as stale; the scroll
        // listener exists only while the pointer is over the stage or button.
        var hoverCount = 0;
        function onScrollDirty() { markGeometryDirty(); }
        function hoverEnter() { markGeometryDirty(); if (++hoverCount === 1) window.addEventListener('scroll', onScrollDirty, { passive: true }); }
        function hoverLeave() { if (hoverCount > 0 && --hoverCount === 0) window.removeEventListener('scroll', onScrollDirty); }
        window.addEventListener('resize', markGeometryDirty, { passive: true });

        if (hasGSAP && !reduceMotion && finePointer) {
            // Mouse tilt on the centre card only. Events just record the pointer;
            // the tween is created at most once per frame, replaces the previous
            // one (overwrite) and never measures layout while the card is settled.
            var tiltRaf = 0, lastMX = 0, lastMY = 0;
            function applyTilt() {
                tiltRaf = 0;
                if (dragging || !centerSlot || !sectionInView) return;
                var settling = performance.now() < settleUntil;
                if (rectDirty || !tiltRect || settling) {
                    tiltRect = centerSlot.getBoundingClientRect();
                    rectDirty = settling; // keep re-measuring only while the card is still moving
                }
                var px = (lastMX - tiltRect.left) / tiltRect.width - 0.5;
                var py = (lastMY - tiltRect.top) / tiltRect.height - 0.5;
                gsap.to(tiltEls[current], { rotateY: px * 10, rotateX: py * -10, duration: 0.6, ease: 'power2.out', transformPerspective: 800, overwrite: 'auto' });
            }
            stage.addEventListener('mouseenter', hoverEnter);
            stage.addEventListener('mousemove', function (e) {
                if (dragging) return;
                lastMX = e.clientX; lastMY = e.clientY;
                if (!tiltRaf) tiltRaf = requestAnimationFrame(applyTilt);
            }, { passive: true });
            stage.addEventListener('mouseleave', function () {
                hoverLeave();
                if (tiltRaf) { cancelAnimationFrame(tiltRaf); tiltRaf = 0; }
                if (!centerSlot) return;
                gsap.to(tiltEls[current], { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' });
            });
        }

        // ── Magnetic CTA button ──
        if (hasGSAP && !reduceMotion && finePointer) {
            var ctaRaf = 0, ctaMX = 0, ctaMY = 0;
            function applyMagnet() {
                ctaRaf = 0;
                var curX = gsap.getProperty(ctaEl, 'x') || 0;
                var curY = gsap.getProperty(ctaEl, 'y') || 0;
                if (ctaDirty || !ctaBase) {
                    // Resting centre = measured centre minus the transform GSAP already applied.
                    var rect = ctaEl.getBoundingClientRect();
                    ctaBase = { x: rect.left + rect.width / 2 - curX, y: rect.top + rect.height / 2 - curY };
                    ctaDirty = false;
                }
                var mx = ctaMX - (ctaBase.x + curX);
                var my = ctaMY - (ctaBase.y + curY);
                gsap.to(ctaEl, { x: mx * 0.35, y: my * 0.5, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
            }
            ctaEl.addEventListener('mouseenter', hoverEnter);
            ctaEl.addEventListener('mousemove', function (e) {
                ctaMX = e.clientX; ctaMY = e.clientY;
                if (!ctaRaf) ctaRaf = requestAnimationFrame(applyMagnet);
            }, { passive: true });
            ctaEl.addEventListener('mouseleave', function () {
                hoverLeave();
                if (ctaRaf) { cancelAnimationFrame(ctaRaf); ctaRaf = 0; }
                gsap.to(ctaEl, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
            });
        }

        // ── "View Full Case Study" → opens the full write-up in a modal
        //    instead of jumping to #contact. Falls back to the old anchor
        //    behaviour for any project that hasn't been given a `full`
        //    write-up yet. ──
        var csmModal = document.getElementById('csmModal');
        var csmScroll = document.getElementById('csmScroll');
        var csmClose = document.getElementById('csmClose');

        function esc(s) { return s == null ? '' : String(s); }

        function buildCaseModalHTML(full) {
            var html = '';
            html += '<span class="csm-tag">Case Study</span>';
            html += '<h2 class="csm-title">' + esc(full.client) + '</h2>';

            var metaItems = [];
            if (full.industry) metaItems.push(['Industry', full.industry]);
            if (full.location) metaItems.push(['Location', full.location]);
            if (full.duration) metaItems.push(['Duration', full.duration]);
            if (full.services) metaItems.push(['Services', full.services]);
            if (metaItems.length) {
                html += '<div class="csm-meta">' + metaItems.map(function (m) {
                    return '<div class="csm-meta-item"><b>' + esc(m[0]) + '</b><span>' + m[1] + '</span></div>';
                }).join('') + '</div>';
            }

            if (full.challengeIntro || (full.challengeList && full.challengeList.length)) {
                html += '<div class="csm-section"><h3 class="csm-h4">The Challenge</h3>';
                if (full.challengeIntro) html += '<p class="csm-p">' + full.challengeIntro + '</p>';
                if (full.challengeList && full.challengeList.length) {
                    html += '<ul class="csm-list">' + full.challengeList.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>';
                }
                html += '</div>';
            }

            if (full.results && full.results.length) {
                html += '<div class="csm-section"><h3 class="csm-h4">Results</h3><div class="csm-results">';
                html += full.results.map(function (r) {
                    return '<div class="csm-result"><span class="csm-result-icon">' + esc(r.icon) + '</span><span class="csm-result-text">' + r.text + '</span></div>';
                }).join('');
                html += '</div></div>';
            }

            if (full.strategyIntro || (full.strategy && full.strategy.length)) {
                html += '<div class="csm-section"><h3 class="csm-h4">Our Strategy</h3>';
                if (full.strategyIntro) html += '<p class="csm-p">' + full.strategyIntro + '</p>';
                if (full.strategy && full.strategy.length) {
                    html += '<ol class="csm-steps">' + full.strategy.map(function (s) {
                        return '<li class="csm-step"><div class="csm-step-title">' + esc(s.title) + '</div><div class="csm-step-desc">' + s.desc + '</div></li>';
                    }).join('') + '</ol>';
                }
                html += '</div>';
            }

            if (full.transformation) {
                html += '<div class="csm-section"><h3 class="csm-h4">The Transformation</h3><div class="csm-transform">';
                html += '<div class="csm-transform-col is-before"><span class="csm-transform-label">Before</span><ul>' +
                    full.transformation.before.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></div>';
                html += '<div class="csm-transform-col is-after"><span class="csm-transform-label">After</span><ul>' +
                    full.transformation.after.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></div>';
                html += '</div></div>';
            }

            if (full.takeaways && full.takeaways.length) {
                html += '<div class="csm-section"><h3 class="csm-h4">Key Takeaways</h3><ul class="csm-list">' +
                    full.takeaways.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></div>';
            }

            if (full.impact) {
                html += '<div class="csm-section"><h3 class="csm-h4">The Impact</h3><p class="csm-p">' + full.impact + '</p></div>';
            }

            return html;
        }

        function openCaseModal() {
            var proj = CASE_STUDIES[current];
            if (!proj.full) return false; // no write-up yet — let the link fall back to #contact
            csmScroll.innerHTML = buildCaseModalHTML(proj.full);
            csmScroll.scrollTop = 0;
            csmModal.classList.add('open');
            csmModal.setAttribute('aria-hidden', 'false');
            modalOpen = true;
            syncAnimationState(); // the carousel is hidden behind a blurred overlay: stop animating it
            if (window.mintLockScroll) window.mintLockScroll();
            return true;
        }
        function closeCaseModal() {
            csmModal.classList.remove('open');
            csmModal.setAttribute('aria-hidden', 'true');
            modalOpen = false;
            syncAnimationState();
            if (window.mintUnlockScroll) window.mintUnlockScroll();
        }
        ctaEl.addEventListener('click', function (e) {
            if (openCaseModal()) e.preventDefault();
        });
        csmClose.addEventListener('click', closeCaseModal);
        csmModal.addEventListener('click', function (e) { if (e.target === csmModal) closeCaseModal(); });

        // ── Visibility tracking (observers, not measurements) ──
        new IntersectionObserver(function (entries) {
            stageInView = entries[entries.length - 1].isIntersecting;
        }, { threshold: 0 }).observe(stage);

        // ── Soft parallax + slow rotation on the leaf watermark while
        //    this section is in view (listener removed the rest of the
        //    time, so it costs nothing on the rest of the page).
        //    The section's page position is measured once (and on resize),
        //    then derived from scrollY, so scrolling never forces a layout. ──
        var leafBg = document.getElementById('csLeafBg');
        var leafRaf = 0, leafTop = 0, leafH = 0, leafVh = window.innerHeight, leafLast = null;
        function measureLeaf() {
            var rect = section.getBoundingClientRect();
            leafTop = rect.top + window.scrollY;
            leafH = rect.height;
            leafVh = window.innerHeight;
        }
        function updateLeaf() {
            leafRaf = 0;
            var top = leafTop - window.scrollY;
            var progress = 1 - (top + leafH / 2) / leafVh; // ~-1..1 through the section
            var deg = Math.round(progress * 10 * 1000) / 1000;
            if (deg === leafLast) return;
            leafLast = deg;
            leafBg.style.transform = 'rotate(' + deg + 'deg)';
        }
        function onLeafScroll() { if (!leafRaf) leafRaf = requestAnimationFrame(updateLeaf); }

        new IntersectionObserver(function (entries) {
            sectionInView = entries[entries.length - 1].isIntersecting;
            syncAnimationState();
            if (sectionInView) {
                if (!reduceMotion) {
                    measureLeaf();
                    window.addEventListener('scroll', onLeafScroll, { passive: true });
                    updateLeaf();
                }
            } else {
                window.removeEventListener('scroll', onLeafScroll);
                if (leafRaf) { cancelAnimationFrame(leafRaf); leafRaf = 0; }
                stopMetrics(true); // leaving the section: drop any in-flight count-up, show final values
            }
        }, { threshold: 0 }).observe(section);

        // ── Case-study images: start fetching + decoding shortly BEFORE the
        //    section scrolls in, so the 3D cards don't have to decode large
        //    images on the frame they first appear. ──
        var warmObserver = new IntersectionObserver(function (entries) {
            if (!entries[entries.length - 1].isIntersecting) return;
            warmObserver.disconnect();
            imgEls.forEach(function (img) {
                if (img.loading === 'lazy') img.loading = 'eager';
                if (img.decode) img.decode().catch(function () {});
            });
        }, { rootMargin: '1500px 0px' });
        warmObserver.observe(section);

        // ── Re-lay-out on real size changes (viewport resize, font swap) ──
        var roRaf = null;
        if (window.ResizeObserver) {
            new ResizeObserver(function () {
                if (roRaf) cancelAnimationFrame(roRaf);
                roRaf = requestAnimationFrame(layout);
            }).observe(stage);
            if (!reduceMotion) {
                // Re-measure the leaf's reference position only when the section itself,
                // or the page content above it (lazy images, fonts), changes size.
                var leafMeasureRO = new ResizeObserver(function () {
                    measureLeaf();
                    if (sectionInView) updateLeaf();
                });
                leafMeasureRO.observe(section);
                var mainSite = document.getElementById('main-site');
                if (mainSite) leafMeasureRO.observe(mainSite);
            }
        }

        layout();
        updateDetails(false);
    })();
    });
