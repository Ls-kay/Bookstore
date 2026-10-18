export default function Hero() {
  return (
    <section className="overflow-hidden py-14 sm:py-20 lg:py-[5.5rem]" id="home">
      <div className="mx-auto grid w-full max-w-6xl min-w-0 items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <p className="mb-4 text-xs font-extrabold tracking-[0.17em] text-green">
            YOUR NEIGHBOURHOOD BOOKSHOP
          </p>
          <h1 className="mb-6 font-display text-5xl font-normal leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-[5.5rem]">
            Good books.
            <br />
            Great company.
            <br />
            <em className="text-[#6e8268]">Endless worlds.</em>
          </h1>
          <p className="mb-7 max-w-lg text-base leading-8 text-[#77796f]">
            A little corner for the curious. Discover stories that stay with
            you, ideas that change you, and people who love books as much as
            you do.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-ink px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-green"
              href="#books"
            >
              Explore the shelves <span aria-hidden="true">↗</span>
            </a>
            <a
              className="border-b border-current py-1 text-sm font-bold"
              href="#events"
            >
              What&apos;s happening?
            </a>
          </div>
          <div className="mt-10 flex items-center gap-3 sm:mt-12">
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-xl text-ink"
              aria-hidden="true"
            >
              ✳
            </span>
            <p className="m-0 text-sm text-[#77796f]">
              Independent by nature. Book lovers by choice.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full min-w-0 max-w-2xl px-3 pb-8 sm:px-5">
          <img
            className="h-[22rem] w-full rounded-t-[9rem] rounded-b-xl object-cover sm:h-[31rem]"
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1100&q=85"
            alt="Warm, inviting independent bookstore filled with books"
          />
          <div className="absolute bottom-3 right-0 flex w-40 rotate-3 flex-col gap-1 rounded-lg bg-gold p-5 shadow-soft sm:right-0 sm:w-[12.5rem] sm:p-6">
            <span className="text-[0.65rem] font-extrabold tracking-[0.09em]">
              YOUR NEXT CHAPTER
            </span>
            <strong className="font-display text-xl">Starts here.</strong>
            <span className="self-end" aria-hidden="true">
              ↙
            </span>
          </div>
          <span
            className="absolute left-0 top-1/4 -rotate-12 font-display text-xl font-bold leading-none text-clay sm:-left-1"
            aria-hidden="true"
          >
            READ
            <br />
            MORE.
          </span>
        </div>
      </div>
    </section>
  );
}
