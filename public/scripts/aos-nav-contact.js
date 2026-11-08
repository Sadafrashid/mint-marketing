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
    // so visitors never leave the site or open an email app. Also provides instant
    // email FORMAT validation (red cross / green tick). The tick only means the
    // text looks like an email address; it does not verify that a mailbox exists.
    (function () {
        var form = document.getElementById('mintContactForm');
        if (!form) return;

        // One place to change if the email service is ever swapped.
        var ENDPOINT_URL = 'https://formsubmit.co/ajax/workwithmintmarketing@gmail.com';
        var TIMEOUT_MS = 20000;

        var submitBtn = form.querySelector('.submit-btn');
        var errorBox = document.getElementById('contact-error');
        var emailInput = form.elements['email'];
        var emailIcon = document.getElementById('email-status-icon');
        var emailHint = document.getElementById('email-hint');
        var idleLabel = submitBtn.textContent;
        var isSending = false;

        // ---------- Email format validation ----------
        var ICON_OK = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
        var ICON_BAD = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
        var EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

        function isValidEmailFormat(value) {
            if (!value || value.length > 254) return false;
            if (!EMAIL_RE.test(value)) return false;
            var local = value.split('@')[0];
            if (local.length > 64 || local.charAt(0) === '.' || local.charAt(local.length - 1) === '.' || local.indexOf('..') !== -1) return false;
            return /\.[A-Za-z]{2,}$/.test(value); // last part (e.g. .com) must be letters
        }

        function updateEmailStatus() {
            var value = emailInput.value.trim();
            if (!value) { // empty: show nothing
                emailIcon.innerHTML = '';
                emailIcon.style.display = 'none';
                emailHint.style.display = 'none';
                emailInput.removeAttribute('aria-invalid');
                return false;
            }
            var ok = isValidEmailFormat(value);
            emailIcon.innerHTML = ok ? ICON_OK : ICON_BAD;
            emailIcon.style.color = ok ? '#1e5700' : '#b3261e';
            emailIcon.style.display = 'flex';
            emailInput.setAttribute('aria-invalid', ok ? 'false' : 'true');
            if (ok) {
                emailHint.style.display = 'none';
            } else {
                emailHint.textContent = 'Please enter a valid email, like name@example.com';
                emailHint.style.display = 'block';
            }
            return ok;
        }

        // ---------- Phone validation ----------
        // Customer-entered number. Accepts Indian numbers (10 digits starting 6-9,
        // with or without +91 / 91 / 0) and international numbers with a country
        // code (7-15 digits, per E.164). Spaces, dashes, dots and brackets are fine.
        var phoneInput = form.elements['phone'];
        var phoneHint = document.getElementById('phone-hint');

        function isValidPhone(value) {
            if (!value) return false;
            if (!/^\+?[0-9\s\-().]+$/.test(value)) return false;     // allowed characters only
            if (value.indexOf('+') > 0) return false;                  // '+' only as the first character
            var digits = value.replace(/\D/g, '');
            if (digits.length < 7 || digits.length > 15) return false;
            if (/^(\d)\1+$/.test(digits)) return false;               // e.g. 0000000000
            if (value.charAt(0) === '+') {
                if (digits.indexOf('91') === 0) return /^91[6-9]\d{9}$/.test(digits); // +91 => Indian mobile
                return digits.length >= 8;                             // other country codes
            }
            // No '+': treat an Indian-style entry (0 / 91 prefix or plain 10 digits) as Indian mobile
            if (/^0\d{10}$/.test(digits)) return /^0[6-9]\d{9}$/.test(digits);
            if (/^91\d{10}$/.test(digits)) return /^91[6-9]\d{9}$/.test(digits);
            if (digits.length === 10 && /^[6-9]/.test(digits)) return true;
            return digits.length >= 8; // other international numbers typed without '+'
        }

        function updatePhoneStatus(showEmpty) {
            var value = phoneInput.value.trim();
            if (!value) {
                phoneHint.style.display = 'none';
                phoneInput.removeAttribute('aria-invalid');
                return false;
            }
            var ok = isValidPhone(value);
            phoneInput.setAttribute('aria-invalid', ok ? 'false' : 'true');
            if (ok) {
                phoneHint.style.display = 'none';
            } else {
                phoneHint.textContent = 'Please enter a valid phone number, e.g. 98765 43210 or +44 20 7946 0958';
                phoneHint.style.display = 'block';
            }
            return ok;
        }

        phoneInput.addEventListener('blur', updatePhoneStatus);
        phoneInput.addEventListener('input', function () {
            if (phoneInput.getAttribute('aria-invalid') === 'true') updatePhoneStatus(); // clear hint once fixed
        });

        emailInput.addEventListener('input', updateEmailStatus); // while typing / editing
        emailInput.addEventListener('blur', updateEmailStatus);  // when leaving the field

        // ---------- Submission ----------
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
            var email = emailInput.value.trim();
            var phone = phoneInput.value.trim();
            var service = form.elements['service'].value;
            var message = form.elements['message'].value.trim();
            if (!name || !email || !phone || !service) return;

            if (!updateEmailStatus()) { // invalid format: do not send
                emailInput.focus();
                return;
            }

            if (!updatePhoneStatus()) { // invalid phone: do not send
                phoneInput.focus();
                return;
            }

            setSending(true);

            // URL-encoded body + only CORS-safelisted headers => a "simple" request,
            // so the browser sends no preflight (OPTIONS) request.
            var params = new URLSearchParams();
            params.append('name', name);
            params.append('email', email);
            params.append('phone', phone);
            params.append('service', service);
            params.append('message', message || '(No message provided)');
            params.append('_subject', 'New website enquiry from ' + name + ' (' + service + ')');
            params.append('_replyto', email);
            params.append('_template', 'table');
            params.append('_captcha', 'false');

            var controller = new AbortController();
            var timer = setTimeout(function () { controller.abort(); }, TIMEOUT_MS);

            fetch(ENDPOINT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'Accept': 'application/json'
                },
                body: params.toString(),
                signal: controller.signal
            })
            .then(function (res) {
                return res.json().catch(function () { return {}; }).then(function (data) {
                    return { ok: res.ok, status: res.status, data: data || {} };
                });
            })
            .then(function (result) {
                clearTimeout(timer);
                var apiMsg = String(result.data.message || '');
                var accepted = result.ok &&
                    (result.data.success === true || result.data.success === 'true') &&
                    !/activat/i.test(apiMsg);
                if (!accepted) {
                    // Log only the status and the service's own message (no customer data).
                    console.error('Enquiry not accepted. HTTP ' + result.status + (apiMsg ? ': ' + apiMsg : ''));
                    throw new Error('send-failed');
                }
                // Only now, with explicit confirmation, show the success state.
                form.style.display = 'none';
                document.getElementById('success-message').style.display = 'block';
            })
            .catch(function (err) {
                clearTimeout(timer);
                if (err && err.message !== 'send-failed') console.error('Enquiry request failed:', err && err.name);
                setSending(false);
                showError('Sorry, we couldn\u2019t send your enquiry just now. Please check your connection and try again, or email us at workwithmintmarketing@gmail.com.');
            });
        });
    })();
