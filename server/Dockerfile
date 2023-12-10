FROM node:20-alpine

WORKDIR /home/server

COPY . .

RUN npm install

EXPOSE 5000

CMD ["node", "index"]