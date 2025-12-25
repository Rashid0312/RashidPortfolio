import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { ExternalLink, Github, Flame, Heart, Cloud, ArrowUpRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  category: string;
  features: string[];
  tech: string[];
  github?: string;
  live?: string;
  gradient: string;
  accentColor: string;
}

const projects: Project[] = [
  {
    title: 'ForestFire',
    subtitle: 'Interactive Wildfire Risk Map',
    description: 'ML-powered global wildfire risk visualization platform with real-time predictions and weather integration.',
    icon: Flame,
    category: 'AI / ML',
    features: [
      'Location-based risk analysis with search',
      'Country-level color-coded visualization',
      'Real-time weather integration',
      'Point-click predictions with fire indices',
    ],
    tech: ['React', 'TypeScript', 'Python', 'Flask', 'scikit-learn', 'XGBoost', 'Leaflet', 'Docker'],
    github: 'https://github.com/Rashid0312/ForestFire',
    gradient: 'from-orange-500 via-red-500 to-rose-600',
    accentColor: 'orange',
  },
  {
    title: 'Rosetta',
    subtitle: 'Health & Wellbeing Platform',
    description: 'Neurawave 2025 Hackathon project for migraine prediction using ML and synthetic health data.',
    icon: Heart,
    category: 'Healthcare',
    features: [
      'Migraine prediction & insights',
      'MBRAIN21 research dataset integration',
      'Weather + health data correlation',
      'Synthetic data processing (100k+ records)',
    ],
    tech: ['TypeScript', 'Python', 'Flask', 'Jupyter', 'Docker'],
    github: 'https://github.com/Rashid0312/Rosetta',
    gradient: 'from-pink-500 via-purple-500 to-violet-600',
    accentColor: 'pink',
  },
  {
    title: 'SkyView',
    subtitle: 'Multi-Tenant Observability Platform',
    description: 'SaaS platform for logs, metrics, and traces with complete data isolation per tenant.',
    icon: Cloud,
    category: 'DevOps',
    features: [
      'Multi-tenant architecture with data isolation',
      'JWT auth + API key validation',
      'OpenTelemetry pipeline integration',
      'Grafana Loki, Tempo, Prometheus',
    ],
    tech: ['React', 'Flask', 'PostgreSQL', 'Docker', 'Nginx', 'OpenTelemetry'],
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    accentColor: 'cyan',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(cardsRef.current?.children, {
              translateY: [100, 0],
              opacity: [0, 1],
              duration: 1000,
              delay: stagger(150),
              ease: 'outExpo',
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      
      <div className="container-width relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Built, not imagined</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-world applications showcasing expertise in full-stack development, 
            machine learning, and cloud infrastructure.
          </p>
        </div>

        {/* Project cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative rounded-2xl glass overflow-hidden card-hover opacity-0"
    >
      {/* Spotlight effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary) / 0.1), transparent 40%)`,
        }}
      />

      {/* Project header with gradient */}
      <div className={`relative h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
        <project.icon className="w-20 h-20 text-white/80 group-hover:scale-110 transition-transform duration-500" />
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-0 text-xs font-medium">
            {project.category}
          </Badge>
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>

      <div className="relative p-6 pt-4">
        {/* Title */}
        <h3 className="text-2xl font-display font-bold text-foreground mb-1 group-hover:gradient-text transition-all duration-300">
          {project.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3">
          {project.subtitle}
        </p>
        
        <p className="text-muted-foreground text-sm mb-5 line-clamp-2">
          {project.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {project.features.slice(0, 3).map((feature, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">▹</span>
              <span className="line-clamp-1">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.slice(0, 5).map((tech) => (
            <Badge 
              key={tech} 
              variant="secondary"
              className="text-xs bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {tech}
            </Badge>
          ))}
          {project.tech.length > 5 && (
            <Badge variant="secondary" className="text-xs bg-muted/50 text-muted-foreground">
              +{project.tech.length - 5}
            </Badge>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-border/50">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group/link"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group/link"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;