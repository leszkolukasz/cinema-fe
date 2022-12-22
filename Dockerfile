FROM node:19-alpine 

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]