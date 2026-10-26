import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MainContent from "../components/MainContent";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-paper font-body text-ink">
      <Header />
      <main>
        <Hero />
        <MainContent />
      </main>
      <Footer />
    </div>
  );
}
