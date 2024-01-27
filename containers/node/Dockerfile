FROM node:16

WORKDIR /usr/src/app
COPY package*.json ./
ADD public/ ./public
ADD dist/ ./dist

RUN npm ci --only=production

EXPOSE 8000

CMD [ "node", "dist/server.js" ]
