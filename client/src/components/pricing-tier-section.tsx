import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingTierSectionProps {
  onPackageSelect: (packageId: string) => void;
}

interface Feature {
  text: string;
  included: boolean;
}

interface PackagePlan {
  id: string;
  name: string;
  price: string;
  for: string;
  features: Feature[];
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
    id: "8-9-students",
    title: "8-9 STUDENTS",
    subtitle: "Early career exploration & foundation building",
  },
  {
    id: "10-12-students",
    title: "10-12 STUDENTS",
    subtitle: "Strategic career planning & college preparation",
  },
  {
    id: "college-graduates",
    title: "COLLEGE GRADUATES",
    subtitle: "Career launch & professional positioning",
  },
  {
    id: "working-professionals",
    title: "WORKING PROFESSIONALS",
    subtitle: "Career growth & strategic advancement",
  },
];

const packages: Record<string, PackageContent> = {
  "8-9-students": {
    heading: "Packages for 8-9 Students",
    subheading: "Early career exploration & foundation building",
    plans: [
      {
        id: "8-9-discover",
        name: "Discover",
        price: "₹5,500",
        for: "Standard Package",
        features: [
          { text: "Psychometric assessment to measure your interests", included: true },
          { text: "1 career counselling session with Mentoria's expert career coaches", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Invites to live webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV building during internship/graduation", included: false },
        ],
        buttonText: "BUY NOW",
      },
      {
        id: "8-9-discover-plus",
        name: "Discover plus+",
        price: "₹15,000",
        for: "Premium Package",
        features: [
          { text: "Psychometric assessments to measure your interests, personality and abilities", included: true },
          { text: "8 career counselling sessions (1 every year) with Mentoria's expert career coaches until graduation", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Invites to live webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV building during internship/graduation", included: true },
        ],
        buttonText: "BUY NOW",
        highlighted: true,
      },
    ],
  },
  "10-12-students": {
    heading: "Packages for 10-12 Students",
    subheading: "Strategic career planning & college preparation",
    plans: [
      {
        id: "10-12-achieve-online",
        name: "Achieve Online",
        price: "₹5,999",
        for: "Standard Package",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "1 career counselling session", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Pre-recorded webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV reviews during internship/graduation", included: false },
        ],
        buttonText: "BUY NOW",
      },
      {
        id: "10-12-achieve-plus",
        name: "Achieve Plus+",
        price: "₹10,599",
        for: "Premium Package",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "4 career counselling sessions", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Attend live webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV reviews during internship/graduation", included: true },
        ],
        buttonText: "BUY NOW",
        highlighted: true,
      },
    ],
  },
  "college-graduates": {
    heading: "Packages for College Graduates",
    subheading: "Career launch & professional positioning",
    plans: [
      {
        id: "graduates-ascend-online",
        name: "Ascend Online",
        price: "₹6,499",
        for: "Standard Package",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "1 career counselling session", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Pre-recorded webinars by industry experts", included: true },
          { text: "Customized reports after each session with information on certificate/online courses", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV reviews for job application", included: false },
        ],
        buttonText: "BUY NOW",
      },
      {
        id: "graduates-ascend-plus",
        name: "Ascend Plus+",
        price: "₹10,599",
        for: "Premium Package",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "3 career counselling sessions", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Attend live webinars by industry experts", included: true },
          { text: "Customized reports after each session with information on certificate/online courses", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV reviews for job application", included: true },
        ],
        buttonText: "BUY NOW",
        highlighted: true,
      },
    ],
  },
  "working-professionals": {
    heading: "Packages for Working Professionals",
    subheading: "Career growth & strategic advancement",
    plans: [
      {
        id: "professionals-ascend-online",
        name: "Ascend Online",
        price: "₹6,499",
        for: "Standard Package",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "1 career counselling session", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Pre-recorded webinars by industry experts", included: true },
          { text: "Customized reports after each session with information on certificate/online courses", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV reviews for job application", included: false },
        ],
        buttonText: "BUY NOW",
      },
      {
        id: "professionals-ascend-plus",
        name: "Ascend Plus+",
        price: "₹10,599",
        for: "Premium Package",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "2 career counselling sessions", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Attend live webinars by industry experts", included: true },
          { text: "Customized reports after each session with information on certificate/online courses", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV reviews for job application", included: true },
        ],
        buttonText: "BUY NOW",
        highlighted: true,
      },
    ],
  },
};

export default function PricingTierSection({ onPackageSelect }: PricingTierSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("8-9-students");

  const currentPackage = packages[selectedCategory];

  return (
    <section className="py-16 sm:py-24 lg:py-20 bg-muted/30 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        {/* Category Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
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
                      {feature.included ? (
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={cn(
                        "text-sm",
                        feature.included ? "text-muted-foreground" : "text-muted-foreground/60 line-through"
                      )}>
                        {feature.text}
                      </span>
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
