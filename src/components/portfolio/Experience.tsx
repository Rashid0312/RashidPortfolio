import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Users, Award, TrendingUp, Calendar, ExternalLink, Briefcase, GraduationCap, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate('.exp-header', {
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

            // Animate stats
            setTimeout(() => {
              document.querySelectorAll('.stat-counter').forEach((el) => {
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
            }, 600);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const metrics = [
    { value: 120, label: 'Community Members', suffix: '+', color: 'text-primary' },
    { value: 280, label: 'Engagement Growth', suffix: '%', color: 'text-accent' },
    { value: 4, label: 'Industry Partners', suffix: '', color: 'text-secondary' },
    { value: 50, label: 'Hackathon Participants', suffix: '+', color: 'text-amber' },
  ];

  const certifications = [
    {
      name: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2024',
      color: 'bg-orange-500',
      skills: ['EC2', 'S3', 'Lambda', 'IAM'],
    },
    {
      name: 'Google IT Automation with Python',
      issuer: 'Google',
      date: '2024',
      color: 'bg-blue-500',
      skills: ['Python', 'Git', 'Automation', 'Troubleshooting'],
    },
    {
      name: 'Meta Front-End Developer',
      issuer: 'Meta',
      date: '2024',
      color: 'bg-indigo-500',
      skills: ['React', 'JavaScript', 'UX/UI', 'Testing'],
    },
  ];

  const achievements = [
    {
      icon: Trophy,
      title: 'Neurawave 2025 Hackathon',
      description: 'Built Rosetta - ML-powered health prediction platform',
      color: 'text-amber',
    },
    {
      icon: Users,
      title: 'LNU AI Society Founding Member',
      description: 'Grew community from 0 to 120+ members',
      color: 'text-primary',
    },
    {
      icon: Briefcase,
      title: 'Communications Lead',
      description: 'Strategic partnerships with 4 industry leaders',
      color: 'text-secondary',
    },
  ];

  return (
    <section id="experience" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-lines" />
      <div className="orb w-[400px] h-[400px] bg-accent/20 top-40 -right-40" />
      
      <div className="container-width relative">
        {/* Header */}
        <div className="exp-header opacity-0 text-center mb-16">
          <span className="tech-badge border-primary/30 text-primary bg-primary/5 mb-4">
            Experience & Achievements
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4">
            Leadership & <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Driving community growth and delivering results through technical and strategic initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main experience card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="exp-card opacity-0 glass-card p-8">
              {/* Header */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 glow-primary">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-foreground">LNU AI Society</h3>
                  <p className="text-primary font-medium">Communications Lead & Founding Member</p>
                  <p className="text-sm text-muted-foreground mt-1">2024 - Present • Linnéuniversitetet, Sweden</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {metrics.map(({ value, label, suffix, color }) => (
                  <div key={label} className="metric-card !p-4 text-center">
                    <p className={`text-3xl font-display font-bold ${color}`}>
                      <span className="stat-counter" data-value={value}>0</span>
                      {suffix}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{label}</p>
                  </div>
                ))}
              </div>

              {/* Key achievements */}
              <div className="space-y-4">
                <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Key Contributions
                </h4>
                <ul className="space-y-3">
                  {[
                    'Developed and executed community engagement strategy, resulting in 280% growth',
                    'Co-organized Neurowave Hackathon with 50+ participants from academia and industry',
                    'Established partnerships with 4 tech companies for workshops and mentorship',
                    'Led content creation and communication across multiple platforms',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Achievements grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievements.map(({ icon: Icon, title, description, color }) => (
                <div key={title} className="exp-card opacity-0 glass-card p-5 group hover:border-primary/50">
                  <Icon className={`w-8 h-8 ${color} mb-3`} />
                  <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Education */}
            <div className="exp-card opacity-0 glass-card p-6 border-gradient">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-6 h-6 text-secondary" />
                <span className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Education</span>
              </div>
              <h4 className="text-xl font-display font-bold text-foreground">Linnéuniversitetet</h4>
              <p className="text-primary font-medium">Computer Science</p>
              <p className="text-sm text-muted-foreground mt-1">2024 - 2027 • Växjö, Sweden</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['Algorithms', 'Systems', 'AI/ML', 'Databases'].map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-md text-xs bg-muted/50">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="exp-card opacity-0">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-accent" />
                <span className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Certifications</span>
              </div>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.name} className="glass-card p-4 group cursor-pointer hover:border-primary/50">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-full min-h-[50px] ${cert.color} rounded-full`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm leading-tight">
                            {cert.name}
                          </h5>
                          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer} • {cert.date}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {cert.skills.map((skill) => (
                            <span key={skill} className="px-2 py-0.5 rounded text-xs bg-muted/50 text-muted-foreground">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;