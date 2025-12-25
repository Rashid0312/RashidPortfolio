import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { Github, Linkedin, Mail, ArrowDown, Sparkles } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Staggered reveal animation
    animate('.hero-line', {
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 1200,
      delay: stagger(100, { start: 200 }),
      easing: 'easeOutExpo',
    });

    animate('.hero-card', {
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(100, { start: 800 }),
      easing: 'easeOutBack',
    });

    animate('.social-link', {
      translateX: [-30, 0],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(80, { start: 1200 }),
      easing: 'easeOutExpo',
    });

    animate('.scroll-cta', {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      delay: 1500,
      easing: 'easeOutExpo',
    });
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Rashid0312', label: 'GitHub', color: 'bg-foreground text-background' },
    { icon: Linkedin, href: 'https://linkedin.com/in/abdirashiid-sammantar', label: 'LinkedIn', color: 'bg-secondary text-secondary-foreground' },
    { icon: Mail, href: 'mailto:abdirashiidsammatar@gmail.com', label: 'Email', color: 'bg-primary text-primary-foreground' },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/20 blob blur-3xl" />
      <div className="absolute bottom-32 left-20 w-80 h-80 bg-secondary/15 blob blur-3xl" style={{ animationDelay: '-4s' }} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/10 blob blur-3xl" style={{ animationDelay: '-2s' }} />

      <div className="container-width relative z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Greeting badge */}
            <div className="hero-line opacity-0 overflow-hidden">
              <span className="sticker bg-accent text-accent-foreground font-semibold">
                <Sparkles className="w-4 h-4 inline mr-2" />
                Available for work
              </span>
            </div>

            {/* Main heading */}
            <div className="space-y-2">
              <div className="hero-line opacity-0 overflow-hidden">
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-normal tracking-tight leading-none">
                  Abdirashiid
                </h1>
              </div>
              <div className="hero-line opacity-0 overflow-hidden">
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic text-primary leading-none">
                  Sammantar
                </h1>
              </div>
            </div>

            {/* Role */}
            <div className="hero-line opacity-0 overflow-hidden">
              <p className="text-xl md:text-2xl text-muted-foreground font-sans max-w-xl">
                Software Engineering Student crafting
                <span className="text-foreground font-medium"> AI-powered solutions</span> &
                <span className="text-foreground font-medium"> beautiful interfaces</span>
              </p>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-link opacity-0 group flex items-center gap-2 px-5 py-3 rounded-full ${color} font-medium transition-all duration-300 hover:scale-105 brutal-border`}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Bento cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="hero-card opacity-0 bento-card p-6 col-span-2 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-sm text-muted-foreground uppercase tracking-wider">Currently</span>
              </div>
              <p className="text-2xl font-display">Studying Computer Science</p>
              <p className="text-muted-foreground mt-1">@ Linnéuniversitetet, Sweden</p>
            </div>

            <div className="hero-card opacity-0 bento-card p-6 bg-secondary/10">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Based in</span>
              <p className="text-3xl font-display mt-2">Sweden 🇸🇪</p>
              <p className="text-sm text-muted-foreground mt-1">Växjö / Göteborg</p>
            </div>

            <div className="hero-card opacity-0 bento-card p-6 bg-accent/10">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Languages</span>
              <p className="text-3xl font-display mt-2">4+</p>
              <p className="text-sm text-muted-foreground mt-1">Swedish, English, Somali...</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="scroll-cta opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="flex flex-col items-center gap-3 group">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
              Scroll to explore
            </span>
            <div className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all">
              <ArrowDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Marquee text */}
      <div className="absolute bottom-0 left-0 right-0 py-4 border-t border-border bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="flex">
          <div className="marquee-text flex gap-8 text-sm font-mono text-muted-foreground">
            <span>REACT</span>
            <span>•</span>
            <span>TYPESCRIPT</span>
            <span>•</span>
            <span>PYTHON</span>
            <span>•</span>
            <span>MACHINE LEARNING</span>
            <span>•</span>
            <span>AWS</span>
            <span>•</span>
            <span>DOCKER</span>
            <span>•</span>
            <span>KUBERNETES</span>
            <span>•</span>
            <span>FLASK</span>
            <span>•</span>
            <span>REACT</span>
            <span>•</span>
            <span>TYPESCRIPT</span>
            <span>•</span>
            <span>PYTHON</span>
            <span>•</span>
            <span>MACHINE LEARNING</span>
            <span>•</span>
            <span>AWS</span>
            <span>•</span>
            <span>DOCKER</span>
            <span>•</span>
            <span>KUBERNETES</span>
            <span>•</span>
            <span>FLASK</span>
            <span>•</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
