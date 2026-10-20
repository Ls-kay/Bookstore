"use client";

import { useState } from "react";
import BookCard from "./BookCard";

const filters = [
  { id: "all", label: "All books" },
  { id: "fiction", label: "Fiction" },
  { id: "nonfiction", label: "Nonfiction" },
  { id: "staff", label: "Staff picks" },
];

const events = [
  {
    month: "OCT",
    day: "17",
    type: "BOOK CLUB · IN PERSON",
    title: "The Sunday Pages Book Club",
    description:
      "Bring your current read and join us for a relaxed conversation about the books we can't stop thinking about.",
    time: "Saturday · 10:00–11:30",
    action: "Register your interest",
    color: "bg-gold",
  },
  {
    month: "NOV",
    day: "02",
    type: "AUTHOR TALK · ONLINE",
    title: "Reading with the Locals",
    description:
      "Meet the writers behind this month's staff picks and explore the ideas shaping our reading lives.",
    time: "Thursday · 18:30–19:30",
    action: "Reserve a seat",
    color: "bg-sage",
  },
  {
    month: "NOV",
    day: "14",
    type: "WORKSHOP · IN STORE",
    title: "Slow Reading Circle",
    description:
      "A reflective evening of close reading, discussion, and conversation with fellow curious book lovers.",
    time: "Saturday · 09:30–11:00",
    action: "Join the list",
    color: "bg-[#efd2c5]",
  },
];

export default function MainContent({ books }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [quantities, setQuantities] = useState({});

  const filteredBooks =
    activeFilter === "all"
      ? books
      : books.filter((book) => book.categories.includes(activeFilter));
  const savedBooks = books.filter((book) => (quantities[book.id] ?? 0) > 0);
  const savedCount = savedBooks.reduce(
    (total, book) => total + quantities[book.id],
    0,
  );

  function updateQuantity(bookId, quantity) {
    setQuantities((current) => ({ ...current, [bookId]: quantity }));
  }

  function showStaffPicks(event) {
    event.preventDefault();
    setActiveFilter("staff");
    document.querySelector("#books")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <section className="bg-[#fffdf8] py-14 sm:py-20" id="books">
        <div className="mx-auto w-full max-w-6xl min-w-0 px-5 md:px-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-extrabold tracking-[0.17em] text-green">
                THE GOOD STUFF
              </p>
              <h2 className="mb-0 font-display text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl">
                Find your next <em className="text-[#6e8268]">favourite.</em>
              </h2>
            </div>
            <p className="mb-1 max-w-sm text-[#77796f]">
              From page-turners to big ideas, there&apos;s something waiting on
              every shelf.
            </p>
          </div>

          <div
            className="mb-8 flex flex-wrap gap-2.5"
            role="group"
            aria-label="Filter books by category"
          >
            {filters.map((filter) => (
              <button
                className={`rounded-full border px-4 py-2.5 text-sm transition ${
                  activeFilter === filter.id
                    ? "border-ink bg-ink text-white"
                    : "border-border bg-transparent hover:border-ink"
                }`}
                type="button"
                key={filter.id}
                aria-pressed={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <BookCard
                book={book}
                key={book.id}
                quantity={quantities[book.id] ?? 0}
                onQuantityChange={(quantity) =>
                  updateQuantity(book.id, quantity)
                }
              />
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            {filteredBooks.length} book{filteredBooks.length === 1 ? "" : "s"}{" "}
            displayed.
          </p>

          <section
            className="mt-10 rounded-2xl bg-paper p-5 sm:mt-12 sm:p-7"
            id="reading-list"
            aria-labelledby="reading-list-title"
          >
            <h3
              className="mb-4 font-display text-2xl"
              id="reading-list-title"
            >
              Your reading list <span className="text-[#77796f]">({savedCount})</span>
            </h3>
            {savedBooks.length > 0 ? (
              <ul className="mb-5 list-inside list-disc space-y-2 text-[#77796f]">
                {savedBooks.map((book) => (
                  <li key={book.id}>
                    {book.title} <span>× {quantities[book.id]}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mb-5 text-[#77796f]">
                Your next favourite could be here. Use + on a book to save it.
              </p>
            )}
            <button
              className="rounded-lg border border-border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              disabled={savedCount === 0}
              onClick={() => setQuantities({})}
            >
              Clear reading list
            </button>
          </section>
        </div>
      </section>

      <section className="bg-green py-14 text-white sm:py-20" id="staff-picks">
        <div className="mx-auto grid w-full max-w-6xl min-w-0 items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-extrabold tracking-[0.17em] text-gold">
              HANDPICKED WITH LOVE
            </p>
            <h2 className="mb-5 font-display text-4xl font-normal leading-tight sm:text-5xl">
              Not just good books.
              <br />
              <em className="text-sage">Our kind of books.</em>
            </h2>
            <p className="mb-7 max-w-lg leading-7 text-sage">
              Our team reads widely, argues passionately about endings, and
              loves matching readers with the story they didn&apos;t know they
              needed.
            </p>
            <a
              className="inline-flex min-h-12 items-center rounded-lg bg-[#fffdf8] px-5 py-3 text-sm font-bold text-ink hover:bg-sage"
              href="#books"
              onClick={showStaffPicks}
            >
              Explore staff picks ↗
            </a>
          </div>
          <div className="relative rounded-2xl border border-white/20 bg-white/[0.08] p-7 sm:p-10">
            <span
              className="font-display text-6xl leading-none text-gold"
              aria-hidden="true"
            >
              “
            </span>
            <blockquote className="my-4 font-display text-3xl leading-snug sm:text-4xl">
              A book is a little door. Open it and see where you end up.
            </blockquote>
            <p className="mb-0 text-sm text-sage">
              — Your friendly neighbourhood booksellers
            </p>
            <span
              className="absolute bottom-2 right-6 text-3xl text-gold"
              aria-hidden="true"
            >
              ✳
            </span>
          </div>
        </div>
      </section>

      <section className="bg-paper py-14 sm:py-20" id="events">
        <div className="mx-auto w-full max-w-6xl min-w-0 px-5 md:px-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-extrabold tracking-[0.17em] text-green">
                BEYOND THE PAGES
              </p>
              <h2 className="mb-0 font-display text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl">
                Come for the books.
                <br />
                <em className="text-[#6e8268]">Stay for the people.</em>
              </h2>
            </div>
            <p className="mb-1 max-w-sm text-[#77796f]">
              Good conversations, new friends, and stories worth sharing.
              There&apos;s always something happening around here.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const subject = encodeURIComponent(
                `Event registration enquiry: ${event.title}`,
              );

              return (
                <article
                  className="flex min-w-0 items-start gap-4 rounded-2xl border border-border bg-[#fffdf8] p-5 sm:p-6"
                  key={event.title}
                >
                  <div
                    className={`flex min-h-[4.7rem] w-14 shrink-0 flex-col items-center justify-center rounded-lg leading-tight ${event.color}`}
                  >
                    <span className="text-[0.65rem] font-extrabold tracking-widest">
                      {event.month}
                    </span>
                    <strong className="font-display text-3xl">
                      {event.day}
                    </strong>
                  </div>
                  <div className="min-w-0">
                    <p className="mb-2 text-[0.62rem] font-extrabold tracking-wide text-[#77796f]">
                      {event.type}
                    </p>
                    <h3 className="mb-2 break-words font-display text-xl leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-sm leading-6 text-[#77796f]">
                      {event.description}
                    </p>
                    <p className="text-sm font-bold">{event.time}</p>
                    <a
                      className="mt-1 inline-block border-b border-current py-1 text-sm font-bold"
                      href={`mailto:hello@thepapertrail.example?subject=${subject}`}
                    >
                      {event.action} ↗
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf8] py-14 sm:py-20" id="about">
        <div className="mx-auto grid w-full max-w-6xl min-w-0 items-center gap-8 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
          <img
            className="h-72 w-full rounded-2xl object-cover sm:h-[27rem]"
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1000&q=85"
            alt="Shelves of books in a quiet reading space"
            loading="lazy"
          />
          <div>
            <p className="mb-3 text-xs font-extrabold tracking-[0.17em] text-green">
              A LITTLE ABOUT US
            </p>
            <h2 className="mb-5 font-display text-4xl font-normal leading-tight sm:text-5xl">
              More than a bookshop.
              <br />
              <em className="text-[#6e8268]">A feeling.</em>
            </h2>
            <p className="leading-8 text-[#77796f]">
              The Paper Trail is a home for readers, dreamers, and the
              endlessly curious. We believe a good book can make a day, start a
              conversation, or change the way you see the world.
            </p>
            <a
              className="mt-2 inline-block border-b border-current py-1 text-sm font-bold"
              href="#events"
            >
              Come say hello ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
