import { and, eq } from "drizzle-orm";
import { auth } from "../../../lib/auth.js";
import { getDb } from "../../../db/index.js";
import { orderItems, orders } from "../../../db/schema.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return Response.json({ error: "Sign in to view this order." }, { status: 401 });
  }

  const stripeSessionId = new URL(request.url).searchParams.get("session_id");
  if (!stripeSessionId || stripeSessionId.length > 255) {
    return Response.json({ error: "A valid checkout session ID is required." }, { status: 400 });
  }

  const db = getDb();
  const [order] = await db
    .select({
      id: orders.id,
      status: orders.status,
      currency: orders.currency,
      totalInCents: orders.totalInCents,
      createdAt: orders.createdAt,
    })
    .from(orders)
    .where(
      and(
        eq(orders.stripeSessionId, stripeSessionId),
        eq(orders.userId, session.user.id),
      ),
    )
    .limit(1);

  if (!order) {
    return Response.json({ error: "Order not found." }, { status: 404 });
  }

  const items = await db
    .select({
      title: orderItems.productTitle,
      quantity: orderItems.quantity,
      unitPriceInCents: orderItems.unitPriceInCents,
    })
    .from(orderItems)
    .where(eq(orderItems.orderId, order.id));

  return Response.json({ order: { ...order, items } });
}
