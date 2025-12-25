import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { Send, Github, Linkedin, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(formRef.current, {
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 800,
              ease: 'outExpo',
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Success animation
    setTimeout(() => {
      animate('.success-icon', {
        scale: [0, 1.2, 1],
        opacity: [0, 1],
        duration: 600,
        ease: 'outBack',
      });
    }, 50);

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });

    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      formRef.current?.reset();
    }, 3000);
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Rashid0312', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/abdirashiid-sammantar', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@abdirashiid.dev', label: 'Email' },
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="section-padding relative"
    >
      <div className="container-width">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="gradient-text">Get In Touch</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Have a project in mind or just want to chat? Feel free to reach out!
        </p>

        <div className="max-w-xl mx-auto">
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative p-8 rounded-2xl bg-card border border-border gradient-border opacity-0"
          >
            <div className="relative z-10 space-y-6">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <CheckCircle className="success-icon w-16 h-16 text-primary mb-4" />
                  <p className="text-xl font-semibold text-foreground">Message Sent!</p>
                  <p className="text-muted-foreground">I'll get back to you soon.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className="bg-muted/30 border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="bg-muted/30 border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Tell me about your project..."
                      rows={5}
                      className="bg-muted/30 border-border focus:border-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </>
              )}
            </div>
          </form>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 mt-12">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-full bg-card border border-border hover:border-primary/50 transition-all duration-300"
                aria-label={label}
              >
                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
