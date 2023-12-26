pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/AsmaArrak/Microservices'
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

        stage('Deploy to Kubernetes') {
            steps {
                // Use kubectl to apply Kubernetes manifests
                script {
                    withCredentials([usernamePassword(credentialsId: 'kubernetes-credentials', passwordVariable: 'token', usernameVariable: 'serverUrl')]) {
                        sh "kubectl config set-credentials jenkins --token=$token"
                        sh "kubectl config set-cluster k8s --server=$serverUrl --insecure-skip-tls-verify"
                        sh "kubectl config set-context jenkins --cluster=k8s --user=jenkins"
                        sh "kubectl config use-context jenkins"
                        sh 'kubectl apply -f kubernetes/location-management-deployment.yaml'
                        sh 'kubectl apply -f kubernetes/resolvers-deployment.yaml'
                        sh 'kubectl apply -f kubernetes/user-auth-deployment.yaml'
                        sh 'kubectl apply -f kubernetes/apgateway-deployment.yaml'
                        sh 'kubectl apply -f location-management/kubernetes/service.yaml'
                        sh 'kubectl apply -f redolvers/kubernetes/service.yaml'
                        sh 'kubectl apply -f user-auth/kubernetes/service.yaml'
                        sh 'kubectl apply -f apgateway/kubernetes/service.yaml'
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
