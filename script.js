// Existing smooth scroll preserved from your original version
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' }); }
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
                document.getElementById('resultsGrid').innerHTML = doc.getElementById('resultsGrid').innerHTML;
            });
    }, 300);
}

// Deep Dive Drawer Trigger
function openDeepDive(id) {
    fetch(`search?id=${id}`)
        .then(res => res.json())
        .then(data => {
            const drawer = document.getElementById('drawer');
            const content = document.getElementById('drawerContent');
            content.innerHTML = `
                <div class="badge">${data.id}</div>
                <h2 style="margin-top:20px">${data.title}</h2>
                <p style="color:var(--text-dim)">${data.company}</p>
                <hr style="border:0; border-top:1px solid var(--border); margin:20px 0">
                <p>${data.context}</p>
                <h4 style="margin-top:30px">Key Highlights</h4>
                <ul>${data.highlights.map(h => `<li style="margin-bottom:10px">${h}</li>`).join('')}</ul>
            `;
            drawer.classList.add('active');
        });
}

function closeDrawer() {
    document.getElementById('drawer').classList.remove('active');
}

// Theme Toggle
function toggleTheme() {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme');
    root.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}
