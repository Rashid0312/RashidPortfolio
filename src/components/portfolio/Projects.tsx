import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { ExternalLink, Github, ArrowUpRight, Cloud, Heart, Flame, TrendingUp, Zap, Database, Server, Container, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  businessImpact: string[];
  techStack: string[];
  devOpsHighlights: string[];
  metrics: { label: string; value: string }[];
  icon: React.ElementType;
  category: string;
  github?: string;
  gradient: string;
  accentColor: string;
}

const projects: Project[] = [
  {
    title: 'SkyView',
    subtitle: 'Multi-Tenant Observability Platform',
    description: 'Production-ready SaaS platform for logs, metrics, and traces with complete data isolation. Built enterprise-grade infrastructure with automated SSL and reverse proxy configuration.',
    businessImpact: [
      'Multi-tenant architecture with complete data isolation',
      'JWT + API-key authentication system',
      'Production-ready infrastructure deployment',
    ],
    devOpsHighlights: [
      'Docker containerization with compose orchestration',
      'Nginx reverse proxy with automated SSL setup',
      'OpenTelemetry pipeline integration',
      'Grafana Loki, Tempo & Prometheus stack',
    ],
    techStack: ['React', 'Flask', 'PostgreSQL', 'Docker', 'Nginx', 'OpenTelemetry', 'Grafana', 'Prometheus', 'Loki', 'Tempo'],
    metrics: [
      { label: 'Data Isolation', value: '100%' },
      { label: 'Auth Methods', value: '2' },
      { label: 'Observability', value: 'Full' },
    ],
    icon: Activity,
    category: 'DevOps / Observability',
    github: 'https://github.com/Rashid0312',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    accentColor: 'text-cyan-400',
  },
  {
    title: 'Rosetta',
    subtitle: 'Healthcare Platform for Developers',
    description: 'Full-stack platform serving 45+ developers with React/TypeScript frontend. Implemented comprehensive DevOps workflows and CI/CD pipelines in hybrid work environment.',
    businessImpact: [
      'Serving 45+ developers actively',
      'Cross-functional agile team collaboration',
      'AI-powered features integration',
    ],
    devOpsHighlights: [
      'Jenkins/GitHub Actions CI/CD pipelines',
      'Automated testing and deployment',
      'Docker containerized environments',
      'Hybrid team DevOps workflows',
    ],
    techStack: ['React', 'TypeScript', 'Python', 'Flask', 'Docker', 'Jenkins', 'GitHub Actions'],
    metrics: [
      { label: 'Active Devs', value: '45+' },
      { label: 'CI/CD', value: 'Full' },
      { label: 'Team', value: 'Agile' },
    ],
    icon: Heart,
    category: 'DevOps / Healthcare',
    github: 'https://github.com/Rashid0312/Rosetta',
    gradient: 'from-pink-500/20 via-purple-500/10 to-transparent',
    accentColor: 'text-pink-400',
  },
  {
    title: 'FireForest',
    subtitle: 'Real-Time Data Processing Platform',
    description: 'Cloud-based web application processing 50,000+ data points with sub-2-second response times. User-focused interface with robust backend infrastructure.',
    businessImpact: [
      'Processing 50,000+ data points',
      'Sub-2-second response time achieved',
      'Real-time data streaming',
    ],
    devOpsHighlights: [
      'Docker containerization for production',
      'REST API with high throughput',
      'Performance optimization pipeline',
      'Production environment automation',
    ],
    techStack: ['React', 'Flask', 'Python', 'Docker', 'REST API', 'Real-time Processing'],
    metrics: [
      { label: 'Data Points', value: '50K+' },
      { label: 'Response', value: '<2s' },
      { label: 'Uptime', value: '99.9%' },
    ],
    icon: Flame,
    category: 'DevOps / Data',
    github: 'https://github.com/Rashid0312/ForestFire',
    gradient: 'from-orange-500/20 via-red-500/10 to-transparent',
    accentColor: 'text-orange-400',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate('.projects-header', {
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 1000,
              easing: 'easeOutExpo',
            });

            animate('.project-card', {
              translateY: [100, 0],
              opacity: [0, 1],
              duration: 1000,
              delay: stagger(200, { start: 300 }),
              easing: 'easeOutExpo',
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-lines" />
      
      <div className="container-width relative">
        <div className="projects-header opacity-0 text-center mb-16">
          <span className="tech-badge border-primary/30 text-primary bg-primary/5 mb-4">
            Featured Projects
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4">
            DevOps-Driven <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Production applications showcasing infrastructure automation, CI/CD pipelines, 
            and observability implementations with measurable performance gains.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const isReversed = index % 2 === 1;

  return (
    <div className="project-card opacity-0">
      <div className="glass-card card-shine overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className={`lg:col-span-5 relative h-64 lg:h-auto bg-gradient-to-br ${project.gradient} flex items-center justify-center ${isReversed ? 'lg:order-2' : ''}`}>
            <div className="absolute inset-0 grid-dots opacity-30" />
            
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-current opacity-20" />
              <project.icon className={`w-24 h-24 ${project.accentColor} relative z-10`} />
            </div>

            <div className="absolute top-6 left-6">
              <span className="tech-badge border-foreground/20 text-foreground bg-background/50 backdrop-blur">
                {project.category}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
              {project.metrics.map(({ label, value }) => (
                <div key={label} className="text-center bg-background/50 backdrop-blur rounded-lg p-2">
                  <p className={`text-lg font-bold ${project.accentColor}`}>{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`lg:col-span-7 p-8 md:p-10 ${isReversed ? 'lg:order-1' : ''}`}>
            <div className="space-y-6">
              <div>
                <h3 className={`text-3xl font-display font-bold ${project.accentColor} mb-2`}>
                  {project.title}
                </h3>
                <p className="text-lg text-foreground font-medium">{project.subtitle}</p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              {/* DevOps Highlights - Featured */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <h4 className="text-sm font-mono uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                  <Container className="w-4 h-4" />
                  DevOps Implementation
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.devOpsHighlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-sm text-foreground">
                      <Server className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Business Impact
                </h4>
                <ul className="space-y-2">
                  {project.businessImpact.map((impact) => (
                    <li key={impact} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Zap className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      {impact}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="rounded-md px-2.5 py-0.5 text-xs font-mono bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {project.github && (
                  <Button variant="outline" size="sm" className="group" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                      <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;