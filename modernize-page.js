/**
 * Page Modernization Script
 * Run this in browser console or Node.js to help modernize pages
 */

// Page configurations for modernization
const PAGE_CONFIGS = {
  'index.html': {
    title: 'Logical Abhishek',
    description: 'Check BEU and SBTE Results, Ranks, College Codes, APAAR Correction, Answer Keys, and more. All Bihar technical education tools in one place.',
    hasHero: true,
    heroTitle: 'Logical Abhishek',
    heroSubtitle: 'All Bihar Technical Education Tools in One Place',
    showDonate: true
  },
  'colleges.html': {
    title: 'Government B.Tech Colleges | Logical Abhishek',
    description: 'Explore Government B.Tech Colleges on Logical Abhishek. Access useful Bihar engineering, education, result and study resources online.',
    hasHero: true,
    heroTitle: 'Government B.Tech Colleges',
    heroSubtitle: 'Complete list of Government Engineering Colleges in Bihar with official website links'
  },
  'digitalomr.html': {
    title: 'Digital OMR Evaluator | Logical Abhishek',
    description: 'Professional Digital OMR Evaluator - Create exams, fill OMR sheets, auto-evaluate with Master Key, share via QR/Link. Works offline, saves data locally.',
    hasHero: false, // Custom hero
    customHero: true
  },
  'beuresult.html': {
    title: 'BEU Result - Logical Abhishek',
    description: 'Check BEU Results, Download Marksheets, View Statistics. Unofficial BEU Result portal for Bihar Engineering University students.',
    hasHero: true,
    heroTitle: 'BEU Result Portal',
    heroSubtitle: 'Check and Download BEU Results, Marksheets & Statistics'
  },
  'SBTEResult.html': {
    title: 'SBTE Result (Unofficial) | Logical Abhishek',
    description: 'Check SBTE Results online. Unofficial SBTE Result portal for Bihar Polytechnic students.',
    hasHero: true,
    heroTitle: 'SBTE Result Portal',
    heroSubtitle: 'Check and Download SBTE Polytechnic Results'
  },
  'rankcheck.html': {
    title: 'BEU Rank Check | Logical Abhishek',
    description: 'Check BEU Rank for B.Tech admissions. Rank predictor and cutoff analysis for Bihar Engineering University.',
    hasHero: true,
    heroTitle: 'BEU Rank Check',
    heroSubtitle: 'Check your BEU Rank and predict college admission chances'
  },
  'percentagecalc.html': {
    title: 'BTech Percentage Calculator | Logical Abhishek',
    description: 'Calculate BTech percentage from CGPA/SGPA. Convert CGPA to percentage for Bihar Engineering University.',
    hasHero: true,
    heroTitle: 'BTech Percentage Calculator',
    heroSubtitle: 'Convert CGPA/SGPA to Percentage for BEU'
  },
  'NCERT.html': {
    title: 'NCERT Reader | Logical Abhishek',
    description: 'Read NCERT textbooks online. Access NCERT books for classes 6-12, all subjects.',
    hasHero: true,
    heroTitle: 'NCERT Reader',
    heroSubtitle: 'Read NCERT Books Online - Classes 6-12, All Subjects'
  },
  'ncertquiz.html': {
    title: 'NCERT Quiz | Logical Abhishek',
    description: 'Practice NCERT-based quizzes. Test your knowledge with chapter-wise quizzes for classes 6-12.',
    hasHero: true,
    heroTitle: 'NCERT Quiz',
    heroSubtitle: 'Practice Chapter-wise NCERT Quizzes - Classes 6-12'
  },
  'mathpractice.html': {
    title: 'Math Practice Mode | Logical Abhishek',
    description: 'Practice Mathematics with interactive problems. Improve your math skills with timed practice sessions.',
    hasHero: true,
    heroTitle: 'Math Practice Mode',
    heroSubtitle: 'Practice Mathematics with Interactive Problems & Timed Sessions'
  },
  'ncertscience06-10.html': {
    title: 'NCERT Science (6-10) | Logical Abhishek',
    description: 'NCERT Science textbooks and solutions for classes 6-10. Complete science curriculum coverage.',
    hasHero: true,
    heroTitle: 'NCERT Science (6-10)',
    heroSubtitle: 'Science Textbooks & Solutions for Classes 6-10'
  },
  'nptelverify.html': {
    title: 'NPTEL Certificate Verification | Logical Abhishek',
    description: 'Verify NPTEL certificates online. Check authenticity of NPTEL course completion certificates.',
    hasHero: true,
    heroTitle: 'NPTEL Certificate Verification',
    heroSubtitle: 'Verify NPTEL Course Certificates Online'
  },
  'oneresult.html': {
    title: 'One Result | Logical Abhishek',
    description: 'Unified result portal for all Bihar board and university results. Check all results in one place.',
    hasHero: true,
    heroTitle: 'One Result Portal',
    heroSubtitle: 'All Bihar Results in One Place - Board & University'
  },
  'latestresult.html': {
    title: 'Latest Results | Logical Abhishek',
    description: 'Latest exam results for Bihar boards and universities. Stay updated with latest result announcements.',
    hasHero: true,
    heroTitle: 'Latest Results',
    heroSubtitle: 'Latest Exam Results - Bihar Boards & Universities'
  },
  'result.html': {
    title: 'Result Portal | Logical Abhishek',
    description: 'Check all types of results - Board, University, Competitive exams. Fast and reliable result portal.',
    hasHero: true,
    heroTitle: 'Result Portal',
    heroSubtitle: 'Check All Results - Board, University, Competitive Exams'
  },
  'percentagecalc.html': {
    title: 'Percentage Calculator | Logical Abhishek',
    description: 'Calculate percentage from marks. Quick percentage calculator for students and teachers.',
    hasHero: true,
    heroTitle: 'Percentage Calculator',
    heroSubtitle: 'Calculate Percentage from Marks - Quick & Easy'
  },
  'cloud.html': {
    title: 'Cloud Analyzer | Logical Abhishek',
    description: 'Analyze cloud resources and costs. Cloud resource analyzer for AWS, Azure, GCP.',
    hasHero: true,
    heroTitle: 'Cloud Analyzer',
    heroSubtitle: 'Analyze Cloud Resources & Optimize Costs'
  },
  'pension.html': {
    title: 'Bihar Pension Status | Logical Abhishek',
    description: 'Check Bihar pension status online. Track pension payment status for Bihar government pensioners.',
    hasHero: true,
    heroTitle: 'Bihar Pension Status',
    heroSubtitle: 'Check Pension Payment Status - Bihar Government'
  },
  'wifibookmark.html': {
    title: 'WiFi Bookmark Generator | Logical Abhishek',
    description: 'Generate QR codes for WiFi sharing. Create WiFi bookmarks with QR codes for easy sharing.',
    hasHero: true,
    heroTitle: 'WiFi Bookmark Generator',
    heroSubtitle: 'Generate WiFi QR Codes & Bookmarks for Easy Sharing'
  },
  'xml.html': {
    title: 'XML Tools | Logical Abhishek',
    description: 'XML formatting, validation and conversion tools. Format, validate and convert XML files online.',
    hasHero: true,
    heroTitle: 'XML Tools',
    heroSubtitle: 'XML Formatter, Validator & Converter Tools'
  },
  'sscje2026.html': {
    title: 'SSC JE 2026 Preparation | Logical Abhishek',
    description: 'SSC JE 2026 Civil Engineering preparation. Study material, previous papers, mock tests.',
    hasHero: true,
    heroTitle: 'SSC JE 2026 (Civil) Preparation',
    heroSubtitle: 'Complete SSC JE Civil Engineering Preparation Resources'
  },
  'BiharMatricAnsKey2025.html': {
    title: 'Bihar Matric Answer Key 2025 | Logical Abhishek',
    description: 'Bihar Board Matric Answer Key 2025. Download official answer keys for Bihar Board Matric exam.',
    hasHero: true,
    heroTitle: 'Bihar Matric Answer Key 2025',
    heroSubtitle: 'Official Bihar Board Matric Answer Keys 2025'
  },
  'mahashivratri.html': {
    title: 'Maha Shivratri | Logical Abhishek',
    description: 'Maha Shivratri celebrations, wishes, and information. Everything about Maha Shivratri festival.',
    hasHero: true,
    heroTitle: 'Maha Shivratri',
    heroSubtitle: 'Maha Shivratri Wishes, Information & Celebrations'
  },
  'Happy Maha Shivratri.mp4': {
    // Video file, skip
  },
  'test.html': {
    title: 'Test Page | Logical Abhishek',
    description: 'Test page for development and debugging.',
    hasHero: false,
    skip: true // Don't modernize test pages
  },
  'google2bf6f52668c856d9.html': {
    // Google verification file, skip
    skip: true
  },
  'ads.txt': {
    // Ads.txt file, skip
    skip: true
  },
  'robots.txt': {
    // Robots.txt file, skip
    skip: true
  },
  'sitemap.xml': {
    // Sitemap file, skip
    skip: true
  },
  '_config.yml': {
    // Config file, skip
    skip: true
  },
  'config.json': {
    // Config file, skip
    skip: true
  },
  'gecsheikhpura.html': {
    title: 'GEC Sheikhpura | Logical Abhishek',
    description: 'Government Engineering College Sheikhpura - Branch details, facilities, and information.',
    hasHero: true,
    heroTitle: 'GEC Sheikhpura',
    heroSubtitle: 'Government Engineering College Sheikhpura - Branches & Facilities'
  }
};

// Generate modernized HTML template
function generateModernizedPage(pageName, config) {
  if (config.skip) return `<!-- ${pageName} skipped - ${pageName} -->`;

  const hasHero = config.hasHero !== false;
  const customHero = config.customHero || false;

  let heroSection = '';
  if (hasHero && !customHero) {
    heroSection = `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">${config.heroTitle || config.title}</h1>
        <p class="hero-subtitle">${config.heroSubtitle || ''}</p>
      </div>
    </section>`;
  }

  let contentWrapper = '';
  if (config.contentWrapper) {
    contentWrapper = config.contentWrapper;
  } else {
    contentWrapper = `<main class="container"><section class="section"><div class="section-header"><span class="section-tag">Content</span><h2 class="section-title">${config.heroTitle || config.title}</h2></div><div class="content-placeholder"><!-- Original content goes here --></div></section></main>`;
  }

  const donateBtn = config.showDonate !== false ? '<button class="btn btn-primary donate-btn btn-lg" data-donate>₹ Donate</button>' : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${config.description}">
    <title>${config.title}</title>

    <!-- Google Ads -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6429074331864701" crossorigin="anonymous"></script>

    <!-- Modern 3D Design System -->
    <link rel="stylesheet" href="assets/css/modern-3d.css">
    <link rel="stylesheet" href="site-responsive.css">
    <link rel="canonical" href="https://erabhishekkumar.github.io/${pageName}">

    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-P6L9J7XHXW"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-P6L9J7XHXW');
    </script>
</head>
<body>
    <nav class="site-seo-nav" aria-label="Main navigation">
        <a href="index.html">Home</a>
        <a href="BEUPYQ/beupyqs.html">BEU PYQ</a>
        <a href="BEUPYQ/beusyllabus.html">BEU Syllabus</a>
    </nav>

    <!-- Top Navigation Bar -->
    <header class="topbar">
        <div class="topbar-brand">
            <div class="topbar-logo">
                <img src="favicon.ico" alt="Logical Abhishek logo" onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, var(--color-accent), var(--color-accent-2))';">
            </div>
            <span class="topbar-title">Logical Abhishek</span>
        </div>

        <nav class="topbar-nav">
            <a href="index.html" class="topbar-link">Home</a>
            <a href="BEUPYQ/beupyqs.html" class="topbar-link">BEU PYQ</a>
            <a href="BEUPYQ/beusyllabus.html" class="topbar-link">BEU Syllabus</a>
        </nav>

        <div class="topbar-actions">
            <button class="theme-toggle" data-theme-toggle aria-label="Toggle theme">
                <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            </button>
            <button class="menu-btn" aria-label="Toggle menu" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>

    <div class="menu-overlay"></div>

    ${heroSection}

    ${donateBtn}

    ${contentWrapper}

    <footer class="footer">
        <p>Copyright © All rights reserved. Design and Developed by ErAbhishekKumar</p>
        <p><small>This website is made for the purpose of information and All the data shown is available in public.</small></p>
        <p>Contact: <a href="https://t.me/erabhishekkumar" target="_blank">Telegram</a></p>
    </footer>

    <!-- Modern 3D Design System JS -->
    <script src="assets/js/modern-3d.js"></script>
    <script src="assets/js/page-template.js"></script>

    <script>
        // Page-specific initialization
        document.addEventListener('DOMContentLoaded', () => {
            console.log('[${pageName}] Initialized with modern design system');
        });
    </script>
</body>
</html>`;
}

// Generate all pages
console.log('Page Modernization Configurations:');
Object.entries(PAGE_CONFIGS).forEach(([pageName, config]) => {
  if (!config.skip) {
    console.log(`\n--- ${pageName} ---`);
    console.log(`Title: ${config.title}`);
    console.log(`Description: ${config.description}`);
  }
});

// Export for use
window.PAGE_CONFIGS = PAGE_CONFIGS;
window.generateModernizedPage = generateModernizedPage;