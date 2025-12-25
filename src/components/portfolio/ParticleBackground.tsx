import { useEffect, useRef } from 'react';
import { animate, random } from 'animejs';

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particles: HTMLDivElement[] = [];
    const particleCount = 50;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full';
      
      const size = Math.random() * 4 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.backgroundColor = Math.random() > 0.5 
        ? 'hsl(185 100% 50% / 0.3)' 
        : 'hsl(270 80% 60% / 0.3)';
      
      container.appendChild(particle);
      particles.push(particle);
    }

    // Animate particles
    particles.forEach((particle, i) => {
      animate(particle, {
        translateX: random(-100, 100),
        translateY: random(-100, 100),
        scale: [1, random(1, 2), 1],
        opacity: [0.3, 0.8, 0.3],
        duration: random(3000, 6000),
        delay: i * 50,
        loop: true,
        ease: 'inOutSine',
        alternate: true,
      });
    });

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
