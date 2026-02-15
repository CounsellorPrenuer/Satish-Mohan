import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Home, Building2, User, BookOpen, Mail, Calendar, CalendarDays } from "lucide-react";
import logoImageStatic from "@assets/logo_1758786484720.jpeg";
import { getLogo } from "@/lib/sanity";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationProps {
  onBookingClick: (serviceType?: string) => void;
}

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'services', label: 'Services', icon: Building2 },
  { id: 'about', label: 'About', icon: User },
  { id: 'events', label: 'Events', icon: CalendarDays },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const services = [
  { title: 'Career Counseling', description: 'Personalized career guidance' },
  { title: 'Life Coaching', description: 'Transform your personal journey' },
  { title: 'Spiritual Guidance', description: 'Discover your inner path' },
];

export default function Navigation({ onBookingClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [location, setLocation] = useLocation();
  const [logoImage, setLogoImage] = useState<string>(logoImageStatic);

  // Fetch logo from Sanity (user may upload a GIF or updated logo)
  useEffect(() => {
    getLogo().then(url => {
      if (url) setLogoImage(url);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Update active section based on scroll position
      const sections = ['home', 'services', 'about', 'blog', 'contact'];
      const sectionElements = sections.map(id => document.getElementById(id));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Ensure light mode only
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    } else {
      sessionStorage.setItem('scrollTo', sectionId);
      if (location !== "/") {
        setLocation("/");
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleBookingClick = () => {
    onBookingClick();
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection('home');
  };

  const NavLink = ({ item, isActive }: { item: typeof navigationItems[0], isActive: boolean }) => (
    <div
      onClick={() => scrollToSection(item.id)}
      className={cn(
        "relative px-4 py-2 text-sm font-medium transition-all duration-300 nav-link-hover cursor-pointer",
        isActive
          ? "text-primary nav-link-active"
          : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
      )}
      data-testid={`nav-${item.id}`}
    >
      {item.label}
    </div>
  );

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 nav-height-transition nav-slide-in",
        isScrolled
          ? "h-16 glass shadow-xl border-b border-white/20"
          : "h-20 bg-white/60 backdrop-blur-md border-b border-transparent"
      )}
      data-testid="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo & Brand */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-3 flex-shrink-0 cursor-pointer"
            data-testid="logo-scroll-top"
            aria-label="Scroll to top"
          >
            <div className="relative group">
              <img
                src={logoImage}
                alt="Innervea Logo"
                className={cn(
                  "w-auto rounded-xl transition-all duration-300 shadow-lg group-hover:shadow-xl",
                  isScrolled ? "h-8" : "h-10"
                )}
                data-testid="brand-logo"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className={cn(
                "font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent transition-all duration-300",
                isScrolled ? "text-lg" : "text-xl"
              )}>
                Innervea
              </h1>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {navigationItems.slice(0, 4).map((item) => (
                  <NavigationMenuItem key={item.id}>
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                          "relative px-4 py-2 text-sm font-medium transition-all duration-300 nav-link-hover",
                          activeSection === item.id
                            ? "text-primary nav-link-active"
                            : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                        )}
                        data-testid={`nav-${item.id}`}
                      >
                        {item.label}
                      </button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <button
                      onClick={() => scrollToSection(navigationItems[4].id)}
                      className={cn(
                        "relative px-4 py-2 text-sm font-medium transition-all duration-300 nav-link-hover",
                        activeSection === navigationItems[4].id
                          ? "text-primary nav-link-active"
                          : "text-gray-700 hover:text-primary"
                      )}
                      data-testid={`nav-${navigationItems[4].id}`}
                    >
                      {navigationItems[4].label}
                    </button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              onClick={handleBookingClick}
              className={cn(
                "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90",
                "text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300",
                "transform hover:scale-105 rounded-full",
                isScrolled ? "px-4 py-2 text-sm" : "px-6 py-2.5 text-base"
              )}
              data-testid="nav-book-session"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book a Free Call
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden w-10 h-10 rounded-xl"
                  data-testid="mobile-menu-toggle"
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full border-b-0">
                <SheetHeader>
                  <SheetTitle className="text-left font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Navigation
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {/* Navigation Links */}
                  <div className="space-y-1">
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={cn(
                            "flex items-center w-full px-4 py-3 text-left rounded-xl transition-all duration-200",
                            activeSection === item.id
                              ? "bg-primary/10 text-primary border border-primary/20"
                              : "text-gray-700 hover:bg-gray-100"
                          )}
                          data-testid={`mobile-nav-${item.id}`}
                        >
                          <Icon className="w-5 h-5 mr-4" />
                          <div>
                            <div className="font-medium">{item.label}</div>
                            {item.id === 'services' && (
                              <div className="text-sm text-gray-500">Career • Life • Spiritual</div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={handleBookingClick}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    data-testid="mobile-nav-book-session"
                  >
                    <Calendar className="w-5 h-5 mr-3" />
                    Book a Free Call
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

    </nav>
  );
}