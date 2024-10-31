FROM node:20-alpine

WORKDIR /nextapp

COPY package* .

RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun" , "run" , "dev"]
