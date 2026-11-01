"use client";

import { useEffect, useState } from "react";

const maxChecks = 6;
const checkDelayMs = 1500;

function formatPrice(amountInCents, currency) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountInCents / 100);
}

export default function CheckoutSuccessStatus({ sessionId }) {
  const [state, setState] = useState({
    status: sessionId ? "checking" : "missing-session",
    order: null,
    error: "",
  });

  useEffect(() => {
    if (!sessionId) return undefined;

    const controller = new AbortController();
    let timer;
    let checkCount = 0;

    async function checkOrder() {
      checkCount += 1;
      try {
        const response = await fetch(
          `/api/orders?session_id=${encodeURIComponent(sessionId)}`,
          { signal: controller.signal, cache: "no-store" },
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "We couldn't check your order.");
        }

        const orderStatus = result.order.status;
        if (orderStatus !== "pending" || checkCount >= maxChecks) {
          setState({ status: orderStatus, order: result.order, error: "" });
          return;
        }

        setState({ status: "checking", order: result.order, error: "" });
        timer = setTimeout(checkOrder, checkDelayMs);
      } catch (error) {
        if (!controller.signal.aborted) {
          setState({
            status: "error",
            order: null,
            error: error.message || "We couldn't check your order.",
          });
        }
      }
    }

    checkOrder();
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [sessionId]);

  if (state.status === "checking" || state.status === "pending") {
    return (
      <>
        <p className="mb-2 text-xs font-extrabold tracking-[0.17em] text-green">
          PAYMENT RECEIVED
        </p>
        <h1 className="mb-3 font-display text-3xl sm:text-4xl">
          {state.status === "checking"
            ? "Confirming your order…"
            : "Your payment is processing."}
        </h1>
        <p className="mb-0 text-[#77796f]" role="status" aria-live="polite">
          {state.status === "checking"
            ? "We’re waiting for Stripe to confirm the payment. This can take a few seconds."
            : "Your order is still awaiting payment confirmation. Refresh this page in a moment."}
        </p>
        {state.order && <OrderSummary order={state.order} />}
      </>
    );
  }

  if (state.status === "paid") {
    return (
      <>
        <p className="mb-2 text-xs font-extrabold tracking-[0.17em] text-green">
          ORDER CONFIRMED
        </p>
        <h1 className="mb-3 font-display text-3xl sm:text-4xl">
          Thank you for your order.
        </h1>
        <p className="mb-0 text-[#77796f]" role="status" aria-live="polite">
          Your payment was confirmed. We’re looking forward to getting these
          books into your hands.
        </p>
        {state.order && <OrderSummary order={state.order} />}
        <a
          className="mt-8 inline-block rounded-lg bg-ink px-5 py-3 text-sm font-bold text-white hover:bg-green"
          href="/"
        >
          Back to the bookstore
        </a>
      </>
    );
  }

  if (state.status === "cancelled" || state.status === "failed") {
    return (
      <>
        <p className="mb-2 text-xs font-extrabold tracking-[0.17em] text-[#8b604b]">
          PAYMENT NOT COMPLETED
        </p>
        <h1 className="mb-3 font-display text-3xl sm:text-4xl">
          Your order wasn’t paid.
        </h1>
        <p className="mb-0 text-[#77796f]" role="status">
          You can return to the bookstore and try checkout again.
        </p>
        <a
          className="mt-8 inline-block rounded-lg bg-ink px-5 py-3 text-sm font-bold text-white hover:bg-green"
          href="/"
        >
          Return to the bookstore
        </a>
      </>
    );
  }

  return (
    <>
      <p className="mb-2 text-xs font-extrabold tracking-[0.17em] text-[#8b604b]">
        ORDER STATUS
      </p>
      <h1 className="mb-3 font-display text-3xl sm:text-4xl">
        {state.status === "missing-session"
          ? "We couldn’t find your checkout."
          : "We couldn’t confirm your order."}
      </h1>
      <p className="mb-0 text-[#77796f]" role="alert">
        {state.error ||
          "Sign in with the account used to place the order, then check your order again."}
      </p>
      <a
        className="mt-8 inline-block rounded-lg bg-ink px-5 py-3 text-sm font-bold text-white hover:bg-green"
        href="/"
      >
        Back to the bookstore
      </a>
    </>
  );
}

function OrderSummary({ order }) {
  return (
    <div className="mt-7 border-t border-border pt-5">
      <h2 className="mb-3 font-display text-xl">Order summary</h2>
      <ul className="mb-4 space-y-2 text-sm text-[#77796f]">
        {order.items.map((item, index) => (
          <li className="flex justify-between gap-4" key={`${item.title}-${index}`}>
            <span>
              {item.title} × {item.quantity}
            </span>
            <span>
              {formatPrice(
                item.unitPriceInCents * item.quantity,
                order.currency,
              )}
            </span>
          </li>
        ))}
      </ul>
      <p className="mb-0 flex justify-between border-t border-border pt-3 font-bold">
        <span>Total</span>
        <span>{formatPrice(order.totalInCents, order.currency)}</span>
      </p>
    </div>
  );
}
