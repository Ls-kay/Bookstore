import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

function App() {
  return <main className="min-h-screen bg-paper text-ink">The Paper Trail</main>;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
