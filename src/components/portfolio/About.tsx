import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Server, Brain, Cloud, Workflow, Target, TrendingUp, Shield, Users, Container, Activity } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate('.about-element', {
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 1000,
              delay: stagger(100),
              easing: 'easeOutExpo',
            });

            animate('.capability-card', {
              translateY: [80, 0],
              opacity: [0, 1],
              duration: 800,
              delay: stagger(100, { start: 400 }),
              easing: 'easeOutBack',
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const capabilities = [
    {
      icon: Container,
      title: 'DevOps & CI/CD',
      description: 'Docker, Kubernetes, Jenkins, GitHub Actions, Azure DevOps, Ansible for automated deployments',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Activity,
      title: 'Observability Stack',
      description: 'OpenTelemetry, Prometheus, Grafana Loki, Tempo, Distributed Tracing implementation',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: Cloud,
      title: 'Cloud Infrastructure',
      description: 'AWS Cloud, Nginx reverse proxy, SSL automation, multi-tenant architecture design',
      color: 'text-azure',
      bgColor: 'bg-azure/10',
    },
    {
      icon: Brain,
      title: 'AI Integration',
      description: 'PyTorch, TensorFlow, AI-driven solutions reducing response times by 35%',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  const valueProps = [
    {
      icon: Target,
      value: 'Solution-Oriented',
      description: 'Focus on measurable results and business impact',
    },
    {
      icon: TrendingUp,
      value: 'Data-Driven',
      description: 'Metrics-based optimization with 2.1x throughput improvements',
    },
    {
      icon: Shield,
      value: 'Security-First',
      description: 'JWT auth, API-key validation, data isolation patterns',
    },
    {
      icon: Users,
      value: 'Team Player',
      description: 'Cross-functional collaboration in agile environments',
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-dots" />
      <div className="orb w-[500px] h-[500px] bg-primary/30 -top-60 -left-60" />
      <div className="orb w-[400px] h-[400px] bg-secondary/20 bottom-0 right-0" />

      <div className="container-width relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="about-element opacity-0">
              <span className="tech-badge border-primary/30 text-primary bg-primary/5">
                About Me
              </span>
            </div>

            <h2 className="about-element opacity-0 text-4xl md:text-5xl font-display font-bold leading-tight">
              DevOps-First <span className="gradient-text">Engineering</span>
              <br />for Modern Systems
            </h2>

            <div className="about-element opacity-0 space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Computer Science student at <span className="text-foreground font-medium">Linnéuniversitetet</span> (2024-2027), 
                focusing on System Development, Agile methodologies, Algorithms, and Security.
              </p>
              <p>
                Currently working as <span className="text-primary font-medium">AI Research Intern at EmentraAI</span>, 
                where I integrate AI-driven solutions with DevOps practices, achieving{' '}
                <span className="text-accent font-medium">35% faster response times</span> and{' '}
                <span className="text-accent font-medium">2.1x throughput improvements</span>.
              </p>
              <p>
                As founding member and Communications Lead of the <span className="text-foreground font-medium">LNU AI Society</span>, 
                I grew our community to <span className="text-foreground font-medium">120+ members</span> and secured 4 industry partnerships.
              </p>
            </div>

            <div className="about-element opacity-0 grid grid-cols-2 gap-4">
              {valueProps.map(({ icon: Icon, value, description }) => (
                <div key={value} className="group">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-foreground">{value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {capabilities.map(({ icon: Icon, title, description, color, bgColor }) => (
              <div key={title} className="capability-card opacity-0 glass-card card-shine p-6 group cursor-default">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="capability-card opacity-0 glass-card p-6 border-gradient">
              <div className="relative">
                <span className="tech-badge border-secondary/30 text-secondary bg-secondary/5 mb-4">
                  Education
                </span>
                <h3 className="text-xl font-display font-semibold text-foreground">Linnéuniversitetet</h3>
                <p className="text-primary font-medium">BSc Computer Science – Software Engineering</p>
                <p className="text-sm text-muted-foreground mt-1">Aug 2024 - July 2027 • Växjö, Sweden</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Focus: System Development, Agile Methods, Algorithms, Security
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;