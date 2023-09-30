pipeline {
  agent {
    docker {
      image 'oven/bun'
    }

  }
  stages {
    stage('Checkout Code') {
      steps {
        git(url: 'https://github.com/anazworth/HrZoneAnalyzer', branch: 'main')
      }
    }

    stage('Bun Deps') {
      steps {
        sh 'bun install'
      }
    }

    stage('bun tests') {
      steps {
        sh 'bun test'
      }
    }

  }
}