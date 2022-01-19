#!/bin/sh
docker run --privileged --rm tonistiigi/binfmt --install all
docker manifest rm docker-pi.local:5000/flowforge/node-red:latest
docker buildx build --platform linux/amd64 -t docker-pi.local:5000/flowforge/node-red:amd64 .
docker buildx build --platform linux/arm64 -t docker-pi.local:5000/flowforge/node-red:arm64 .
docker buildx build --platform linux/arm/v7 -t docker-pi.local:5000/flowforge/node-red:arm7 .
docker push docker-pi.local:5000/flowforge/node-red:amd64
docker push docker-pi.local:5000/flowforge/node-red:arm64
docker push docker-pi.local:5000/flowforge/node-red:arm7
docker manifest create --insecure docker-pi.local:5000/flowforge/node-red:latest --amend docker-pi.local:5000/flowforge/node-red:amd64 --amend docker-pi.local:5000/flowforge/node-red:arm64 --amend docker-pi.local:5000/flowforge/node-red:arm7
docker manifest push --insecure docker-pi.local:5000/flowforge/node-red:latest

docker pull docker-pi.local:5000/flowforge/node-red:latest

