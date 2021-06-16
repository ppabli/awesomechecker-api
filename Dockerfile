FROM node

WORKDIR /awesomechecker-api

COPY ./src ./src
COPY ./.env ./
COPY ./tsconfig.json ./
COPY ./ormconfig.json ./
COPY ./package.json ./
COPY ./webpack.config.ts ./

RUN npm install

EXPOSE 8081

CMD [ "npm", "start" ]