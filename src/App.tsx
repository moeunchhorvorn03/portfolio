import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { WhatDoIHelp } from "./components/WhatDoIHelp";
import { Works } from "./components/Works";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";

const HomePage = () => (
  <div 
    className="min-h-screen flex flex-col lg:flex-row"
    style={{ backgroundColor: "var(--cream)" }}
  >
    <div
      className="flex-1 min-w-0 flex flex-col lg:min-h-screen mx-[150px]"
    >
      <Header />
      <Hero />
      <WhatDoIHelp />
      <Works />
      <Experience />
      <Footer />
    </div>
  </div>
);

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};
