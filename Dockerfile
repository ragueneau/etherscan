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
# App
WORKDIR /opt/etherscan
COPY . /opt/etherscan

# This seed has no value but it is required to build the app. #
RUN echo '{"seed":"first public gravity man ecology enemy earth solve absorb spring hat among behave purchase believe"}' > /opt/etherscan/src/config.json \
  && npm install --location=global npm \
  && npm install \
  && npm run build \
  && npm install -g serve \
  && rm /opt/etherscan/src/config.json

USER node

##############################################################
# Start Container
##############################################################
CMD [ "serve", "-s", "build" ]
