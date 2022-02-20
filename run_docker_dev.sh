#!/bin/sh

docker rm -f data-fetcher
docker build -t data-fetcher -f Dockerfile.dev .

docker run -d -p 3030:3030 -e NODE_ENV=development -e MONGO_INIT_USERNAME='root' -e MONGO_INIT_PASSWORD='root_pw' -v ./node_modules -v $PWD:/app --network=pt-dev-network --rm --name=data-fetcher data-fetcher 
