FROM node:16
USER root

ARG CONFIG

##############################################################
# App
WORKDIR /opt/etherscan
COPY . /opt/etherscan

RUN apt update -y && apt install -y dos2unix

RUN echo "${CONFIG}" > /opt/etherscan/src/config.json


RUN npm install --location=global npm@8.16.0  \
  && npm install \
  && npm run build \
  && npm install -g serve

USER node

##############################################################
# Start Container
##############################################################
CMD [ "serve", "-s", "build" ]
