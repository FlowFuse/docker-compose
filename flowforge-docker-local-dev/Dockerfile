FROM node:16-alpine

ARG REGISTRY
RUN if [[ ! -z "$REGISTRY" ]] ; then npm config set @flowforge:registry "$REGISTRY"; fi

RUN apk add --no-cache --virtual build-base g++ make py3-pip sqlite-dev python2

WORKDIR /data/flowforge
ENV FLOWFORGE_HOME=/data/flowforge

EXPOSE 3000

CMD npm run serve