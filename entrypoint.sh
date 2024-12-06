#!/bin/sh
npx prisma migrate dev --name init
npx prisma db seed
node dist/src/main.js
