import { NextResponse } from "next/server";

export function proxy(request) {
  const hasSessionCookie = request.cookies
    .getAll()
    .some((cookie) =>
      /^(?:__Secure-)?better-auth\.session_token$/.test(cookie.name),
    );

  if (!hasSessionCookie) {
    return NextResponse.json(
      { error: "Sign in before starting checkout." },
      { status: 401 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/checkout"],
};
