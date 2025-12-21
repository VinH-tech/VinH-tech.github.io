// Data Initialization
let allProjects = [];

async function init() {
    try {
        const response = await fetch('projects.json');
        allProjects = await response.json();
        if (document.getElementById('resultsGrid')) {
            renderProjects(allProjects);
        }
        document.getElementById('year').textContent = new Date().getFullYear();
    } catch (err) {
        console.error("Data load failed:", err);
    }
}

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Search Logic (for portfolio.html)
function handleSearch(query) {
    const q = query.toLowerCase().trim();
    const filtered = allProjects.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.taxonomy.keywords.some(k => k.toLowerCase().includes(q))
    );
    renderProjects(filtered);
}

function renderProjects(data) {
    const grid = document.getElementById('resultsGrid');
    grid.innerHTML = data.map(p => `
        <div class="card" onclick="openDeepDive('${p.id}')">
            <span class="id-tag">${p.id}</span>
            <h3>${p.title}</h3>
            <p class="company-sub">${p.company}</p>
        </div>
    `).join('');
}

// Theme Toggle
function toggleTheme() {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme');
    root.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

window.onload = init;
