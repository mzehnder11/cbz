document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.desktop-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen);

            // Prevent scrolling when menu is open
            document.body.style.overflow = isOpen ? 'hidden' : '';

            // Close submenus when closing the main menu
            if (!isOpen) {
                document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('expanded'));
            }
        });

        // Mobile Dropdown Toggle Logic
        const dropdownLinks = document.querySelectorAll('.desktop-nav .dropdown > a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Mobile check - detect if the toggle button is visible
                const isMobile = window.getComputedStyle(toggle).display !== 'none';

                if (isMobile) {
                    e.preventDefault();
                    const parent = link.parentElement;

                    // Close other dropdowns
                    document.querySelectorAll('.dropdown').forEach(d => {
                        if (d !== parent) d.classList.remove('expanded');
                    });

                    parent.classList.toggle('expanded');
                }
            });
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

    // Header Scroll Animation
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    const scrollThreshold = 100; // Only hide after scrolling down this much

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Add class when scrolled down to shrink header/add shadow
        if (currentScrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }

        // Show/Hide based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            // Scrolling down
            header.classList.add('header--hidden');
        } else {
            // Scrolling up
            header.classList.remove('header--hidden');
        }

        lastScrollY = currentScrollY;
    });

    // Update Copyright Year
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace(/\d{4}/, currentYear);
    }

    // FAQ Accordion Logic
    const faqButtons = document.querySelectorAll('.faq-question');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const item = button.parentElement;
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            // Close all others (optional - for accordion behavior)
            document.querySelectorAll('.faq-question').forEach(otherBtn => {
                if (otherBtn !== button) {
                    otherBtn.setAttribute('aria-expanded', 'false');
                    otherBtn.nextElementSibling.hidden = true;
                    otherBtn.parentElement.classList.remove('active');
                }
            });

            // Toggle current
            button.setAttribute('aria-expanded', !isExpanded);
            answer.hidden = isExpanded;

            if (!isExpanded) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });

    // Floating Label Logic: detect content to keep labels floating
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    function checkInputContent(input) {
        const parent = input.closest('.form-group');
        if (!parent) return;
        
        if (input.value && input.value.trim() !== '') {
            parent.classList.add('has-value');
        } else {
            parent.classList.remove('has-value');
        }
    }

    formInputs.forEach(input => {
        // Check initially
        checkInputContent(input);

        // Check on input/change
        input.addEventListener('input', () => checkInputContent(input));
        input.addEventListener('change', () => checkInputContent(input));
        
        // Also check on transition start (sometimes needed for autofill)
        input.addEventListener('animationstart', (e) => {
            if (e.animationName === 'onAutoFillStart') checkInputContent(input);
        });
    });

    // Mutation Observer to watch for value changes via JS (e.g. on the Erstgespräch page)
    const observer_val = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && (mutation.attributeName === 'value' || mutation.target.tagName === 'TEXTAREA')) {
                checkInputContent(mutation.target);
            }
        });
    });

    formInputs.forEach(input => {
        observer_val.observe(input, { attributes: true });
    });
});
