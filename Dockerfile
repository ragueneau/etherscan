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
RUN echo '{"mongo":"mongodb://mongo:27017","seed":"first public gravity man ecology enemy earth solve absorb spring hat among behave purchase believe","restAPI":"https://etherscan.coeptix.net","node":"https://ethernode.coeptix.net","restAPIport":4321,"chainId":"35478","ApiKeyToken":"UReFQ1CCRMUpFTGi0hy1wku6YsSY8Uu7","admin":"0xcFF600cAb4afa8edE1cDfE5381C22196C80970FB","contracts":{"token":"0x264Ecf2BD0aCe1e26047b5a3Ddc6A8c9D8309464","lottery":"0x891f0f2eF6A154e937B6a07B03d3a28fa3A61CaD","faucet":{"address":"0xCAEB631af6e9A583A7DC5471E51B9E1E8b64bdBF"}}}' > /opt/etherscan/src/config.json \
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
