import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export function CookieConsentModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookie-consent");
    if (!hasConsented) {
      setIsOpen(true);
    }
  }, []);

  const handleConsent = (type: "essential" | "preferences" | "all") => {
    localStorage.setItem("cookie-consent", type);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] gap-6">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold mb-2">
                We value your privacy
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground leading-relaxed">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking "Accept All", you consent to our use of cookies.{" "}
                <a 
                  href="/privacy-policy" 
                  className="text-primary hover:underline font-medium"
                  data-testid="link-learn-more"
                >
                  Learn more
                </a>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button
            variant="outline"
            onClick={() => handleConsent("essential")}
            className="w-full sm:w-auto"
            data-testid="button-essential-only"
          >
            Essential Only
          </Button>
          <Button
            variant="outline"
            onClick={() => handleConsent("preferences")}
            className="w-full sm:w-auto"
            data-testid="button-preferences"
          >
            Preferences
          </Button>
          <Button
            onClick={() => handleConsent("all")}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            data-testid="button-accept-all"
          >
            Accept All
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
