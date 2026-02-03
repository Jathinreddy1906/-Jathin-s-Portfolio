import { useState, useEffect, useRef, FormEvent } from 'react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    const elements = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const validateForm = () => {
    const newErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 3000);
      }, 1500);
    }
  };

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'jathinreddy85@gmail.com',
      href: 'mailto:jathinreddy85@gmail.com',
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '+91 9030931824',
      href: 'tel:+919030931824',
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'linkedin.com/in/jathin',
      href: 'https://linkedin.com',
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <p className="font-mono text-primary text-sm tracking-widest mb-2">{'// GET IN TOUCH'}</p>
          <h2 className="section-title">Contact Me</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="reveal-left space-y-6">
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="font-orbitron text-2xl font-bold text-foreground mb-6">
                Let's Connect
              </h3>
              <p className="font-rajdhani text-lg text-muted-foreground mb-8 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities 
                to be part of your vision. Feel free to reach out!
              </p>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    target={info.label === 'LinkedIn' ? '_blank' : undefined}
                    rel={info.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-all duration-300 group"
                  >
                    <span className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {info.icon}
                    </span>
                    <div>
                      <p className="font-rajdhani text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-rajdhani font-semibold text-foreground group-hover:text-primary transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="reveal-right">
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block font-rajdhani font-semibold text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg bg-muted/50 border ${
                    errors.name ? 'border-destructive' : 'border-border'
                  } focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 font-rajdhani text-foreground placeholder:text-muted-foreground transition-all`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive font-rajdhani">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block font-rajdhani font-semibold text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg bg-muted/50 border ${
                    errors.email ? 'border-destructive' : 'border-border'
                  } focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 font-rajdhani text-foreground placeholder:text-muted-foreground transition-all`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive font-rajdhani">{errors.email}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block font-rajdhani font-semibold text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg bg-muted/50 border ${
                    errors.message ? 'border-destructive' : 'border-border'
                  } focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 font-rajdhani text-foreground placeholder:text-muted-foreground transition-all resize-none`}
                  placeholder="Your message..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-destructive font-rajdhani">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-4 rounded-lg font-orbitron font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : 'btn-filled'
                } disabled:opacity-70`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : isSubmitted ? (
                  '✓ Message Sent!'
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
