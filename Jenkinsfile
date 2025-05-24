pipeline {
  agent any

  stages {
    stage('Install dependencies') {
      steps {
        bat 'npm ci'
      }
    }

    stage('Install Playwright browsers') {
      steps {
        bat 'npx playwright install --with-deps'
      }
    }

    stage('Run tests') {
      steps {
        bat 'npx playwright test --reporter=list,allure-playwright'
      }
    }

    stage('Generate Allure Report') {
      steps {

bat 'npx allure generate "allure-results" --clean -o "allure-report"'

      }
    }

    stage('Publish Allure Report') {
      steps {
        allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
      }
    }
  }
}
