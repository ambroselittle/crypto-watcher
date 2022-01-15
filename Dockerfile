FROM node:16.13.1-alpine3.14

WORKDIR /app
COPY . .

RUN npm ci

ENV NODE_ENV='production'

CMD [ "npm", "start" ]