
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g @expo/cli

EXPOSE 19000 19001 19002

CMD ["npm", "start"]