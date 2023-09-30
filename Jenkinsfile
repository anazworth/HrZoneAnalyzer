pipeline {
  agent {
    docker {
      image 'ubuntu'
      args '-u 0'
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
            sh 'apt-get -y update && apt-get -y install curl unzip'
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