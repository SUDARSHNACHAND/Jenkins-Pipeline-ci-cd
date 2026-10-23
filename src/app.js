const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const APP_VERSION = process.env.APP_VERSION || '1.0.0';
const BUILD_NUMBER = process.env.BUILD_NUMBER || 'dev-local';
const ENVIRONMENT = process.env.NODE_ENV || 'production';

app.use(express.json());

// Health Check Endpoint (Essential for CI/CD Smoke Testing)
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
    name: 'Jenkins CI/CD Microservice',
    description: 'Automated Build and Deployment with Jenkins & Docker',
    version: APP_VERSION,
    build: BUILD_NUMBER,
    environment: ENVIRONMENT,
    nodeVersion: process.version
  });
});

// Main Landing Page with Modern Responsive UI
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Elevate Labs - CI/CD Pipeline Demo</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-gradient: radial-gradient(circle at top right, #1e1b4b, #0f172a 50%, #020617);
      --card-bg: rgba(30, 41, 59, 0.7);
      --card-border: rgba(255, 255, 255, 0.08);
      --accent-blue: #38bdf8;
      --accent-purple: #a855f7;
      --accent-green: #22c55e;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--bg-gradient);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .container {
      width: 100%;
      max-width: 840px;
      backdrop-filter: blur(16px);
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 80px rgba(56, 189, 248, 0.1);
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 24px;
      margin-bottom: 32px;
      flex-wrap: wrap;
      gap: 16px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(34, 197, 94, 0.15);
      color: var(--accent-green);
      border: 1px solid rgba(34, 197, 94, 0.3);
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 0.02em;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-green);
      box-shadow: 0 0 10px var(--accent-green);
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.9); }
    }
    h1 {
      font-size: 2rem;
      font-weight: 800;
      background: linear-gradient(135deg, #ffffff 30%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtitle {
      color: var(--text-muted);
      font-size: 0.95rem;
      margin-top: 6px;
    }
    .pipeline-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }
    .stage-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 18px;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .stage-card:hover {
      transform: translateY(-2px);
      border-color: rgba(56, 189, 248, 0.4);
    }
    .stage-num {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--accent-blue);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 6px;
    }
    .stage-title {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .stage-desc {
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .info-box {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 20px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.88rem;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
      padding-bottom: 8px;
    }
    .info-row:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .info-label {
      color: var(--text-muted);
    }
    .info-val {
      color: var(--accent-blue);
      font-weight: 600;
    }
    .actions {
      margin-top: 28px;
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.2s;
    }
    .btn-primary {
      background: linear-gradient(135deg, #0284c7, #38bdf8);
      color: #04121d;
    }
    .btn-primary:hover {
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-main);
      border: 1px solid var(--card-border);
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  </style>
</head>
<body>
  <main class="container">
    <header class="header">
      <div>
        <h1>Jenkins CI/CD Automation</h1>
        <p class="subtitle">Elevate Lab Internship &bull; Week 1 Task 2</p>
      </div>
      <div class="badge">
        <span class="status-dot"></span>
        <span>DEPLOYED &amp; HEALTHY</span>
      </div>
    </header>

    <div class="pipeline-grid">
      <div class="stage-card">
        <div class="stage-num">Stage 1</div>
        <div class="stage-title">SCM Checkout</div>
        <div class="stage-desc">Git webhook trigger on code push</div>
      </div>
      <div class="stage-card">
        <div class="stage-num">Stage 2</div>
        <div class="stage-title">Automated Test</div>
        <div class="stage-desc">Runs unit tests and verifies code health</div>
      </div>
      <div class="stage-card">
        <div class="stage-num">Stage 3</div>
        <div class="stage-title">Docker Build</div>
        <div class="stage-desc">Builds tagged container image</div>
      </div>
      <div class="stage-card">
        <div class="stage-num">Stage 4</div>
        <div class="stage-title">Deploy &amp; Verify</div>
        <div class="stage-desc">Automated container deployment &amp; smoke check</div>
      </div>
    </div>

    <div class="info-box">
      <div class="info-row">
        <span class="info-label">Application Status:</span>
        <span class="info-val" style="color: var(--accent-green);">ONLINE</span>
      </div>
      <div class="info-row">
        <span class="info-label">Version:</span>
        <span class="info-val">${APP_VERSION}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Build Number:</span>
        <span class="info-val">#${BUILD_NUMBER}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Environment:</span>
        <span class="info-val">${ENVIRONMENT}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Engine:</span>
        <span class="info-val">Node.js ${process.version} + Docker</span>
      </div>
    </div>

    <div class="actions">
      <a href="/health" class="btn btn-primary" target="_blank">View /health JSON</a>
      <a href="/api/info" class="btn btn-secondary" target="_blank">View /api/info JSON</a>
    </div>
  </main>
</body>
</html>`);
});

// Export app for unit testing without port conflicts
module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[jenkins-demo-app] Server running on port ${PORT} (Version: ${APP_VERSION}, Build: ${BUILD_NUMBER})`);
  });
}
