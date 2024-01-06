pipeline {
    agent any

    stages {
    
            stage('Checkout') {
              steps {
                  checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/AsmaArrak/Microservices']])  }
            }

        stage('Build and Push Docker Images') {
            steps {
                sh 'npm install'
                
            }
        }

    
    }

    post {
        success {
            echo 'Pipeline succeeded! You may want to trigger additional steps (e.g., tests, notifications) here.'
        }
        failure {
            echo 'Pipeline failed! You may want to handle failures appropriately (e.g., notifications).'
        }
    }
}
