FROM node:16
LABEL author="DIDNOW"

WORKDIR /usr/src/app
COPY package.json ./

RUN npm install

COPY . .

CMD [ "pm2-runtime", "start", "ecosystem.config.js"]