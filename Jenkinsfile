 pipeline {
  agent { label '1' } 
  
  tools { nodejs "nodejs" }

  options { 
    timestamps () 
    ansiColor('xterm') 
  }
   environment {
    DOCKER_REGISTRY = "nexus.482.solutions"
    NEXUS_READER_NAME = "woden_nexus_reader_name"
    NEXUS_READER_PASSWORD = "woden_nexus_reader_password"
    }
    stages {
      stage("Run Tests") {
         steps {
           slackSend channel: "#wg-rnd", color: "green", message: "STARTED ${JOB_NAME} BUILD_NUMBER ${VERSION}", tokenCredentialId: "Slack482"
           sh 'npm i'
           sh 'npm run fix:js'
           sh 'npm run lint:js'
           sh 'sudo rm -R -f woden-network && git clone https://github.com/482solutions/woden-network.git && cd woden-network && sudo -S ./deploy.sh'
           sh 'docker login -u $NEXUS_READER_NAME -p $NEXUS_READER_PASSWORD $DOCKER_REGISTRY &&  wget https://raw.githubusercontent.com/482solutions/woden-server-js/master/docker-compose-nexus.yaml && docker-compose -f docker-compose-nexus.yaml up'
           sh 'sleep 60 && npm ci'
           sh 'npm run startci & sleep 10'
           sh 'npm run cypress:run'
           sh 'npm run coverage'
           sh 'sudo rm -R -f woden-network'
         }
      }
    }
  post { 
    always { 
      sh 'docker stop fabric_orderer fabric_peer fabric_ca fabric_ca_db && docker rm -v fabric_orderer fabric_peer fabric_ca fabric_ca_db'
      cleanWs() 
    }
    success {
           slackSend channel: "#wg-rnd", color: "green", message: "SUCCESS ${JOB_NAME} BUILD_NUMBER ${VERSION}", tokenCredentialId: "Slack482"
    }
    failure {
            slackSend channel: "#wg-rnd", color: "red", message: "FAILURE ${JOB_NAME} BUILD_NUMBER ${VERSION}", tokenCredentialId: "Slack482"
    }
  } 
}
