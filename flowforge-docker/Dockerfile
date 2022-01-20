FROM node:16-alpine

RUN apk add --no-cache --virtual build-base g++ make py3-pip sqlite-dev python2

WORKDIR /usr/src/forge
RUN mkdir app bin etc var
COPY package.json /usr/src/forge/app
WORKDIR /usr/src/forge/app
RUN npm install --production --no-audit --no-fund 

ENV FLOWFORGE_HOME=/usr/src/forge

EXPOSE 3000

CMD ["./node_modules/.bin/flowforge"]