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
        <h2 className="type-h2 mb-4">
          Got an idea?
        </h2>
        <p className="teal-shimmer mono-heading text-2xl md:text-3xl font-bold mb-6">
          Let's make it real.
        </p>
        <p className="type-body max-w-md mx-auto mb-12">
          I love meeting new people and hearing fresh ideas. Whether it's a project, a collaboration, or just a friendly hello, I'd love to connect.
        </p>

        <a
          href="https://calendly.com/kaushik-jv6/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="retro-btn retro-btn--outline mb-12"
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
          <p className="type-label">
            © {new Date().getFullYear()} Kaushik JV · Designed & engineered with intent
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
