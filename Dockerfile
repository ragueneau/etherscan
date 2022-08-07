FROM node:16
USER root

###############################################################
# Arguments #
ARG BUILD_BRANCH
ARG BUILD_NUMBER
ARG BUILD_DATE
ARG DEPLOY_VERSION
ARG MAINTAINER

###############################################################
# Labels #
LABEL maintainer=${MAINTAINER}
LABEL vendor1="CoeptIX"
LABEL version=${DEPLOY_VERSION}
LABEL com.coeptix.release-date=${BUILD_DATE}
LABEL com.coeptix.release-tag=${DEPLOY_VERSION}
LABEL com.coeptix.release-build=${BUILD_NUMBER}
LABEL com.coeptix.release-branch=${BUILD_BRANCH}

##############################################################
# Install Packages #
RUN apt update \
  && apt upgrade -y \
  && npm install --location=global npm

##############################################################
# App
WORKDIR /opt/etherscan
COPY . /opt/etherscan

RUN echo '{"mongo":"mongodb://mongo:27017","seed":"first public gravity man ecology enemy earth solve absorb spring hat among behave purchase believe","node":"https://ethernode.coeptix.net","restAPI":"https://etherscan.coeptix.net","restAPIport":4321,"ApiKeyToken":""}' > /opt/etherscan/src/config.json \
  && npm install \
  && npm run build \
  && npm install -g serve \
  && rm /opt/etherscan/src/config.json

USER node

##############################################################
# Start Container
##############################################################
CMD [ "serve", "-s", "build" ]
