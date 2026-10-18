import { useState } from "react";

const links = [
  { href: "#books", label: "Books" },
  { href: "#staff-picks", label: "Staff picks" },
  { href: "#events", label: "Events" },
  { href: "#about", label: "Our story" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-paper/95 backdrop-blur">
      <div className="mx-auto flex min-h-[4.875rem] w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <a
          className="flex shrink-0 items-center gap-2 font-display text-xl font-bold sm:text-[1.3rem]"
          href="#home"
          aria-label="The Paper Trail home"
          onClick={closeMenu}
        >
          <span className="text-2xl text-[#b56d4c]" aria-hidden="true">
            ✳
          </span>
          <span>The Paper Trail</span>
        </a>

        <button
          className="grid h-11 w-11 shrink-0 place-content-center gap-1 rounded-lg border border-border md:hidden"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="h-0.5 w-5 bg-ink" />
          <span className="h-0.5 w-5 bg-ink" />
          <span className="h-0.5 w-5 bg-ink" />
        </button>

        <nav
          className={`${menuOpen ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col items-stretch gap-1 border-b border-border bg-paper px-5 py-4 shadow-soft md:static md:flex md:flex-row md:items-center md:justify-end md:gap-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <a
              className="rounded px-2 py-2 text-sm font-semibold hover:text-[#8b604b] md:px-0"
              href={link.href}
              key={link.href}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <a
            className="mt-2 rounded-lg bg-ink px-4 py-3 text-center text-sm font-bold text-white hover:bg-green md:mt-0"
            href="#books"
            onClick={closeMenu}
          >
            Find your next read ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
