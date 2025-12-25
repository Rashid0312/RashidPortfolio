import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Sparkles } from 'lucide-react';

interface Skill {
  name: string;
  icon: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: 'https://skillicons.dev/icons?i=react' },
      { name: 'TypeScript', icon: 'https://skillicons.dev/icons?i=ts' },
      { name: 'JavaScript', icon: 'https://skillicons.dev/icons?i=js' },
      { name: 'HTML', icon: 'https://skillicons.dev/icons?i=html' },
      { name: 'CSS', icon: 'https://skillicons.dev/icons?i=css' },
      { name: 'Tailwind', icon: 'https://skillicons.dev/icons?i=tailwind' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Python', icon: 'https://skillicons.dev/icons?i=python' },
      { name: 'Flask', icon: 'https://skillicons.dev/icons?i=flask' },
      { name: 'Java', icon: 'https://skillicons.dev/icons?i=java' },
      { name: 'PostgreSQL', icon: 'https://skillicons.dev/icons?i=postgres' },
      { name: 'MySQL', icon: 'https://skillicons.dev/icons?i=mysql' },
    ],
  },
  {
    title: 'DevOps & Cloud',
    skills: [
      { name: 'Docker', icon: 'https://skillicons.dev/icons?i=docker' },
      { name: 'Kubernetes', icon: 'https://skillicons.dev/icons?i=kubernetes' },
      { name: 'AWS', icon: 'https://skillicons.dev/icons?i=aws' },
      { name: 'Linux', icon: 'https://skillicons.dev/icons?i=linux' },
      { name: 'Nginx', icon: 'https://skillicons.dev/icons?i=nginx' },
      { name: 'Git', icon: 'https://skillicons.dev/icons?i=git' },
      { name: 'GitHub', icon: 'https://skillicons.dev/icons?i=github' },
    ],
  },
  {
    title: 'AI & Data',
    skills: [
      { name: 'PyTorch', icon: 'https://skillicons.dev/icons?i=pytorch' },
      { name: 'TensorFlow', icon: 'https://skillicons.dev/icons?i=tensorflow' },
    ],
  },
];

// All skills flattened for the marquee effect
const allSkills = skillCategories.flatMap(cat => cat.skills);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate('.skill-item', {
              scale: [0, 1],
              opacity: [0, 1],
              duration: 600,
              delay: stagger(30),
              ease: 'outBack',
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
    <section 
      id="skills" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="container-width relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Skills I have mastered</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Skills grid with icons */}
        <div ref={gridRef} className="max-w-4xl mx-auto">
          {/* Main skills display */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {allSkills.map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className="skill-item opacity-0 flex flex-col items-center gap-3 group"
              >
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl glass p-3 skill-icon group-hover:glow-box transition-all duration-300">
                    <img 
                      src={skill.icon} 
                      alt={skill.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
                <span className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>

          {/* Additional skills as text badges */}
          <div className="mt-16 pt-8 border-t border-border/30">
            <p className="text-center text-sm text-muted-foreground mb-6">Also experienced with</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['scikit-learn', 'XGBoost', 'pandas', 'NumPy', 'OpenTelemetry', 'Prometheus', 'Grafana', 'Jenkins', 'Ansible', 'Azure DevOps', '.NET', 'C#'].map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 rounded-full glass text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;