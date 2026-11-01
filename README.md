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

The schema in `src/db/schema.js` contains Better Auth's user, session, account, and verification tables, the bookstore products table, and the `orders` and `order_items` tables. Orders are tied to the signed-in user; order items snapshot the product title and unit price at purchase time. The catalog is served from PostgreSQL by `GET /api/books`; Better Auth endpoints are mounted at `/api/auth/*`.

After changing the schema, create and apply a migration with `bun run db:generate` and `bun run db:migrate`. Never commit `.env.local` or a real database connection string.

## Test checkout

1. In your Stripe dashboard, enable **Test mode** and copy a test secret key
   starting with `sk_test_`.
2. Set `STRIPE_SECRET_KEY` in `.env.local`. Install and authenticate the Stripe
   CLI, then forward Stripe events to the local webhook:

   ```sh
   stripe login
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

   Copy the `whsec_...` value printed by `stripe listen` into
   `STRIPE_WEBHOOK_SECRET` in `.env.local`. The listener forwards the
   `checkout.session.completed`, `checkout.session.expired`,
   `checkout.session.async_payment_succeeded`, and
   `checkout.session.async_payment_failed` events.

   For a deployed app, configure a Stripe webhook endpoint for
   `/api/stripe/webhook` and set `STRIPE_WEBHOOK_SECRET` to that endpoint's
   signing secret instead.
3. Restart the app after setting the environment values. Sign in, add a book to
   your reading list, and click **Checkout**. Complete the hosted Stripe test
   checkout with card `4242 4242 4242 4242`, any future expiry date, and any
   CVC. The checkout endpoint requires a valid Better Auth session, prices all
   items from the database, and creates pending orders before redirecting to
   Stripe. Physical books aren't eligible for Stripe Managed Payments, so the
   Checkout Session disables Managed Payments and classifies line items as
   general tangible goods. Only a verified webhook event matching the order's
   Stripe session, currency, and total can mark an order paid.

The checkout API enforces the session itself. The Next.js `proxy.js` also blocks
requests with no Better Auth session cookie before they reach that route; the
API still validates the session against Better Auth, so a forged cookie cannot
create an order.

## Deployment

For a deployed Next.js app, set `DATABASE_URL`, `BETTER_AUTH_SECRET`,
`BETTER_AUTH_URL`, `STRIPE_SECRET_KEY`, and `STRIPE_WEBHOOK_SECRET` in the
hosting provider's environment settings. Use a Stripe test secret key while
testing. Set
`BETTER_AUTH_URL` to the app's public origin (for example,
`https://your-app.example`), without an `/api` path. Redeploy after changing
these settings. The local `.env.local` URL must match the origin used to open
the app in the browser; restart the development server after changing it.
