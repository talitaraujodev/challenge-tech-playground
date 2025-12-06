FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/build ./build
COPY --from=builder /app/src/docs ./src/docs

EXPOSE 8000

CMD ["node", "build/server.js"]
