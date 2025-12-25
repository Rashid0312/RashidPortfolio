import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Users, Award, TrendingUp, Calendar, ExternalLink } from 'lucide-react';

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate('.exp-title', {
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 1000,
              easing: 'easeOutExpo',
            });

            animate('.exp-card', {
              translateY: [80, 0],
              opacity: [0, 1],
              duration: 800,
              delay: stagger(150, { start: 300 }),
              easing: 'easeOutExpo',
            });

            // Animate stat numbers
            setTimeout(() => {
              document.querySelectorAll('.stat-number').forEach((el) => {
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
            }, 500);

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
    { value: 4, label: 'Partners', suffix: '', icon: TrendingUp },
    { value: 280, label: 'Growth', suffix: '%', icon: TrendingUp },
    { value: 50, label: 'Hackers', suffix: '+', icon: Calendar },
  ];

  const certifications = [
    { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', color: 'bg-orange-500' },
    { name: 'Google IT Automation', issuer: 'Google', color: 'bg-blue-500' },
    { name: 'Meta Front-End Developer', issuer: 'Meta', color: 'bg-indigo-500' },
  ];

  return (
    <section id="experience" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 right-10 w-40 h-40 border-2 border-primary/10 rounded-full float" />
      <div className="absolute bottom-32 left-20 w-24 h-24 bg-accent/10 blob" />

      <div className="container-width relative">
        {/* Header */}
        <div className="exp-title opacity-0 text-center mb-20">
          <span className="font-mono text-sm text-primary uppercase tracking-widest">Experience</span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display mt-4">
            Building <span className="italic text-primary">Community</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LNU AI Society */}
          <div className="exp-card opacity-0 bento-card p-8 md:p-10">
            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-display">LNU AI Society</h3>
                <p className="text-muted-foreground">Communications Lead & Founder</p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map(({ value, label, suffix, icon: Icon }) => (
                <div key={label} className="p-4 rounded-xl bg-muted/50 relative overflow-hidden group hover:bg-muted transition-colors">
                  <Icon className="absolute top-3 right-3 w-4 h-4 text-muted-foreground/30" />
                  <p className="text-3xl font-display text-primary">
                    <span className="stat-number" data-value={value}>0</span>
                    {suffix}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <p className="text-muted-foreground">Grew community engagement by 280% through strategic initiatives</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <p className="text-muted-foreground">Co-organized Neurowave Hackathon with 50+ participants</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <p className="text-muted-foreground">Secured 4 industry partnerships for workshops and events</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-6">
            <div className="exp-card opacity-0 flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-display">Certifications</h3>
            </div>

            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="exp-card opacity-0 bento-card p-6 group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-full min-h-[60px] ${cert.color} rounded-full`} />
                  <div className="flex-1">
                    <h4 className="text-lg font-display group-hover:text-primary transition-colors">
                      {cert.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}

            {/* Education card */}
            <div className="exp-card opacity-0 bento-card p-6 bg-gradient-to-br from-secondary/10 to-transparent">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Education</span>
              <h4 className="text-xl font-display mt-2">Linnéuniversitetet</h4>
              <p className="text-muted-foreground">Computer Science • 2024 - 2027</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
