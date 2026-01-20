import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { Server, Brain, Cloud, Code, Database, Container, Activity, GitBranch, Shield } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  skills: { name: string; level: number; icon?: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Core Development',
    icon: Code,
    color: 'text-rose',
    bgColor: 'bg-rose/10',
    skills: [
      { name: 'TypeScript', level: 88, icon: 'https://skillicons.dev/icons?i=ts' },
      { name: 'React', level: 90, icon: 'https://skillicons.dev/icons?i=react' },
      { name: 'Java', level: 85, icon: 'https://skillicons.dev/icons?i=java' },
      { name: 'C#', level: 80, icon: 'https://skillicons.dev/icons?i=cs' },
      { name: '.NET', level: 78, icon: 'https://skillicons.dev/icons?i=dotnet' },
      { name: 'SQL', level: 85 },
    ],
  },
  {
    title: 'Backend & Security',
    icon: Shield,
    color: 'text-amber',
    bgColor: 'bg-amber/10',
    skills: [
      { name: 'Python', level: 92, icon: 'https://skillicons.dev/icons?i=python' },
      { name: 'Flask', level: 90, icon: 'https://skillicons.dev/icons?i=flask' },
      { name: 'PostgreSQL', level: 88, icon: 'https://skillicons.dev/icons?i=postgres' },
      { name: 'REST APIs', level: 95 },
      { name: 'JWT Auth', level: 90 },
      { name: 'Multi-tenant', level: 85 },
    ],
  },
  {
    title: 'Observability Stack',
    icon: Activity,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    skills: [
      { name: 'OpenTelemetry', level: 88 },
      { name: 'Prometheus', level: 85, icon: 'https://skillicons.dev/icons?i=prometheus' },
      { name: 'Grafana', level: 90, icon: 'https://skillicons.dev/icons?i=grafana' },
      { name: 'Loki', level: 82 },
      { name: 'Tempo', level: 80 },
      { name: 'Distributed Tracing', level: 85 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: Container,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    skills: [
      { name: 'Docker', level: 95, icon: 'https://skillicons.dev/icons?i=docker' },
      { name: 'Kubernetes', level: 85, icon: 'https://skillicons.dev/icons?i=kubernetes' },
      { name: 'CI/CD Pipelines', level: 90 },
      { name: 'Azure DevOps', level: 85, icon: 'https://skillicons.dev/icons?i=azure' },
      { name: 'AWS', level: 80, icon: 'https://skillicons.dev/icons?i=aws' },
      { name: 'Nginx', level: 88, icon: 'https://skillicons.dev/icons?i=nginx' },
    ],
  },
  {
    title: 'System Operations',
    icon: Server,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    skills: [
      { name: 'Linux', level: 92, icon: 'https://skillicons.dev/icons?i=linux' },
      { name: 'Bash Scripting', level: 88, icon: 'https://skillicons.dev/icons?i=bash' },
      { name: 'Git', level: 95, icon: 'https://skillicons.dev/icons?i=git' },
      { name: 'GitHub Actions', level: 88, icon: 'https://skillicons.dev/icons?i=githubactions' },
      { name: 'Ansible', level: 80, icon: 'https://skillicons.dev/icons?i=ansible' },
      { name: 'Jenkins', level: 82, icon: 'https://skillicons.dev/icons?i=jenkins' },
    ],
  },
  {
    title: 'AI & Data',
    icon: Brain,
    color: 'text-violet',
    bgColor: 'bg-violet/10',
    skills: [
      { name: 'PyTorch', level: 78, icon: 'https://skillicons.dev/icons?i=pytorch' },
      { name: 'TensorFlow', level: 75, icon: 'https://skillicons.dev/icons?i=tensorflow' },
      { name: 'AI Integration', level: 85 },
      { name: 'Python Automation', level: 90 },
      { name: 'Data Pipelines', level: 85 },
    ],
  },
];

const additionalTools = [
  'Angular', 'HTML/CSS', 'UI/UX Design', 'Agile Methods', 'Scrum',
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

  // Re-animate skills when category changes
  useEffect(() => {
    // Reset animations
    animate('.skill-card', {
      translateY: 40,
      opacity: 0,
      duration: 0
    });

    // Animate in
    animate('.skill-card', {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(100, { start: 100 }),
      easing: 'easeOutExpo',
    });
  }, [activeCategory]);

  const currentCategory = skillCategories[activeCategory];

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative overflow-hidden bg-muted/20">
      <div className="absolute inset-0 grid-dots" />
      <div className="orb w-[500px] h-[500px] bg-primary/20 -top-40 right-20" />
      <div className="orb w-[400px] h-[400px] bg-secondary/15 bottom-20 -left-40" />

      <div className="container-width relative">
        <div className="skills-header opacity-0 text-center mb-12">
          <span className="tech-badge border-primary/30 text-primary bg-primary/5 mb-4">
            Technical Expertise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4">
            Technical <span className="gradient-text">Proficiency</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Comprehensive skill set across full-stack development, cloud infrastructure, and AI integration.
          </p>
        </div>

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
                className={`category-tab opacity-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${activeCategory === index
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