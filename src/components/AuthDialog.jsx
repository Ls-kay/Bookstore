"use client";

import { useState } from "react";
import { authClient } from "../lib/auth-client.js";

export default function AuthDialog({ onClose }) {
  const [mode, setMode] = useState("sign-in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result =
        mode === "sign-up"
          ? await authClient.signUp.email({ name, email, password })
          : await authClient.signIn.email({ email, password });

      if (result.error) {
        setError(result.error.message || "Authentication failed. Try again.");
        return;
      }

      onClose();
    } catch {
      setError("We couldn't reach the sign-in service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function changeMode(nextMode) {
    setMode(nextMode);
    setError("");
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/55 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="auth-dialog-title"
        aria-modal="true"
        className="relative w-full max-w-md rounded-2xl bg-[#fffdf8] p-6 shadow-soft sm:p-8"
        role="dialog"
      >
        <button
          aria-label="Close sign-in dialog"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-border text-xl"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <p className="mb-2 text-xs font-extrabold tracking-[0.17em] text-green">
          THE PAPER TRAIL
        </p>
        <h2
          className="mb-2 pr-8 font-display text-3xl"
          id="auth-dialog-title"
        >
          {mode === "sign-up" ? "Join our reading circle." : "Welcome back."}
        </h2>
        <p className="mb-6 text-sm text-[#77796f]">
          {mode === "sign-up"
            ? "Create an account to get started."
            : "Sign in to your Paper Trail account."}
        </p>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          {mode === "sign-up" && (
            <label className="grid gap-1.5 text-sm font-semibold">
              Name
              <input
                autoComplete="name"
                className="min-w-0 rounded-lg border border-border bg-white px-3 py-3 font-normal"
                maxLength={100}
                onChange={(event) => setName(event.target.value)}
                required
                value={name}
              />
            </label>
          )}
          <label className="grid gap-1.5 text-sm font-semibold">
            Email
            <input
              autoComplete="email"
              className="min-w-0 rounded-lg border border-border bg-white px-3 py-3 font-normal"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold">
            Password
            <input
              autoComplete={
                mode === "sign-up" ? "new-password" : "current-password"
              }
              className="min-w-0 rounded-lg border border-border bg-white px-3 py-3 font-normal"
              minLength={8}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </label>

          {error && (
            <p className="m-0 text-sm text-red-800" role="alert">
              {error}
            </p>
          )}

          <button
            className="mt-1 min-h-12 rounded-lg bg-ink px-4 py-3 text-sm font-bold text-white hover:bg-green disabled:cursor-wait disabled:opacity-60"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting
              ? "Please wait…"
              : mode === "sign-up"
                ? "Create account"
                : "Sign in"}
          </button>
        </form>

        <p className="mb-0 mt-5 text-center text-sm text-[#77796f]">
          {mode === "sign-up" ? "Already have an account?" : "New to the shop?"}{" "}
          <button
            className="font-bold text-ink underline underline-offset-4"
            onClick={() =>
              changeMode(mode === "sign-up" ? "sign-in" : "sign-up")
            }
            type="button"
          >
            {mode === "sign-up" ? "Sign in" : "Create an account"}
          </button>
        </p>
      </section>
    </div>
  );
}
