FROM node:16
USER root

ARG CONFIG

##############################################################
# App
WORKDIR /opt/etherscan
COPY . /opt/etherscan

RUN echo "${CONFIG}" > /opt/etherscan/src/config.json

RUN npm install --ignore-scripts --location=global npm@9.3.1 && npm install --ignore-scripts && npm run build && npm install -g serve

USER node

##############################################################
# Start Container
##############################################################
CMD [ "serve", "-s", "build" ]
