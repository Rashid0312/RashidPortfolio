import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { ExternalLink, Github, Flame, Heart, Cloud } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Project {
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  tech: string[];
  github?: string;
  live?: string;
  gradient: string;
}

const projects: Project[] = [
  {
    title: 'ForestFire',
    description: 'ML-powered global wildfire risk visualization platform with real-time predictions.',
    icon: Flame,
    features: [
      'Location-based risk analysis with search',
      'Country-level color-coded visualization',
      'Real-time weather integration',
      'Point-click predictions with fire indices',
    ],
    tech: ['React', 'TypeScript', 'Python', 'Flask', 'scikit-learn', 'XGBoost', 'Leaflet', 'Docker'],
    github: 'https://github.com/Rashid0312/ForestFire',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    title: 'Rosetta',
    description: 'Health & Wellbeing platform for migraine prediction using ML and synthetic health data.',
    icon: Heart,
    features: [
      'Migraine prediction & insights',
      'MBRAIN21 research dataset integration',
      'Weather + health data correlation',
      'Synthetic data processing (100k+ records)',
    ],
    tech: ['TypeScript', 'Python', 'Flask', 'Jupyter', 'Docker'],
    github: 'https://github.com/Rashid0312/Rosetta',
    gradient: 'from-pink-500 to-purple-600',
  },
  {
    title: 'SkyView',
    description: 'Multi-tenant SaaS observability platform for logs, metrics, and traces.',
    icon: Cloud,
    features: [
      'Multi-tenant architecture with data isolation',
      'JWT auth + API key validation',
      'OpenTelemetry pipeline integration',
      'Grafana Loki, Tempo, Prometheus',
    ],
    tech: ['React', 'Flask', 'PostgreSQL', 'Docker', 'Nginx', 'OpenTelemetry'],
    gradient: 'from-cyan-500 to-blue-600',
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
              translateY: [80, 0],
              opacity: [0, 1],
              duration: 1000,
              delay: stagger(200),
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
      className="section-padding relative"
    >
      <div className="container-width">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="gradient-text">Featured Projects</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Real-world applications showcasing my expertise in full-stack development, 
          machine learning, and cloud infrastructure.
        </p>

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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative rounded-2xl bg-card border border-border overflow-hidden card-hover opacity-0"
      style={{
        background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary) / 0.06), transparent 40%)`,
      }}
    >
      {/* Project Icon Header */}
      <div className={`h-32 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
        <project.icon className="w-16 h-16 text-white/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          {project.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {project.features.map((feature, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-1">▹</span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <Badge 
              key={tech} 
              variant="secondary"
              className="text-xs bg-muted/50 hover:bg-primary/20 transition-colors"
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
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
