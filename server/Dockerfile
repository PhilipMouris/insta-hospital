FROM node:lts-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

# You can change this
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]