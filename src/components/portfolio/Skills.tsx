import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { Server, Brain, Cloud, Code, Database, Shield, GitBranch, Container } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  skills: { name: string; level: number; icon?: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'DevOps & Infrastructure',
    icon: Server,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    skills: [
      { name: 'Docker', level: 90, icon: 'https://skillicons.dev/icons?i=docker' },
      { name: 'Kubernetes', level: 80, icon: 'https://skillicons.dev/icons?i=kubernetes' },
      { name: 'AWS', level: 85, icon: 'https://skillicons.dev/icons?i=aws' },
      { name: 'Terraform', level: 75, icon: 'https://skillicons.dev/icons?i=terraform' },
      { name: 'Linux', level: 88, icon: 'https://skillicons.dev/icons?i=linux' },
      { name: 'Nginx', level: 82, icon: 'https://skillicons.dev/icons?i=nginx' },
    ],
  },
  {
    title: 'Machine Learning & AI',
    icon: Brain,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    skills: [
      { name: 'Python', level: 92, icon: 'https://skillicons.dev/icons?i=python' },
      { name: 'PyTorch', level: 78, icon: 'https://skillicons.dev/icons?i=pytorch' },
      { name: 'TensorFlow', level: 75, icon: 'https://skillicons.dev/icons?i=tensorflow' },
      { name: 'scikit-learn', level: 85 },
      { name: 'pandas', level: 88 },
      { name: 'XGBoost', level: 80 },
    ],
  },
  {
    title: 'Backend Development',
    icon: Database,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    skills: [
      { name: 'Flask', level: 88, icon: 'https://skillicons.dev/icons?i=flask' },
      { name: 'PostgreSQL', level: 85, icon: 'https://skillicons.dev/icons?i=postgres' },
      { name: 'Java', level: 75, icon: 'https://skillicons.dev/icons?i=java' },
      { name: 'REST APIs', level: 90 },
      { name: 'MySQL', level: 82, icon: 'https://skillicons.dev/icons?i=mysql' },
      { name: 'Redis', level: 70, icon: 'https://skillicons.dev/icons?i=redis' },
    ],
  },
  {
    title: 'Frontend & Tooling',
    icon: Code,
    color: 'text-amber',
    bgColor: 'bg-amber/10',
    skills: [
      { name: 'React', level: 88, icon: 'https://skillicons.dev/icons?i=react' },
      { name: 'TypeScript', level: 85, icon: 'https://skillicons.dev/icons?i=ts' },
      { name: 'Git', level: 90, icon: 'https://skillicons.dev/icons?i=git' },
      { name: 'Tailwind', level: 85, icon: 'https://skillicons.dev/icons?i=tailwind' },
      { name: 'Vite', level: 82, icon: 'https://skillicons.dev/icons?i=vite' },
      { name: 'GitHub Actions', level: 78, icon: 'https://skillicons.dev/icons?i=githubactions' },
    ],
  },
];

const additionalTools = [
  'Prometheus', 'Grafana', 'OpenTelemetry', 'Jenkins', 'Ansible', 'Azure DevOps',
  'NumPy', 'Jupyter', 'MLflow', 'Airflow', 'Helm', 'ArgoCD',
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [animatedBars, setAnimatedBars] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate('.skills-header', {
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 1000,
              easing: 'easeOutExpo',
            });

            animate('.category-tab', {
              translateY: [30, 0],
              opacity: [0, 1],
              duration: 600,
              delay: stagger(50, { start: 200 }),
              easing: 'easeOutExpo',
            });

            animate('.skill-card', {
              translateY: [40, 0],
              opacity: [0, 1],
              duration: 800,
              delay: stagger(100, { start: 500 }),
              easing: 'easeOutExpo',
            });

            setTimeout(() => setAnimatedBars(true), 800);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const currentCategory = skillCategories[activeCategory];

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative overflow-hidden bg-muted/20">
      <div className="absolute inset-0 grid-dots" />
      <div className="orb w-[500px] h-[500px] bg-primary/20 -top-40 right-20" />
      <div className="orb w-[400px] h-[400px] bg-secondary/15 bottom-20 -left-40" />

      <div className="container-width relative">
        {/* Header */}
        <div className="skills-header opacity-0 text-center mb-12">
          <span className="tech-badge border-primary/30 text-primary bg-primary/5 mb-4">
            Technical Expertise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Comprehensive technical stack spanning DevOps, ML/AI, and full-stack development
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={category.title}
                onClick={() => {
                  setActiveCategory(index);
                  setAnimatedBars(false);
                  setTimeout(() => setAnimatedBars(true), 100);
                }}
                className={`category-tab opacity-0 flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === index
                    ? `${category.bgColor} ${category.color} border border-current/30`
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{category.title}</span>
                <span className="sm:hidden">{category.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Skills grid */}
        <div className="glass-card p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCategory.skills.map((skill, index) => (
              <div
                key={skill.name}
                className="skill-card opacity-0 p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/50 transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  {skill.icon ? (
                    <img src={skill.icon} alt={skill.name} className="w-8 h-8" loading="lazy" />
                  ) : (
                    <div className={`w-8 h-8 rounded-lg ${currentCategory.bgColor} flex items-center justify-center`}>
                      <currentCategory.icon className={`w-4 h-4 ${currentCategory.color}`} />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className={`text-sm font-mono ${currentCategory.color}`}>{skill.level}%</span>
                    </div>
                  </div>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-bar-fill"
                    style={{
                      width: animatedBars ? `${skill.level}%` : '0%',
                      transition: 'width 1s ease-out',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional tools */}
        <div className="text-center">
          <p className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-6">
            Also experienced with
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {additionalTools.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-lg border border-border bg-card/50 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300 cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;