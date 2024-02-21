FROM node:alpine3.10

WORKDIR /usr/src/rex

COPY . .

RUN npm install 

RUN npm run build

CMD ["npm", "run", "start:prod"]