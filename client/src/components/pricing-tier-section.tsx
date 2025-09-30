import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingTierSectionProps {
  onPackageSelect: (packageId: string) => void;
}

interface PackagePlan {
  id: string;
  name: string;
  price: string;
  for: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
}

interface PackageContent {
  heading: string;
  subheading: string;
  plans?: PackagePlan[];
  comingSoon?: boolean;
  message?: string;
  buttonText?: string;
}

const categories = [
  {
    id: "freshers",
    title: "Freshers",
    subtitle: "Strategic career foundation & professional readiness",
  },
  {
    id: "middle-management",
    title: "Middle Management",
    subtitle: "Leadership development & strategic advancement",
  },
  {
    id: "senior-professionals",
    title: "Senior Professionals",
    subtitle: "Executive transformation & C-suite positioning",
  },
];

const packages: Record<string, PackageContent> = {
  freshers: {
    heading: "Packages for Freshers",
    subheading: "Strategic career foundation & professional readiness",
    plans: [
      {
        id: "freshers-ascend",
        name: "Ascend",
        price: "₹6,499",
        for: "For College Graduates",
        features: [
          "Psychometric assessment to measure your interests, personality and abilities",
          "1 career coaching session for specialisation/job selection",
          "Lifetime access to Knowledge Gateway",
          "Pre-recorded webinars by industry experts",
        ],
        buttonText: "Choose Ascend",
      },
      {
        id: "freshers-ascend-plus",
        name: "Ascend Plus",
        price: "₹10,599",
        for: "For College Graduates",
        features: [
          "Psychometric assessment to measure your interests, personality and abilities",
          "3 career coaching sessions",
          "Lifetime access to Knowledge Gateway",
          "Guidance on Masters' admissions in India and abroad",
          "CV reviews during internships/graduation",
          "Guidance until you get into the job you love",
          "Career helpline access",
        ],
        buttonText: "Choose Ascend Plus",
        highlighted: true,
      },
    ],
  },
  "middle-management": {
    heading: "Packages for Middle Management",
    subheading: "Leadership development & strategic advancement",
    plans: [
      {
        id: "middle-ascend",
        name: "Ascend",
        price: "₹6,499",
        for: "For Working Professionals",
        features: [
          "Psychometric assessment to measure your interests, personality and abilities",
          "1 career coaching session focused on career transition, growth and upskilling",
          "Lifetime access to Knowledge Gateway",
          "Pre-recorded webinars by industry experts",
        ],
        buttonText: "Choose Ascend",
      },
      {
        id: "middle-ascend-plus",
        name: "Ascend Plus",
        price: "₹10,599",
        for: "For Working Professionals",
        features: [
          "Psychometric assessment to measure your interests, personality and abilities",
          "3 career coaching sessions",
          "Lifetime access to Knowledge Gateway",
          "CV reviews and Interview Prep",
          "Guidance until you get into the job you love",
          "Career helpline access",
        ],
        buttonText: "Choose Ascend Plus",
        highlighted: true,
      },
    ],
  },
  "senior-professionals": {
    heading: "Packages for Senior Professionals",
    subheading: "Executive transformation & C-suite positioning",
    comingSoon: true,
    message: "We're preparing specialized packages for senior professionals.",
    buttonText: "Get Notified When Available",
  },
};

export default function PricingTierSection({ onPackageSelect }: PricingTierSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("freshers");

  const currentPackage = packages[selectedCategory];

  return (
    <section className="relative py-16 sm:py-24 lg:py-20 bg-muted/30 border-t border-border/40 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        {/* Category Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "relative p-8 rounded-3xl border-2 transition-all duration-500 text-left group overflow-hidden",
                selectedCategory === category.id
                  ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-2xl scale-105"
                  : "border-border/30 bg-card hover:border-primary/40 hover:shadow-xl hover:scale-102"
              )}
              data-testid={`category-${category.id}`}
            >
              {selectedCategory === category.id && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
              )}
              <h3 className={cn(
                "relative text-2xl font-extrabold mb-3 transition-all duration-300",
                selectedCategory === category.id ? "text-primary" : "text-foreground group-hover:text-primary"
              )}>
                {category.title}
              </h3>
              <p className="relative text-base text-muted-foreground">{category.subtitle}</p>
              {selectedCategory === category.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Content Area */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4" data-testid="pricing-heading">
            {currentPackage.heading}
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="pricing-subheading">
            {currentPackage.subheading}
          </p>
        </div>

        {currentPackage.comingSoon ? (
          /* Coming Soon Content */
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="bg-muted/30 rounded-2xl p-12 border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-4">Packages Coming Soon</h3>
              <p className="text-lg text-muted-foreground mb-8">{currentPackage.message}</p>
              <Button
                onClick={() => onPackageSelect("senior-professionals-notify")}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold px-8 py-3 rounded-lg"
                data-testid="button-notify"
              >
                {currentPackage.buttonText}
              </Button>
            </div>
          </div>
        ) : (
        )}
      </div>
    </section>
  );
}
