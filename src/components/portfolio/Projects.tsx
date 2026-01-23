import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { ExternalLink, Github, ArrowUpRight, Cloud, Heart, Flame, TrendingUp, Zap, Database, Server, Container, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ObseraCloudImg from '@/assets/projects/ObseraCloud.png';
import RossetaImg from '@/assets/projects/Rosseta.png';
import FireForestImg from '@/assets/projects/FireForest.png';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  businessImpact: string[];
  techStack: string[];
  keyFeatures: string[];
  metrics: { label: string; value: string }[];
  icon: React.ElementType;
  category: string;
  github?: string;
  website?: string;
  gradient: string;
  accentColor: string;
  image: string;
}

const projects: Project[] = [
  {
    title: 'ObseraCloud',
    subtitle: 'Startup in Progress – Observability SaaS Platform',
    description: 'Building a production-ready SaaS platform delivering unified observability for logs, metrics, and traces. Designed for startups and scale-ups who need enterprise-grade monitoring without enterprise complexity. Currently in active development with paying pilot customers on the horizon.',
    businessImpact: [
      'Startup venture targeting B2B observability market',
      'Multi-tenant architecture with complete data isolation per customer',
      'Go-to-market strategy focused on developer experience',
    ],
    keyFeatures: [
      'Docker containerization with compose orchestration',
      'Nginx reverse proxy with automated SSL setup',
      'OpenTelemetry pipeline integration',
      'Grafana Loki, Tempo & Prometheus stack',
    ],
    techStack: ['React', 'Flask', 'Go', 'PostgreSQL', 'Docker', 'Nginx', 'OpenTelemetry', 'Grafana', 'Prometheus', 'Loki', 'Tempo'],
    metrics: [
      { label: 'Status', value: 'Beta' },
      { label: 'Auth Methods', value: '2' },
      { label: 'Observability', value: 'Full' },
    ],
    icon: Activity,
    category: 'Startup / Observability',
    website: 'https://obseracloud.com/',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    accentColor: 'text-cyan-400',
    image: ObseraCloudImg,
  },
  {
    title: 'Rosetta',
    subtitle: 'Healthcare Platform for Developers',
    description: 'Full-stack platform serving 45+ developers with React/TypeScript frontend. Built with modern web architecture and automated workflows.',
    businessImpact: [
      'Serving 45+ developers actively',
      'Cross-functional agile team collaboration',
      'AI-powered features integration',
    ],
    keyFeatures: [
      'Modern React/TypeScript Frontend',
      'Automated testing and verification',
      'Docker containerized environments',
      'Agile development workflows',
    ],
    techStack: ['React', 'TypeScript', 'Python', 'Flask', 'Docker', 'Jenkins', 'GitHub Actions'],
    metrics: [
      { label: 'Active Devs', value: '45+' },
      { label: 'CI/CD', value: 'Full' },
      { label: 'Team', value: 'Agile' },
    ],
    icon: Heart,
    category: 'Full Stack / Healthcare',
    github: 'https://github.com/Rashid0312/Rosetta',
    gradient: 'from-pink-500/20 via-purple-500/10 to-transparent',
    accentColor: 'text-pink-400',
    image: RossetaImg,
  },
  {
    title: 'FireForest',
    subtitle: 'Real-Time Data Processing Platform',
    description: 'Real-time data processing platform handling 50,000+ data points. Built for high performance and low latency.',
    businessImpact: [
      'Processing 50,000+ data points',
      'Sub-2-second response time achieved',
      'Real-time data streaming',
    ],
    keyFeatures: [
      'High-throughput Data Processing',
      'REST API with optimized endpoints',
      'Real-time data visualization',
      'Containerized production environment',
    ],
    techStack: ['React', 'Flask', 'Python', 'Docker', 'REST API', 'Real-time Processing'],
    metrics: [
      { label: 'Data Points', value: '50K+' },
      { label: 'Response', value: '<2s' },
      { label: 'Uptime', value: '99.9%' },
    ],
    icon: Flame,
    category: 'Data Engineering / Real-Time',
    github: 'https://github.com/Rashid0312/ForestFire',
    gradient: 'from-orange-500/20 via-red-500/10 to-transparent',
    accentColor: 'text-orange-400',
    image: FireForestImg,
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
            Engineering <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Production applications showcasing full-stack development, cloud infrastructure,
            and data engineering with measurable performance gains.
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
          <div className={`lg:col-span-5 relative h-64 lg:h-auto bg-gradient-to-br ${project.gradient} flex items-center justify-center ${isReversed ? 'lg:order-2' : ''} overflow-hidden group`}>
            {/* Image Background */}
            <div className="absolute inset-0 z-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 mix-blend-overlay`} />
              <div className="absolute inset-0 bg-black/20" /> {/* Slight dim for text readability */}
            </div>

            <div className="absolute inset-0 grid-dots opacity-20 z-10" />

            <div className="relative z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
              <div className="absolute inset-0 blur-3xl bg-current opacity-20" />
              <project.icon className={`w-20 h-20 ${project.accentColor} drop-shadow-lg`} />
            </div>

            <div className="absolute top-6 left-6 z-20">
              <span className="tech-badge border-foreground/20 text-foreground bg-background/50 backdrop-blur">
                {project.category}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3 z-20">
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

              {/* Key Features - Featured */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <h4 className="text-sm font-mono uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                  <Container className="w-4 h-4" />
                  Key Technical Features
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.keyFeatures.map((highlight) => (
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
                {project.website && (
                  <Button variant="outline" size="sm" className="group" asChild>
                    <a href={project.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Link
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