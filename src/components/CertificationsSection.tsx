import { useEffect, useRef } from 'react';

const certifications = [
  {
    title: 'Python Certification',
    issuer: 'Certified Authority',
    icon: '🐍',
    color: 'primary',
  },
  {
    title: 'Data Science Certification',
    issuer: 'Professional Certification',
    icon: '📊',
    color: 'secondary',
  },
  {
    title: 'Introduction to Machine Learning',
    issuer: 'Swayam NPTEL',
    icon: '🤖',
    color: 'neon-pink',
  },
  {
    title: 'Generative AI Fundamentals',
    issuer: 'LinkedIn Learning',
    icon: '✨',
    color: 'primary',
  },
  {
    title: 'Google Cloud Computing',
    issuer: 'Google Cloud',
    icon: '☁️',
    color: 'secondary',
  },
  {
    title: 'Future Skills Prime',
    issuer: 'NASSCOM',
    icon: '🚀',
    color: 'neon-pink',
  },
];

const CertificationsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <p className="font-mono text-primary text-sm tracking-widest mb-2">{'// ACHIEVEMENTS'}</p>
          <h2 className="section-title">Certifications</h2>
        </div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="reveal group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-full glass-card p-6 rounded-2xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {cert.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-orbitron text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors leading-tight">
                      {cert.title}
                    </h3>
                    <p className="font-rajdhani text-sm text-muted-foreground">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                {/* Decorative line */}
                <div className="mt-4 h-px bg-gradient-to-r from-primary/30 via-secondary/30 to-transparent group-hover:from-primary/60 group-hover:via-secondary/60 transition-all duration-300" />

                {/* Verified badge */}
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-muted-foreground">Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
