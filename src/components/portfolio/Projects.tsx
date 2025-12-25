import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { ExternalLink, Github, Flame, Heart, Cloud, ArrowUpRight } from 'lucide-react';
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
  color: string;
  accent: string;
}

const projects: Project[] = [
  {
    title: 'ForestFire',
    subtitle: 'ML-Powered Wildfire Risk Map',
    description: 'Global wildfire risk visualization platform with real-time predictions, location search, and weather integration.',
    icon: Flame,
    category: 'AI / ML',
    features: [
      'Location-based risk analysis',
      'Country-level visualization',
      'Real-time weather data',
      'Fire indices predictions',
    ],
    tech: ['React', 'TypeScript', 'Python', 'Flask', 'scikit-learn', 'XGBoost', 'Leaflet'],
    github: 'https://github.com/Rashid0312/ForestFire',
    color: 'from-orange-500 to-red-600',
    accent: 'bg-orange-500',
  },
  {
    title: 'Rosetta',
    subtitle: 'Health & Wellbeing Platform',
    description: 'Neurawave 2025 Hackathon project for migraine prediction using ML and synthetic health data processing.',
    icon: Heart,
    category: 'Healthcare',
    features: [
      'Migraine prediction engine',
      'MBRAIN21 dataset integration',
      'Weather correlation analysis',
      '100k+ records processed',
    ],
    tech: ['TypeScript', 'Python', 'Flask', 'Jupyter', 'Docker'],
    github: 'https://github.com/Rashid0312/Rosetta',
    color: 'from-pink-500 to-purple-600',
    accent: 'bg-pink-500',
  },
  {
    title: 'SkyView',
    subtitle: 'Observability Platform',
    description: 'Multi-tenant SaaS platform for logs, metrics, and traces with complete data isolation per tenant.',
    icon: Cloud,
    category: 'DevOps',
    features: [
      'Multi-tenant architecture',
      'JWT + API key auth',
      'OpenTelemetry pipeline',
      'Grafana integration',
    ],
    tech: ['React', 'Flask', 'PostgreSQL', 'Docker', 'Nginx', 'OpenTelemetry'],
    color: 'from-blue-500 to-cyan-500',
    accent: 'bg-blue-500',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate('.projects-title', {
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 1000,
              easing: 'easeOutExpo',
            });

            animate('.project-card', {
              translateY: [100, 0],
              opacity: [0, 1],
              duration: 1000,
              delay: stagger(150, { start: 300 }),
              easing: 'easeOutExpo',
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
    <section id="projects" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="container-width relative">
        {/* Header */}
        <div className="projects-title opacity-0 text-center mb-20">
          <span className="font-mono text-sm text-primary uppercase tracking-widest">Selected work</span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display mt-4">
            Featured <span className="italic text-primary">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Real applications built to solve real problems — from ML predictions to observability platforms
          </p>
        </div>

        {/* Projects grid */}
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
  const isEven = index % 2 === 0;

  return (
    <div className={`project-card opacity-0 group relative rounded-3xl border-2 border-border bg-card overflow-hidden transition-all duration-500 hover:border-primary/50`}>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
        {/* Content */}
        <div className={`p-8 md:p-12 flex flex-col justify-center ${!isEven ? 'lg:order-2' : ''}`}>
          {/* Category badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className={`sticker ${project.accent} text-background text-xs`}>
              {project.category}
            </span>
            <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
          </div>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-display mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-lg text-muted-foreground mb-4">{project.subtitle}</p>

          {/* Description */}
          <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

          {/* Features */}
          <ul className="space-y-2 mb-8">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className={`w-1.5 h-1.5 rounded-full ${project.accent}`} />
                {feature}
              </li>
            ))}
          </ul>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="rounded-full px-3 py-1 text-xs font-mono bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium underline-animation hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                View Code
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium underline-animation hover:text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Visual */}
        <div className={`relative h-64 lg:h-auto bg-gradient-to-br ${project.color} flex items-center justify-center ${!isEven ? 'lg:order-1' : ''}`}>
          <div className="absolute inset-0 bg-noise opacity-10" />
          <project.icon className="w-32 h-32 text-white/80 group-hover:scale-110 transition-transform duration-500" />

          {/* Decorative elements */}
          <div className="absolute top-8 left-8 w-16 h-16 border-2 border-white/20 rounded-full" />
          <div className="absolute bottom-8 right-8 w-24 h-24 border-2 border-white/10" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }} />
        </div>
      </div>
    </div>
  );
};

export default Projects;
