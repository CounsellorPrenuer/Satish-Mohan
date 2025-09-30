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
          /* Pricing Plans */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {currentPackage.plans?.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "relative group bg-card rounded-3xl p-10 border-2 transition-all duration-500 overflow-hidden",
                  plan.highlighted
                    ? "border-primary shadow-2xl scale-105 hover:scale-110 bg-gradient-to-br from-primary/5 to-transparent"
                    : "border-border/30 shadow-xl hover:shadow-2xl hover:scale-105 hover:border-primary/50"
                )}
                data-testid={`plan-${plan.id}`}
              >
                {/* Decorative glow effect */}
                {plan.highlighted && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent opacity-50"></div>
                )}
                
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary via-secondary to-primary text-white px-8 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    ⭐ Most Popular
                  </div>
                )}
                
                <div className="relative text-center mb-8">
                  <h3 className="text-3xl font-extrabold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{plan.name}</h3>
                  <p className="text-base text-muted-foreground mb-6">{plan.for}</p>
                  <div className="inline-block">
                    <div className="text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">{plan.price}</div>
                    <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                  </div>
                </div>

                <ul className="relative space-y-5 mb-10">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-4 group/item">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-primary/20 transition-colors">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-base text-muted-foreground group-hover/item:text-foreground transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => onPackageSelect(plan.id)}
                  className={cn(
                    "relative w-full py-7 rounded-xl font-bold text-base transition-all duration-500 overflow-hidden group/button",
                    plan.highlighted
                      ? "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg"
                  )}
                  data-testid={`button-${plan.id}`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {plan.buttonText}
                    <svg className="w-5 h-5 group-hover/button:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
