pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        git(url: 'https://github.com/anazworth/HrZoneAnalyzer', branch: 'main')
      }
    }

    stage('bun install') {
      steps {
        sh 'bun install'
      }
    }

  }
}