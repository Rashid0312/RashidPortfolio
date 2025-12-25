import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { Send, Github, Linkedin, Mail, CheckCircle, ArrowUpRight, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const email = 'abdirashiidsammatar@gmail.com';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate('.contact-title', {
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 1000,
              easing: 'easeOutExpo',
            });

            animate('.contact-content', {
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 800,
              delay: 200,
              easing: 'easeOutExpo',
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast({ title: 'Email copied!', description: email });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    animate('.success-icon', {
      scale: [0, 1.2, 1],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutBack',
    });

    toast({
      title: 'Message sent!',
      description: "Thanks for reaching out. I'll get back to you soon.",
    });

    setTimeout(() => {
      setIsSubmitted(false);
      formRef.current?.reset();
    }, 3000);
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Rashid0312', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/abdirashiid-sammantar', label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${email}`, label: 'Email' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl" />

      <div className="container-width relative">
        {/* Header */}
        <div className="contact-title opacity-0 text-center mb-16">
          <span className="font-mono text-sm text-primary uppercase tracking-widest">Get in touch</span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display mt-4">
            Let's <span className="italic text-primary">Talk</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-xl mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </div>

        <div className="contact-content opacity-0 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Quick contact */}
            <div className="lg:col-span-2 space-y-6">
              {/* Email card */}
              <div
                onClick={handleCopyEmail}
                className="bento-card p-6 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Email</span>
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </div>
                <p className="text-lg font-medium break-all group-hover:text-primary transition-colors">
                  {email}
                </p>
              </div>

              {/* Social links */}
              <div className="bento-card p-6">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-4">
                  Find me on
                </span>
                <div className="flex gap-3">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl border-2 border-border flex items-center justify-center hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="bento-card p-6 bg-gradient-to-br from-secondary/10 to-transparent">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                  Based in
                </span>
                <p className="text-2xl font-display">Sweden 🇸🇪</p>
                <p className="text-sm text-muted-foreground">Open to remote opportunities worldwide</p>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bento-card p-8"
              >
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <CheckCircle className="success-icon w-20 h-20 text-primary mb-6" />
                    <p className="text-2xl font-display mb-2">Message Sent!</p>
                    <p className="text-muted-foreground">I'll get back to you soon.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="Your name"
                          className="h-12 rounded-xl bg-muted/50 border-border focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="your@email.com"
                          className="h-12 rounded-xl bg-muted/50 border-border focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        required
                        placeholder="What's this about?"
                        className="h-12 rounded-xl bg-muted/50 border-border focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Tell me about your project..."
                        rows={5}
                        className="rounded-xl bg-muted/50 border-border focus:border-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base brutal-border"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3">
                          <Send className="w-5 h-5" />
                          Send Message
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
