import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Server, Brain, Cloud, Users, Target, TrendingUp, Shield, Workflow } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate('.about-element', {
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 1000,
              delay: stagger(100),
              easing: 'easeOutExpo',
            });

            animate('.capability-card', {
              translateY: [80, 0],
              opacity: [0, 1],
              duration: 800,
              delay: stagger(100, { start: 400 }),
              easing: 'easeOutBack',
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const capabilities = [
    {
      icon: Server,
      title: 'Infrastructure as Code',
      description: 'Terraform, Ansible, and Kubernetes for reproducible, version-controlled infrastructure',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Brain,
      title: 'ML Operations',
      description: 'End-to-end ML pipelines with automated training, validation, and deployment',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: Cloud,
      title: 'Cloud Architecture',
      description: 'AWS, Azure & GCP solutions optimized for cost, performance, and reliability',
      color: 'text-azure',
      bgColor: 'bg-azure/10',
    },
    {
      icon: Workflow,
      title: 'CI/CD Automation',
      description: 'Zero-downtime deployments with comprehensive testing and rollback capabilities',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  const valueProps = [
    {
      icon: Target,
      value: 'Business-Driven',
      description: 'Engineering decisions aligned with ROI and strategic objectives',
    },
    {
      icon: TrendingUp,
      value: 'Data-Informed',
      description: 'Metrics-based optimization and evidence-based improvements',
    },
    {
      icon: Shield,
      value: 'Security-First',
      description: 'Zero-trust architecture and compliance-ready infrastructure',
    },
    {
      icon: Users,
      value: 'Collaborative',
      description: 'Cross-functional leadership and stakeholder communication',
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-dots" />
      <div className="orb w-[500px] h-[500px] bg-primary/30 -top-60 -left-60" />
      <div className="orb w-[400px] h-[400px] bg-secondary/20 bottom-0 right-0" />

      <div className="container-width relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - Content */}
          <div className="space-y-8">
            <div className="about-element opacity-0">
              <span className="tech-badge border-primary/30 text-primary bg-primary/5">
                About Me
              </span>
            </div>

            <h2 className="about-element opacity-0 text-4xl md:text-5xl font-display font-bold leading-tight">
              Engineering <span className="gradient-text">Excellence</span> for
              <br />Modern Enterprises
            </h2>

            <div className="about-element opacity-0 space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                As a Computer Science student at <span className="text-foreground font-medium">Linnéuniversitetet</span>, 
                I bridge the gap between cutting-edge technology and business value. My focus areas span 
                <span className="text-primary font-medium"> DevOps practices</span>, 
                <span className="text-secondary font-medium"> machine learning engineering</span>, and 
                <span className="text-accent font-medium"> cloud infrastructure design</span>.
              </p>
              <p>
                As founding member and Communications Lead of the <span className="text-foreground font-medium">LNU AI Society</span>, 
                I've cultivated a community of 120+ members, organized hackathons, and established partnerships 
                with industry leaders — demonstrating both technical and leadership capabilities.
              </p>
            </div>

            {/* Value propositions */}
            <div className="about-element opacity-0 grid grid-cols-2 gap-4">
              {valueProps.map(({ icon: Icon, value, description }) => (
                <div key={value} className="group">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-foreground">{value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Capabilities */}
          <div className="space-y-4">
            {capabilities.map(({ icon: Icon, title, description, color, bgColor }) => (
              <div key={title} className="capability-card opacity-0 glass-card card-shine p-6 group cursor-default">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Education card */}
            <div className="capability-card opacity-0 glass-card p-6 border-gradient">
              <div className="relative">
                <span className="tech-badge border-secondary/30 text-secondary bg-secondary/5 mb-4">
                  Education
                </span>
                <h3 className="text-xl font-display font-semibold text-foreground">Linnéuniversitetet</h3>
                <p className="text-muted-foreground">Computer Science • 2024 - 2027</p>
                <p className="text-sm text-muted-foreground mt-2">Växjö, Sweden</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;