node {
  stage "Checkout" {
    checkout scm
    sh "npm install"
  }
  stage "Build" {
    sh "npm run dist"
  }
}
