@echo off

docker run --rm -d -v "%cd%\conf":/verdaccio/conf -v "%cd%\storage":/verdaccio/storage -p 4873:4873 --name npm-cache verdaccio/verdaccio:5

timeout /T 5 /NOBREAK

cd temp
rmdir /S /Q node_modules
rmdir /S /Q cache
md cache
SET npm_config_cache=cache
del package-lock.json
pause
call npm --registry=http://localhost:4873 install
call npm --registry=http://localhost:4873 install node-red@latest
call npm --registry=http://localhost:4873 install node-red@3.1.5
call npm --registry=http://localhost:4873 install node-red@3.0.2

rmdir /S /Q node_modules
rmdir /S /Q cache
del package-lock.json

cd ..

docker stop npm-cache

tar -zcf npm-cache.tgz storage