import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { GraduationCap, MapPin, Languages, Users, Sparkles } from "lucide-react";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(textRef.current, {
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 1000,
              ease: "outExpo",
            });

            animate(cardsRef.current?.children, {
              translateY: [60, 0],
              opacity: [0, 1],
              scale: [0.95, 1],
              duration: 800,
              delay: stagger(100, { start: 300 }),
              ease: "outExpo",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      icon: GraduationCap,
      title: "Education",
      content: "Linnéuniversitetet",
      subtitle: "Computer Science • 2024-2027",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Växjö / Göteborg",
      subtitle: "Sweden 🇸🇪",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Languages,
      title: "Languages",
      content: "4 Languages",
      subtitle: "Swedish, English, Somali, Spanish",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "LNU AI Society",
      content: "120+ Members",
      subtitle: "Founder & Head of Communications",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      
      <div className="container-width relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Get to know me</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          
          <p 
            ref={textRef}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed opacity-0"
          >
            A passionate software engineering student with a focus on{" "}
            <span className="text-foreground font-medium">AI</span>,{" "}
            <span className="text-foreground font-medium">cloud infrastructure</span>, and building{" "}
            <span className="text-foreground font-medium">impactful applications</span>{" "}
            that solve real-world problems.
          </p>
        </div>

        {/* Info cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(({ icon: Icon, title, content, subtitle, color }) => (
            <div
              key={title}
              className="group relative p-6 rounded-2xl glass card-hover opacity-0 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  {title}
                </p>
                
                <p className="text-xl font-display font-bold text-foreground mb-1">
                  {content}
                </p>
                
                <p className="text-sm text-muted-foreground">
                  {subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;