import { Link } from "wouter";
import { Instagram, Linkedin, Twitter, Youtube, Facebook } from "lucide-react";
import logoImage from "@assets/logo_1758786484720.jpeg";

interface FooterProps {
  onBookingClick: () => void;
}

export default function Footer({ onBookingClick }: FooterProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <img 
                src={logoImage} 
                alt="Innervea Logo" 
                className="h-16 w-auto rounded-lg"
                data-testid="footer-logo"
              />
            </div>
            <p className="text-white/80 leading-relaxed mb-6">
              Empowering transformation through innovative coaching and holistic guidance.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com/company/innervea" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                data-testid="social-linkedin"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://instagram.com/innervea" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                data-testid="social-instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com/innervea" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                data-testid="social-twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://youtube.com/@innervea" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                data-testid="social-youtube"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="https://facebook.com/innervea" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                data-testid="social-facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <button 
                  onClick={() => scrollToSection("services")} 
                  className="hover:text-white transition-colors"
                >
                  Career Guidance
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("services")} 
                  className="hover:text-white transition-colors"
                >
                  Life Coaching
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("services")} 
                  className="hover:text-white transition-colors"
                >
                  Meditation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("services")} 
                  className="hover:text-white transition-colors"
                >
                  Workshops
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <button 
                  onClick={() => scrollToSection("about")} 
                  className="hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("blog")} 
                  className="hover:text-white transition-colors"
                >
                  Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("contact")} 
                  className="hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button 
                  onClick={onBookingClick} 
                  className="hover:text-white transition-colors"
                >
                  Book Session
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Admin Access</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link href="/admin/bookings" className="hover:text-white transition-colors">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/blogs" className="hover:text-white transition-colors">
                  Blog Management
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/80">© 2024 Innervea. All rights reserved.</p>
          <br />
          <p className="text-white/70 text-sm" data-testid="text-partnership-mentoria">In partnership with Mentoria for enhanced career guidance services.</p>
        </div>
      </div>
    </footer>
  );
}
