# pull the base image
FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm build

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
