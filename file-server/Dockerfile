FROM node:20-alpine

ARG TAG

WORKDIR /usr/src/flowforge-file-server
RUN mkdir app bin etc var
COPY package.json /usr/src/flowforge-file-server/app
WORKDIR /usr/src/flowforge-file-server/app
RUN --mount=type=secret,id=npm,target=/root/.npmrc npm install --production --no-audit --no-fund
ENV FLOWFORGE_HOME=/usr/src/flowforge-file-server

LABEL org.label-schema.name="FlowFuse File Storage" \
    org.label-schema.url="https://flowfuse.com" \
    org.label-schema.vcs-type="Git" \
    org.label-schema.vcs-url="https://github.com/FlowFuse/file-server" \
    org.label-schema.docker.dockerfile="flowforge-container/Dockerfile" \
    org.schema-label.description="Collaborative, low code integration and automation environment" \
    authors="FlowFuse Inc."

EXPOSE 3001

CMD ["./node_modules/.bin/ff-file-storage"]