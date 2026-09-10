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
    document.getElementById('mintContactForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const service = this.querySelector('select').value;
    const message = this.querySelector('textarea').value;

    if(name && email && service) {
        // Open the user's email client manually
        const mailtoLink = `mailto:workwithmintmarketing@gmail.com?subject=Inquiry from ${name}&body=Service: ${service}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
        window.location.href = mailtoLink;

        // Show the success UI
        this.style.display = 'none';
        document.getElementById('success-message').style.display = 'block';
    }
});

