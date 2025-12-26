import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { ExternalLink, Github, ArrowUpRight, Flame, Heart, Cloud, TrendingUp, Users, Zap, Database } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  businessImpact: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  icon: React.ElementType;
  category: string;
  github?: string;
  live?: string;
  gradient: string;
  accentColor: string;
}

const projects: Project[] = [
  {
    title: 'ForestFire',
    subtitle: 'ML-Powered Risk Assessment Platform',
    description: 'Enterprise-grade wildfire risk prediction platform with real-time data processing, geospatial visualization, and automated alerting systems.',
    businessImpact: [
      'Reduced risk assessment time by 85%',
      'Enabled proactive resource allocation',
      'Integrated with 5 weather data sources',
    ],
    techStack: ['Python', 'Flask', 'scikit-learn', 'XGBoost', 'React', 'TypeScript', 'Leaflet', 'Docker'],
    metrics: [
      { label: 'Prediction Accuracy', value: '94%' },
      { label: 'Processing Time', value: '<2s' },
      { label: 'Coverage', value: 'Global' },
    ],
    icon: Flame,
    category: 'Machine Learning',
    github: 'https://github.com/Rashid0312/ForestFire',
    gradient: 'from-orange-500/20 via-red-500/10 to-transparent',
    accentColor: 'text-orange-400',
  },
  {
    title: 'Rosetta',
    subtitle: 'Healthcare ML Platform',
    description: 'Hackathon-winning health prediction system using ML models trained on synthetic MBRAIN21 data for migraine pattern recognition and weather correlation analysis.',
    businessImpact: [
      'Processed 100k+ health records',
      'Identified weather-health correlations',
      'Won Neurawave 2025 Hackathon',
    ],
    techStack: ['Python', 'Flask', 'Jupyter', 'pandas', 'Docker', 'TypeScript', 'React'],
    metrics: [
      { label: 'Records Processed', value: '100K+' },
      { label: 'Model Accuracy', value: '89%' },
      { label: 'Team Size', value: '4' },
    ],
    icon: Heart,
    category: 'Healthcare AI',
    github: 'https://github.com/Rashid0312/Rosetta',
    gradient: 'from-pink-500/20 via-purple-500/10 to-transparent',
    accentColor: 'text-pink-400',
  },
  {
    title: 'SkyView',
    subtitle: 'Multi-Tenant Observability Platform',
    description: 'Production-ready SaaS observability solution with complete data isolation, OpenTelemetry integration, and enterprise-grade authentication.',
    businessImpact: [
      'Multi-tenant architecture with isolation',
      'Sub-second query performance',
      'Zero-trust security model',
    ],
    techStack: ['React', 'Flask', 'PostgreSQL', 'Docker', 'Nginx', 'OpenTelemetry', 'Grafana', 'JWT'],
    metrics: [
      { label: 'Tenants Supported', value: 'N+1' },
      { label: 'Data Isolation', value: '100%' },
      { label: 'Uptime', value: '99.9%' },
    ],
    icon: Cloud,
    category: 'DevOps / SaaS',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    accentColor: 'text-cyan-400',
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
        {/* Header */}
        <div className="projects-header opacity-0 text-center mb-16">
          <span className="tech-badge border-primary/30 text-primary bg-primary/5 mb-4">
            Case Studies
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4">
            Delivering <span className="gradient-text">Business Value</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Production applications demonstrating end-to-end engineering capabilities — 
            from ML model development to scalable cloud deployment.
          </p>
        </div>

        {/* Projects */}
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
      <div className={`glass-card card-shine overflow-hidden`}>
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-0`}>
          {/* Visual section */}
          <div className={`lg:col-span-5 relative h-64 lg:h-auto bg-gradient-to-br ${project.gradient} flex items-center justify-center ${isReversed ? 'lg:order-2' : ''}`}>
            <div className="absolute inset-0 grid-dots opacity-30" />
            
            {/* Icon container */}
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-current opacity-20" />
              <project.icon className={`w-24 h-24 ${project.accentColor} relative z-10`} />
            </div>

            {/* Category badge */}
            <div className="absolute top-6 left-6">
              <span className={`tech-badge border-foreground/20 text-foreground bg-background/50 backdrop-blur`}>
                {project.category}
              </span>
            </div>

            {/* Metrics overlay */}
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
              {project.metrics.map(({ label, value }) => (
                <div key={label} className="text-center bg-background/50 backdrop-blur rounded-lg p-2">
                  <p className={`text-lg font-bold ${project.accentColor}`}>{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Content section */}
          <div className={`lg:col-span-7 p-8 md:p-10 ${isReversed ? 'lg:order-1' : ''}`}>
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h3 className={`text-3xl font-display font-bold ${project.accentColor} mb-2`}>
                  {project.title}
                </h3>
                <p className="text-lg text-foreground font-medium">{project.subtitle}</p>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              {/* Business Impact */}
              <div>
                <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Business Impact
                </h4>
                <ul className="space-y-2">
                  {project.businessImpact.map((impact) => (
                    <li key={impact} className="flex items-start gap-2 text-sm text-foreground">
                      <Zap className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      {impact}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Technology Stack
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

              {/* Links */}
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
                {project.live && (
                  <Button size="sm" className="group" asChild>
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
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