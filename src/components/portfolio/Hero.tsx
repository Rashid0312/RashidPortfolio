import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { Github, Linkedin, Mail, ArrowDown, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  const roles = ['Software Engineer', 'AI Enthusiast', 'Full-Stack Developer', 'Cloud Architect'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // Name letter animation
  useEffect(() => {
    if (nameRef.current) {
      const text = 'Abdirashiid';
      nameRef.current.innerHTML = text
        .split('')
        .map((char, i) => `<span class="inline-block opacity-0" style="--i: ${i}">${char}</span>`)
        .join('');

      animate(nameRef.current.querySelectorAll('span'), {
        opacity: [0, 1],
        translateY: [80, 0],
        rotateX: [-90, 0],
        duration: 1200,
        delay: stagger(60, { start: 300 }),
        ease: 'outExpo',
      });
    }

    // Animate container elements
    animate('.hero-greeting', {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      delay: 200,
      ease: 'outExpo',
    });

    animate('.hero-subtitle', {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1000,
      delay: 1200,
      ease: 'outExpo',
    });

    animate('.hero-cta', {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1000,
      delay: 1400,
      ease: 'outExpo',
    });

    animate('.side-social', {
      opacity: [0, 1],
      translateX: [-30, 0],
      duration: 800,
      delay: stagger(100, { start: 1600 }),
      ease: 'outExpo',
    });

    animate('.scroll-indicator', {
      opacity: [0, 1],
      duration: 1000,
      delay: 2000,
      ease: 'outExpo',
    });
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Rashid0312', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/abdirashiid-sammantar', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:abdirashiidsammatar@gmail.com', label: 'Email' },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating side social icons */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-5">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="side-social opacity-0 group p-3 rounded-full glass hover:bg-primary/10 transition-all duration-300"
            aria-label={label}
          >
            <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        ))}
        <div className="w-px h-24 bg-gradient-to-b from-border to-transparent mx-auto mt-4" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Greeting */}
        <p className="hero-greeting opacity-0 text-muted-foreground text-lg md:text-xl mb-4 tracking-wide">
          Hello, I'm
        </p>

        {/* Name with animated blob behind */}
        <div className="relative inline-block mb-6">
          {/* Animated blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-72 md:h-72 blob bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl opacity-60" />
          
          <h1 
            ref={nameRef}
            className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight"
            style={{ perspective: '1000px' }}
          >
            Abdirashiid
          </h1>
        </div>

        {/* Surname */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-light text-muted-foreground mb-8 tracking-wide">
          Sammantar
        </h2>

        {/* Typewriter role */}
        <div className="hero-subtitle opacity-0 mb-12">
          <span className="text-xl md:text-2xl lg:text-3xl font-display gradient-text-animated font-semibold">
            {displayText}
          </span>
          <span 
            className={`inline-block w-0.5 h-6 md:h-8 bg-primary ml-1 align-middle transition-opacity duration-100 ${
              cursorVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* CTA Buttons */}
        <div className="hero-cta opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="group px-8 py-6 text-base bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects
            <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-base rounded-full border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            asChild
          >
            <a href="#contact">
              <FileText className="mr-2 w-4 h-4" />
              Get Resume
            </a>
          </Button>
        </div>

        {/* Mobile social links */}
        <div className="lg:hidden flex items-center justify-center gap-4 mt-12">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass hover:bg-primary/10 transition-all duration-300"
              aria-label={label}
            >
              <Icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="scroll-indicator opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl float" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl float-delayed" />
    </section>
  );
};

export default Hero;