import QuantityStepper from "./QuantityStepper";

export default function BookCard({ book, quantity, onQuantityChange }) {
  return (
    <article className="min-w-0">
      <a
        className={`relative grid h-[21.25rem] place-items-center overflow-hidden rounded-lg p-5 ${book.color}`}
        href="#reading-list"
        aria-label={`View reading list options for ${book.title}`}
      >
        <img
          className="h-[90%] max-w-[88%] object-contain shadow-[5px_8px_14px_rgb(0_0_0_/_16%)] transition hover:-translate-y-1"
          src={book.cover}
          alt={`${book.title} book cover`}
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-[#fffdf8] px-2 py-1.5 text-[0.6rem] font-extrabold uppercase tracking-wider">
          {book.label}
        </span>
      </a>
      <div className="pt-4">
        <p className="mb-2 text-[0.65rem] font-extrabold uppercase tracking-[0.07em] text-[#77796f]">
          {book.genre}
        </p>
        <h3 className="mb-1.5 break-words font-display text-xl leading-snug">
          {book.title}
        </h3>
        <p className="mb-3 text-sm text-[#77796f]">{book.author}</p>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
          <span className="text-sm font-extrabold">{book.price}</span>
          <QuantityStepper
            value={quantity}
            onChange={onQuantityChange}
            label={book.title}
          />
        </div>
      </div>
    </article>
  );
}
