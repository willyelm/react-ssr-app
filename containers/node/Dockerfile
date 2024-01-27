FROM node:21

ARG ENV
ENV ENV=$ENV

WORKDIR /usr/src/app

COPY package*.json ./
COPY tailwind.config.js ./
COPY tsconfig.json ./
ADD src/ ./
ADD scripts/ ./
ADD public/ ./

ADD ./containers/node/run.sh .

EXPOSE 8000 8001

ENTRYPOINT ["sh", "run.sh"]
# RUN npm ci --only=production
# CMD [ "node", "dist/server.js" ]
