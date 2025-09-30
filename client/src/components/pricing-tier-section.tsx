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
    <section className="py-16 sm:py-24 lg:py-20 bg-muted/30 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        {/* Category Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "p-6 rounded-2xl border-2 transition-all duration-300 text-left",
                selectedCategory === category.id
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border bg-card hover:border-primary/50 hover:shadow-md"
              )}
              data-testid={`category-${category.id}`}
            >
              <h3 className={cn(
                "text-xl font-extrabold mb-2 transition-colors",
                selectedCategory === category.id ? "text-primary" : "text-foreground"
              )}>
                {category.title}
              </h3>
              <p className="text-sm text-muted-foreground">{category.subtitle}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {currentPackage.plans?.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "relative bg-card rounded-2xl p-8 border transition-all duration-300",
                  plan.highlighted
                    ? "border-primary shadow-2xl scale-105"
                    : "border-border shadow-lg hover:shadow-xl"
                )}
                data-testid={`plan-${plan.id}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-extrabold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.for}</p>
                  <div className="text-4xl font-bold text-primary mb-2">{plan.price}</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => onPackageSelect(plan.id)}
                  className={cn(
                    "w-full py-6 rounded-lg font-semibold transition-all duration-300",
                    plan.highlighted
                      ? "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  )}
                  data-testid={`button-${plan.id}`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
