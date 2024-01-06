pipeline {
    agent any

    stages {
    
            stage('Checkout') {
              steps {
                 checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/AsmaArrak/Microservices']])
                     }   
            }

        stage('Build and Push Docker Images') {
            steps {
                script {
                    // Build and push Docker images for each microservice
                    docker.build("asmaarrak/location-management", "location-management/")
                    docker.build("asmaarrak/resolvers", "resolvers/")
                    docker.build("asmaarrak/user-auth", "user-auth/")
                    docker.build("asmaarrak/apgateway", "apgateway/")

                    // Push the built Docker images to a registry (e.g., DockerHub)
                    docker.withRegistry('https://registry.hub.docker.com', '6e25a882-37eb-4dbe-93b4-4d322f59e366') {
                        docker.image("asmaarrak/location-management").push()
                        docker.image("asmaarrak/resolvers").push()
                        docker.image("asmaarrak/user-auth").push()
                        docker.image("asmaarrak/apgateway").push()
                    }
                }
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
