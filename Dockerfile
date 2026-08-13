FROM node:22-alpine AS base
WORKDIR /app

# Full deps (incl. dev) — needed to build, and to run migrations via the CLI
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Production-only deps for the runtime image
FROM base AS prod-deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Slim runtime image: only what's needed to serve the app, running as a
# non-root user.
FROM base AS runner
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 --ingroup nodejs nextjs
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/app/generated ./app/generated
COPY --from=build /app/public ./public
COPY package.json next.config.ts ./
USER nextjs
EXPOSE 3000
CMD ["npm", "run", "start"]

# Separate image for running `prisma migrate deploy` as a one-off step
# before rolling out a new version of the runner image, e.g.:
#   docker build --target migrator -t dognate-migrator .
#   docker run --rm --env-file .env dognate-migrator
FROM base AS migrator
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 --ingroup nodejs nextjs
COPY --from=deps /app/node_modules ./node_modules
COPY package.json prisma.config.ts ./
COPY prisma ./prisma
USER nextjs
CMD ["npx", "prisma", "migrate", "deploy"]
