let allProjects = [];

// 1. Initial Data Load
async function initPortfolio() {
    try {
        const response = await fetch('projects.json');
        allProjects = await response.json();
        renderProjects(allProjects);
        document.getElementById('year').textContent = new Date().getFullYear();
    } catch (err) {
        console.error("Data load failed. Ensure projects.json is in the root folder.", err);
    }
}

// 2. Filter & Search Logic
function handleSearch(query) {
    const q = query.toLowerCase().trim();
    const filtered = allProjects.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.taxonomy.keywords.some(k => k.toLowerCase().includes(q)) ||
        p.taxonomy.capabilities.some(c => c.toLowerCase().includes(q))
    );
    
    renderProjects(filtered);
    updateCount(filtered.length);
}

// 3. Render Grid to HTML
function renderProjects(data) {
    const grid = document.getElementById('resultsGrid');
    grid.innerHTML = data.map(p => `
        <div class="card" onclick="openDeepDive('${p.id}')">
            <span class="id-tag">${p.id}</span>
            <h3>${p.title}</h3>
            <p class="company-sub">${p.company}</p>
            <div class="mini-tags">
                ${p.taxonomy.keywords.slice(0, 3).map(kw => `<span>#${kw}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// 4. UI Functions
function openDeepDive(id) {
    const p = allProjects.find(item => item.id === id);
    if (!p) return;

    document.getElementById('drawerContent').innerHTML = `
        <span class="id-tag">${p.id}</span>
        <h2>${p.title}</h2>
        <p class="company-detail">${p.company}</p>
        <hr>
        <p>${p.context}</p>
        <h4>Strategic Impact</h4>
        <ul>${p.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
    `;
    document.getElementById('drawer').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    document.getElementById('drawer').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateCount(count) {
    const el = document.getElementById('searchCount');
    el.textContent = count > 0 ? `Showing ${count} strategic insights` : "No results found.";
}

function toggleTheme() {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme');
    root.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

window.onload = initPortfolio;
