import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, FileText, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.href.slice(1) || 'hero');
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section === 'hero' ? '' : section) ||
                        (section === 'hero' ? document.body : null);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section === 'hero' ? '' : section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(href.slice(1));
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled ? 'py-3' : 'py-5'
        )}
      >
        <div className="container-width">
          <div className={cn(
            'flex items-center justify-between transition-all duration-500 rounded-2xl px-6 py-3',
            isScrolled ? 'bg-card/80 backdrop-blur-xl border border-border shadow-lg' : ''
          )}>
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => handleClick(e, '#')}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-105 transition-transform">
                <Terminal className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-foreground hidden sm:block">
                AS<span className="text-primary">.</span>dev
              </span>
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-1">
              {navItems.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleClick(e, href)}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg',
                      activeSection === (href === '#' ? '' : href.slice(1))
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    )}
                  >
                    {label}
                    {activeSection === (href === '#' ? '' : href.slice(1)) && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                asChild
              >
                <a href="#contact">
                  <FileText className="w-4 h-4 mr-2" />
                  Resume
                </a>
              </Button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                asChild
              >
                <a href="#contact">Let's Talk</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={cn(
        'fixed inset-0 z-40 lg:hidden transition-all duration-500',
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}>
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={cn(
          'absolute inset-x-4 top-24 bg-card border border-border rounded-2xl p-6 transition-all duration-500 shadow-xl',
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
        )}>
          <ul className="space-y-2">
            {navItems.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => handleClick(e, href)}
                  className={cn(
                    'block px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300',
                    activeSection === (href === '#' ? '' : href.slice(1))
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-border space-y-3">
            <Button
              variant="outline"
              className="w-full rounded-xl border-border"
              asChild
            >
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                <FileText className="w-4 h-4 mr-2" />
                Download Resume
              </a>
            </Button>
            <Button
              className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
              asChild
            >
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                Let's Talk
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;