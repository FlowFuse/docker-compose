FROM nodered/node-red:latest

ARG REGISTRY
ARG REGISTRY_TOKEN
ARG BUILD_TAG=latest
RUN if [[ ! -z "$REGISTRY_TOKEN" ]]; then echo "//$REGISTRY/:_authToken=$REGISTRY_TOKEN" >> ~/.npmrc ; fi
RUN if [[ ! -z "$REGISTRY" ]] ; then npm config set @flowforge:registry "https://$REGISTRY"; fi

COPY package.json /data
WORKDIR /data
RUN npm install

USER root

WORKDIR /usr/src/flowforge-nr-launcher
RUN chown node-red:node-red /data/* /usr/src/flowforge-nr-launcher

USER node-red
RUN npm install @flowforge/nr-launcher@${BUILD_TAG}

ENV NODE_PATH=/usr/src/node-red

EXPOSE 2880

ENTRYPOINT ["./node_modules/.bin/flowforge-node-red", "-p", "2880", "-n", "/usr/src/node-red"]