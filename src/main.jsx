import React from "react";
import { createRoot } from "react-dom/client";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MainContent from "./components/MainContent";
import "./index.css";

function App() {
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

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
