import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Split title into spans for letter animation
    if (titleRef.current) {
      const text = titleRef.current.textContent || '';
      titleRef.current.innerHTML = text
        .split('')
        .map(char => char === ' ' ? ' ' : `<span class="inline-block">${char}</span>`)
        .join('');

      animate(titleRef.current.querySelectorAll('span'), {
        translateY: [50, 0],
        opacity: [0, 1],
        rotateX: [-90, 0],
        duration: 1200,
        delay: stagger(50),
        ease: 'outExpo',
      });
    }

    // Subtitle animation
    animate(subtitleRef.current, {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: 800,
      ease: 'outExpo',
    });

    // Links animation
    animate(
      linksRef.current?.children, {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(100, { start: 1200 }),
      ease: 'outBack',
    });

    // Scroll indicator animation
    animate(scrollRef.current, {
      translateY: [0, 10, 0],
      opacity: [0.5, 1, 0.5],
      duration: 2000,
      loop: true,
      ease: 'inOutSine',
    });
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Rashid0312', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/abdirashiid-sammantar', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@abdirashiid.dev', label: 'Email' },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center z-10">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 glow-text"
        >
          Abdirashiid Sammantar
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground mb-12 opacity-0"
        >
          <span className="gradient-text font-semibold">Software Engineering Student</span>
          <span className="mx-3 text-border">|</span>
          <span className="text-foreground/80">AI Enthusiast</span>
        </p>

        <div ref={linksRef} className="flex items-center justify-center gap-6">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-4 rounded-full bg-card border border-border hover:border-primary/50 transition-all duration-300 glow-border"
              aria-label={label}
            >
              <Icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown className="w-8 h-8 text-primary animate-pulse-glow" />
      </div>

      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
    </section>
  );
};

export default Hero;
