document.addEventListener('DOMContentLoaded', function() {
    function loadNavbar() {
        const navbarContainer = document.createElement('div');
        navbarContainer.id = 'navbar-container';
        
        fetch('navbar.html')
            .then(response => response.text())
            .then(html => {
                navbarContainer.innerHTML = html;
                document.body.prepend(navbarContainer);
                setupNavbarEvents();
            })
            .catch(error => {
                console.error('Error loading navbar:', error);
            });
    }

    function setupNavbarEvents() {
        document.querySelectorAll('.login').forEach(btn => {
            btn.addEventListener('click', () => window.location.href = 'login.html');
        });
        
        document.querySelectorAll('.register').forEach(btn => {
            btn.addEventListener('click', () => window.location.href = 'signup.html');
        });

        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
            });
        });
    }

    loadNavbar();
});