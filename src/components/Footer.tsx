import { Github, Linkedin, Mail, Calendar } from "lucide-react";

const socialLinks = [
  { icon: Mail, href: "mailto:kaushik.jv6@gmail.com", label: "Email" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/venkata-kaushik-jayanthi-822247124/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/KaushikJV/MyBoltProject", label: "GitHub" },
];

const Footer = () => {
  return (
    <footer id="letsconnect" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="mono-heading text-4xl md:text-6xl font-bold text-foreground mb-4">
          Let's Talk
        </h2>
        <p className="teal-shimmer mono-heading text-3xl md:text-5xl font-bold mb-6">
          Design!
        </p>
        <p className="font-body text-muted-foreground text-lg max-w-md mx-auto mb-12">
          For the clutter free future & to make design feel personal. Feel free to reach out.
        </p>

        {/* Calendly CTA */}
        <a
          href="https://calendly.com/kaushik-jv6/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 glass-card px-8 py-4 font-mono text-sm font-bold text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300 mb-12"
        >
          <Calendar size={18} />
          Schedule a 30-min call
        </a>

        {/* Social Glass Toggles */}
        <div className="flex items-center justify-center gap-4">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-toggle w-12 h-12 text-muted-foreground hover:text-primary"
              aria-label={label}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Kaushik JV. Designed & engineered with intent.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
