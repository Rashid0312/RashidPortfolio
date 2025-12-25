import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { Send, Github, Linkedin, Mail, CheckCircle, Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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
            animate('.contact-content', {
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 800,
              ease: "outExpo",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    animate(".success-icon", {
      scale: [0, 1.2, 1],
      opacity: [0, 1],
      duration: 600,
      ease: "outBack",
    });

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });

    setTimeout(() => {
      setIsSubmitted(false);
      formRef.current?.reset();
    }, 3000);
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/Rashid0312", label: "GitHub", color: "hover:text-foreground" },
    { icon: Linkedin, href: "https://linkedin.com/in/abdirashiid-sammantar", label: "LinkedIn", color: "hover:text-blue-500" },
    { icon: Mail, href: "mailto:abdirashiidsammatar@gmail.com", label: "Email", color: "hover:text-primary" },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-t from-primary/10 via-secondary/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container-width relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Let's connect</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </div>

        <div className="contact-content opacity-0 max-w-2xl mx-auto">
          {/* Contact form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative p-8 md:p-10 rounded-2xl glass overflow-hidden"
          >
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
            
            <div className="relative z-10 space-y-6">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <CheckCircle className="success-icon w-20 h-20 text-primary mb-6" />
                  <p className="text-2xl font-display font-bold text-foreground mb-2">Message Sent!</p>
                  <p className="text-muted-foreground">I'll get back to you soon.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Your name"
                        className="bg-muted/30 border-border/50 focus:border-primary h-12 rounded-xl"
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
                        className="bg-muted/30 border-border/50 focus:border-primary h-12 rounded-xl"
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
                      placeholder="What's this about?"
                      className="bg-muted/30 border-border/50 focus:border-primary h-12 rounded-xl"
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
                      className="bg-muted/30 border-border/50 focus:border-primary resize-none rounded-xl"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold rounded-xl h-14 text-base transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
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
                      </span>
                    )}
                  </Button>
                </>
              )}
            </div>
          </form>

          {/* Social Links */}
          <div className="flex flex-col items-center mt-16">
            <p className="text-sm text-muted-foreground mb-6">Or find me on</p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-2 px-5 py-3 rounded-full glass ${color} transition-all duration-300 hover:glow-border`}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Abdirashiid Sammantar. Built with{" "}
            <span className="text-primary">♥</span> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;