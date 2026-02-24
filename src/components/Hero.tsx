import profile from '../assets/images/profile.jpeg';
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

export const Hero = () => {
  const [scrollYProgressValue, setScrollYProgressValue] = useState(0);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollYProgressValue(latest);
  });

  const progress = Math.min(1, scrollYProgressValue / 0.3);
  const opacity = Math.max(0, 1 - progress);
  const scale = 1 - progress * 0.15;
  const blur = progress * 12;

  return (
    <motion.section
      className="py-48 lg:py-60 sticky top-20"
      style={{
        backgroundColor: 'var(--hero-bg)',
        filter: `blur(${blur}px)`,
      }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ opacity, scale }}
      transition={{ ease: "easeOut" }}
    >
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto px-4"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Left: circular profile picture */}
        <div className="lg:col-span-4 flex justify-center lg:justify-start order-1">
          <motion.div
            className="w-52 h-52 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full overflow-hidden shrink-0 bg-(--cream)"
            style={{
              border: '1px solid rgba(139, 120, 115, 0.18)',
              boxShadow: '0 0 0 1px rgba(139, 120, 115, 0.08), 0 4px 24px rgba(0, 0, 0, 0.06)',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0 }}
          >
            <img
              alt="Chhorvorn"
              src={profile}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Right: name, role, paragraph */}
        <div className="lg:col-span-8 order-2 space-y-4 lg:space-y-5 text-center lg:text-left">
          <motion.p
            className="text-sm lg:text-base font-medium tracking-[0.2em] uppercase"
            style={{ color: 'var(--hero-muted)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            Moeun Chhorvorn
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight uppercase"
            style={{ color: 'var(--hero-title)', fontFamily: 'var(--font-serif)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          >
            Frontend
            <br />
            Developer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
            className="text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
            style={{ color: 'var(--hero-muted)' }}
          >
            I build clean, fast web applications with React, Vue, and TypeScript. I turn ideas into working code and keep frontends maintainable and easy to ship. I also have backend knowledge from study and side projects, though I haven't worked on a real backend project in production yet.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
            href="mailto:moeunchhorvorn@gmail.com"
            className="inline-block text-sm font-medium tracking-wide mt-2 hover:underline focus:outline-none focus:ring-2 focus:ring-(--accent)/30 rounded"
            style={{ color: 'var(--hero-muted)' }}
          >
            moeunchhorvorn@gmail.com
          </motion.a>
        </div>
      </motion.div>
    </motion.section>
  );
};
