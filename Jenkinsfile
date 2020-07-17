 pipeline {
  agent { label '1' } 
  
  tools { nodejs "nodejs" }

  options { 
    timestamps () 
    ansiColor('xterm') 
  }
   environment {
    VERSION = "${env.BUILD_NUMBER}"
    BRANCH = "${env.GIT_BRANCH}"
    BUILD_KEY_DEVELOPMENT = "-d"
    BUILD_KEY_QA = "-q"
    BUILD_KEY_MASTER = "-p"
    DOCKER_REGISTRY = "nexus.482.solutions"
    CREDENTIAL_ID_DOCKER = "nexus"
    REPO = "woden_server_js"
    IMAGE_DEV = "dev"
    IMAGE_QA = "qa"
    IMAGE_MASTER = "master"
    TAG = "${VERSION}"
    NEXUS_READER_NAME = "woden_nexus_reader_name"
    NEXUS_READER_PASSWORD = "woden_nexus_reader_password"
    }
    stages {
      stage("Run Tests") {
         steps {
           sh 'npm i'
           sh 'npm run fix:js'
           sh 'npm run lint:js'
           sh 'sudo rm -R -f woden-network && git clone https://github.com/482solutions/woden-network.git && cd woden-network && sudo -S ./deploy.sh'
           sh 'docker login -u $NEXUS_READER_NAME -p $NEXUS_READER_PASSWORD nexus.482.solutions && docker-compose -f docker_compose_nexus_server_js up wget https://raw.githubusercontent.com/482solutions/woden-server-js/master/docker-compose-nexus.yaml && docker-compose -f docker-compose-nexus.yaml up'
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
  } 
}
