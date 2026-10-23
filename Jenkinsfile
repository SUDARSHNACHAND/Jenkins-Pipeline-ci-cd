pipeline {
    agent any

    options {
        // Retain only the last 10 builds to save disk space
        buildDiscarder(logRotator(numToKeepStr: '10'))
        // Disallow concurrent executions to prevent port collision during deployment
        disableConcurrentBuilds()
        // Abort pipeline if running longer than 15 minutes
        timeout(time: 15, unit: 'MINUTES')
        // Enable colored console output
        ansiColor('xterm')
    }

    environment {
        APP_NAME        = 'elevate-jenkins-demo'
        CONTAINER_PORT  = '3000'
        HOST_PORT       = '3000'
        IMAGE_NAME      = 'elevate-jenkins-demo'
        IMAGE_TAG       = "${IMAGE_NAME}:${BUILD_NUMBER}"
        LATEST_TAG      = "${IMAGE_NAME}:latest"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                script {
                    echo "=========================================="
                    echo "  STAGE 1: CHECKOUT SOURCE CODE"
                    echo "  Build Number : #${BUILD_NUMBER}"
                    echo "  Job Name     : ${JOB_NAME}"
                    echo "=========================================="
                }
                checkout scm
            }
        }

        stage('Code Quality & Dependencies') {
            steps {
                script {
                    echo "=========================================="
                    echo "  STAGE 2: INSTALLING DEPENDENCIES"
                    echo "=========================================="
                    if (isUnix()) {
                        sh 'node --version'
                        sh 'npm --version'
                        sh 'npm ci || npm install'
                    } else {
                        bat 'node --version'
                        bat 'npm --version'
                        bat 'npm ci || npm install'
                    }
                }
            }
        }

        stage('Automated Tests') {
            steps {
                script {
                    echo "=========================================="
                    echo "  STAGE 3: RUNNING AUTOMATED UNIT TESTS"
                    echo "=========================================="
                    if (isUnix()) {
                        sh 'npm test'
                    } else {
                        bat 'npm test'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "=========================================="
                    echo "  STAGE 4: BUILDING DOCKER IMAGE"
                    echo "  Target Tag: ${IMAGE_TAG}"
                    echo "=========================================="
                    if (isUnix()) {
                        sh "docker build -t ${IMAGE_TAG} -t ${LATEST_TAG} ."
                        sh "docker images | grep ${IMAGE_NAME} || true"
                    } else {
                        bat "docker build -t ${IMAGE_TAG} -t ${LATEST_TAG} ."
                        bat "docker images | findstr ${IMAGE_NAME}"
                    }
                }
            }
        }

        stage('Deploy Application') {
            steps {
                script {
                    echo "=========================================="
                    echo "  STAGE 5: DEPLOYING DOCKER CONTAINER"
                    echo "=========================================="
                    
                    // Stop and remove previously running container if it exists
                    if (isUnix()) {
                        sh """
                            docker stop ${APP_NAME} 2>/dev/null || true
                            docker rm -f ${APP_NAME} 2>/dev/null || true
                            docker run -d \\
                                --name ${APP_NAME} \\
                                -p ${HOST_PORT}:${CONTAINER_PORT} \\
                                --restart unless-stopped \\
                                -e NODE_ENV=production \\
                                -e BUILD_NUMBER=${BUILD_NUMBER} \\
                                ${IMAGE_TAG}
                        """
                    } else {
                        bat """
                            docker stop ${APP_NAME} 2>nul || ver >nul
                            docker rm -f ${APP_NAME} 2>nul || ver >nul
                            docker run -d ^
                                --name ${APP_NAME} ^
                                -p ${HOST_PORT}:${CONTAINER_PORT} ^
                                --restart unless-stopped ^
                                -e NODE_ENV=production ^
                                -e BUILD_NUMBER=${BUILD_NUMBER} ^
                                ${IMAGE_TAG}
                        """
                    }
                }
            }
        }

        stage('Smoke Test & Health Verification') {
            steps {
                script {
                    echo "=========================================="
                    echo "  STAGE 6: VERIFYING DEPLOYED SERVICE"
                    echo "=========================================="
                    
                    // Give container a few seconds to initialize
                    sleep(time: 5, unit: 'SECONDS')

                    if (isUnix()) {
                        sh """
                            echo "Querying healthcheck endpoint on port ${HOST_PORT}..."
                            curl -fsS http://localhost:${HOST_PORT}/health || curl -fsS http://127.0.0.1:${HOST_PORT}/health
                        """
                    } else {
                        bat """
                            powershell -Command "Invoke-RestMethod -Uri http://localhost:${HOST_PORT}/health -Method Get"
                        """
                    }
                    echo "Healthcheck passed! Service is responding with HTTP 200 OK."
                }
            }
        }
    }

    post {
        success {
            script {
                echo """
                =========================================================
                  SUCCESS: PIPELINE COMPLETED SUCCESSFULLY!
                  - Application deployed to: http://localhost:${HOST_PORT}
                  - Build ID: #${BUILD_NUMBER}
                  - Status: Healthy & Verified
                =========================================================
                """
            }
        }
        failure {
            script {
                echo """
                =========================================================
                  FAILURE: PIPELINE EXECUTION FAILED!
                  - Dumping container logs for diagnosis:
                =========================================================
                """
                if (isUnix()) {
                    sh "docker logs --tail 50 ${APP_NAME} 2>/dev/null || true"
                } else {
                    bat "docker logs --tail 50 ${APP_NAME} 2>nul || ver >nul"
                }
            }
        }
        always {
            script {
                echo "Pipeline execution finished at: ${new Date()}"
            }
        }
    }
}
