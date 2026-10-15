(function () {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('menu-overlay');
    const body = document.body;

    if (!menuToggle || !sidebar || !overlay) return;

    function toggleMenu() {
        const isOpen = menuToggle.classList.toggle('is-open');
        sidebar.classList.toggle('is-open');
        overlay.classList.toggle('is-open');
        body.classList.toggle('sidebar-open');
        menuToggle.setAttribute('aria-expanded', isOpen);
        sidebar.setAttribute('aria-hidden', !isOpen);
    }

    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
            toggleMenu();
        }
    });
})();