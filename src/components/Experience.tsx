const experiences = [
  {
    company: "Royal University of Phnom Penh",
    period: "2020 - 2024",
    role: "Computer Science",
    color: "var(--ochre)",
    description: "Studied Computer Science. Built a strong foundation in programming, algorithms, and software development. Completed coursework and projects in web technologies and software engineering.",
  },
  {
    company: "Mobile C&C (Cambodia) Co.,Ltd.",
    period: "2023 (3 months)",
    role: "Frontend Developer Intern",
    color: "var(--teal)",
    description: "Completed a 3-month internship building and maintaining web applications. Implemented UI components with Vue, JavaScript. Supported the team with frontend tasks, integrated with APIs, and gained experience with real-world development workflows and code reviews.",
  },
  {
    company: "Mobile C&C (Cambodia) Co.,Ltd.",
    period: "2023 - 2026",
    role: "Frontend Developer",
    color: "var(--red)",
    description: "Build and maintain web applications for clients using Vue, TypeScript, and modern frontend tooling. Implement responsive UIs from specs, integrate APIs, and ensure performant, accessible code. Deliver production-ready features and support teams with clean, maintainable codebases.",
  }
];

export const Experience = () => {
  return (
    <section id="experience">
      <h2 className="text-2xl lg:text-3xl font-bold text-(--text-dark) mb-8">
        Experience
      </h2>
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.company} className="flex gap-4">
            <div
              className="w-3 h-3 rounded-full shrink-0 mt-2"
              style={{ backgroundColor: exp.color }}
            />
            <div>
              <div className="flex flex-wrap items-baseline gap-2 text-sm text-(--text-dark)/80 mb-1">
                <span>{exp.company}</span>
                <span>•</span>
                <span>{exp.period}</span>
              </div>
              <h3 className="font-bold text-(--text-dark) text-lg mb-2">{exp.role}</h3>
              <p className="text-sm text-(--text-dark)/85 leading-relaxed">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
