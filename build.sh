#!/bin/bash
image=192.168.68.55:5000/reveal-manager:0.0.12

docker rmi ${image}
docker rmi ${image}_arm64

npm run build --release
#npm run build
docker build -t ${image}  .
docker buildx build --platform linux/arm64 -t ${image}_arm64 --load .
#docker push ${image}_arm64
