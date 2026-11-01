import { and, eq } from "drizzle-orm";
import Stripe from "stripe";
import { getDb } from "../../../../db/index.js";
import { orders } from "../../../../db/schema.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!secretKey || !webhookSecret) {
    return Response.json(
      { error: "Stripe webhook is not configured." },
      { status: 503 },
    );
  }

  if (!signature) {
    return Response.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const stripe = new Stripe(secretKey);
  const payload = await request.text();
  let event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      payload,
      signature,
      webhookSecret,
    );
  } catch {
    return Response.json({ error: "Invalid Stripe signature." }, { status: 400 });
  }

  const checkoutSession = event.data.object;
  const supportedEvents = new Set([
    "checkout.session.completed",
    "checkout.session.expired",
    "checkout.session.async_payment_succeeded",
    "checkout.session.async_payment_failed",
  ]);
  if (!supportedEvents.has(event.type)) {
    return Response.json({ received: true });
  }

  const orderId = checkoutSession.metadata?.orderId;
  if (!orderId) {
    return Response.json({ error: "Checkout event has no order ID." }, { status: 400 });
  }

  const db = getDb();
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);

  if (
    !order ||
    order.stripeSessionId !== checkoutSession.id ||
    checkoutSession.client_reference_id !== order.id
  ) {
    console.error("Ignoring Stripe event that does not match a stored order.");
    return Response.json({ received: true });
  }

  const isPaymentSuccess =
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded";

  if (
    isPaymentSuccess &&
    checkoutSession.payment_status === "paid" &&
    checkoutSession.amount_total === order.totalInCents &&
    checkoutSession.currency === order.currency
  ) {
    await db
      .update(orders)
      .set({ status: "paid", updatedAt: new Date() })
      .where(and(eq(orders.id, order.id), eq(orders.status, "pending")));
  } else if (isPaymentSuccess) {
    console.error("Ignoring Stripe payment event with an unpaid or mismatched total.");
  } else if (event.type === "checkout.session.expired") {
    await db
      .update(orders)
      .set({ status: "cancelled", updatedAt: new Date() })
      .where(and(eq(orders.id, order.id), eq(orders.status, "pending")));
  } else if (event.type === "checkout.session.async_payment_failed") {
    await db
      .update(orders)
      .set({ status: "failed", updatedAt: new Date() })
      .where(and(eq(orders.id, order.id), eq(orders.status, "pending")));
  }

  return Response.json({ received: true });
}
