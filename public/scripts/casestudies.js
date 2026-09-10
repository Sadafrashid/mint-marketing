    document.addEventListener('DOMContentLoaded', function () {
    (function () {
        var stage = document.getElementById('csStage');
        if (!stage) return;

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
            
            
            
        ];

        var total = CASE_STUDIES.length;
        var current = 0;
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var hasGSAP = typeof gsap !== 'undefined';

        var prevBtn = document.getElementById('csPrev');
        var nextBtn = document.getElementById('csNext');
        var progressFill = document.getElementById('csProgressFill');
        var eyebrowEl = document.getElementById('csEyebrow');
        var nameEl = document.getElementById('csName');
        var descEl = document.getElementById('csDesc');
        var metricsEl = document.getElementById('csMetrics');
        var ctaEl = document.getElementById('csCta');

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
        }

        // ── Count-up metrics, replayed every time the centre card changes ──
        function playMetrics(proj) {
            metricsEl.innerHTML = '';
            proj.metrics.forEach(function (m) {
                var wrap = document.createElement('div');
                wrap.className = 'cs-metric';
                wrap.innerHTML = '<span class="cs-metric-num">0' + m.suffix + '</span><span class="cs-metric-label">' + m.label + '</span>';
                metricsEl.appendChild(wrap);
                var numEl = wrap.querySelector('.cs-metric-num');

                if (reduceMotion) { numEl.textContent = m.value + m.suffix; return; }

                var duration = 1400;
                var start = performance.now();
                function tick(now) {
                    var p = Math.min((now - start) / duration, 1);
                    var eased = 1 - Math.pow(1 - p, 3);
                    numEl.textContent = Math.floor(eased * m.value) + m.suffix;
                    if (p < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            });
        }

        // ── Swap the details panel to match the centre card ──
        function updateDetails() {
            var proj = CASE_STUDIES[current];
            eyebrowEl.innerHTML = proj.services;
            nameEl.textContent = proj.name;
            descEl.innerHTML = proj.desc;
            playMetrics(proj);

            if (hasGSAP && !reduceMotion) {
                gsap.fromTo('#csDetails', { opacity: 0.4, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
            }
        }

        function goTo(i) {
            current = ((i % total) + total) % total;
            layout();
            updateDetails();
        }

        prevBtn.addEventListener('click', function () { goTo(current - 1); });
        nextBtn.addEventListener('click', function () { goTo(current + 1); });

        document.addEventListener('keydown', function (e) {
            var rect = stage.getBoundingClientRect();
            if (rect.top > window.innerHeight || rect.bottom < 0) return; // only when in view
            if (e.key === 'ArrowLeft') goTo(current - 1);
            if (e.key === 'ArrowRight') goTo(current + 1);
        });

        // ── Drag / swipe, with a GSAP elastic snap-back on release ──
        var dragging = false, dragStartX = 0, dragDX = 0;
        function onDragStart(x) { dragging = true; dragStartX = x; dragDX = 0; stage.style.cursor = 'grabbing'; }
        function onDragMove(x) {
            if (!dragging) return;
            dragDX = x - dragStartX;
            var pct = Math.max(-1, Math.min(1, dragDX / 220));
            slots.forEach(function (slot) {
                if (slot.classList.contains('is-center')) {
                    slot.style.transition = 'none';
                    slot.style.transform = slot.style.transform.replace(/translate3d\([^,]+,/, 'translate3d(' + (pct * 14) + '%,');
                }
            });
        }
        function onDragEnd() {
            if (!dragging) return;
            dragging = false;
            stage.style.cursor = '';
            var threshold = 60;
            var moved = Math.abs(dragDX) > threshold;
            slots.forEach(function (slot) { slot.style.transition = ''; });
            if (moved) goTo(current + (dragDX < 0 ? 1 : -1));
            else layout(); // snap back
            dragDX = 0;
        }
        stage.addEventListener('pointerdown', function (e) { onDragStart(e.clientX); });
        window.addEventListener('pointermove', function (e) { onDragMove(e.clientX); });
        window.addEventListener('pointerup', onDragEnd);
        stage.addEventListener('touchstart', function (e) { onDragStart(e.touches[0].clientX); }, { passive: true });
        stage.addEventListener('touchmove', function (e) { onDragMove(e.touches[0].clientX); }, { passive: true });
        stage.addEventListener('touchend', onDragEnd);

        // ── Mouse tilt on the centre card only ──
        if (hasGSAP && !reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            stage.addEventListener('mousemove', function (e) {
                var centerSlot = stage.querySelector('.cs-slot.is-center');
                if (!centerSlot || dragging) return;
                var tiltEl = centerSlot.querySelector('.cs-card-tilt');
                var rect = centerSlot.getBoundingClientRect();
                var px = (e.clientX - rect.left) / rect.width - 0.5;
                var py = (e.clientY - rect.top) / rect.height - 0.5;
                gsap.to(tiltEl, { rotateY: px * 10, rotateX: py * -10, duration: 0.6, ease: 'power2.out', transformPerspective: 800 });
            });
            stage.addEventListener('mouseleave', function () {
                var centerSlot = stage.querySelector('.cs-slot.is-center');
                if (!centerSlot) return;
                gsap.to(centerSlot.querySelector('.cs-card-tilt'), { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
            });
        }

        // ── Magnetic CTA button ──
        if (hasGSAP && !reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            ctaEl.addEventListener('mousemove', function (e) {
                var rect = ctaEl.getBoundingClientRect();
                var mx = e.clientX - (rect.left + rect.width / 2);
                var my = e.clientY - (rect.top + rect.height / 2);
                gsap.to(ctaEl, { x: mx * 0.35, y: my * 0.5, duration: 0.4, ease: 'power2.out' });
            });
            ctaEl.addEventListener('mouseleave', function () {
                gsap.to(ctaEl, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
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
            if (window.mintLockScroll) window.mintLockScroll();
            return true;
        }
        function closeCaseModal() {
            csmModal.classList.remove('open');
            csmModal.setAttribute('aria-hidden', 'true');
            if (window.mintUnlockScroll) window.mintUnlockScroll();
        }
        ctaEl.addEventListener('click', function (e) {
            if (openCaseModal()) e.preventDefault();
        });
        csmClose.addEventListener('click', closeCaseModal);
        csmModal.addEventListener('click', function (e) { if (e.target === csmModal) closeCaseModal(); });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && csmModal.classList.contains('open')) closeCaseModal();
        });

        // ── Soft parallax + slow rotation on the leaf watermark while
        //    this section is in view (listener removed the rest of the
        //    time, so it costs nothing on the rest of the page) ──
        var leafBg = document.getElementById('csLeafBg');
        var leafRaf = null;
        function updateLeaf() {
            var rect = stage.closest('.cs-section').getBoundingClientRect();
            var progress = 1 - (rect.top + rect.height / 2) / window.innerHeight; // ~-1..1 through the section
            leafBg.style.transform = 'rotate(' + (progress * 10) + 'deg)';
            leafRaf = null;
        }
        var leafObserver = new IntersectionObserver(function (entries) {
            var inView = entries[0].isIntersecting;
            if (inView) {
                window.addEventListener('scroll', onLeafScroll, { passive: true });
                updateLeaf();
            } else {
                window.removeEventListener('scroll', onLeafScroll);
            }
        }, { threshold: 0 });
        function onLeafScroll() { if (!leafRaf) leafRaf = requestAnimationFrame(updateLeaf); }
        if (!reduceMotion) leafObserver.observe(stage.closest('.cs-section'));

        // ── Re-lay-out on real size changes (viewport resize, font swap) ──
        var roRaf = null;
        if (window.ResizeObserver) {
            new ResizeObserver(function () {
                if (roRaf) cancelAnimationFrame(roRaf);
                roRaf = requestAnimationFrame(layout);
            }).observe(stage);
        }

        layout();
        updateDetails();
    })();
    });
