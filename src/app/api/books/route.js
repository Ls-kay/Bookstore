import books from "../../../data/books";

export function GET() {
  return Response.json(books);
}
