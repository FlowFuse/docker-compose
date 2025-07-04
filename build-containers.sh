#!/bin/bash

docker build flowfuse-docker -t flowfuse/forge-docker
docker build node-red-container -t flowfuse/node-red
docker build file-server -t flowfuse/file-server
