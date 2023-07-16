pipeline {
    agent any
    tools{
        // maven 'maven-3.9.3'
        // dockerTool 'docker'
    }
    environment{
        DOCKERHUB_CREDENTIALS=credentials('e2139a57-daf7-4860-af60-38a5496dc084')
    }

    stages{
            stage('NPM install'){
                steps{
                    checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Neysho/angular-color.git']])
                    sh 'npm install'
                }
            }

            stage('NPM install'){
                steps{
                    checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Neysho/angular-color.git']])
                    sh 'npm install'
                }
            }

             stage('Build docker image'){
                        steps{
                            script{
                                sh 'docker build -t neysho/web-app:$BUILD_NUMBER .'
                            }
                        }
                    }
             stage('Login to Docker Hub')
             {
                steps{
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                }
             }
             stage('Push image to Docker Hub')
             {
                steps{
                    sh 'docker push neysho/web-app:$BUILD_NUMBER'
                }
             }
           
        }

          post {
            always {
                script {
                    sh 'docker logout'
               }
            }
            }
    }