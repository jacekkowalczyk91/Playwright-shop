pipeline {
  agent any

  stages {
    stage('Install dependencies') {
      steps {
        bat 'npm ci'
      }
    }
    stage('Install Playwright Browsers') {
  steps {
    bat 'npx playwright install --with-deps'
  }
}
    stage('Run Playwright tests') {
      steps {
        bat 'npm run test'
      }
    }
    stage('Archive Playwright Report') {
  steps {
    powershell '''
      Compress-Archive -Path playwright-report\\* -DestinationPath playwright-report.zip
    '''
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
    
  }
}