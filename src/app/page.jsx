import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MainContent from "../components/MainContent";
import { getProducts } from "../lib/products.js";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const books = await getProducts();

  return (
    <div className="min-h-screen overflow-x-clip bg-paper font-body text-ink">
      <Header />
      <main>
        <Hero />
        <MainContent books={books} />
      </main>
      <Footer />
    </div>
  );
}
