FROM node:20-alpine

ARG REGISTRY
ARG REGISTRY_TOKEN
RUN if [[ ! -z "$REGISTRY_TOKEN" ]]; then echo "//$REGISTRY/:_authToken=$REGISTRY_TOKEN" >> ~/.npmrc ; fi
RUN if [[ ! -z "$REGISTRY" ]] ; then npm config set @flowfuse:registry "https://$REGISTRY"; fi

RUN apk add --no-cache --virtual build-base g++ make py3-pip sqlite-dev python3

WORKDIR /usr/src/forge
RUN mkdir app bin etc var
WORKDIR /usr/src/forge/var
COPY install-device-cache.sh .
RUN ./install-device-cache.sh && rm install-device-cache.sh
WORKDIR /usr/src/forge
COPY package.json /usr/src/forge/app
WORKDIR /usr/src/forge/app
RUN npm install --production --no-audit --no-fund 

ENV FLOWFORGE_HOME=/usr/src/forge

LABEL org.label-schema.name="FlowFuse Docker" \
    org.label-schema.url="https://flowfuse.com" \
    org.label-schema.vcs-type="Git" \
    org.label-schema.vcs-url="https://github.com/FlowFuse/docker-compose" \
    org.label-schema.docker.dockerfile="flowforge-docker/Dockerfile" \
    org.schema-label.description="Collaborative, low code integration and automation environment" \
    authors="FlowFuse Inc."

EXPOSE 3000

CMD ["./node_modules/.bin/flowforge"]
