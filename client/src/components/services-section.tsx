import { Compass, Heart, Leaf, Users, GraduationCap, Building } from "lucide-react";

interface ServicesSectionProps {
  onServiceSelect: (serviceType: string) => void;
}

const colorStyles = {
  primary: {
    iconBg: "bg-gradient-to-br from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20",
    iconColor: "text-primary",
    titleHover: "group-hover:text-primary",
    price: "text-primary",
    button: "text-primary group-hover:text-primary/80",
    gradient: "from-primary/10 via-primary/5 to-transparent",
    accent: "bg-primary/5",
    glow: "group-hover:shadow-primary/20"
  },
  secondary: {
    iconBg: "bg-gradient-to-br from-secondary/20 to-secondary/10 hover:from-secondary/30 hover:to-secondary/20",
    iconColor: "text-secondary",
    titleHover: "group-hover:text-secondary",
    price: "text-secondary",
    button: "text-secondary group-hover:text-secondary/80",
    gradient: "from-secondary/10 via-secondary/5 to-transparent",
    accent: "bg-secondary/5",
    glow: "group-hover:shadow-secondary/20"
  },
  accent: {
    iconBg: "bg-gradient-to-br from-accent/20 to-accent/10 hover:from-accent/30 hover:to-accent/20",
    iconColor: "text-accent",
    titleHover: "group-hover:text-accent",
    price: "text-accent",
    button: "text-accent group-hover:text-accent/80",
    gradient: "from-accent/10 via-accent/5 to-transparent",
    accent: "bg-accent/5",
    glow: "group-hover:shadow-accent/20"
  }
};

const services = [
  {
    id: "life-coaching",
    title: "Life Coaching",
    description: "Unlock your potential and create meaningful change in your personal and professional life.",
    icon: Heart,
    color: "secondary",
    price: "₹3,000",
    featured: true
  },
  {
    id: "meditation",
    title: "Meditation & Mindfulness",
    description: "Find inner peace and clarity through guided meditation and mindfulness practices.",
    icon: Leaf,
    color: "accent",
    price: "₹997",
    featured: false
  },
  {
    id: "workshops",
    title: "Workshops & Seminars",
    description: "Interactive group sessions designed to inspire and educate on career and life topics.",
    icon: Users,
    color: "primary",
    price: "Contact for Details",
    featured: false,
    isQueryForm: true
  },
  {
    id: "hospitality-consulting",
    title: "Hospitality Consulting",
    description: "Strategic consulting for hospitality businesses and independent director services.",
    icon: Building,
    color: "accent",
    price: "Contact for Details",
    featured: false,
    isQueryForm: true
  }
];

export default function ServicesSection({ onServiceSelect }: ServicesSectionProps) {
  return (
    <section id="services" className="relative py-16 sm:py-24 lg:py-20 bg-background border-t border-border/40 overflow-hidden">
      {/* Decorative background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 sm:mb-8" data-testid="services-title">
            Comprehensive Services
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4" data-testid="services-description">
            Where clarity meets action, and calm meets ambition. Discover, transform, and align your path with personalized guidance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            const styles = colorStyles[service.color as keyof typeof colorStyles];
            return (
              <div 
                key={service.id}
                className={`service-card relative overflow-hidden bg-gradient-to-br ${styles.gradient} bg-card border-2 border-border/30 hover:border-${service.color}/30 rounded-3xl p-8 sm:p-10 shadow-xl hover:shadow-2xl ${styles.glow} transition-all duration-500 group cursor-pointer transform hover:-translate-y-3 hover:scale-[1.02] ${service.featured ? 'ring-2 ring-primary/30' : ''}`}
                onClick={() => onServiceSelect(service.id)}
                data-testid={`service-card-${service.id}`}
              >
                {/* Decorative background shape */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 ${styles.accent} rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500`}></div>
                <div className={`absolute -bottom-10 -left-10 w-32 h-32 ${styles.accent} rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></div>
                
                {service.featured && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-lg animate-pulse">
                    ⭐ Popular
                  </div>
                )}
                <div className={`relative w-24 h-24 ${styles.iconBg} rounded-3xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg`}>
                  <IconComponent className={`${styles.iconColor} transition-all duration-500 group-hover:scale-110`} size={32} />
                </div>
                <h3 className={`relative text-2xl sm:text-3xl font-extrabold mb-4 ${styles.titleHover} transition-colors duration-300`}>
                  {service.title}
                </h3>
                <p className="relative text-muted-foreground/90 mb-8 leading-relaxed text-base">
                  {service.description}
                </p>
                <div className="relative flex items-center justify-between pt-6 border-t-2 border-border/20 group-hover:border-${service.color}/20 transition-colors duration-300">
                  <div className={`${styles.price} font-extrabold text-2xl sm:text-3xl drop-shadow-sm`}>
                    {service.price}
                  </div>
                  <div className={`flex items-center gap-2 ${styles.button} font-bold text-sm group-hover:gap-3 transition-all duration-300`}>
                    <span>{(service as any).isQueryForm ? 'Send Query' : 'Book Now'}</span>
                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
