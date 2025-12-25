import ParticleBackground from '@/components/portfolio/ParticleBackground';
import Navigation from '@/components/portfolio/Navigation';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Projects from '@/components/portfolio/Projects';
import Skills from '@/components/portfolio/Skills';
import Experience from '@/components/portfolio/Experience';
import Contact from '@/components/portfolio/Contact';

const Index = () => {
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
      <footer className="py-8 border-t border-border">
        <div className="container-width text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Abdirashiid Sammantar. Built with React & anime.js
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
