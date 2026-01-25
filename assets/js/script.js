document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.desktop-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen);
            toggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
            toggle.textContent = isOpen ? '✕' : '☰';

            // Prevent scrolling when menu is open
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
    }

    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it's revealed, we can stop observing it
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Update Copyright Year
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace(/\d{4}/, currentYear);
    }
});
