FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

RUN mkdir -p drizzle


FROM oven/bun:1-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/drizzle ./drizzle

EXPOSE 3000

CMD ["sh", "-c", "bun dist/scripts/enable-postgis.js && if [ -d drizzle/meta ]; then bun dist/scripts/migrate.scripts.js; fi && exec bun dist/main.js"]
