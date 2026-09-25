FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps

COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json

RUN npm ci

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules

COPY package.json package-lock.json ./
COPY apps/api ./apps/api

WORKDIR /app/apps/api

RUN npx prisma generate
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app/apps/api

ENV NODE_ENV=production

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/apps/api/node_modules ./node_modules
COPY --from=builder /app/apps/api/package.json ./package.json
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/prisma ./prisma
COPY --from=builder /app/apps/api/prisma7.config.ts ./prisma7.config.ts

EXPOSE 4000

CMD ["node", "dist/server.js"]
