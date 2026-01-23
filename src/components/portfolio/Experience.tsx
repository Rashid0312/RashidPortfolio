import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Users, Award, TrendingUp, Calendar, ExternalLink, Briefcase, GraduationCap, Trophy, Brain, Zap, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ObseraCloudLogo from '@/assets/projects/ObseraCloudLogo.png';

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

  const certifications = [
    {
      name: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2024',
      color: 'bg-orange-500',
      skills: ['EC2', 'S3', 'Lambda', 'IAM', 'CloudWatch'],
    },
    {
      name: 'Google IT Automation with Python',
      issuer: 'Google',
      date: '2024',
      color: 'bg-blue-500',
      skills: ['Python', 'Linux', 'Bash', 'Git', 'Automation'],
    },
    {
      name: 'Meta Front-End Developer',
      issuer: 'Meta',
      date: '2024',
      color: 'bg-indigo-500',
      skills: ['React', 'JavaScript', 'UI/UX', 'Testing'],
    },
  ];

  return (
    <section id="experience" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-lines" />
      <div className="orb w-[400px] h-[400px] bg-accent/20 top-40 -right-40" />

      <div className="container-width relative">
        <div className="exp-header opacity-0 text-center mb-16">
          <span className="tech-badge border-primary/30 text-primary bg-primary/5 mb-4">
            Experience
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4">
            Work & <span className="gradient-text">Achievements</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main experience column */}
          <div className="lg:col-span-2 space-y-6">
            {/* ObseraCloud Startup */}
            <div className="exp-card opacity-0 glass-card p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center flex-shrink-0 overflow-hidden border border-cyan-500/20">
                  <img src={ObseraCloudLogo} alt="ObseraCloud Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-foreground">ObseraCloud</h3>
                  <p className="text-cyan-500 font-medium">Founder & Lead Engineer</p>
                  <p className="text-sm text-muted-foreground mt-1">Jan 2024 - Present</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { value: 99, label: 'Uptime', suffix: '%', color: 'text-green-500' },
                  { value: 350, label: 'Commits', suffix: '+', color: 'text-blue-500' },
                  { value: 45, label: 'Beta Users', suffix: '+', color: 'text-purple-500' },
                  { value: 2, label: 'Pilots', suffix: '', color: 'text-orange-500' },
                ].map(({ value, label, suffix, color }) => (
                  <div key={label} className="metric-card !p-3 text-center">
                    <p className={`text-2xl font-display font-bold ${color}`}>
                      <span className="stat-counter" data-value={value}>0</span>
                      {suffix}
                    </p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>

              <ul className="space-y-3">
                {[
                  'Architecting a multi-tenant observability platform processing 50k+ logs/min',
                  'Built custom OpenTelemetry ingestion pipeline reducing data lag by 40%',
                  'Secured 2 paid pilot programs with local tech startups for beta testing',
                  'Leading all technical decisions, product roadmap, and go-to-market strategy',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground text-sm">
                    <TrendingUp className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* LNU AI Society */}
            <div className="exp-card opacity-0 glass-card p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-foreground">LNU AI Society</h3>
                  <p className="text-secondary font-medium">Communications Lead & Founding Member</p>
                  <p className="text-sm text-muted-foreground mt-1">Jan 2024 - Present</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { value: 120, label: 'Members', suffix: '+', color: 'text-primary' },
                  { value: 4, label: 'Partners', suffix: '', color: 'text-accent' },
                  { value: 280, label: 'Growth', suffix: '%', color: 'text-secondary' },
                  { value: 50, label: 'Hackers', suffix: '+', color: 'text-amber' },
                ].map(({ value, label, suffix, color }) => (
                  <div key={label} className="metric-card !p-3 text-center">
                    <p className={`text-2xl font-display font-bold ${color}`}>
                      <span className="stat-counter" data-value={value}>0</span>
                      {suffix}
                    </p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>

              <ul className="space-y-3">
                {[
                  'Grew organization to 120+ members through structured approach and collaboration',
                  'Secured 4 industry partnerships through initiative and solution-oriented thinking',
                  'Led iterative development cycles increasing engagement by 280% with data-driven methods',
                  'Co-designed Neurowave AI hackathon for 50+ participants',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground text-sm">
                    <TrendingUp className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
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
              <p className="text-primary font-medium">BSc Computer Science - Software Engineering</p>
              <p className="text-sm text-muted-foreground mt-1">Aug 2024 - July 2027 • Växjö, Sweden</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['System Dev', 'Agile', 'Algorithms', 'Security'].map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-md text-xs bg-muted/50">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="exp-card opacity-0 glass-card p-6">
              <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">Languages</h4>
              <div className="space-y-3">
                {[
                  { lang: 'Swedish', level: 'Native/Fluent' },
                  { lang: 'English', level: 'Native/Fluent' },
                  { lang: 'Somali', level: 'Native' },
                  { lang: 'Spanish', level: 'Intermediate' },
                ].map(({ lang, level }) => (
                  <div key={lang} className="flex justify-between items-center">
                    <span className="text-foreground font-medium">{lang}</span>
                    <span className="text-sm text-muted-foreground">{level}</span>
                  </div>
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