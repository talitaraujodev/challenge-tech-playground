FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY --from=builder /app/build ./build
COPY --from=builder /app/src/docs ./build/docs
COPY --from=builder /app/src/config/database/data.csv ./src/config/database/data.csv

COPY entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r$//' /entrypoint.sh && chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 8000

CMD ["node", "build/server.js"]
