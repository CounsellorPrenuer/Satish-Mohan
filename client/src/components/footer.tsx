import { Link } from "wouter";

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
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <span className="font-bold text-xl">Career Clarity</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Guiding careers, inspiring lives through holistic counseling and life coaching.
            </p>
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
                <Link href="/admin/bookings">
                  <a className="hover:text-white transition-colors">Admin Dashboard</a>
                </Link>
              </li>
              <li>
                <Link href="/admin/blogs">
                  <a className="hover:text-white transition-colors">Blog Management</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/80">© 2024 Career Clarity by Satish. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
