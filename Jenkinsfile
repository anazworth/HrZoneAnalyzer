pipeline {
  agent {
    docker {
      image 'debian'
    }

  }
  stages {
    stage('Install curl') {
      steps {
        sh 'apt-get -y update && apt-get -y install curl unzip'
      }
    }

    stage('Install Bun runtime') {
      steps {
        sh 'curl -fsSL https://bun.sh/install | bash'
      }
    }

    stage('Checkout Code') {
      parallel {
        stage('Checkout Code') {
          steps {
            git(url: 'https://github.com/anazworth/HrZoneAnalyzer', branch: 'main')
          }
        }

        stage('alias bun') {
          steps {
            sh 'alias bun=~/.bun/bin/bun'
          }
        }

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