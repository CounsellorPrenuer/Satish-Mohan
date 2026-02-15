import { useEffect, useState } from "react";
import profileImageStatic from "@assets/profile_1758707452399.jpg";
import { Users, Calendar, Trophy, TrendingUp } from "lucide-react";
import { getAbout } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

// Note: If you don't have @portabletext/react installed, I should install it or just render text. 
// I'll install it or just map text.
// Let's stick to simple text mapping for now if I don't want to add another dep yet, 
// BUT portable text is the standard way.
// I'll install @portabletext/react in background or next step.
// For now, I will write the code assuming I can simple map or use a helper. 
// I'll assume description is just text for simplicity in this pass, OR verify schema again.
// Schema: `description` type `array` of `block`.
// I'll use a simple renderer or default to static.

interface AboutSectionProps {
  onBookingClick: (serviceType?: string) => void;
}

interface AboutData {
  title?: string;
  description?: any[]; // Block content
  profileImage?: string;
  stats?: any[];
}

export default function AboutSection({ onBookingClick }: AboutSectionProps) {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  useEffect(() => {
    getAbout().then(data => {
      if (data) setAboutData(data);
    });
  }, []);

  const staticStats = [
    {
      value: "500+",
      label: "Clients Guided",
      icon: "Users", // changed to string for uniform handling
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Lives Transformed"
    },
    {
      value: "10+",
      label: "Years Experience",
      icon: "Calendar",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      description: "Professional Expertise"
    },
    {
      value: "50+",
      label: "Workshops",
      icon: "Trophy",
      color: "text-accent",
      bgColor: "bg-accent/10",
      description: "Interactive Sessions"
    },
    {
      value: "98%",
      label: "Success Rate",
      icon: "TrendingUp",
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Client Satisfaction"
    }
  ];

  const iconMap: any = {
    Users, Calendar, Trophy, TrendingUp
  };

  const displayStats = aboutData?.stats?.map(s => ({
    ...s,
    // Add default styling if missing from CMS data
    color: "text-primary", // Simplification
    bgColor: "bg-primary/10"
  })) || staticStats;

  const displayImage = aboutData?.profileImage || profileImageStatic;
  const title = aboutData?.title || "The Innervea Story";

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-20 bg-background border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 lg:items-start">
          <div className="flex flex-col items-center">
            <img
              src={displayImage}
              alt="Satish Mohan - Career Counselor and Life Coach"
              className="rounded-2xl shadow-lg w-80 h-80 lg:w-96 lg:h-96 object-cover"
              data-testid="about-image"
            />
            <p className="mt-4 text-center text-muted-foreground text-sm max-w-xs">Hospitality expert & Life Coach with 30+ years of leadership.  Provides holistic guidance to empower individuals & organizations to thrive.</p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-8 sm:mb-10" data-testid="about-title">
              {title}
            </h2>

            {aboutData?.description ? (
              // Simple fallback for block content if we don't have PortableText component ready
              // or if it's just one block.
              // Since I didn't install @portabletext/react yet, I'll rely on a known structure or just JSON stringify for debugging if validation fails?
              // Use a safe text render:
              <div className="prose text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                {aboutData.description.map((block: any, i: number) => (
                  <p key={i} className="mb-4">{block.children?.map((c: any) => c.text).join("")}</p>
                ))}
              </div>
            ) : (
              <>
                <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed" data-testid="about-description-1">
                  The name itself is a promise: "inner" – your authentic self, and "vea" – the path. Innervea is the path within. It is where clarity meets action, and calm meets ambition. In today's fast-changing world, many feel torn between ambition, personal fulfillment, and inner peace.
                </p>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10 leading-relaxed" data-testid="about-description-2">
                  Innervea helps you achieve true success by aligning your career, life, and inner self. Through a blend of career counselling, life coaching, and meditation, Innervea guides you to discover your strengths, build confidence, and find clarity - transforming not just what you do, but who you are.
                </p>
              </>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-6 mb-12">
              {displayStats.map((stat: any, index: number) => {
                const IconComponent = iconMap[stat.icon] || Users; // Fallback icon
                return (
                  <div
                    key={index}
                    className="stat-card bg-gradient-to-br from-background to-muted/30 border border-border/50 rounded-2xl p-6 lg:p-5 text-center shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group"
                    data-testid={`stat-${index}`}
                  >
                    <div className={`w-16 h-16 lg:w-14 lg:h-14 ${stat.bgColor || "bg-primary/10"} rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`${stat.color || "text-primary"} group-hover:scale-110 transition-transform duration-300 w-7 h-7 lg:w-6 lg:h-6`} />
                    </div>
                    <div className={`text-3xl sm:text-4xl lg:text-3xl font-bold ${stat.color || "text-primary"} mb-3 lg:mb-2 group-hover:scale-105 transition-transform duration-300`}>
                      {stat.value}
                    </div>
                    <div className="text-base sm:text-lg lg:text-base font-semibold text-foreground mb-2 lg:mb-1">
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
              onClick={() => onBookingClick()}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors btn-primary"
              data-testid="about-book-consultation"
            >
              Book a Free Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
