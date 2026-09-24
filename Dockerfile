FROM oven/bun:1-alpine AS builder

WORKDIR /app


COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source and build
COPY src ./src
COPY drizzle.config.ts tsconfig.json ./
RUN bun build src/index.ts --outdir dist --target bun --external pdfjs-dist
RUN bun build src/scripts/migrate.ts --outdir dist/scripts --target bun


FROM oven/bun:1-alpine AS production

WORKDIR /app

# Copy only what's needed at runtime
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY drizzle ./drizzle
COPY src/scripts ./src/scripts

EXPOSE 3000

CMD ["sh", "-c", "bun run dist/scripts/migrate.js  && bun run dist/index.js"]
