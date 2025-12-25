import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';

interface Skill {
  name: string;
  icon: string;
  category: string;
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', icon: 'https://skillicons.dev/icons?i=react', category: 'Frontend' },
  { name: 'TypeScript', icon: 'https://skillicons.dev/icons?i=ts', category: 'Frontend' },
  { name: 'JavaScript', icon: 'https://skillicons.dev/icons?i=js', category: 'Frontend' },
  { name: 'Tailwind', icon: 'https://skillicons.dev/icons?i=tailwind', category: 'Frontend' },
  { name: 'HTML', icon: 'https://skillicons.dev/icons?i=html', category: 'Frontend' },
  { name: 'CSS', icon: 'https://skillicons.dev/icons?i=css', category: 'Frontend' },
  // Backend
  { name: 'Python', icon: 'https://skillicons.dev/icons?i=python', category: 'Backend' },
  { name: 'Flask', icon: 'https://skillicons.dev/icons?i=flask', category: 'Backend' },
  { name: 'Java', icon: 'https://skillicons.dev/icons?i=java', category: 'Backend' },
  { name: 'PostgreSQL', icon: 'https://skillicons.dev/icons?i=postgres', category: 'Backend' },
  { name: 'MySQL', icon: 'https://skillicons.dev/icons?i=mysql', category: 'Backend' },
  // DevOps
  { name: 'Docker', icon: 'https://skillicons.dev/icons?i=docker', category: 'DevOps' },
  { name: 'Kubernetes', icon: 'https://skillicons.dev/icons?i=kubernetes', category: 'DevOps' },
  { name: 'AWS', icon: 'https://skillicons.dev/icons?i=aws', category: 'DevOps' },
  { name: 'Linux', icon: 'https://skillicons.dev/icons?i=linux', category: 'DevOps' },
  { name: 'Git', icon: 'https://skillicons.dev/icons?i=git', category: 'DevOps' },
  { name: 'GitHub', icon: 'https://skillicons.dev/icons?i=github', category: 'DevOps' },
  { name: 'Nginx', icon: 'https://skillicons.dev/icons?i=nginx', category: 'DevOps' },
  // AI/ML
  { name: 'PyTorch', icon: 'https://skillicons.dev/icons?i=pytorch', category: 'AI & ML' },
  { name: 'TensorFlow', icon: 'https://skillicons.dev/icons?i=tensorflow', category: 'AI & ML' },
];

const categories = ['All', 'Frontend', 'Backend', 'DevOps', 'AI & ML'];

const additionalSkills = [
  'scikit-learn', 'XGBoost', 'pandas', 'NumPy', 'OpenTelemetry',
  'Prometheus', 'Grafana', 'Jenkins', 'Ansible', 'Azure DevOps', '.NET', 'C#'
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate('.skills-title', {
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 1000,
              easing: 'easeOutExpo',
            });

            animate('.skill-filter', {
              translateY: [30, 0],
              opacity: [0, 1],
              duration: 600,
              delay: stagger(50, { start: 200 }),
              easing: 'easeOutExpo',
            });

            animate('.skill-item', {
              scale: [0, 1],
              opacity: [0, 1],
              duration: 500,
              delay: stagger(30, { start: 400 }),
              easing: 'easeOutBack',
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative overflow-hidden bg-card/50">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/4 -right-32 w-64 h-64 bg-primary/10 blob blur-3xl" />
      <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-secondary/10 blob blur-3xl" />

      <div className="container-width relative">
        {/* Header */}
        <div className="skills-title opacity-0 text-center mb-16">
          <span className="font-mono text-sm text-primary uppercase tracking-widest">Tech stack</span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display mt-4">
            Skills & <span className="italic text-primary">Tools</span>
          </h2>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`skill-filter opacity-0 px-6 py-2 rounded-full font-mono text-sm transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border-2 border-border hover:border-primary text-muted-foreground hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto mb-16">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="skill-item opacity-0 relative group"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className={`
                w-20 h-20 rounded-2xl border-2 border-border bg-card p-4
                flex items-center justify-center transition-all duration-300
                ${hoveredSkill === skill.name ? 'border-primary scale-110 shadow-lg' : 'hover:border-primary/50'}
              `}>
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              
              {/* Tooltip */}
              <div className={`
                absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full
                bg-foreground text-background text-xs font-medium whitespace-nowrap
                transition-all duration-300 pointer-events-none
                ${hoveredSkill === skill.name ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
              `}>
                {skill.name}
              </div>
            </div>
          ))}
        </div>

        {/* Additional skills */}
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-sm text-muted-foreground mb-6 font-mono uppercase tracking-wider">
            Also experienced with
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalSkills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full border-2 border-border bg-background text-sm text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
