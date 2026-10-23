# Elevate Lab Internship - Week 1: Task 2
# Simple Jenkins CI/CD Pipeline with Docker Deployment

This project contains a complete, production-ready continuous integration and continuous deployment (CI/CD) pipeline using **Jenkins**, **Docker**, and a lightweight **Node.js microservice**.

---

## 📁 Repository Structure

```
W1T2/
├── Jenkinsfile                 # ⭐ Core Deliverable: Declarative Jenkins Pipeline
├── Dockerfile                  # Application Docker container definition
├── Dockerfile.jenkins          # Custom Jenkins controller with Docker CLI & Node.js
├── docker-compose.jenkins.yml  # Docker Compose file to spin up Jenkins locally in 1 step
├── .dockerignore               # Docker build exclusions
├── .gitignore                  # Git exclusions (node_modules, logs)
├── package.json                # Application metadata, scripts, dependencies
├── src/
│   └── app.js                  # Express web application with /health & /api/info
├── test/
│   └── app.test.js             # Automated unit tests using native Node.js test runner
└── README.md                   # Complete step-by-step documentation
```

---

## 🚀 Part 1: How the Pipeline Works (`Jenkinsfile`)

The pipeline is written in **Declarative Pipeline syntax** and includes 6 distinct stages:

```
[ Stage 1: Checkout SCM ]
          │
          ▼
[ Stage 2: Code Quality & Dependencies ] (npm ci)
          │
          ▼
[ Stage 3: Automated Tests ] (npm test: unit tests, /health check)
          │
          ▼
[ Stage 4: Build Docker Image ] (docker build -t elevate-jenkins-demo:${BUILD_NUMBER})
          │
          ▼
[ Stage 5: Deploy Application ] (Stops old container, runs new container on port 3000)
          │
          ▼
[ Stage 6: Smoke Test & Health Verification ] (curl http://localhost:3000/health)
```

### Key Features of this `Jenkinsfile`:
- **Cross-Platform Compatibility**: Automatically detects whether the Jenkins agent is running on Unix/Linux (`sh`) or Windows (`bat`).
- **Resource Management**: Automatically cleans up old builds (`buildDiscarder(logRotator(numToKeepStr: '10'))`).
- **Concurrency Control**: Prevents concurrent builds from clashing on the same local port (`disableConcurrentBuilds()`).
- **Graceful Zero-Downtime Rollout**: Detects and tears down any previously running container before starting the newly built version.
- **Automated Verification**: Automatically verifies that the newly deployed container returns `HTTP 200` with status `"UP"`.

---

## 🛠️ Part 2: Step-by-Step Setup Guide

### Step 1: Start Docker Desktop
1. Ensure **Docker Desktop** is running on your system.
2. In PowerShell or Command Prompt, verify Docker is active:
   ```powershell
   docker ps
   ```

---

### Step 2: Spin Up Jenkins Controller (via Docker Compose)
We have provided a custom Jenkins configuration in [`docker-compose.jenkins.yml`](./docker-compose.jenkins.yml) that automatically mounts the host Docker socket `/var/run/docker.sock` so Jenkins can build and deploy Docker containers directly.

Run this command in the project directory:
```powershell
docker compose -f docker-compose.jenkins.yml up -d
```

Check the startup logs:
```powershell
docker logs -f jenkins-ci
```

---

### Step 3: Unlock and Configure Jenkins
1. Open your browser and navigate to: **[http://localhost:8080](http://localhost:8080)**.
2. Retrieve the initial administrator password:
   ```powershell
   docker exec jenkins-ci cat /var/jenkins_home/secrets/initialAdminPassword
   ```
3. Paste the password into the Jenkins browser prompt and click **Continue**.
4. Choose **"Install suggested plugins"** (Jenkins will install Git, Pipeline, Workspace Cleanup, etc.).
5. Create your Admin user (e.g., `admin` / `password123`) and complete the setup.

---

### Step 4: Create the CI/CD Pipeline Job in Jenkins

1. On the Jenkins dashboard, click **"New Item"**.
2. Enter an item name (e.g. `elevate-web-pipeline`).
3. Select **"Pipeline"** and click **OK**.
4. Scroll down to the **Pipeline** section:
   - **Definition**: Select **Pipeline script from SCM**.
   - **SCM**: Select **Git**.
   - **Repository URL**:
     - *If hosted on GitHub/GitLab*: Enter your repository HTTPS URL (e.g., `https://github.com/<your-username>/elevate-jenkins-demo.git`).
     - *If using local Git repository*: Enter `file:///var/jenkins_home/workspace/elevate-jenkins-demo` or mount your project folder.
   - **Branch Specifier**: `*/master` or `*/main`.
   - **Script Path**: `Jenkinsfile`.
5. Click **Save**.

---

### Step 5: Configure Automatic Trigger on Code Commit

To trigger builds on each code commit, configure either of these two methods:

#### Method A: GitHub Webhook (Push Trigger - Recommended for Cloud/GitHub)
1. In your Jenkins job configuration, check **"GitHub hook trigger for GITScm polling"**.
2. In your GitHub repository:
   - Navigate to **Settings > Webhooks > Add webhook**.
   - **Payload URL**: `http://<your-jenkins-ip-or-ngrok-url>:8080/github-webhook/`
   - **Content type**: `application/json`
   - **Which events**: Select "Just the push event".
   - Click **Add webhook**.

#### Method B: SCM Polling (Works Locally Without Public IP)
1. In your Jenkins job configuration, check **"Poll SCM"** under **Build Triggers**.
2. Enter the schedule:
   ```cron
   H/2 * * * *
   ```
   *(This polls Git every 2 minutes for new commits and triggers the pipeline automatically when new code is pushed).*
3. Click **Save**.

---

## 🧪 Part 3: Testing the Pipeline

### Manual Trigger:
Click **"Build Now"** on the left menu in your Jenkins job.
- You will see the **Stage View** dynamically advance through:
  1. *Checkout SCM*
  2. *Code Quality & Dependencies*
  3. *Automated Tests*
  4. *Build Docker Image*
  5. *Deploy Application*
  6. *Smoke Test & Health Verification*

### Automatic Commit Trigger:
1. Make a small code change in [`src/app.js`](./src/app.js) (e.g., update the version or banner text).
2. Commit and push the change:
   ```powershell
   git commit -am "test: trigger automated Jenkins build on commit"
   git push origin main
   ```
3. Look at your Jenkins dashboard; the pipeline will automatically trigger and deploy the new version!

---

## 🌐 Part 4: Accessing the Deployed Application

Once Stage 5 & 6 complete, your container is running live:

- **Web Dashboard**: Open [http://localhost:3000](http://localhost:3000)
- **Health Endpoint**: [http://localhost:3000/health](http://localhost:3000/health)
- **Info API**: [http://localhost:3000/api/info](http://localhost:3000/api/info)

---

## 🔍 Part 5: Local Testing Commands (Without Jenkins)

You can run each stage locally to verify before pushing:

```powershell
# 1. Install dependencies
npm install

# 2. Run unit tests
npm test

# 3. Build Docker container image
docker build -t elevate-jenkins-demo:latest .

# 4. Run application container
docker run -d --name elevate-jenkins-demo -p 3000:3000 elevate-jenkins-demo:latest

# 5. Verify healthcheck
curl http://localhost:3000/health
```

---

## 🎯 Summary of Deliverables
- **Jenkinsfile**: Fully declarative, multi-stage, cross-platform pipeline definition.
- **Dockerfile**: Optimized Alpine Node.js container with built-in container health checks.
- **Unit Tests**: Native automated unit test suite.
- **Docker Compose Setup**: Zero-dependency automated Jenkins deployment.
