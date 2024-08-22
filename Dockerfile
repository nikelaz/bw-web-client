FROM node:22-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
COPY . ./
EXPOSE 80
CMD [ "next", "start" ]