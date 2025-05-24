pipeline {
  agent any

  stages {
    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Run Playwright tests') {
      steps {
        sh 'npm run test'
      }
    }
    stage('Publish Playwright HTML Report') {
      steps {
        publishHTML(target: [
          allowMissing: false,
          alwaysLinkToLastBuild: true,
          keepAll: true,
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright Test Report'
        ])
      }
    }
  }
}