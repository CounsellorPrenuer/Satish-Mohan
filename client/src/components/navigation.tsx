import { useState, useEffect } from "react";
import { Link } from "wouter";
import logoImage from "@assets/logo-clarity_1758707529304.png";

interface NavigationProps {
  onBookingClick: () => void;
}

export default function Navigation({ onBookingClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const handleBookingClick = () => {
    onBookingClick();
    setIsMobileMenuOpen(false); // Close mobile menu after booking
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-white/90 backdrop-blur-md"
      }`}
      data-testid="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img 
              src={logoImage} 
              alt="Career Clarity Logo" 
              className="h-10 sm:h-12 w-auto rounded-lg"
              data-testid="brand-logo"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <button 
              onClick={() => scrollToSection("home")} 
              className="text-gray-700 hover:text-primary transition-colors font-medium text-sm xl:text-base"
              data-testid="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("services")} 
              className="text-gray-700 hover:text-primary transition-colors font-medium text-sm xl:text-base"
              data-testid="nav-services"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("about")} 
              className="text-gray-700 hover:text-primary transition-colors font-medium text-sm xl:text-base"
              data-testid="nav-about"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("blog")} 
              className="text-gray-700 hover:text-primary transition-colors font-medium text-sm xl:text-base"
              data-testid="nav-blog"
            >
              Blog
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="text-gray-700 hover:text-primary transition-colors font-medium text-sm xl:text-base"
              data-testid="nav-contact"
            >
              Contact
            </button>
            <button 
              onClick={handleBookingClick} 
              className="bg-gradient-to-r from-primary to-secondary text-white px-4 xl:px-6 py-2 xl:py-2.5 rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-sm xl:text-base"
              data-testid="nav-book-session"
            >
              Book Session
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden relative z-50 flex flex-col items-center justify-center w-10 h-10 group" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 mt-1.5 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 mt-1.5 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Mobile Menu Panel */}
        <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`} data-testid="mobile-menu">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <img 
                src={logoImage} 
                alt="Career Clarity Logo" 
                className="h-8 w-auto"
              />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Navigation Links */}
            <div className="flex-1 px-6 py-8">
              <nav className="space-y-2">
                <button 
                  onClick={() => scrollToSection("home")} 
                  className="w-full text-left py-3 px-4 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  data-testid="mobile-nav-home"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection("services")} 
                  className="w-full text-left py-3 px-4 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  data-testid="mobile-nav-services"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection("about")} 
                  className="w-full text-left py-3 px-4 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  data-testid="mobile-nav-about"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection("blog")} 
                  className="w-full text-left py-3 px-4 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  data-testid="mobile-nav-blog"
                >
                  Blog
                </button>
                <button 
                  onClick={() => scrollToSection("contact")} 
                  className="w-full text-left py-3 px-4 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  data-testid="mobile-nav-contact"
                >
                  Contact
                </button>
              </nav>
            </div>
            
            {/* Bottom CTA */}
            <div className="p-6 border-t border-gray-100">
              <button 
                onClick={handleBookingClick} 
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                data-testid="mobile-nav-book-session"
              >
                Book Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}