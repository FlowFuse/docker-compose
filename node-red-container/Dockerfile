FROM nodered/node-red:3.1.15-18

ARG BUILD_TAG=latest

COPY healthcheck.js /healthcheck.js

COPY package.json /data
WORKDIR /data
RUN mkdir node_modules
RUN npm install

USER root
RUN mkdir -p /usr/local/ssl-certs

WORKDIR /usr/src/flowforge-nr-launcher
RUN chown -R node-red:node-red /usr/src/flowforge-nr-launcher
RUN ln -s /usr/src/flowforge-nr-launcher /usr/src/flowfuse-nr-launcher

USER node-red
RUN --mount=type=secret,id=npm,uid=1000,target=/usr/src/node-red/.npmrc npm install @flowfuse/nr-launcher@${BUILD_TAG}

USER root
RUN mkdir -p /data/storage
RUN chmod -R g+w /data/* /data/.npm/* 
RUN chown -R node-red:root /data/* /data/.npm/* 

USER node-red

ENV NODE_PATH=/usr/src/node-red
ENV HOME=/usr/src/node-red

EXPOSE 2880

ENTRYPOINT ["./node_modules/.bin/flowfuse-node-red", "-p", "2880", "-n", "/usr/src/node-red"]
