FROM node:17.5-alpine3.14

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY server.js .
COPY lib .

ENTRYPOINT [ "node" , "/app/server.js" ]