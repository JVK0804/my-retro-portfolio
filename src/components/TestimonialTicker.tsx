const testimonials = [
  {
    name: "Kaiwan Savai",
    role: "Associate Director @Kyndryl",
    text: "Kaushik combines technical depth with design intuition, turning complex challenges into seamless, user-centered solutions.",
    avatar: "https://framerusercontent.com/images/qmmaNY6T0EdCcmZJ6zLFjgrsUzs.png?width=371&height=371",
  },
  {
    name: "Chaitanya Jonnalagadda",
    role: "Technical Lead @Health Catalyst",
    text: "Kaushik bridges clients, developers, and users effortlessly, translating real needs into intuitive designs.",
    avatar: "https://framerusercontent.com/images/dsaEgdD5F5cTV0GB58N7N7YNe0.png?width=476&height=476",
  },
  {
    name: "Ventrapragada Sunand",
    role: "Delivery Manager @Deloitte",
    text: "Kaushik's user-centered approach and sharp problem-solving improved both functionality and user satisfaction.",
    avatar: "https://framerusercontent.com/images/nQViSzyEwmHriH1w6jGXRMwNE.png?width=800&height=800",
  },
  {
    name: "Shahil Kalebhai",
    role: "UX Designer @Arkaya",
    text: "Kaushik consistently enhanced usability, performance, and collaboration across teams. Proactive and reliable.",
    avatar: "https://framerusercontent.com/images/Gbw462vtgdgUYdYS6NilgexBb5U.png?width=799&height=800",
  },
];

const TestimonialTicker = () => {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-16 overflow-hidden border-t border-b border-border">
      <p className="font-heading text-xs text-primary text-center mb-8 tracking-widest uppercase">
        What colleagues say
      </p>
      <div className="ticker-scroll">
        {doubled.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className="flex-shrink-0 w-[380px] mx-4 glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
                loading="lazy"
                width={40}
                height={40}
              />
              <div>
                <p className="font-heading text-sm font-bold text-foreground">{t.name}</p>
                <p className="font-body text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              "{t.text}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialTicker;
