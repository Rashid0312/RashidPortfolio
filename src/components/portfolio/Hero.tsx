import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { Github, Linkedin, Mail, ArrowRight, Terminal, Zap, Cloud, Brain, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const roles = [
    'DevOps Engineer',
    'ML Engineer',
    'Cloud Architect',
    'Platform Engineer',
    'AI Solutions Developer',
  ];

  useEffect(() => {
    // Staggered reveal animation
    animate('.hero-element', {
      translateY: [60, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: stagger(100, { start: 200 }),
      easing: 'easeOutExpo',
    });

    animate('.hero-metric', {
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(100, { start: 800 }),
      easing: 'easeOutBack',
    });

    animate('.hero-terminal', {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
      delay: 1000,
      easing: 'easeOutExpo',
    });
  }, []);

  // Typing effect
  useEffect(() => {
    const role = roles[currentRole];
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      if (!isDeleting) {
        setDisplayText(role.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === role.length) {
          setIsTyping(false);
          setTimeout(() => {
            isDeleting = true;
            setIsTyping(true);
            type();
          }, 2000);
          return;
        }
      } else {
        setDisplayText(role.slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          setCurrentRole((prev) => (prev + 1) % roles.length);
          return;
        }
      }
      setTimeout(type, isDeleting ? 50 : 100);
    };

    type();
  }, [currentRole]);

  const metrics = [
    { value: '99.9%', label: 'Uptime SLA', icon: Zap },
    { value: '40%', label: 'Cost Reduction', icon: Cloud },
    { value: '10x', label: 'Deploy Speed', icon: Terminal },
    { value: '95%', label: 'Model Accuracy', icon: Brain },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Rashid0312', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/abdirashiid-sammantar', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:abdirashiidsammatar@gmail.com', label: 'Email' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background orbs */}
      <div className="orb w-[600px] h-[600px] bg-primary -top-40 -right-40" />
      <div className="orb w-[500px] h-[500px] bg-secondary bottom-20 -left-40" style={{ animationDelay: '-5s' }} />
      <div className="orb w-[400px] h-[400px] bg-accent top-1/2 left-1/3" style={{ animationDelay: '-10s' }} />

      <div className="container-width relative z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Status badge */}
            <div className="hero-element opacity-0">
              <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Available for Enterprise Opportunities
              </span>
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="hero-element opacity-0 text-5xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight leading-[1.1]">
                Building{' '}
                <span className="gradient-text">Scalable</span>
                <br />
                Infrastructure
              </h1>
              
              <div className="hero-element opacity-0 flex items-center gap-3 text-2xl md:text-3xl text-muted-foreground font-mono">
                <span className="text-primary">$</span>
                <span className="text-foreground">{displayText}</span>
                {isTyping && <span className="typing-cursor" />}
              </div>
            </div>

            {/* Description */}
            <p className="hero-element opacity-0 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Software Engineering student specializing in{' '}
              <span className="text-foreground font-medium">DevOps automation</span>,{' '}
              <span className="text-foreground font-medium">ML pipelines</span>, and{' '}
              <span className="text-foreground font-medium">cloud-native architectures</span>. 
              Delivering measurable business impact through engineering excellence.
            </p>

            {/* CTA Buttons */}
            <div className="hero-element opacity-0 flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
                asChild
              >
                <a href="#projects">
                  View Case Studies
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-border hover:bg-muted font-semibold px-8"
                asChild
              >
                <a href="#contact">Schedule Consultation</a>
              </Button>
            </div>

            {/* Social links */}
            <div className="hero-element opacity-0 flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary/10 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right - Metrics & Terminal */}
          <div className="lg:col-span-5 space-y-6">
            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-4">
              {metrics.map(({ value, label, icon: Icon }) => (
                <div key={label} className="hero-metric opacity-0 metric-card group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-3xl font-display font-bold text-foreground">{value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            {/* Terminal preview */}
            <div className="hero-terminal opacity-0 terminal">
              <div className="terminal-header">
                <div className="terminal-dot bg-rose" />
                <div className="terminal-dot bg-amber" />
                <div className="terminal-dot bg-accent" />
                <span className="ml-3 text-xs text-muted-foreground">deployment.sh</span>
              </div>
              <div className="p-4 space-y-2 text-sm">
                <div className="command-line text-muted-foreground">
                  <span className="text-foreground">kubectl apply -f deployment.yaml</span>
                </div>
                <p className="text-accent pl-5">✓ deployment.apps/ml-pipeline created</p>
                <p className="text-accent pl-5">✓ service/ml-api created</p>
                <p className="text-accent pl-5">✓ horizontalpodautoscaler created</p>
                <div className="command-line text-muted-foreground mt-4">
                  <span className="text-foreground">docker push registry/model:v2.1</span>
                </div>
                <p className="text-primary pl-5">→ Pushing to container registry...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-element opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2">
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="text-xs font-mono uppercase tracking-widest">Explore</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;