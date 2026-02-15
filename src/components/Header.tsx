import { Link } from "react-router-dom";

export const Header = () => {
  const navItems = [
    { label: "SERVICES", href: "/", hash: "" },
    { label: "WORKS", href: "/", hash: "#works" },
    { label: "NOTES", href: "/", hash: "" },
    { label: "EXPERIENCE", href: "/", hash: "#experience" },
  ];
  return (
    <header className="flex items-center justify-between py-6 lg:py-8">
      <Link to="/" className="text-2xl lg:text-3xl font-semibold text-(--text-dark)" style={{ fontFamily: "var(--font-script)" }}>
        Chhorvorn
      </Link>
      <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-(--text-dark)">
        {navItems.map((item) => {
          const isActive = false;
          const url = item.hash;
          return (
            <a
              key={item.label}
              href={url}
              className={`hover:text-(--accent) transition-colors ${isActive ? "text-(--accent)" : ""}`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className="flex items-center gap-4 text-sm font-medium">
        <span className="hidden sm:inline">(+855) 96 398 7174</span>
        <button type="button" className="w-9 h-9 rounded-full bg-(--text-dark) text-white flex items-center justify-center hover:bg-(--accent) transition-colors" aria-label="Call">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        </button>
      </div>
    </header>
  );
};
