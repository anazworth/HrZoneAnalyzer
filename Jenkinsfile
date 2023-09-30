pipeline {
  agent {
    docker {
      image 'oven/bun'
    }

  }
  stages {
    stage('Bun Deps') {
      steps {
        sh 'bun install --no-save'
      }
    }

    stage('bun tests') {
      steps {
        sh 'bun test'
      }
    }

    stage('Publish') {
      steps {
        publishChecks(title: 'Bun tests', text: 'text', summary: 'completed bun tests', conclusion: 'SUCCESS', status: 'COMPLETED')
      }
    }

  }
}