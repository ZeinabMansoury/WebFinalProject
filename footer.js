// footer.js
document.addEventListener('DOMContentLoaded', function() {
    // Create footer container
    const footerContainer = document.createElement('div');
    footerContainer.id = 'footer-container';
    
    // Fetch footer HTML
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            footerContainer.innerHTML = data;
            document.body.appendChild(footerContainer);
            
            // Add some space before footer if needed
            const mainContent = document.querySelector('main') || document.querySelector('.container') || document.querySelector('.content');
            if (mainContent) {
                mainContent.style.marginBottom = '40px';
            }
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            // Fallback footer if fetch fails
            const fallbackFooter = document.createElement('footer');
            fallbackFooter.innerHTML = `
                <div style="text-align:center;padding:20px;background:#2b2d42;color:white;">
                    <p>&copy; ${new Date().getFullYear()} CareerConnect. All rights reserved.</p>
                </div>
            `;
            document.body.appendChild(fallbackFooter);
        });
});