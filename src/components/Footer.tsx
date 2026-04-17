import { Github, Linkedin, Mail, Calendar } from "lucide-react";

const socialLinks = [
  { icon: Mail, href: "mailto:kaushik.jv6@gmail.com", label: "Email" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/venkata-kaushik-jayanthi-822247124/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/JVK0804", label: "GitHub" },
];

const Footer = () => {
  return (
    <footer id="letsconnect" className="relative py-24 px-6 border-t-2 border-border">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="mono-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
          Got an idea?
        </h2>
        <p className="teal-shimmer mono-heading text-2xl md:text-3xl font-bold mb-6">
          Let's make it real.
        </p>
        <div className="retro-divider w-16 mx-auto mb-8" />
        <p className="font-body text-muted-foreground text-base max-w-md mx-auto mb-12">
          I love meeting new people and hearing fresh ideas. Whether it's a project, a collaboration, or just a friendly hello — I'd love to connect.
        </p>

        <a
          href="https://calendly.com/kaushik-jv6/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 glass-card px-8 py-4 font-heading text-[10px] font-bold tracking-widest uppercase text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300 mb-12"
        >
          <Calendar size={16} />
          Schedule a 30-min call
        </a>

        <div className="flex items-center justify-center gap-4">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-toggle w-11 h-11 text-muted-foreground hover:text-primary"
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t-2 border-border">
          <p className="font-heading text-[8px] tracking-[0.3em] uppercase text-muted-foreground">
            © {new Date().getFullYear()} Kaushik JV — Designed & engineered with intent
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
