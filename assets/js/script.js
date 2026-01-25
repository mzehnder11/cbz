document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.desktop-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            // Update accessibility state
            toggle.setAttribute('aria-expanded', isOpen);
            toggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
            // Change icon simply
            toggle.textContent = isOpen ? '✕' : '☰';
        });
    }
});
