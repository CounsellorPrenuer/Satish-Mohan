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
            className="lg:hidden flex items-center justify-center w-12 h-12 rounded-2xl bg-white/80 hover:bg-white shadow-md hover:shadow-lg backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 transform hover:scale-105" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute h-0.5 w-6 bg-gray-700 transition-all duration-300 ease-out ${isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
              <span className={`absolute h-0.5 w-6 bg-gray-700 transition-all duration-300 ease-out top-3 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute h-0.5 w-6 bg-gray-700 transition-all duration-300 ease-out ${isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <>
        {/* Backdrop */}
        <div 
          className={`lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-all duration-500 ease-out ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Mobile Menu */}
        <div 
          className={`lg:hidden fixed top-16 sm:top-18 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-100/50 z-50 transition-all duration-500 ease-out transform ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`} 
          data-testid="mobile-menu"
        >
          <div className="max-w-md mx-auto px-8 py-10">
            {/* Navigation Links */}
            <div className="space-y-2 mb-10">
                {[
                  { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                  { id: 'services', label: 'Services', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
                  { id: 'about', label: 'About', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                  { id: 'blog', label: 'Blog', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
                  { id: 'contact', label: 'Contact', icon: 'M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
                ].map((item, index) => (
                  <button 
                    key={item.id}
                    onClick={() => scrollToSection(item.id)} 
                    className={`flex items-center w-full py-5 px-6 text-left text-gray-700 hover:text-primary hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 rounded-2xl transition-all duration-300 font-semibold text-lg transform hover:scale-[1.02] hover:shadow-md ${
                      isMobileMenuOpen ? 'animate-slide-in' : ''
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    data-testid={`mobile-nav-${item.id}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mr-4 group-hover:bg-primary/10 transition-colors">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    {item.label}
                  </button>
                ))}
              </div>
              
              {/* CTA Button */}
              <button 
                onClick={handleBookingClick} 
                className={`w-full bg-gradient-to-r from-primary to-secondary text-white py-5 px-8 rounded-2xl font-bold text-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.03] flex items-center justify-center border border-white/20 ${
                  isMobileMenuOpen ? 'animate-slide-in' : ''
                }`}
                style={{ animationDelay: '300ms' }}
                data-testid="mobile-nav-book-session"
              >
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                Book Session
              </button>
            </div>
          </div>
        </>
    </nav>
  );
}