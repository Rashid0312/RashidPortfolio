import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Code2, Cpu, Cloud, Users } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate('.about-title', {
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 1000,
              easing: 'easeOutExpo',
            });

            animate('.about-text', {
              translateY: [40, 0],
              opacity: [0, 1],
              duration: 800,
              delay: 200,
              easing: 'easeOutExpo',
            });

            animate('.about-card', {
              translateY: [80, 0],
              opacity: [0, 1],
              rotate: [5, 0],
              duration: 800,
              delay: stagger(100, { start: 400 }),
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

  const interests = [
    {
      icon: Code2,
      title: 'Full-Stack',
      description: 'Building end-to-end applications with modern frameworks',
      color: 'bg-primary',
    },
    {
      icon: Cpu,
      title: 'AI & ML',
      description: 'Creating intelligent systems with machine learning',
      color: 'bg-secondary',
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      description: 'Deploying scalable infrastructure on cloud platforms',
      color: 'bg-accent',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Leading AI Society with 120+ members at LNU',
      color: 'bg-mint',
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-primary/20 rounded-full float" />
      <div className="absolute bottom-40 right-20 w-32 h-32 border-2 border-secondary/20 float-delayed" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }} />

      <div className="container-width relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text content */}
          <div className="space-y-8">
            <div className="about-title opacity-0">
              <span className="font-mono text-sm text-primary uppercase tracking-widest">About me</span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-display mt-4 leading-tight">
                Passionate about
                <span className="italic text-primary"> building</span>
                <br />
                the future
              </h2>
            </div>

            <div className="about-text opacity-0 space-y-6 text-lg text-muted-foreground">
              <p>
                I'm a software engineering student at Linnéuniversitetet with a deep passion for
                <span className="text-foreground font-medium"> artificial intelligence</span> and
                <span className="text-foreground font-medium"> cloud technologies</span>.
              </p>
              <p>
                As a founding member and Communications Lead of the LNU AI Society, I've helped grow
                our community to over 120 members and organized hackathons that bring together
                students and industry professionals.
              </p>
              <p>
                I believe in learning by building — every project is an opportunity to push
                boundaries and create something meaningful.
              </p>
            </div>
          </div>

          {/* Right - Interest cards */}
          <div className="grid grid-cols-2 gap-4">
            {interests.map(({ icon: Icon, title, description, color }, index) => (
              <div
                key={title}
                className={`about-card opacity-0 bento-card p-6 ${index === 0 ? 'col-span-2' : ''}`}
              >
                <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-background" />
                </div>
                <h3 className="text-xl font-display font-medium mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {[
            { value: '3+', label: 'Years Coding' },
            { value: '10+', label: 'Projects Built' },
            { value: '120+', label: 'AI Society Members' },
            { value: '3', label: 'Certifications' },
          ].map(({ value, label }) => (
            <div key={label} className="about-card opacity-0 text-center p-6 rounded-2xl border-2 border-border bg-card/50">
              <p className="text-4xl md:text-5xl font-display text-primary">{value}</p>
              <p className="text-sm text-muted-foreground mt-2 font-mono uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
