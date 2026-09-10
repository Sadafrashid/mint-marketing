document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.stat-count');
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000; // Total animation runtime in milliseconds
        const startTime = performance.now();

        const updateNumber = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
                // Easing curve: easeOutQuad for a smooth deceleration look
                const progress = elapsedTime / duration;
                const easeProgress = progress * (2 - progress); 
                const currentValue = Math.floor(easeProgress * target);
                
                // Formats large values with local thousands separators (e.g., 10,000)
                counter.innerText = currentValue.toLocaleString() + suffix;
                requestAnimationFrame(updateNumber);
            } else {
                counter.innerText = target.toLocaleString() + suffix;
            }
        };

        requestAnimationFrame(updateNumber);
    };

    // Trigger calculations automatically when scrolled into viewport bounds
    const observerOptions = { threshold: 0.3 };
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Runs the animation exactly once
            }
        });
    }, observerOptions);

    counters.forEach(counter => statsObserver.observe(counter));
});
