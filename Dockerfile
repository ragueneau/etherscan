FROM node:16
USER root

##############################################################
# App
WORKDIR /opt/etherscan
COPY . /opt/etherscan

# This seed has no value but it is required to build the app. #
RUN npm install --location=global npm \
  && npm install

USER node

##############################################################
# Start Container
##############################################################
CMD ["npm", "start"]
