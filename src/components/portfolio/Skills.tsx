import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { 
  Code2, Server, Cloud, Brain, Activity, Container
} from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: Code2,
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Vite', 'React-Leaflet'],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Backend',
    icon: Server,
    skills: ['Python', 'Flask', 'Java', 'C#', '.NET', 'REST APIs', 'PostgreSQL'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'DevOps',
    icon: Container,
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Jenkins', 'Nginx', 'Ansible'],
    color: 'from-orange-500 to-amber-500',
  },
  {
    title: 'AI & ML',
    icon: Brain,
    skills: ['scikit-learn', 'XGBoost', 'PyTorch', 'TensorFlow', 'pandas', 'numpy'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Observability',
    icon: Activity,
    skills: ['OpenTelemetry', 'Prometheus', 'Grafana Loki', 'Grafana Tempo', 'Distributed Tracing'],
    color: 'from-red-500 to-rose-500',
  },
  {
    title: 'Cloud & Linux',
    icon: Cloud,
    skills: ['AWS', 'Google Cloud', 'Linux', 'Azure DevOps'],
    color: 'from-indigo-500 to-violet-500',
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCategories, setVisibleCategories] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCategories(prev => new Set([...prev, index]));
            
            animate(entry.target, {
              translateY: [40, 0],
              opacity: [0, 1],
              duration: 800,
              ease: 'outExpo',
            });

            animate(entry.target.querySelectorAll('.skill-badge'), {
              scale: [0, 1],
              opacity: [0, 1],
              duration: 400,
              delay: stagger(50, { start: 300 }),
              ease: 'outBack',
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    const cards = sectionRef.current?.querySelectorAll('.skill-card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="section-padding relative"
    >
      <div className="container-width">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="gradient-text">Skills & Tech Stack</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Technologies and tools I use to bring ideas to life, from frontend interfaces 
          to scalable cloud infrastructure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              data-index={index}
              className="skill-card group relative p-6 rounded-xl bg-card border border-border opacity-0 hover:border-primary/30 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-badge px-3 py-1.5 text-sm rounded-full bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${category.color} opacity-5`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
