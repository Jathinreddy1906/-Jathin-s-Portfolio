import { useState, useEffect } from 'react';

const titles = [
  'Full Stack Developer',
  'Python Enthusiast',
  'Data Science Explorer',
  'AI & ML Learner',
];

const HeroSection = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTitleIndex]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" 
             style={{ animation: 'scan-line 8s linear infinite' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Greeting */}
          <p className="font-mono text-primary text-sm md:text-base mb-4 tracking-widest animate-fade-in">
            {'// WELCOME TO MY DIGITAL SPACE'}
          </p>

          {/* Name */}
          <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            <span className="text-foreground">Changalreddygari</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
              Jathin
            </span>
          </h1>

          {/* Typing effect */}
          <div className="h-12 md:h-14 flex items-center justify-center mb-8">
            <span className="font-rajdhani text-xl md:text-2xl lg:text-3xl text-muted-foreground">
              {'> '}
              <span className="text-foreground">{displayText}</span>
              <span className="inline-block w-0.5 h-6 md:h-8 bg-primary ml-1 animate-typing-cursor" />
            </span>
          </div>

          {/* Tagline */}
          <p className="font-rajdhani text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.5s' }}>
            Building innovative solutions at the intersection of web development, 
            artificial intelligence, and data science.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-filled rounded-lg min-w-[180px]"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-neon rounded-lg min-w-[180px]"
            >
              Contact Me
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center p-2">
              <div className="w-1 h-2 bg-primary rounded-full animate-pulse-glow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
