const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const APP_VERSION = process.env.APP_VERSION || '1.0.0';
const BUILD_NUMBER = process.env.BUILD_NUMBER || 'dev-local';
const ENVIRONMENT = process.env.NODE_ENV || 'production';

app.use(express.json());

// Health Check Endpoint (Used by Jenkins Pipeline Stage 6)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: APP_VERSION,
    build: BUILD_NUMBER
  });
});

// App Info API
app.get('/api/info', (req, res) => {
  res.status(200).json({
    name: 'SUDARSHNA CHAND M S - DevOps Portfolio',
    role: 'DevOps Engineer',
    version: APP_VERSION,
    build: BUILD_NUMBER,
    environment: ENVIRONMENT,
    nodeVersion: process.version,
    deployedVia: 'Jenkins CI/CD & Docker'
  });
});

// Portfolio & Resume Web Application
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SUDARSHNA CHAND M S | DevOps Engineer Portfolio</title>
  <meta name="description" content="Resume and DevOps portfolio of Sudarshna Chand M S. Containerized and deployed automatically using Jenkins CI/CD pipeline and Docker.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #0a0f1d;
      --card-bg: rgba(17, 24, 39, 0.75);
      --card-border: rgba(255, 255, 255, 0.08);
      --card-hover-border: rgba(56, 189, 248, 0.4);
      --accent-blue: #38bdf8;
      --accent-indigo: #6366f1;
      --accent-cyan: #06b6d4;
      --accent-emerald: #10b981;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      --gradient-primary: linear-gradient(135deg, #38bdf8 0%, #6366f1 100%);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: var(--bg-dark);
      background-image: 
        radial-gradient(circle at 15% 10%, rgba(56, 189, 248, 0.12) 0%, transparent 40%),
        radial-gradient(circle at 85% 60%, rgba(99, 102, 241, 0.12) 0%, transparent 40%),
        radial-gradient(circle at 50% 90%, rgba(16, 185, 129, 0.08) 0%, transparent 40%);
      color: var(--text-main);
      line-height: 1.6;
      min-height: 100vh;
      padding: 32px 16px 80px 16px;
    }

    .container {
      max-width: 1080px;
      margin: 0 auto;
    }

    /* Live Pipeline Deployment Banner */
    .ci-banner {
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(56, 189, 248, 0.25);
      border-radius: 16px;
      padding: 12px 20px;
      margin-bottom: 28px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
    }
    .ci-banner-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(16, 185, 129, 0.15);
      color: var(--accent-emerald);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.04em;
    }
    .pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-emerald);
      box-shadow: 0 0 10px var(--accent-emerald);
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.3; transform: scale(0.85); }
    }
    .ci-title {
      font-size: 0.88rem;
      color: var(--text-muted);
      font-family: 'JetBrains Mono', monospace;
    }
    .ci-title strong {
      color: var(--text-main);
    }
    .ci-metrics {
      display: flex;
      align-items: center;
      gap: 16px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .ci-tag {
      color: var(--accent-blue);
      font-weight: 600;
    }

    /* Main Hero Header */
    .hero-card {
      background: var(--card-bg);
      backdrop-filter: blur(16px);
      border: 1px solid var(--card-border);
      border-radius: 24px;
      padding: 40px;
      margin-bottom: 24px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      position: relative;
      overflow: hidden;
    }
    .hero-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--gradient-primary);
    }
    .hero-header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
      margin-bottom: 24px;
    }
    .hero-title h1 {
      font-size: 2.6rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 1.15;
      background: linear-gradient(135deg, #ffffff 40%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-subtitle {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--accent-blue);
      margin-top: 6px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .contact-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 14px 24px;
      font-size: 0.9rem;
      color: var(--text-muted);
      border-top: 1px solid var(--card-border);
      padding-top: 20px;
    }
    .contact-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .contact-item a {
      color: var(--text-main);
      text-decoration: none;
      transition: color 0.2s;
    }
    .contact-item a:hover {
      color: var(--accent-blue);
      text-decoration: underline;
    }
    .action-buttons {
      display: flex;
      gap: 12px;
      margin-top: 24px;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 0.88rem;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.25s ease;
      border: none;
    }
    .btn-primary {
      background: var(--gradient-primary);
      color: #04121d;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px -5px rgba(56, 189, 248, 0.4);
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--card-border);
      color: var(--text-main);
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }

    /* Section Component */
    .section-card {
      background: var(--card-bg);
      backdrop-filter: blur(16px);
      border: 1px solid var(--card-border);
      border-radius: 20px;
      padding: 32px;
      margin-bottom: 24px;
      transition: border-color 0.2s ease;
    }
    .section-card:hover {
      border-color: var(--card-hover-border);
    }
    .section-title {
      font-size: 1.15rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--accent-blue);
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 12px;
    }
    .section-title svg {
      color: var(--accent-blue);
    }

    /* Summary */
    .summary-text {
      font-size: 1rem;
      color: #cbd5e1;
      line-height: 1.8;
    }
    .summary-text strong {
      color: #ffffff;
      font-weight: 600;
    }

    /* Technical Skills Grid */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
      gap: 18px;
    }
    .skill-category {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid var(--card-border);
      border-radius: 14px;
      padding: 18px;
    }
    .skill-cat-title {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 12px;
    }
    .skill-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .skill-pill {
      font-size: 0.82rem;
      font-weight: 600;
      background: rgba(56, 189, 248, 0.1);
      color: #7dd3fc;
      border: 1px solid rgba(56, 189, 248, 0.25);
      padding: 4px 10px;
      border-radius: 8px;
      transition: all 0.2s;
    }
    .skill-pill:hover {
      background: rgba(56, 189, 248, 0.2);
      transform: translateY(-1px);
    }
    .skill-pill.devops {
      background: rgba(99, 102, 241, 0.15);
      color: #a5b4fc;
      border-color: rgba(99, 102, 241, 0.35);
    }
    .skill-pill.cloud {
      background: rgba(245, 158, 11, 0.15);
      color: #fcd34d;
      border-color: rgba(245, 158, 11, 0.35);
    }

    /* Timeline & Experience Items */
    .timeline {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .timeline-item {
      position: relative;
      padding-left: 24px;
      border-left: 2px solid rgba(56, 189, 248, 0.3);
    }
    .timeline-item::before {
      content: '';
      position: absolute;
      left: -6px;
      top: 4px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--accent-blue);
      box-shadow: 0 0 10px var(--accent-blue);
    }
    .item-header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 6px;
    }
    .item-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #ffffff;
    }
    .item-subtitle {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--accent-blue);
      margin-bottom: 8px;
    }
    .item-date {
      font-size: 0.85rem;
      color: var(--text-dim);
      font-family: 'JetBrains Mono', monospace;
      font-weight: 500;
    }
    .bullets {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 10px;
    }
    .bullets li {
      font-size: 0.92rem;
      color: #cbd5e1;
      position: relative;
      padding-left: 18px;
    }
    .bullets li::before {
      content: '▹';
      position: absolute;
      left: 0;
      color: var(--accent-blue);
      font-size: 1.1rem;
      line-height: 1;
    }

    /* Projects Cards */
    .projects-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .project-card {
      background: rgba(15, 23, 42, 0.65);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 24px;
      transition: all 0.25s ease;
    }
    .project-card:hover {
      transform: translateY(-2px);
      border-color: var(--card-hover-border);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
    }
    .project-tech-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-top: 16px;
      padding-top: 14px;
      border-top: 1px dashed rgba(255, 255, 255, 0.08);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
    }
    .tech-label {
      color: var(--text-dim);
      font-weight: 600;
    }

    /* Education & Certifications 2-Column */
    .two-col {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
    }

    /* Print Styles to mirror standard clean PDF */
    @media print {
      body {
        background: #ffffff !important;
        color: #000000 !important;
        padding: 0 !important;
      }
      .ci-banner, .action-buttons {
        display: none !important;
      }
      .container {
        max-width: 100% !important;
      }
      .hero-card, .section-card, .project-card, .skill-category {
        background: transparent !important;
        border: none !important;
        padding: 10px 0 !important;
        box-shadow: none !important;
      }
      .hero-title h1 {
        color: #000000 !important;
        -webkit-text-fill-color: #000000 !important;
      }
      .section-title {
        color: #000000 !important;
        border-bottom: 2px solid #000000 !important;
      }
      .skill-pill {
        border: 1px solid #999 !important;
        color: #000 !important;
        background: #eee !important;
      }
      .bullets li, .summary-text {
        color: #222 !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">

    <!-- Live CI/CD Pipeline Automation Badge -->
    <div class="ci-banner">
      <div class="ci-banner-left">
        <div class="status-badge">
          <span class="pulse-dot"></span>
          <span>DEPLOYED &amp; HEALTHY</span>
        </div>
        <div class="ci-title">
          <strong>Jenkins CI/CD Automation</strong> &bull; Elevate Lab Internship Task 2
        </div>
      </div>
      <div class="ci-metrics">
        <span>Build: <span class="ci-tag">#${BUILD_NUMBER}</span></span>
        <span>Version: <span class="ci-tag">v${APP_VERSION}</span></span>
        <span>Environment: <span class="ci-tag">${ENVIRONMENT}</span></span>
        <span>Status: <span class="ci-tag" style="color: var(--accent-emerald);">UP (200 OK)</span></span>
      </div>
    </div>

    <!-- Header / Hero Section -->
    <header class="hero-card">
      <div class="hero-header">
        <div class="hero-title">
          <h1>SUDARSHNA CHAND M S</h1>
          <div class="hero-subtitle">
            <span>DevOps Engineer</span>
          </div>
        </div>
        <div class="action-buttons">
          <button class="btn btn-primary" onclick="window.print()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
            Print / Save PDF
          </button>
          <a href="/health" target="_blank" class="btn btn-secondary">
            Health Status (/health)
          </a>
          <a href="/api/info" target="_blank" class="btn btn-secondary">
            API Info (/api/info)
          </a>
        </div>
      </div>

      <div class="contact-grid">
        <div class="contact-item">
          <span>📞</span>
          <a href="tel:+917598411449">+91 7598411449</a>
        </div>
        <div class="contact-item">
          <span>✉️</span>
          <a href="mailto:sudarshanachand007@gmail.com">sudarshanachand007@gmail.com</a>
        </div>
        <div class="contact-item">
          <span>📍</span>
          <span>Tamil Nadu, India</span>
        </div>
        <div class="contact-item">
          <span>🔗</span>
          <a href="https://www.linkedin.com/in/sudarshna-chand-m-s-8a8917291/" target="_blank">LinkedIn Profile</a>
        </div>
        <div class="contact-item">
          <span>🐙</span>
          <a href="https://github.com/SUDARSHNACHAND" target="_blank">GitHub: SUDARSHNACHAND</a>
        </div>
      </div>
    </header>

    <!-- Profile Summary Section -->
    <section class="section-card">
      <h2 class="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        Profile Summary
      </h2>
      <p class="summary-text">
        Final-year Computer Science and Engineering student with <strong>entry-level DevOps knowledge and hands-on project experience in Linux, Git/GitHub, Docker, Jenkins, CI/CD, Kubernetes, Terraform, and AWS EC2</strong>. Familiar with application containerization, automated build and deployment, Infrastructure as Code, and monitoring using Prometheus and Grafana. Seeking an entry-level <strong>DevOps Engineer</strong> role to apply and strengthen skills in automation, cloud infrastructure, and continuous delivery.
      </p>
    </section>

    <!-- Technical Skills Section -->
    <section class="section-card">
      <h2 class="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        Technical Skills
      </h2>
      <div class="skills-grid">
        <div class="skill-category">
          <div class="skill-cat-title">DevOps &amp; CI/CD Pipelines</div>
          <div class="skill-badges">
            <span class="skill-pill devops">Docker</span>
            <span class="skill-pill devops">Docker Hub</span>
            <span class="skill-pill devops">Kubernetes</span>
            <span class="skill-pill devops">Jenkins</span>
            <span class="skill-pill devops">CI/CD Pipelines</span>
            <span class="skill-pill devops">Terraform (IaC)</span>
          </div>
        </div>

        <div class="skill-category">
          <div class="skill-cat-title">Cloud &amp; Monitoring</div>
          <div class="skill-badges">
            <span class="skill-pill cloud">AWS EC2</span>
            <span class="skill-pill cloud">AWS S3</span>
            <span class="skill-pill cloud">AWS IAM</span>
            <span class="skill-pill cloud">CloudWatch</span>
            <span class="skill-pill">Prometheus</span>
            <span class="skill-pill">Grafana</span>
          </div>
        </div>

        <div class="skill-category">
          <div class="skill-cat-title">OS, Scripting &amp; Tools</div>
          <div class="skill-badges">
            <span class="skill-pill">Linux</span>
            <span class="skill-pill">Ubuntu</span>
            <span class="skill-pill">Bash</span>
            <span class="skill-pill">Shell Scripting</span>
            <span class="skill-pill">Git / GitHub</span>
            <span class="skill-pill">VS Code</span>
          </div>
        </div>

        <div class="skill-category">
          <div class="skill-cat-title">Programming, Web &amp; Database</div>
          <div class="skill-badges">
            <span class="skill-pill">Python (Basic)</span>
            <span class="skill-pill">Java</span>
            <span class="skill-pill">HTML5</span>
            <span class="skill-pill">CSS3</span>
            <span class="skill-pill">JavaScript</span>
            <span class="skill-pill">SQL</span>
            <span class="skill-pill">DBMS</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="section-card">
      <h2 class="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
        Projects
      </h2>
      <div class="projects-container">
        
        <div class="project-card">
          <div class="item-header">
            <div class="item-title">1. End-to-End DevOps CI/CD Pipeline &amp; Cloud-Native Deployment</div>
          </div>
          <ul class="bullets">
            <li>Built and automated an end-to-end CI/CD pipeline for a Flask web application using GitHub, Jenkins, Docker, and Kubernetes.</li>
            <li>Automated source checkout, dependency installation, unit testing, Docker image build, Docker Hub push, and Kubernetes deployment through Jenkins.</li>
            <li>Provisioned Kubernetes infrastructure using Terraform (Infrastructure as Code) and implemented containerized application deployment with scalable replicas.</li>
            <li>Integrated Prometheus and Grafana for application metrics, monitoring, and observability; configured GitHub Webhooks for automated pipeline triggering.</li>
          </ul>
          <div class="project-tech-bar">
            <span class="tech-label">Tools:</span>
            <span class="skill-pill devops">Git</span>
            <span class="skill-pill devops">GitHub</span>
            <span class="skill-pill devops">Jenkins</span>
            <span class="skill-pill devops">Docker</span>
            <span class="skill-pill devops">Docker Hub</span>
            <span class="skill-pill devops">Kubernetes</span>
            <span class="skill-pill devops">Terraform</span>
            <span class="skill-pill">Prometheus</span>
            <span class="skill-pill">Grafana</span>
            <span class="skill-pill">Python Flask</span>
            <span class="skill-pill">Cloudflare Tunnel</span>
          </div>
        </div>

        <div class="project-card">
          <div class="item-header">
            <div class="item-title">2. Automated CI/CD Deployment Using GitHub, Jenkins, Docker &amp; AWS</div>
          </div>
          <ul class="bullets">
            <li>Pushed application code to GitHub for version control and source management.</li>
            <li>Configured Jenkins CI/CD pipeline to automatically build and test the application on every commit.</li>
            <li>Created and managed Docker images to containerize the application efficiently.</li>
            <li>Deployed the Docker container on AWS EC2 for automated and resilient application delivery.</li>
          </ul>
          <div class="project-tech-bar">
            <span class="tech-label">Tools:</span>
            <span class="skill-pill devops">GitHub</span>
            <span class="skill-pill devops">Jenkins</span>
            <span class="skill-pill devops">CI/CD</span>
            <span class="skill-pill devops">Docker</span>
            <span class="skill-pill cloud">AWS EC2</span>
            <span class="skill-pill">Linux</span>
          </div>
        </div>

      </div>
    </section>

    <!-- Experience / Internship Section -->
    <section class="section-card">
      <h2 class="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
        Internship Experience
      </h2>
      <div class="timeline">
        
        <div class="timeline-item">
          <div class="item-header">
            <div class="item-title">SD Pro Solutions, Trichy</div>
            <div class="item-date">18 June 2025 &ndash; 02 July 2025</div>
          </div>
          <div class="item-subtitle">Artificial Intelligence Intern</div>
          <ul class="bullets">
            <li>Worked on AI and Machine Learning fundamentals using Python and Scikit-learn.</li>
            <li>Performed data analysis and preprocessing using NumPy and Pandas.</li>
            <li>Worked with OCR (Optical Character Recognition) for extracting information from images and documents.</li>
            <li>Applied Machine Learning techniques to analyze datasets and support AI-based solutions.</li>
            <li>Developed problem-solving and analytical skills through practical AI projects.</li>
          </ul>
        </div>

        <div class="timeline-item">
          <div class="item-header">
            <div class="item-title">Approtech R&amp;D Solutions Private Limited, Chennai</div>
            <div class="item-date">05 June 2026 &ndash; 06 July 2026</div>
          </div>
          <div class="item-subtitle">UI/UX Design Intern</div>
          <ul class="bullets">
            <li>Worked on UI/UX Design fundamentals and user-centered design concepts.</li>
            <li>Contributed to the project &ldquo;SkyLink &ndash; Smart Airport Experience.&rdquo;</li>
            <li>Designed and organized user-friendly interface concepts for the project.</li>
            <li>Applied creative thinking, problem-solving, and design principles to improve user experience.</li>
            <li>Gained practical exposure to professional UI/UX design workflows during the internship.</li>
          </ul>
        </div>

      </div>
    </section>

    <!-- Education, Certifications & Languages -->
    <div class="two-col">
      <section class="section-card">
        <h2 class="section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
          Education
        </h2>
        <div class="timeline">
          <div class="timeline-item">
            <div class="item-title">B.E. Computer Science and Engineering</div>
            <div class="item-subtitle">Mount Zion College of Engineering and Technology, Pudukkottai</div>
            <div class="item-date">2023 &ndash; 2027 | Final Year | <strong>CGPA: 7.40 / 10</strong></div>
          </div>
          <div class="timeline-item">
            <div class="item-title">Higher Secondary Education &mdash; Class XII</div>
            <div class="item-date">Score: <strong>63.67%</strong></div>
          </div>
        </div>
      </section>

      <section class="section-card">
        <h2 class="section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
          Certifications &amp; Languages
        </h2>
        <div style="margin-bottom: 20px;">
          <div class="skill-cat-title">Certifications</div>
          <ul class="bullets">
            <li><strong>IOT Intern Certification</strong> &bull; 01-03-2024 To 08-03-2024</li>
          </ul>
        </div>
        <div>
          <div class="skill-cat-title">Languages</div>
          <div class="skill-badges">
            <span class="skill-pill">English</span>
            <span class="skill-pill">Tamil</span>
          </div>
        </div>
      </section>
    </div>

  </div>
</body>
</html>`);
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[jenkins-demo-app] Server running on port ${PORT} (Version: ${APP_VERSION}, Build: ${BUILD_NUMBER})`);
  });
}
