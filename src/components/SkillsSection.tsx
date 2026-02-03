import { useEffect, useRef, useState } from 'react';

const skillCategories = [
  {
    title: 'Languages',
    icon: '{ }',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'JavaScript', level: 75 },
      { name: 'SQL', level: 80 },
      { name: 'C', level: 65 },
    ],
  },
  {
    title: 'Web Technologies',
    icon: '</>',
    skills: [
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'React', level: 70 },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: '⚙️',
    skills: [
      { name: 'GitHub', level: 80 },
      { name: 'Firebase', level: 70 },
      { name: 'Tkinter', level: 75 },
      { name: 'Google Cloud', level: 60 },
    ],
  },
  {
    title: 'Soft Skills',
    icon: '🧠',
    skills: [
      { name: 'Communication', level: 90 },
      { name: 'Team Collaboration', level: 95 },
      { name: 'Problem Solving', level: 85 },
      { name: 'Adaptability', level: 90 },
    ],
  },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Trigger skill bar animations
            const skillName = entry.target.getAttribute('data-skill');
            if (skillName) {
              setTimeout(() => {
                setAnimatedSkills((prev) => new Set([...prev, skillName]));
              }, 200);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal, [data-skill]');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <p className="font-mono text-primary text-sm tracking-widest mb-2">{'// MY EXPERTISE'}</p>
          <h2 className="section-title">Skills & Technologies</h2>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              className="reveal glass-card p-6 rounded-2xl group hover:border-primary/30 transition-all duration-500"
              style={{ transitionDelay: `${catIndex * 100}ms` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center font-mono text-primary text-lg">
                  {category.icon}
                </span>
                <h3 className="font-orbitron text-xl font-bold text-foreground">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    data-skill={`${category.title}-${skill.name}`}
                    className="reveal"
                    style={{ transitionDelay: `${(catIndex * 100) + (skillIndex * 50)}ms` }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-rajdhani font-semibold text-foreground">
                        {skill.name}
                      </span>
                      <span className="font-mono text-primary text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-bar-fill transition-all duration-1000 ease-out"
                        style={{
                          width: animatedSkills.has(`${category.title}-${skill.name}`)
                            ? `${skill.level}%`
                            : '0%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <div className="mt-12 reveal">
          <p className="text-center font-rajdhani text-muted-foreground mb-6">
            Also familiar with:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['REST APIs', 'Git', 'VS Code', 'Jupyter', 'Pandas', 'NumPy', 'Matplotlib', 'Linux Basics'].map(
              (skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 glass-card rounded-full font-mono text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
