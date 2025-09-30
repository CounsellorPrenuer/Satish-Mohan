import { Compass, Heart, Leaf, Users, GraduationCap, Building } from "lucide-react";

interface ServicesSectionProps {
  onServiceSelect: (serviceType: string) => void;
}

const colorStyles = {
  primary: {
    iconBg: "bg-primary/10 hover:bg-primary/20",
    iconColor: "text-primary",
    titleHover: "group-hover:text-primary",
    price: "text-primary",
    button: "text-primary group-hover:text-primary/80",
    gradient: "from-primary/5 to-primary/20"
  },
  secondary: {
    iconBg: "bg-secondary/10 hover:bg-secondary/20",
    iconColor: "text-secondary",
    titleHover: "group-hover:text-secondary",
    price: "text-secondary",
    button: "text-secondary group-hover:text-secondary/80",
    gradient: "from-secondary/5 to-secondary/20"
  },
  accent: {
    iconBg: "bg-accent/10 hover:bg-accent/20",
    iconColor: "text-accent",
    titleHover: "group-hover:text-accent",
    price: "text-accent",
    button: "text-accent group-hover:text-accent/80",
    gradient: "from-accent/5 to-accent/20"
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
    <section id="services" className="py-16 sm:py-24 lg:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 sm:mb-8" data-testid="services-title">
            Comprehensive Services
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4" data-testid="services-description">
            Where clarity meets action, and calm meets ambition. Discover, transform, and align your path with personalized guidance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            const styles = colorStyles[service.color as keyof typeof colorStyles];
            return (
              <div 
                key={service.id}
                className={`service-card relative bg-gradient-to-br ${styles.gradient} bg-card border border-border/50 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer transform hover:-translate-y-2 ${service.featured ? 'ring-2 ring-primary/20' : ''}`}
                onClick={() => onServiceSelect(service.id)}
                data-testid={`service-card-${service.id}`}
              >
                {service.featured && (
                  <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                    Popular
                  </div>
                )}
                <div className={`w-20 h-20 ${styles.iconBg} rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <IconComponent className={`${styles.iconColor} transition-all duration-300`} size={28} />
                </div>
                <h3 className={`text-xl sm:text-2xl font-extrabold mb-4 ${styles.titleHover} transition-colors duration-300`}>
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <div className={`${styles.price} font-bold text-xl sm:text-2xl`}>
                    {service.price}
                  </div>
                  <div className={`flex items-center ${styles.button} font-semibold text-sm group-hover:gap-2 transition-all duration-300`}>
                    {(service as any).isQueryForm ? 'Send Query' : 'Book Now'}
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
