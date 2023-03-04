FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ["package.json", "./"]
RUN npm install i
COPY . .
EXPOSE 5173
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "run", "dev"]
