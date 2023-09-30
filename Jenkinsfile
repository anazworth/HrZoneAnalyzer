pipeline {
  agent {
    docker {
      image 'ubuntu'
    }

  }
  stages {
    stage('Checkout Code') {
      parallel {
        stage('Checkout Code') {
          steps {
            git(url: 'https://github.com/anazworth/HrZoneAnalyzer', branch: 'main')
          }
        }

        stage('Install bun runtime') {
          steps {
            sh 'curl -fsSL https://bun.sh/install | bash'
          }
        }

      }
    }

    stage('bun install') {
      steps {
        sh 'bun install'
      }
    }

    stage('bun test') {
      steps {
        sh 'bun test'
      }
    }

  }
}