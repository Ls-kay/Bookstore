import BookCard from "./BookCard";

const placeholders = [0, 1, 2];

export default function BookGrid({
  status,
  books,
  quantities,
  onQuantityChange,
}) {
  const isLoading = status === "loading";

  return (
    <>
      <div
        className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        aria-busy={isLoading}
      >
        {isLoading
          ? placeholders.map((placeholder) => (
              <div
                className="h-[28rem] animate-pulse rounded-lg bg-border/60"
                key={placeholder}
              />
            ))
          : books.map((book) => (
              <BookCard
                book={book}
                key={book.id}
                quantity={quantities[book.id] ?? 0}
                onQuantityChange={(quantity) =>
                  onQuantityChange(book.id, quantity)
                }
              />
            ))}
        {isLoading && (
          <p className="sr-only" role="status">
            Loading books…
          </p>
        )}
      </div>
      {!isLoading && (
        <p className="sr-only" aria-live="polite">
          {books.length} book
          {books.length === 1 ? "" : "s"} displayed.
        </p>
      )}
    </>
  );
}
