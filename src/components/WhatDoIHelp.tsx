import { motion, type ValueAnimationTransition, type ViewportOptions } from "motion/react";

const services = [
  { title: "Web Development", projects: "React, TypeScript, HTML/CSS", icon: "🖥️", color: "var(--accent)" },
  { title: "Single Page Apps", projects: "SPAs, state & APIs", icon: "📱", color: "var(--amber)" },
  { title: "Responsive UI", projects: "Clean, maintainable code", icon: "◇", color: "var(--red)" },
];

const variants = {
  offscreen: { opacity: 0, y: 100 },
  onscreen: { opacity: 1, y: 0 },
};

const transition: ValueAnimationTransition<any> = { duration: 0.5, ease: "easeOut" };
const viewport: ViewportOptions = { once: true, amount: "some" };

export const WhatDoIHelp = () => {
  return (
    <section id="services" className="pt-24">
      <motion.h2 
        className="text-3xl lg:text-4xl font-bold text-(--text-dark) mb-6"
        initial="offscreen"
        whileInView="onscreen"
        viewport={viewport}
        variants={variants}
        transition={transition}
      >
        What do I help?
      </motion.h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="space-y-4 text-(--text-dark)/90 max-w-xl">
          <motion.p initial="offscreen" whileInView="onscreen" viewport={viewport} variants={variants} transition={transition}>
            I'm a Frontend Developer with 3 years of experience. I build websites and web applications that are fast, accessible, and easy to maintain. I focus on turning designs and requirements into solid, production-ready code.
          </motion.p>
          <motion.p initial="offscreen" whileInView="onscreen" viewport={viewport} variants={variants} transition={transition}>
            Whether it's a new site, a single-page app, or improving an existing frontend, I work with Vue, React, TypeScript, and modern tooling to deliver clean interfaces and smooth user experiences. I integrate with APIs, handle state and performance, and keep codebases readable so teams can ship and iterate with confidence.
          </motion.p>
        </div>
        <div className="space-y-4">
          {services.map((s) => (
            <motion.div
              key={s.title}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 shadow-sm border border-(--cream) hover:shadow-md transition-shadow"
              initial="offscreen"
              whileInView="onscreen"
              viewport={viewport}
              variants={variants}
              transition={{ ...transition, delay: 0.3 }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ backgroundColor: `${s.color}22` }}
              >
                {s.icon}
              </div>
              <div>
                <h3 className="font-bold text-(--text-dark)">{s.title}</h3>
                <p className="text-sm text-(--text-dark)/70">{s.projects}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-10">
        <motion.div initial="offscreen" whileInView="onscreen" viewport={viewport} variants={variants} transition={transition}>
          <div className="text-4xl lg:text-5xl font-bold text-(--text-dark)">3+</div>
          <p className="text-sm text-(--text-dark)/80">Years Experience</p>
        </motion.div>
        <motion.div initial="offscreen" whileInView="onscreen" viewport={viewport} variants={variants} transition={transition}>
          <div className="text-4xl lg:text-5xl font-bold text-(--text-dark)">Frontend</div>
          <p className="text-sm text-(--text-dark)/80">Developer</p>
        </motion.div>
      </div>
    </section>
  );
};
