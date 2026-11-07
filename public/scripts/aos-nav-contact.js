    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active') ? 'true' : 'false');
    });

    // Accessibility: the hamburger is a <div role="button">, not a native
    // <button>, so it doesn't get Enter/Space activation for free — this
    // adds it without touching any of the existing visual styling.
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            hamburger.click();
        }
    });

    // Close the mobile menu on outside click or Escape — small touch,
    // but stops the menu from staying open once someone taps elsewhere.
    document.addEventListener('click', (e) => {
        if (!navLinks.classList.contains('active')) return;
        if (e.target.closest('#nav-links, #hamburger')) return;
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Scroll-spy: highlight whichever section's nav link matches what's
    // actually in view, so the nav always reflects where you are on the page.
    const navAnchorLinks = Array.from(document.querySelectorAll('#nav-links a[href^="#"]'));
    const navSections = navAnchorLinks
        .map(a => document.getElementById(a.getAttribute('href').slice(1)))
        .filter(Boolean);
    if (navSections.length) {
        const navSpy = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                navAnchorLinks.forEach(a => a.classList.remove('nav-active'));
                const match = navAnchorLinks.find(a => a.getAttribute('href') === '#' + entry.target.id);
                if (match) match.classList.add('nav-active');
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        navSections.forEach(sec => navSpy.observe(sec));
    }

    // Close menu when a link is clicked (useful for one-page sites)
    // Contact form: delivers enquiries by email through FormSubmit (AJAX endpoint),
    // so visitors never leave the site or open an email app.
    (function () {
        var form = document.getElementById('mintContactForm');
        if (!form) return;

        var FORMSUBMIT_URL = 'https://formsubmit.co/ajax/workwithmintmarketing@gmail.com';
        var submitBtn = form.querySelector('.submit-btn');
        var errorBox = document.getElementById('contact-error');
        var idleLabel = submitBtn.textContent;
        var isSending = false;

        function setSending(on) {
            isSending = on;
            submitBtn.disabled = on;
            submitBtn.textContent = on ? 'SENDING...' : idleLabel;
            submitBtn.style.opacity = on ? '0.7' : '';
            submitBtn.style.cursor = on ? 'not-allowed' : '';
            submitBtn.setAttribute('aria-busy', on ? 'true' : 'false');
        }

        function showError(msg) {
            errorBox.textContent = msg;
            errorBox.style.display = 'block';
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (isSending) return; // block duplicate submissions

            errorBox.style.display = 'none';

            // Spam trap: real visitors never see or fill this field.
            if (form.elements['_honey'] && form.elements['_honey'].value) return;

            var name = form.elements['name'].value.trim();
            var email = form.elements['email'].value.trim();
            var service = form.elements['service'].value;
            var message = form.elements['message'].value.trim();
            if (!name || !email || !service) return;

            setSending(true);

            var controller = new AbortController();
            var timer = setTimeout(function () { controller.abort(); }, 20000);

            fetch(FORMSUBMIT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    service: service,
                    message: message || '(No message provided)',
                    _subject: 'New website enquiry from ' + name + ' (' + service + ')',
                    _replyto: email,
                    _template: 'table',
                    _captcha: 'false'
                }),
                signal: controller.signal
            })
            .then(function (res) {
                return res.json().catch(function () { return {}; }).then(function (data) {
                    return { ok: res.ok, data: data };
                });
            })
            .then(function (result) {
                clearTimeout(timer);
                var success = result.ok && (result.data.success === true || result.data.success === 'true');
                if (!success) {
                    console.error('FormSubmit did not accept the enquiry:', result.data);
                    throw new Error('send-failed');
                }
                // Only now do we show the success state.
                form.style.display = 'none';
                document.getElementById('success-message').style.display = 'block';
            })
            .catch(function (err) {
                clearTimeout(timer);
                if (err && err.message !== 'send-failed') console.error('Contact form error:', err);
                setSending(false);
                showError('Sorry, we couldn\u2019t send your enquiry just now. Please check your connection and try again, or email us at workwithmintmarketing@gmail.com.');
            });
        });
    })();
