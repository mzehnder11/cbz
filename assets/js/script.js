document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.desktop-nav');
    
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            // Change icon simply
            toggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
        });
    }
});
