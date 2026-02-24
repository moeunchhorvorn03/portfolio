import { Link } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll, type ValueAnimationTransition } from "motion/react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export const Header = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const navItems = [
    { label: "SERVICES", href: "/", hash: "", delay: 0.3, initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } },
    { label: "WORKS", href: "/", hash: "#works", delay: 0.4, initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: "easeOut", delay: 0.4 } },
    { label: "NOTES", href: "/", hash: "", delay: 0.5, initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: "easeOut", delay: 0.5 } },
    { label: "EXPERIENCE", href: "/", hash: "#experience", delay: 0.6, initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: "easeOut", delay: 0.6 } },
  ];
  return (
    <motion.header 
      className="flex items-center justify-between sticky top-0 z-50 py-6 lg:py-6 px-[140px]"
      initial={{
        backgroundColor: "transparent",
        backdropFilter: "none",
        boxShadow: "none",
      }}
      animate={{
        backgroundColor: scrolled ? "color-mix(in srgb, var(--hero-bg) 60%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 0 20px 0 rgba(0, 0, 0, 0.1)" : "none",
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Link to="/" className="text-2xl lg:text-3xl font-semibold text-(--text-dark)" style={{ fontFamily: "var(--font-script)" }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          Chhorvorn
          </motion.span>
      </Link>
      <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-(--text-dark)">
        {navItems.map((item) => {
          const isActive = false;
          const url = item.hash;
          return (
            <motion.a
              key={item.label}
              href={url}
              className={`hover:text-(--accent) transition-colors ${isActive ? "text-(--accent)" : ""}`}
              initial={item.initial}
              animate={item.animate}
              transition={item.transition as ValueAnimationTransition<any>}
            >
              {item.label}
            </motion.a>
          );
        })}
      </nav>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className="flex items-center gap-4 text-sm font-medium"
      >
        <button
          type="button"
          onClick={toggleTheme}
          className="header-theme-btn w-9 h-9 rounded-full bg-(--text-dark) text-white flex items-center justify-center hover:bg-(--accent) transition-colors"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/></svg>
          )}
        </button>
        <span className="hidden sm:inline">(+855) 96 398 7174</span>
        <button type="button" className="w-9 h-9 rounded-full bg-(--text-dark) text-white flex items-center justify-center hover:bg-(--accent) transition-colors" aria-label="Call">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        </button>
      </motion.div>
    </motion.header>
  );
};
