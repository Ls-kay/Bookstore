export const runtime = "nodejs";

async function getHandlers() {
  const [{ toNextJsHandler }, { auth }] = await Promise.all([
    import("better-auth/next-js"),
    import("../../../../lib/auth.js"),
  ]);

  return toNextJsHandler(auth);
}

export async function GET(request) {
  return (await getHandlers()).GET(request);
}

export async function POST(request) {
  return (await getHandlers()).POST(request);
}
