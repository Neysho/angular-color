pipeline {
    agent any
    tools{
        maven 'maven-3.9.3'
        // dockerTool 'docker'
    }
    environment{
        DOCKERHUB_CREDENTIALS=credentials('')
        // BUILD_NUMBER = "${env.BUILD_NUMBER-web-app}"
    }

    stages{
            stage('Build Maven'){
                steps{
                    checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Neysho/angular-color.git']])
                    sh 'mvn clean install'
                }
            }

            stage('SonarQube Analysis'){
                //    def mvn = tool 'Default Maven';
                steps{
                   withSonarQubeEnv('sonar-server'){
                   sh 'mvn sonar:sonar -Dsonar.projectKey=web-app'
                 }
                 }
                }

             stage('Build docker image'){
                        steps{
                            script{
                                sh 'docker build -t neysho/web-app:latest .'
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
                    sh 'docker push neysho/web-app:latest'
                }
             }
           
        }

          post {
            always {
                script {
                    sh 'docker logout'
                    // slackSend channel: '#jenkins-alerts',  message: 'Deployment completed successfully!'
                    slackSend channel: '#jenkins-alerts', message: 'Deployment completed successfully!',
                     teamDomain: 'devneysho', tokenCredentialId: 'slack-alert'
               }
            }
            }
    }