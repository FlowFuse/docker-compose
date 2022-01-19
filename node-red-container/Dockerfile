FROM nodered/node-red:latest

RUN npm config set @flowforge:registry https://npm.hardill.me.uk

COPY package.json /data
WORKDIR /data
RUN npm install

USER root

WORKDIR /usr/src/flowforge-nr-launcher
RUN chown node-red:node-red /data/* /usr/src/flowforge-nr-launcher

USER node-red
RUN npm install @flowforge/nr-launcher

ENV NODE_PATH=/usr/src/node-red

EXPOSE 2880

ENTRYPOINT ["./node_modules/.bin/flowforge-node-red", "-p", "2880"]