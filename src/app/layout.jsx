import "../index.css";

export const metadata = {
  title: "The Paper Trail | Independent Bookstore",
  description:
    "Discover your next favourite read at The Paper Trail, an independent bookstore featuring fiction, nonfiction, staff picks, book clubs and author events.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
