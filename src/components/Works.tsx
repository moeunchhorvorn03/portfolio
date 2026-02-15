const projects = [
  {
    name: "KB Prasac Bank CIB",
    type: "Banking CIB",
    color: "var(--teal)",
    description: "Frontend development for the internet banking platform. Built responsive interfaces for account management, transfers, and transaction history using Vue and TypeScript. Integrated with backend APIs and ensured secure, accessible flows for end users.",
  },
  {
    name: "Woori Bank CIB",
    type: "Banking CIB",
    color: "var(--amber)",
    description: "Contributed to the corporate internet banking web application. Implemented UI components and workflows for business banking features. Worked with the team on state management, form validation, and consistent design across the platform.",
  },
  {
    name: "MFI Light",
    type: "Microfinance",
    color: "var(--red)",
    description: "Developed and maintained the frontend for the microfinance institution's internal and client-facing application. Delivered modules for loan management, reporting, and user dashboards with a focus on performance and usability.",
  },
  {
    name: "Chok Chey CO App",
    type: "Mobile / Web App",
    color: "var(--ochre)",
    description: "Built UI and key flows for the Chok Chey CO application. Implemented responsive layouts and integrated with APIs for data display and user actions. Ensured a smooth experience across devices.",
  },
  {
    name: "CCB CIFTP",
    type: "Banking",
    color: "var(--teal)",
    description: "Frontend work on the CCB CIFTP banking system. Developed interfaces for financial transactions and reporting. Collaborated with backend and QA to deliver stable, maintainable code.",
  },
  {
    name: "Wing Bank CIB",
    type: "Banking CIB",
    color: "var(--red)",
    description: "Worked on the Wing Bank internet banking platform. Implemented new features and improved existing screens for transfers, payments, and account overview. Kept the codebase aligned with design specs and accessibility standards.",
  },
];

export const Works = () => {
  return (
    <section id="works" className="py-12 lg:py-16">
      <h2 className="text-2xl lg:text-3xl font-bold text-(--text-dark) mb-8">
        Works
      </h2>
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.name} className="flex gap-4">
            <div
              className="w-3 h-3 rounded-full shrink-0 mt-2"
              style={{ backgroundColor: project.color }}
            />
            <div>
              <div className="flex flex-wrap items-baseline gap-2 text-sm text-(--text-dark)/80 mb-1">
                <span>{project.type}</span>
              </div>
              <h3 className="font-bold text-(--text-dark) text-lg mb-2">
                {project.name}
              </h3>
              <p className="text-sm text-(--text-dark)/85 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
