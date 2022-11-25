#!/bin/bash

docker build flowforge-docker -t flowforge/forge-docker
docker build node-red-container -t flowforge/node-red
docker build file-server -t flowforge/file-server
