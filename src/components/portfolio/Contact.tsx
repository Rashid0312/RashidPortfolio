import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { Send, Github, Linkedin, Mail, CheckCircle, ArrowUpRight, Copy, Check, Calendar, MessageSquare, Globe, Phone } from 'lucide-react';
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

  const email = 'AbdirashiidSammatar@gmail.com';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate('.contact-element', {
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 1000,
              delay: (el, i) => i * 100,
              easing: 'easeOutExpo',
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast({ title: 'Email copied to clipboard', description: email });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Formspree Integration
    // TODO: User must replace this with their own Formspree ID
    // 1. Go to https://formspree.io/
    // 2. Create a new form
    // 3. Copy the form ID (e.g. "mqkrz...") and paste it below
    const FORMSPREE_ID = "YOUR_FORMSPREE_ID_HERE";

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());

      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Success
      setIsSubmitting(false);
      setIsSubmitted(true);

      animate('.success-icon', {
        scale: [0, 1.2, 1],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutBack',
      });

      toast({
        title: 'Message sent successfully',
        description: "Thank you for reaching out. I'll respond within 24 hours.",
      });

      setTimeout(() => {
        setIsSubmitted(false);
        formRef.current?.reset();
      }, 3000);

    } catch (error) {
      console.error("Form error:", error);
      setIsSubmitting(false);
      toast({
        title: 'Error sending message',
        description: "Please try again or email me directly.",
        variant: 'destructive',
      });

      // Fallback to mailto if Formspree fails (or ID is invalid)
      // const mailtoUrl = `mailto:AbdirashiidSammatar@gmail.com?subject=${encodeURIComponent(formData.get('subject') as string)}&body=...`;
      // window.location.href = mailtoUrl;
    }

    // Cleanup animation or state handled in the success block above if fetch succeeds
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: email,
      action: handleCopyEmail,
      actionLabel: copied ? 'Copied!' : 'Copy',
      actionIcon: copied ? Check : Copy,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: 'https://linkedin.com/in/abdirashiid-sammantar',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'View my repositories',
      href: 'https://github.com/Rashid0312',
    },
  ];

  const availabilityInfo = [
    { icon: Calendar, label: 'Response Time', value: '< 24 hours' },
    { icon: Globe, label: 'Location', value: 'Sweden 🇸🇪' },
    { icon: MessageSquare, label: 'Preferred', value: 'Email / LinkedIn' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-dots" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-primary/10 via-secondary/5 to-transparent rounded-full blur-3xl" />

      <div className="container-width relative">
        <div className="contact-element opacity-0 text-center mb-16">
          <span className="tech-badge border-primary/30 text-primary bg-primary/5 mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Interested in DevOps, infrastructure, or AI?
            I'm always open to discussing new opportunities and technical challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            {contactMethods.map(({ icon: Icon, label, value, action, actionLabel, actionIcon: ActionIcon, href }) => (
              <div
                key={label}
                className="contact-element opacity-0 glass-card p-5 group cursor-pointer hover:border-primary/50"
                onClick={action}
              >
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">{value}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors break-all">{value}</p>
                      </div>
                    </div>
                    {ActionIcon && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                        <ActionIcon className="w-4 h-4" />
                        {actionLabel}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="contact-element opacity-0 glass-card p-5">
              <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">
                Availability
              </h4>
              <div className="space-y-3">
                {availabilityInfo.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon className="w-4 h-4" />
                      {label}
                    </div>
                    <span className="text-sm font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm text-accent font-medium">Open to opportunities</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form ref={formRef} onSubmit={handleSubmit} className="contact-element opacity-0 glass-card p-8">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <CheckCircle className="success-icon w-20 h-20 text-accent mb-6" />
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground text-center">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Your name"
                        className="h-12 rounded-xl bg-muted/30 border-border focus:border-primary"
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
                        placeholder="you@company.com"
                        className="h-12 rounded-xl bg-muted/30 border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      placeholder="DevOps opportunity / Collaboration / Other"
                      className="h-12 rounded-xl bg-muted/30 border-border focus:border-primary"
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
                      placeholder="Tell me about your project, infrastructure challenges, or how I can help..."
                      rows={5}
                      className="rounded-xl bg-muted/30 border-border focus:border-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
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
    </section>
  );
};

export default Contact;