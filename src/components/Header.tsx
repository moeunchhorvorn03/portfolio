import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, type ValueAnimationTransition } from "motion/react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import moonIcon from "../assets/icons/moon.svg";
import sunIcon from "../assets/icons/sun.svg";
import phoneIcon from "../assets/icons/phone.svg";

export const Header = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const navItems = [
    // { label: "SERVICES", href: "/", hash: "", delay: 0.3, initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } },
    { label: "WORKS", href: "/", hash: "#works", delay: 0.4, initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: "easeOut", delay: 0.4 } },
    // { label: "NOTES", href: "/", hash: "", delay: 0.5, initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: "easeOut", delay: 0.5 } },
    { label: "EXPERIENCE", href: "/", hash: "#experience", delay: 0.6, initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: "easeOut", delay: 0.6 } },
  ];
  return (
    <motion.header 
      className="flex items-center justify-between sticky top-0 z-50 py-4 sm:py-6 lg:py-6 px-5 sm:px-8 md:px-12 lg:px-[140px]"
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
              transition={item.transition as ValueAnimationTransition<string>}
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
            <img src={moonIcon} className="w-4 h-4" alt="" aria-hidden />
          ) : (
            <img src={sunIcon} className="w-4 h-4" alt="" aria-hidden />
          )}
        </button>
        <span className="hidden sm:inline">(+855) 96 398 7174</span>
        <button type="button" className="w-9 h-9 rounded-full bg-(--text-dark) text-white flex items-center justify-center hover:bg-(--accent) transition-colors" aria-label="Call">
          <img src={phoneIcon} className="w-4 h-4" alt="" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden w-9 h-9 rounded-full bg-(--text-dark) text-white flex items-center justify-center hover:bg-(--accent) transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 right-0 mx-5 sm:mx-8 rounded-2xl border shadow-lg flex flex-col p-2"
            style={{
              backgroundColor: "color-mix(in srgb, var(--hero-bg) 92%, transparent)",
              backdropFilter: "blur(12px)",
              borderColor: "var(--border-subtle)",
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.hash}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-(--text-dark) hover:text-(--accent) hover:bg-(--border-subtle) transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="tel:+855963987174"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium text-(--text-dark) hover:text-(--accent) hover:bg-(--border-subtle) transition-colors sm:hidden"
            >
              (+855) 96 398 7174
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
