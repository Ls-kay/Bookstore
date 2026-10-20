"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(
      "Thanks for your interest! Newsletter signup is a demo; connect a mailing service to save subscriptions.",
    );
    setEmail("");
  }

  return (
    <footer className="bg-[#24342a] pt-12 text-white sm:pt-16">
      <div className="mx-auto grid w-full max-w-6xl min-w-0 gap-9 px-5 pb-10 sm:grid-cols-2 md:px-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
        <div>
          <a
            className="mb-3 inline-flex items-center gap-2 font-display text-xl font-bold"
            href="#home"
          >
            <span className="text-2xl text-gold" aria-hidden="true">
              ✳
            </span>
            The Paper Trail
          </a>
          <p className="max-w-xs text-sm leading-6 text-[#c9d0c7]">
            Your neighbourhood bookshop for good stories and great company.
          </p>
        </div>

        <nav className="flex flex-col items-start gap-2.5" aria-label="Footer">
          <a className="text-sm hover:text-gold" href="#books">
            Browse books
          </a>
          <a className="text-sm hover:text-gold" href="#events">
            Events
          </a>
          <a className="text-sm hover:text-gold" href="#about">
            Our story
          </a>
        </nav>

        <div className="min-w-0">
          <h2 className="mb-2 font-display text-2xl">A note from the shop?</h2>
          <p className="max-w-sm text-sm leading-6 text-[#c9d0c7]">
            New reads, bookish happenings, and little things we love.
          </p>
          <form
            className="mt-4 flex w-full max-w-sm gap-2"
            onSubmit={handleSubmit}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Your email address
            </label>
            <input
              className="min-w-0 flex-1 rounded-lg border border-transparent bg-[#fffdf8] px-3 py-3 text-sm text-ink focus-visible:outline-clay"
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="Your email address"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button
              className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gold text-xl text-ink hover:bg-[#f0d78e]"
              type="submit"
              aria-label="Subscribe to newsletter"
            >
              →
            </button>
          </form>
          <p className="mt-2 min-h-6 text-xs text-[#c9d0c7]" aria-live="polite">
            {message}
          </p>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-white/15 px-5 py-5 md:px-8">
        <p className="m-0 text-xs text-[#c9d0c7]">
          © {new Date().getFullYear()} The Paper Trail. Made for readers.
        </p>
        <a
          className="text-xs text-[#c9d0c7] hover:text-gold"
          href="mailto:hello@thepapertrail.example"
        >
          Get in touch
        </a>
      </div>
    </footer>
  );
}
