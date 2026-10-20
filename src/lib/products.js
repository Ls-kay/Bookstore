import { asc } from "drizzle-orm";
import { getDb } from "../db/index.js";
import { products } from "../db/schema.js";

export async function getProducts() {
  const rows = await getDb()
    .select()
    .from(products)
    .orderBy(asc(products.sortOrder));

  return rows.map(({ priceInCents, coverUrl, ...product }) => ({
    ...product,
    price: `R ${(priceInCents / 100).toFixed(2)}`,
    cover: coverUrl,
  }));
}
