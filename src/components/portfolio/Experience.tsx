import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Users, Award, Calendar, TrendingUp } from 'lucide-react';

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate timeline
            animate(timelineRef.current, {
              translateX: [-50, 0],
              opacity: [0, 1],
              duration: 800,
              ease: 'outExpo',
            });

            // Animate stats - use CSS animation instead
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach((el, i) => {
              const target = parseInt(el.getAttribute('data-value') || '0');
              let current = 0;
              const duration = 2000;
              const start = performance.now();
              const animate = (now: number) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                current = Math.round(target * progress);
                el.textContent = current.toString();
                if (progress < 1) requestAnimationFrame(animate);
              };
              setTimeout(() => requestAnimationFrame(animate), i * 200);
            });

            // Animate certifications
            animate(certsRef.current?.children, {
              translateY: [30, 0],
              opacity: [0, 1],
              duration: 600,
              delay: stagger(100, { start: 500 }),
              ease: 'outExpo',
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: '120', label: 'Members', suffix: '+' },
    { value: '4', label: 'Industry Partners', suffix: '' },
    { value: '280', label: 'Engagement Growth', suffix: '%' },
    { value: '50', label: 'Hackathon Participants', suffix: '+' },
  ];

  const certifications = [
    'AWS Cloud Practitioner',
    'Google IT Automation',
    'Meta Front-End Developer',
  ];

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="section-padding relative"
    >
      <div className="container-width">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="gradient-text">Experience & Achievements</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Leadership, community building, and continuous learning.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LNU AI Society Card */}
          <div 
            ref={timelineRef}
            className="relative p-8 rounded-2xl bg-card border border-border gradient-border opacity-0"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Users className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">LNU AI Society</h3>
                  <p className="text-muted-foreground">Communications Lead & Founding Member</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.map(({ value, label, suffix }) => (
                  <div key={label} className="text-center p-4 rounded-lg bg-muted/30">
                    <p className="text-2xl font-bold text-primary">
                      <span className="stat-number" data-value={value}>0</span>
                      {suffix}
                    </p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>

              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>Grew community engagement by 280% through strategic initiatives</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>Co-organized Neurowave Hackathon with 50+ participants</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Certifications */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-foreground">Certifications</h3>
            </div>

            <div ref={certsRef} className="space-y-4">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 opacity-0"
                >
                  <p className="font-medium text-foreground">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
