# Dognate

A donation board where people caring for animals post what they need
(wishes), and others post what they can spare (supplies). Rebuilt on
Next.js after the original Rails 4 app became unmaintainable — see
`legacy-rails/` for the original codebase, kept for reference.

## Stack

- Next.js 16 (App Router, TypeScript, Turbopack)
- PostgreSQL + Prisma ORM 7 (via the `@prisma/adapter-pg` driver adapter)
- Auth.js (NextAuth v5) with credentials login
- Tailwind CSS v4

## Local setup

1. **Start Postgres.** Easiest with Docker:

   ```bash
   docker run -d --name dognate-postgres \
     -e POSTGRES_USER=dognate \
     -e POSTGRES_PASSWORD=dognate_dev_password \
     -e POSTGRES_DB=dognate \
     -p 5434:5432 \
     postgres:16-alpine
   ```

   (Port `5434` is used instead of the default `5432` because this
   machine already has other Postgres installs bound to `5432`/`5433`.
   Adjust the port here and in `.env` if that's no longer the case on
   your machine.)

2. **Install dependencies and copy env vars.**

   ```bash
   npm install
   cp .env.example .env   # if starting fresh; otherwise .env already exists
   ```

   `.env` needs:
   - `DATABASE_URL` — matches the container above by default
   - `AUTH_SECRET` — any random string (`openssl rand -base64 32`)
   - `BLOB_READ_WRITE_TOKEN` — only needed once you wire up real photo
     uploads via [Vercel Blob](https://vercel.com/docs/storage/vercel-blob);
     the photo URL field works as a plain text field without it

3. **Run migrations and seed categories.**

   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

4. **Start the dev server.**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Useful commands

- `npx prisma studio` — browse/edit the database in a GUI
- `npx tsc --noEmit` — type-check without building
- `npm run lint` — ESLint
- `npm test` — run the test suite (Vitest)

## Notes on the rebuild

- The legacy app's `completed` flag on supplies/wishes was referenced
  in code but never actually migrated into the database — creating
  either would crash. This is now a real `fulfilled` column with a
  working toggle.
- The legacy app let any signed-in user post either a wish or a supply
  offer — no separate "sanctuary" vs "donor" account types. This
  rebuild keeps that symmetric model.
- Money/payment donations were never part of the original app and
  aren't part of this rebuild either — it's an in-kind item board.
