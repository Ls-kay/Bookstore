# The Paper Trail

## Database and authentication setup

1. Create a free PostgreSQL project in the Neon Console and copy its pooled connection string.
2. Copy `.env.example` to `.env.local`. Set `DATABASE_URL` to the Neon connection string, generate a unique `BETTER_AUTH_SECRET` with `openssl rand -base64 32`, and leave `BETTER_AUTH_URL` as `http://localhost:3000` for local development.
3. Apply the schema and load the starter catalog:

   ```sh
   bun run db:migrate
   bun run db:seed
   ```

4. Start the app:

   ```sh
   bun run dev
   ```

The schema in `src/db/schema.js` contains Better Auth's user, session, account, and verification tables, plus the bookstore products table. The catalog is served from PostgreSQL by `GET /api/books`; Better Auth endpoints are mounted at `/api/auth/*`.

After changing the schema, create and apply a migration with `bun run db:generate` and `bun run db:migrate`. Never commit `.env.local` or a real database connection string.
