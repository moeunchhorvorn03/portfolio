export const Footer = () => {
  return (
    <footer className="border-t border-(--text-dark)/10 px-6 lg:px-8 py-6 mt-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <a href="#" className="text-xl font-semibold text-(--text-dark)" style={{ fontFamily: "var(--font-script)" }}>
          Chhorvorn
        </a>
        <p className="text-sm text-(--text-dark)/70 order-last w-full text-center sm:order-0 sm:w-auto">
          ©2026. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};
