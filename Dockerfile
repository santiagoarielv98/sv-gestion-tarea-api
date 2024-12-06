FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

# FROM node:20-slim

# WORKDIR /usr/src/app

# COPY --from=builder /usr/src/app/package*.json ./
# COPY --from=builder /usr/src/app/node_modules ./node_modules
# COPY --from=builder /usr/src/app/dist ./dist
# COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 8000

COPY entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]