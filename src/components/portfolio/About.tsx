import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { GraduationCap, MapPin, Languages, Users } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(cardsRef.current?.children, {
              translateY: [50, 0],
              opacity: [0, 1],
              scale: [0.9, 1],
              duration: 800,
              delay: stagger(150),
              ease: 'outExpo',
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

  const cards = [
    {
      icon: GraduationCap,
      title: 'Education',
      content: 'Linnéuniversitetet',
      subtitle: 'Computer Science (2024-2027)',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Växjö / Göteborg',
      subtitle: 'Sweden',
    },
    {
      icon: Languages,
      title: 'Languages',
      content: 'Swedish, English',
      subtitle: 'Somali, Spanish',
    },
    {
      icon: Users,
      title: 'LNU AI Society',
      content: '120+ Members',
      subtitle: 'Communications Lead',
    },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="section-padding relative"
    >
      <div className="container-width">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="gradient-text">About Me</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          A passionate software engineering student with a focus on AI, cloud infrastructure, 
          and building impactful applications that solve real-world problems.
        </p>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map(({ icon: Icon, title, content, subtitle }) => (
            <div
              key={title}
              className="group relative p-6 rounded-xl bg-card border border-border card-hover gradient-border opacity-0"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
                <p className="text-xl font-semibold text-foreground mb-1">{content}</p>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
