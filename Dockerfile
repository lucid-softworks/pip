# Pip server — Bun + Elysia + Drizzle.
# Build context is the repo root so we can pull from server/ without setting
# Railway's "Root Directory" in the dashboard.

FROM oven/bun:1.3-alpine AS deps
WORKDIR /app
COPY server/package.json server/bun.lock ./
RUN bun install --frozen-lockfile

FROM oven/bun:1.3-alpine
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY server/package.json server/bun.lock ./
COPY server/src ./src
COPY server/drizzle ./drizzle
COPY server/tsconfig.json server/drizzle.config.ts ./

ENV NODE_ENV=production

# Railway injects PORT at runtime; we default to 39443 for parity with dev.
EXPOSE 8080

CMD ["bun", "src/index.ts"]
