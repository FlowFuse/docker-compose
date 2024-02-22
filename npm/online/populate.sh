#!/bin/bash

docker run --rm -d -v `pwd`/conf:/verdaccio/conf -v `pwd`/storage:/verdaccio/storage -p 4873:4873 --name npm-cache verdaccio/verdaccio:5

sleep 5

cd temp
rm package-lock.json
rm -rf node_modules
rm -rf cache
mkdir cache
export npm_config_cache=cache
npm --registry=http://localhost:4873 install
npm --registry=http://localhost:4873 install node-red@latest
npm --registry=http://localhost:4873 install node-red@3.1.5
npm --registry=http://localhost:4873 install node-red@3.0.2

rm -rf node_modules
rm -rf cache
rm package-lock.json

cd ..

docker stop npm-cache

tar -zcf npm-cache.tgz storage