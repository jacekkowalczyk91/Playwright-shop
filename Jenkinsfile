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
    stage('Prepare Test List') {
      steps {
        // Generujemy plik z listą testów (np. dla Active Choices)
        bat 'npx playwright test --list > tests-list.txt'
      }
    }

    // stage('Run tests') {
    //   steps {
    //     bat 'npx playwright test --reporter=list,allure-playwright'
    //   }
    // }
    stage('Run selected test') {
      steps {
        script {
          // Parametr TEST_NAME jest dostępny dzięki Active Choices plugin w konfiguracji joba
          def testName = params.TEST_NAME
          if (!testName) {
            error "Parametr TEST_NAME nie został wybrany"
          }
          // Wydobycie tylko ostatniego fragmentu opisu testu (po ostatnim "›")
def grepQuery = params.TEST_NAME.tokenize('›')[-1].trim()

bat "npx playwright test --grep \"${grepQuery}\" --reporter=list,allure-playwright"

        }
      }
    }

    stage('Generate Allure Report') {
      steps {

bat 'npx allure generate "allure-results" --clean -o "allure-report"'

      }
    }

    stage('Publish Allure Report') {
    steps {
        allure(
            includeProperties: false,
            reportBuildPolicy: 'ALWAYS',
            results: [[path: 'allure-results']],
            // commandline: 'AllureCommandline'  // nazwa narzędzia z global config
        )
    }
}
  }
}
