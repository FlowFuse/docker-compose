FROM node:16-alpine

ARG REGISTRY
ARG REGISTRY_TOKEN
ARG TAG
RUN if [[ ! -z "$REGISTRY_TOKEN" ]]; then echo "//$REGISTRY/:_authToken=$REGISTRY_TOKEN" >> ~/.npmrc ; fi
RUN if [[ ! -z "$REGISTRY" ]] ; then npm config set @flowforge:registry "https://$REGISTRY"; fi

WORKDIR /usr/src/flowforge-file-server
RUN mkdir app bin etc var
COPY package.json /usr/src/flowforge-file-server/app
WORKDIR /usr/src/flowforge-file-server/app
RUN npm install --production --no-audit --no-fund
ENV FLOWFORGE_HOME=/usr/src/flowforge-file-server

LABEL org.label-schema.name="Flowforge File Storage" \
    org.label-schema.url="https://flowforge.com" \
    org.label-schema.vcs-type="Git" \
    org.label-schema.vcs-url="https://github.com/flowforge/flowforge-file-storage" \
    org.label-schema.docker.dockerfile="flowforge-container/Dockerfile" \
    org.schema-label.description="Collaborative, low code integration and automation environment" \
    authors="Flowforge Inc."

EXPOSE 3001

CMD ["./node_modules/.bin/ff-file-storage"]