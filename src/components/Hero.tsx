import profile from '../assets/images/profile.jpeg';

export const Hero = () => {
  return (
    <section
      className="relative py-16 lg:py-24"
      style={{ backgroundColor: 'var(--hero-bg)' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto px-4">
        {/* Left: circular profile picture */}
        <div className="lg:col-span-4 flex justify-center lg:justify-start order-1">
          <div
            className="w-52 h-52 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full overflow-hidden shrink-0 bg-(--cream)"
            style={{
              border: '1px solid rgba(139, 120, 115, 0.18)',
              boxShadow: '0 0 0 1px rgba(139, 120, 115, 0.08), 0 4px 24px rgba(0, 0, 0, 0.06)',
            }}
          >
            <img
              alt="Chhorvorn"
              src={profile}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: name, role, paragraph */}
        <div className="lg:col-span-8 order-2 space-y-4 lg:space-y-5 text-center lg:text-left">
          <p
            className="text-sm lg:text-base font-medium tracking-[0.2em] uppercase"
            style={{ color: 'var(--hero-muted)' }}
          >
            Moeun Chhorvorn
          </p>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight uppercase"
            style={{ color: 'var(--hero-title)', fontFamily: 'var(--font-serif)' }}
          >
            Frontend
            <br />
            Developer
          </h1>
          <p
            className="text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
            style={{ color: 'var(--hero-muted)' }}
          >
            I build clean, fast web applications with React, Vue, and TypeScript. I turn ideas into working code and keep frontends maintainable and easy to ship. I also have backend knowledge from study and side projects, though I haven't worked on a real backend project in production yet.
          </p>
          <a
            href="mailto:moeunchhorvorn@gmail.com"
            className="inline-block text-sm font-medium tracking-wide mt-2 hover:underline focus:outline-none focus:ring-2 focus:ring-(--accent)/30 rounded"
            style={{ color: 'var(--hero-muted)' }}
          >
            moeunchhorvorn@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};
