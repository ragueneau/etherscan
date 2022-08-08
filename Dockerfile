FROM node:16
USER root

ARG config

##############################################################
# App
WORKDIR /opt/etherscan
COPY . /opt/etherscan

RUN echo ${config} > /opt/etherscan/src/config.json

RUN npm install --location=global npm@8.16.0  \
  && npm install \
  && npm run build \
  && npm install -g serve

USER node

##############################################################
# Start Container
##############################################################
CMD [ "serve", "-s", "build" ]
