#!groovy

node('master') {
  stage('Checkout') {
    checkout scm
    bat 'npm install'
  }
  stage('Build') {
    bat 'npm run dist'
  }
}
