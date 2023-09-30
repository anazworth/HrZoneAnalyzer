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

        stage('Install curl') {
          steps {
            sh 'sudo apt install curl'
          }
        }

      }
    }

    stage('Install Bun runtime') {
      steps {
        sh 'curl -fsSL https://bun.sh/install | bash'
      }
    }

    stage('Install bun dependencies') {
      steps {
        sh 'bun install'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'bun test'
      }
    }

  }
}