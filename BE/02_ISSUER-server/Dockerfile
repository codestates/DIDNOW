FROM node:16
LABEL author="DIDNOW"

WORKDIR /usr/src/app
COPY package.json ./

RUN npm install
RUN npm install -g pm2
RUN export NODE_ENV=production

COPY . .

CMD [ "npm", "start"]