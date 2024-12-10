FROM node:22.12.0-alpine as builder

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY tsconfig.json .
COPY tsconfig.build.json .

COPY nest-cli.json .

COPY src src

RUN npm run build

FROM node:22.12.0-alpine as runner

COPY package.json .
COPY package-lock.json .

RUN npm install --omit=dev

COPY --from=builder dist dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
