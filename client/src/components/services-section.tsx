import { Compass, Heart, Leaf, Users, GraduationCap, Building } from "lucide-react";

interface ServicesSectionProps {
  onServiceSelect: (serviceType: string) => void;
}

const services = [
  {
    id: "career-guidance",
    title: "Career Guidance",
    description: "Navigate your professional path with expert guidance tailored to your unique strengths and aspirations.",
    icon: Compass,
    color: "primary",
    price: "₹2,500"
  },
  {
    id: "life-coaching",
    title: "Life Coaching",
    description: "Unlock your potential and create meaningful change in your personal and professional life.",
    icon: Heart,
    color: "secondary",
    price: "₹3,000"
  },
  {
    id: "meditation",
    title: "Meditation & Mindfulness",
    description: "Find inner peace and clarity through guided meditation and mindfulness practices.",
    icon: Leaf,
    color: "accent",
    price: "₹1,500"
  },
  {
    id: "workshops",
    title: "Workshops & Seminars",
    description: "Interactive group sessions designed to inspire and educate on career and life topics.",
    icon: Users,
    color: "primary",
    price: "₹5,000"
  },
  {
    id: "admission-guidance",
    title: "Admission Guidance",
    description: "Expert assistance for college and course selection to align with your career goals.",
    icon: GraduationCap,
    color: "secondary",
    price: "₹2,000"
  },
  {
    id: "hospitality-consulting",
    title: "Hospitality Consulting",
    description: "Strategic consulting for hospitality businesses and independent director services.",
    icon: Building,
    color: "accent",
    price: "₹10,000"
  }
];

export default function ServicesSection({ onServiceSelect }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="services-title">
            Comprehensive Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="services-description">
            Empowering your journey with personalized guidance across career, life, and spiritual development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.id}
                className="service-card bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => onServiceSelect(service.id)}
                data-testid={`service-card-${service.id}`}
              >
                <div className={`w-16 h-16 bg-${service.color}/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-${service.color}/20 transition-colors`}>
                  <IconComponent className={`text-2xl text-${service.color}`} size={24} />
                </div>
                <h3 className={`text-xl font-semibold mb-4 group-hover:text-${service.color} transition-colors`}>
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className={`text-${service.color} font-semibold text-lg`}>
                    {service.price}
                  </div>
                  <div className={`flex items-center text-${service.color} font-medium group-hover:text-${service.color}/80`}>
                    Book Session 
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
