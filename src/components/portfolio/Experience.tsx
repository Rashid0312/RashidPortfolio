import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Users, Award, TrendingUp, Calendar, Sparkles, ExternalLink } from 'lucide-react';

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate('.exp-card', {
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 800,
              delay: stagger(150),
              ease: 'outExpo',
            });

            // Animate stat numbers
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach((el) => {
              const target = parseInt(el.getAttribute('data-value') || '0');
              let current = 0;
              const duration = 2000;
              const start = performance.now();
              
              const animateNumber = (now: number) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                current = Math.round(target * eased);
                el.textContent = current.toString();
                if (progress < 1) requestAnimationFrame(animateNumber);
              };
              
              requestAnimationFrame(animateNumber);
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 120, label: 'Members', suffix: '+', icon: Users },
    { value: 4, label: 'Industry Partners', suffix: '', icon: TrendingUp },
    { value: 280, label: 'Engagement Growth', suffix: '%', icon: TrendingUp },
    { value: 50, label: 'Hackathon Participants', suffix: '+', icon: Calendar },
  ];

  const certifications = [
    { 
      name: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      color: 'from-orange-500 to-amber-500',
    },
    { 
      name: 'Google IT Automation',
      issuer: 'Google',
      color: 'from-blue-500 to-green-500',
    },
    { 
      name: 'Meta Front-End Developer',
      issuer: 'Meta',
      color: 'from-blue-600 to-indigo-600',
    },
  ];

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      
      <div className="container-width relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Achievements & Impact</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Experience & <span className="gradient-text">Achievements</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Leadership, community building, and continuous learning
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LNU AI Society Card */}
          <div className="exp-card opacity-0 relative p-8 rounded-2xl glass overflow-hidden group">
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
            
            <div className="flex items-start gap-5 mb-8">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg flex-shrink-0">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-1">
                  LNU AI Society
                </h3>
                <p className="text-muted-foreground">
                  Communications Lead & Founding Member
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map(({ value, label, suffix, icon: Icon }) => (
                <div 
                  key={label} 
                  className="relative p-4 rounded-xl bg-muted/30 group/stat hover:bg-muted/50 transition-colors"
                >
                  <Icon className="absolute top-3 right-3 w-4 h-4 text-muted-foreground/30" />
                  <p className="text-3xl font-display font-bold text-primary mb-1">
                    <span className="stat-number" data-value={value}>0</span>
                    {suffix}
                  </p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground">
                <TrendingUp className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Grew community engagement by 280% through strategic initiatives</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Co-organized Neurowave Hackathon with 50+ participants</span>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div className="exp-card opacity-0 space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-display font-bold text-foreground">Certifications</h3>
            </div>

            {certifications.map((cert, index) => (
              <div
                key={cert.name}
                className="group relative p-5 rounded-xl glass hover:glow-border transition-all duration-300 overflow-hidden"
              >
                {/* Gradient line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${cert.color}`} />
                
                <div className="pl-4">
                  <p className="font-display font-semibold text-foreground group-hover:gradient-text transition-all duration-300">
                    {cert.name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {cert.issuer}
                  </p>
                </div>
                
                <ExternalLink className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}

            {/* Additional achievements placeholder */}
            <div className="mt-8 p-6 rounded-xl border border-dashed border-border/50 text-center">
              <p className="text-muted-foreground text-sm">
                More certifications coming soon...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;