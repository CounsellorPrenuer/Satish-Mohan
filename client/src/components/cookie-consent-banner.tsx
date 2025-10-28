import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, X } from "lucide-react";

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookie-consent");
    if (!hasConsented) {
      setTimeout(() => setIsVisible(true), 500);
    }
  }, []);

  const handleConsent = (type: "essential" | "preferences" | "all") => {
    localStorage.setItem("cookie-consent", type);
    setIsVisible(false);
  };

  const handleClose = () => {
    localStorage.setItem("cookie-consent", "dismissed");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500"
      data-testid="cookie-consent-banner"
    >
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Icon and Message */}
            <div className="flex items-start gap-4 flex-1">
              <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex-shrink-0">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">
                  We value your privacy
                </h3>
                <p className="text-sm text-muted-foreground">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                  By clicking "Accept All", you consent to our use of cookies.{" "}
                  <a 
                    href="/privacy-policy" 
                    className="text-primary hover:underline font-medium"
                    data-testid="link-learn-more"
                  >
                    Learn more
                  </a>
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button
                variant="outline"
                onClick={() => handleConsent("essential")}
                className="w-full sm:w-auto whitespace-nowrap"
                data-testid="button-essential-only"
              >
                Essential Only
              </Button>
              <Button
                variant="outline"
                onClick={() => handleConsent("preferences")}
                className="w-full sm:w-auto whitespace-nowrap"
                data-testid="button-preferences"
              >
                Preferences
              </Button>
              <Button
                onClick={() => handleConsent("all")}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
                data-testid="button-accept-all"
              >
                Accept All
              </Button>
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 lg:relative lg:top-0 lg:right-0 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Close"
              data-testid="button-close"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
