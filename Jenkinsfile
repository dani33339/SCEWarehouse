
pipeline {
    agent {
        docker {
            image 'cypress/base:18.14.1'
            args '-p 3005:3005'
        }
    }
    environment {
        CI = 'false'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
                sh 'npm ci'
            }
        }
        stage('Coverage') {
            steps {
                sh 'npm run test -- --coverage --watchAll=false'
            }
        }

        stage('Complexity and potential errors and bugs') {
            steps {
                sh 'npx eslint src'
            }
        }
    }
}
