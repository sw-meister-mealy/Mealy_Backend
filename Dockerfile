FROM node:12
MAINTAINER Joosung Park <admin@slowmotion.dev>

COPY . /app
WORKDIR /app

RUN yarn && yarn build
CMD yarn start:prod
