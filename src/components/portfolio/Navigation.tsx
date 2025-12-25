import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, FileText } from 'lucide-react';
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
            'flex items-center justify-between transition-all duration-500 rounded-full px-6 py-3',
            isScrolled ? 'bg-card/80 backdrop-blur-xl border-2 border-border shadow-lg' : ''
          )}>
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => handleClick(e, '#')}
              className="text-2xl font-display font-normal hover:text-primary transition-colors"
            >
              AS<span className="text-primary">.</span>
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleClick(e, href)}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full',
                      activeSection === (href === '#' ? '' : href.slice(1))
                        ? 'text-primary-foreground bg-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Resume Button */}
            <div className="hidden md:block">
              <Button
                size="sm"
                className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold px-6 brutal-border"
                asChild
              >
                <a href="#contact">
                  <FileText className="w-4 h-4 mr-2" />
                  Resume
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={cn(
        'fixed inset-0 z-40 md:hidden transition-all duration-500',
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}>
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={cn(
          'absolute inset-x-4 top-24 bg-card border-2 border-border rounded-3xl p-6 transition-all duration-500',
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
                      ? 'text-primary-foreground bg-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-border">
            <Button
              className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold brutal-border"
              asChild
            >
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                <FileText className="w-4 h-4 mr-2" />
                Get Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
