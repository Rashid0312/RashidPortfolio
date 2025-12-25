import { useEffect } from 'react';
import ParticleBackground from '@/components/portfolio/ParticleBackground';
import Navigation from '@/components/portfolio/Navigation';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Projects from '@/components/portfolio/Projects';
import Skills from '@/components/portfolio/Skills';
import Experience from '@/components/portfolio/Experience';
import Contact from '@/components/portfolio/Contact';

const Index = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <ParticleBackground />
      <Navigation />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t-2 border-border relative">
        <div className="container-width">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-display">AS<span className="text-primary">.</span></span>
              <span className="text-sm text-muted-foreground">© {new Date().getFullYear()}</span>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Designed & built with <span className="text-primary">♥</span> using React & Tailwind
            </p>

            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Back to top ↑
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
