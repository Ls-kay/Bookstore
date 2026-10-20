import { sql } from "drizzle-orm";
import books from "../data/books.js";
import { closeDb, getDb } from "./index.js";
import { products } from "./schema.js";

function priceToCents(price) {
  const amount = Number.parseFloat(price.replace(/[^\d.]/g, ""));
  if (!Number.isFinite(amount)) {
    throw new Error(`Invalid book price: ${price}`);
  }
  return Math.round(amount * 100);
}

const rows = books.map((book, sortOrder) => ({
  id: book.id,
  title: book.title,
  author: book.author,
  genre: book.genre,
  categories: book.categories,
  label: book.label,
  priceInCents: priceToCents(book.price),
  coverUrl: book.cover,
  color: book.color,
  sortOrder,
}));

try {
  await getDb()
    .insert(products)
    .values(rows)
    .onConflictDoUpdate({
      target: products.id,
      set: {
        title: sql`excluded.title`,
        author: sql`excluded.author`,
        genre: sql`excluded.genre`,
        categories: sql`excluded.categories`,
        label: sql`excluded.label`,
        priceInCents: sql`excluded.price_in_cents`,
        coverUrl: sql`excluded.cover_url`,
        color: sql`excluded.color`,
        sortOrder: sql`excluded.sort_order`,
        updatedAt: sql`now()`,
      },
    });

  console.log(`Seeded ${rows.length} products.`);
} finally {
  await closeDb();
}
