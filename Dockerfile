FROM node:16 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/
COPY prisma ./prisma/
COPY src/cli.ts ./app/src
# Install app dependencies
RUN npm install
RUN npm install -g nestjs-command
# Generate prisma client, leave out if generating in `postinstall` script
RUN npx prisma generate
# Crear la migracion de la BD
# RUN prisma migrate deploy
# RUN npx prisma db seed

CMD ["npx", "nestjs-command", "seed"]

COPY . .

RUN npm run build

FROM node:16

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD [  "npm", "run", "start:migrate:prod" ]
# CMD [  "npm", "run", "start:migrate:prod" ]