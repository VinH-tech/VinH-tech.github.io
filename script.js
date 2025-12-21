// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Original Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Search Logic with Debouncing
let searchTimer;
function handleSearch(query) {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
        fetch(`search?query=${encodeURIComponent(query)}`)
            .then(res => res.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newContent = doc.getElementById('resultsGrid').innerHTML;
                document.getElementById('resultsGrid').innerHTML = newContent;
            });
    }, 300);
}

// Deep Dive Drawer Functionality
function openDeepDive(id) {
    fetch(`search?id=${id}`)
        .then(res => res.json())
        .then(data => {
            const drawer = document.getElementById('drawer');
            const content = document.getElementById('drawerContent');
            content.innerHTML = `
                <div class="badge">${data.id}</div>
                <h2 style="margin: 20px 0 10px">${data.title}</h2>
                <p style="color: var(--text-dim)">${data.company}</p>
                <hr style="border: 0; border-top: 1px solid var(--border); margin: 20px 0">
                <p>${data.context}</p>
                <h4 style="margin-top: 30px">Impact & Milestones</h4>
                <ul style="padding-left: 20px">
                    ${data.highlights.map(h => `<li style="margin-bottom: 12px">${h}</li>`).join('')}
                </ul>
            `;
            drawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
}

function closeDrawer() {
    document.getElementById('drawer').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Theme Toggle
function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    root.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
}
