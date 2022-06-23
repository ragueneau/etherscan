FROM node:16
LABEL maintainer="jocelyn@coeptix.com"
LABEL com.coeptix.version="00.1-beta"
LABEL vendor1="CoeptIX"
LABEL version="0.1.3"
LABEL com.example.release-date="2022-05-28"
LABEL com.example.version.is-beta=""

USER root

##############################################################
# Install Packages #
RUN apt update \
  && apt upgrade -y \
  && apt install git -y

##############################################################
# App

WORKDIR /opt

RUN git clone git@github.com:ragueneau/etherscan.git \
  && cd etherscan \
  && echo '{"mongo":"mongodb://mongo:27017","seed":"boss rural month arm exit elegant eight grain palace biology pistol control outside album slab top boil absorb tree mean street giggle head frozen","node":"https://ethernode.coeptix.net","restAPI":"https://etherapi.coeptix.net","restAPIport":4321,"ApiKeyToken":"bohx4Gaej6pheing1leiti9roo6eimae","contracts":{"token":"0x264Ecf2BD0aCe1e26047b5a3Ddc6A8c9D8309464","faucet":{"address":"0xCAEB631af6e9A583A7DC5471E51B9E1E8b64bdBF"}}}' > /opt/etherscan/src/config.json \
  && npm install \
  && npm install --location=global npm@8.12.2 \
  && npm run build \
  && npm install -g serve \
  && echo done > /opt/etherscan/src/build46.txt \
  && apt remove -y git

RUN rm /opt/etherscan/src/config.json

WORKDIR /opt/etherscan
USER node

##############################################################
# Start Container

CMD [ "serve", "-s", "build" ]
