<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vinayak Hattangadi - Technology & Transformation Leader</title>
    <link rel="stylesheet" href="css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle Theme">🌓</button>

    <header class="header">
        <div class="container">
            <nav class="nav">
                <h1 class="logo">VINAYAK HATTANGADI</h1>
                <div class="nav-links">
                    <a href="#about" class="nav-link">About</a>
                    <a href="#portfolio" class="nav-link">Portfolio</a>
                    <a href="#certifications" class="nav-link">Certifications</a>
                    <a href="#contact" class="nav-link">Contact</a>
                </div>
            </nav>
        </div>
    </header>

    <section class="hero-section">
        <div class="container">
            <div class="hero-grid">
                <div class="hero-content">
                    <div class="badge">Technology & Transformation Leader</div>
                    <h1 class="hero-title">Vinayak<br>Hattangadi</h1>
                    <p class="hero-description">
                        25+ years driving digital transformation, GCC/ODC operations, and enterprise solutions for global organizations.
                    </p>
                    <div class="hero-buttons">
                        <a href="resume.pdf" class="btn btn-primary">Download Resume</a>
                        <a href="#contact" class="btn btn-secondary">Get in Touch</a>
                    </div>
                </div>
                <div class="hero-image-container">
                    <div class="hero-image-wrapper">
                        <img src="https://customer-assets.emergentagent.com/job_senior-exec-profile/artifacts/9yhwvn3y_Vinayak_Pic.jpeg" alt="Vinayak Hattangadi" class="hero-image">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="portfolio" class="search-section">
        <div class="container">
            <h2 class="section-title">Strategic Portfolio</h2>
            <div class="search-wrapper">
                <input type="text" id="mainSearch" class="search-input" 
                       placeholder="Search expertise: 'Cloud', 'GCC', 'Unisys'..." 
                       onkeyup="handleSearch(this.value)">
            </div>
            
            <div id="resultsGrid" class="results-grid">
                <c:forEach var="project" items="${projects}">
                    <div class="card" onclick="openDeepDive('${project.id}')">
                        <span class="id-tag">${project.id}</span>
                        <h3>${project.title}</h3>
                        <p class="company">${project.company}</p>
                        <div class="mini-tags">
                            <c:forEach var="kw" items="${project.taxonomy.keywords}" end="2">
                                <span>#${kw}</span>
                            </c:forEach>
                        </div>
                    </div>
                </c:forEach>
            </div>
        </div>
    </section>

    <section id="about" class="about-section">
        <div class="container">
            <h2 class="section-title">About</h2>
            <p class="about-text">
                Vinayak brings to the table over two decades of experience leading GCC/ODC operations and driving digital transformations. Known for his engineering-first approach, he aligns technology with business priorities to deliver long-term value.
            </p>
        </div>
    </section>

    <div id="drawer" class="drawer">
        <div class="drawer-header">
            <button onclick="closeDrawer()" class="btn-close">&times;</button>
        </div>
        <div id="drawerContent" class="drawer-body"></div>
    </div>

    <footer id="contact" class="footer">
        <div class="container">
            <p>&copy; <span id="year"></span> Vinayak Hattangadi. All rights reserved.</p>
        </div>
    </footer>

    <script src="js/script.js"></script>
</body>
</html>
