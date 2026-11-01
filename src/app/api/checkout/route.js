import { randomUUID } from "node:crypto";
import { eq, inArray } from "drizzle-orm";
import Stripe from "stripe";
import { auth } from "../../../lib/auth.js";
import { getDb } from "../../../db/index.js";
import { orderItems, orders, products } from "../../../db/schema.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(message, status) {
  return Response.json({ error: message }, { status });
}

export async function POST(request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return jsonError("Sign in before starting checkout.", 401);
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return jsonError("Checkout is not configured. Set STRIPE_SECRET_KEY.", 503);
  }
  if (!secretKey.startsWith("sk_test_")) {
    return jsonError(
      "Use a Stripe test secret key (sk_test_...) for this checkout.",
      503,
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError("Request body must be valid JSON.", 400);
  }

  if (
    !Array.isArray(body?.items) ||
    body.items.length === 0 ||
    body.items.length > 50
  ) {
    return jsonError("Choose between 1 and 50 books to check out.", 400);
  }

  const requestedItems = new Map();
  for (const item of body.items) {
    if (
      typeof item?.productId !== "string" ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 10
    ) {
      return jsonError("Each book must have a valid ID and quantity (1–10).", 400);
    }

    if (requestedItems.has(item.productId)) {
      return jsonError("A book can only appear once in the checkout list.", 400);
    }
    requestedItems.set(item.productId, item.quantity);
  }

  const db = getDb();
  const selectedProducts = await db
    .select()
    .from(products)
    .where(inArray(products.id, [...requestedItems.keys()]));

  if (selectedProducts.length !== requestedItems.size) {
    return jsonError("One or more selected books are no longer available.", 400);
  }

  const lineItems = selectedProducts.map((product) => ({
    product,
    quantity: requestedItems.get(product.id),
  }));
  const totalInCents = lineItems.reduce(
    (total, { product, quantity }) =>
      total + product.priceInCents * quantity,
    0,
  );

  if (
    !Number.isSafeInteger(totalInCents) ||
    totalInCents <= 0 ||
    totalInCents > 2_147_483_647
  ) {
    return jsonError("The order total is invalid.", 400);
  }

  const orderId = randomUUID();
  const createdItems = lineItems.map(({ product, quantity }) => ({
    id: randomUUID(),
    orderId,
    productId: product.id,
    productTitle: product.title,
    quantity,
    unitPriceInCents: product.priceInCents,
  }));

  await db.batch([
    db.insert(orders).values({
      id: orderId,
      userId: session.user.id,
      totalInCents,
    }),
    db.insert(orderItems).values(createdItems),
  ]);

  const stripe = new Stripe(secretKey);
  const appUrl = new URL(
    process.env.BETTER_AUTH_URL || new URL(request.url).origin,
  ).origin;

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      managed_payments: { enabled: false },
      customer_email: session.user.email,
      client_reference_id: orderId,
      metadata: { orderId },
      line_items: lineItems.map(({ product, quantity }) => ({
        quantity,
        price_data: {
          currency: "zar",
          unit_amount: product.priceInCents,
          product_data: {
            name: product.title,
            tax_code: "txcd_99999999",
          },
        },
      })),
      success_url: new URL("/?checkout=success", appUrl).toString(),
      cancel_url: new URL("/?checkout=cancelled", appUrl).toString(),
    });

    if (!checkoutSession.url) {
      throw new Error("Stripe did not return a checkout URL.");
    }

    await db
      .update(orders)
      .set({ stripeSessionId: checkoutSession.id, updatedAt: new Date() })
      .where(eq(orders.id, orderId));

    return Response.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Could not start Stripe Checkout.", error);
    await db
      .update(orders)
      .set({ status: "failed", updatedAt: new Date() })
      .where(eq(orders.id, orderId));
    return jsonError("Could not start secure checkout. Please try again.", 502);
  }
}
