pipeline {
    agent any
    environment {
    // Ajouter la variable dh_cred comme variables d'authentification
    DOCKERHUB_CREDENTIALS = credentials('6e25a882-37eb-4dbe-93b4-4d322f59e366')
    }
    triggers {
    pollSCM('*/5 * * * *') // Vérifier toutes les 5 minutes
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/AsmaArrak/Microservices'
            }
        }
        stage('Init'){
            steps{
            // Permet l'authentification
            sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
        }       
        }
        stage('Build image') {
            steps{
                 script {
                     sh 'docker build -t asmaarrak/user-auth .'
                     sh 'docker build -t asmaarrak/apgateway .'
                     sh 'docker build -t asmaarrak/location-management .'
                     sh 'docker build -t asmaarrak/resolvers .'

                        }
             }
        }
        stage('Deliver'){
            steps {
                sh 'docker push $DOCKERHUB_CREDENTIALS_USR/user-auth:$BUILD_ID'
                sh 'docker push $DOCKERHUB_CREDENTIALS_USR/apgateway:$BUILD_ID'
                sh 'docker push $DOCKERHUB_CREDENTIALS_USR/location-management:$BUILD_ID'
                sh 'docker push $DOCKERHUB_CREDENTIALS_USR/resolvers:$BUILD_ID'


            }   
}
        
    }

}