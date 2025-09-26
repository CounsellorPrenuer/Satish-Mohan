import profileImage from "@assets/profile_1758707452399.jpg";
import { Users, Calendar, Trophy, TrendingUp } from "lucide-react";

interface AboutSectionProps {
  onBookingClick: () => void;
}

export default function AboutSection({ onBookingClick }: AboutSectionProps) {
  const stats = [
    { 
      value: "500+", 
      label: "Clients Guided", 
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Lives Transformed"
    },
    { 
      value: "10+", 
      label: "Years Experience", 
      icon: Calendar,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      description: "Professional Expertise"
    },
    { 
      value: "50+", 
      label: "Workshops", 
      icon: Trophy,
      color: "text-accent",
      bgColor: "bg-accent/10",
      description: "Interactive Sessions"
    },
    { 
      value: "98%", 
      label: "Success Rate", 
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Client Satisfaction"
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <img 
              src={profileImage} 
              alt="Satish Mohan - Career Counselor and Life Coach" 
              className="rounded-2xl shadow-lg w-full"
              data-testid="about-image"
            />
          </div>
          
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-8 sm:mb-10" data-testid="about-title">
              The Innervea Story
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed" data-testid="about-description-1">
              The name itself is a promise: "inner" – your authentic self, and "vea" – the path. Innervea is the path within. It is where clarity meets action, and calm meets ambition. In today's fast-changing world, many feel torn between ambition, personal fulfillment, and inner peace.
            </p>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10 leading-relaxed" data-testid="about-description-2">
              We don't just guide you — we help you transform. Through our unique blend of Career Counselling, Life Coaching, and Meditation, we help you discover the career that truly fits your strengths, break barriers and cultivate confidence, and quiet the mind to gain clarity. With Innervea, success is not just measured in achievements, but in alignment — when your career, your life, and your inner self move together in harmony.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-12">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div 
                    key={index} 
                    className="stat-card bg-gradient-to-br from-background to-muted/30 border border-border/50 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group" 
                    data-testid={`stat-${index}`}
                  >
                    <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`${stat.color} group-hover:scale-110 transition-transform duration-300`} size={28} />
                    </div>
                    <div className={`text-3xl sm:text-4xl font-bold ${stat.color} mb-3 group-hover:scale-105 transition-transform duration-300`}>
                      {stat.value}
                    </div>
                    <div className="text-base sm:text-lg font-semibold text-foreground mb-2">
                      {stat.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.description}
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={onBookingClick} 
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors btn-primary"
              data-testid="about-book-consultation"
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
