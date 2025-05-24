pipeline {
  agent any

  stages {
    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Install Playwright Browsers') {
  steps {
    sh 'npx playwright install --with-deps'
  }
}
    stage('Run Playwright tests') {
      steps {
        sh 'npm run test'
      }
    }
    stage('Archive Playwright Report') {
  steps {
    sh 'zip -r playwright-report.zip playwright-report'
    archiveArtifacts artifacts: 'playwright-report.zip', fingerprint: true
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
    stage('Check report contents') {
  steps {
    sh 'ls -l playwright-report || echo "No report found!"'
    sh 'cat playwright-report/index.html || echo "No index.html"'
  }
}
  }
}