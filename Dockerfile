FROM node:12
LABEL maintainer="Parinaz mohamadianraouf"

WORKDIR /home/papar/Documents/blog/node_project

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]