import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { WhatDoIHelp } from "./components/WhatDoIHelp";
import { Works } from "./components/Works";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { useMotionValueEvent, useScroll } from "motion/react";

const HomePage = () => {
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log(latest);
  });

  return (
    <div 
      className="min-h-screen flex flex-col lg:flex-col"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <Header />
      <div className="flex-1 min-w-0 flex flex-col lg:min-h-screen mx-[140px]">
        <Hero />
        <div className="z-0">
          <WhatDoIHelp />
          <Works />
          <Experience />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};
