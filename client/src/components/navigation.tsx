import { useState, useEffect } from "react";
import { Link } from "wouter";

interface NavigationProps {
  onBookingClick: () => void;
}

export default function Navigation({ onBookingClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border transition-all duration-300 ${
        isScrolled ? "bg-white/98 backdrop-blur-md" : "bg-white/95 backdrop-blur-md"
      }`}
      data-testid="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <span className="font-bold text-xl text-foreground">CareerClarity</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("home")} 
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("services")} 
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-services"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("about")} 
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-about"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("blog")} 
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-blog"
            >
              Blog
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-contact"
            >
              Contact
            </button>
            <button 
              onClick={onBookingClick} 
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium btn-primary"
              data-testid="nav-book-session"
            >
              Book Session
            </button>
          </div>

          <button className="md:hidden" data-testid="mobile-menu-toggle">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
