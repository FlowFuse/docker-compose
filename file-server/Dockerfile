FROM node:20-alpine

ARG REGISTRY
ARG REGISTRY_TOKEN
ARG TAG
RUN if [[ ! -z "$REGISTRY_TOKEN" ]]; then echo "//$REGISTRY/:_authToken=$REGISTRY_TOKEN" >> ~/.npmrc ; fi
RUN if [[ ! -z "$REGISTRY" ]] ; then npm config set @flowfuse:registry "https://$REGISTRY"; fi

WORKDIR /usr/src/flowforge-file-server
RUN mkdir app bin etc var
COPY package.json /usr/src/flowforge-file-server/app
WORKDIR /usr/src/flowforge-file-server/app
RUN npm install --production --no-audit --no-fund
ENV FLOWFORGE_HOME=/usr/src/flowforge-file-server

LABEL org.label-schema.name="FlowFuse File Storage" \
    org.label-schema.url="https://flowfuse.com" \
    org.label-schema.vcs-type="Git" \
    org.label-schema.vcs-url="https://github.com/FlowFuse/file-server" \
    org.label-schema.docker.dockerfile="flowfuse-docker/Dockerfile" \
    org.schema-label.description="Collaborative, low code integration and automation environment" \
    authors="FlowFuse Inc."

EXPOSE 3001

CMD ["./node_modules/.bin/ff-file-storage"]