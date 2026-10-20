import { getProducts } from "../../../lib/products.js";

export const runtime = "nodejs";

export async function GET() {
  return Response.json(await getProducts());
}
