#!/bin/sh -x

VERSION_LIST="4.0.0 4.0.1 4.0.2 4.0.3 4.0.4 4.0.5 4.0.7 4.0.8 4.0.9"

mkdir -p device/cache
cd device/cache

pwd

for V in $VERSION_LIST
do  
  echo $V
  mkdir $V
  ls -l
  npm install --omit=dev --omit=optional --no-audit --no-fund --prefix "$V" "@node-red/editor-client@$V"
done

pwd
ls -l
du -sh
