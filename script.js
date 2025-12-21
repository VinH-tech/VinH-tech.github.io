let allProjects = [];

// 1. Fetch data on load
async function loadData() {
    try {
        const response = await fetch('projects.json'); // Ensure file is in same directory
        allProjects = await response.json();
        renderProjects(allProjects); // Initial display of all projects
    } catch (err) {
        console.error("Error loading project data:", err);
    }
}

// 2. Render Projects to Grid
function renderProjects(data) {
    const grid = document.getElementById('resultsGrid');
    grid.innerHTML = data.map(p => `
        <div class="card" onclick="openDeepDive('${p.id}')">
            <span class="id-tag">${p.id}</span>
            <h3>${p.title}</h3>
            <p class="company">${p.company}</p>
            <div class="mini-tags">
                ${p.taxonomy.keywords.slice(0, 3).map(kw => `<span>#${kw}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// 3. Handle Search (Replaces Java Servlet Logic)
function handleSearch(query) {
    const q = query.toLowerCase().trim();
    const filtered = allProjects.filter(p => {
        return p.title.toLowerCase().includes(q) ||
               p.company.toLowerCase().includes(q) ||
               p.taxonomy.keywords.some(k => k.toLowerCase().includes(q)) ||
               p.taxonomy.capabilities.some(c => c.toLowerCase().includes(q));
    });
    renderProjects(filtered);
}

// 4. Open Deep Dive Drawer
function openDeepDive(id) {
    const project = allProjects.find(p => p.id === id);
    if (!project) return;

    const content = `
        <div class="badge">${project.id}</div>
        <h2>${project.title}</h2>
        <p class="company-detail">${project.company}</p>
        <hr>
        <p>${project.context}</p>
        <h4>Key Highlights</h4>
        <ul>${project.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
    `;
    document.getElementById('drawerContent').innerHTML = content;
    document.getElementById('drawer').classList.add('active');
}

function closeDrawer() {
    document.getElementById('drawer').classList.remove('active');
}

// 5. Initialize
window.onload = loadData;
