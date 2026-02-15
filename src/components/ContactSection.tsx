import { Link } from "react-router-dom";

const navItems: { label: string; href: string }[] = [
  { label: "SERVICES", href: "/#services" },
  { label: "WORKS", href: "/#works" },
  { label: "NOTES", href: "/#" },
  { label: "EXPERIENCE", href: "/experience" },
];

export const ContactSection = () => {
  return (
    <section>
      <h2 className="text-2xl lg:text-3xl font-bold text-(--text-dark) mb-4">
        Let's make something amazing together.
      </h2>
      <p className="text-(--text-dark)/90 mb-4 max-w-md">
        Whether you have a new project, a redesign, or just want to chat about design and product, I’d love to hear from you.
      </p>
      <p className="mb-8">
        <span className="text-(--text-dark)">Start by </span>
        <a href="mailto:moeunchhorvorn@gmail.com" className="text-(--accent) italic font-medium hover:underline">
          saying hi
        </a>
      </p>
      <div className="text-right">
        <h3 className="font-bold text-(--text-dark) mb-2">Information</h3>
        <p className="text-sm text-(--text-dark)/85 mb-4">145 New York, FL 5467, USA</p>
        <ul className="space-y-1 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link to={item.href} className="text-(--text-dark) hover:text-(--accent) transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
