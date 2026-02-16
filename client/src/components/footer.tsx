import { Link } from "wouter";
import { Instagram, Linkedin, Twitter, Youtube, Facebook } from "lucide-react";
import logoImage from "@assets/logo_1758786484720.jpeg";

interface FooterProps {
  onBookingClick: (serviceType?: string) => void;
}

export default function Footer({ onBookingClick }: FooterProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-white py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <img
                src={logoImage}
                alt="Innervea Logo"
                className="h-16 w-auto rounded-xl shadow-lg border border-white/10 object-contain"
                data-testid="footer-logo"
              />
            </div>
            <h4 className="text-xl font-semibold mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Innervea
            </h4>
            <p className="text-white/75 leading-relaxed mb-6 text-sm">
              Empowering transformation through innovative coaching and holistic guidance. The path within to purpose and growth.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.linkedin.com/company/innervea/"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-11 h-11 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 transform hover:scale-110 hover:shadow-lg border border-white/10 hover:border-white/20"
                data-testid="social-linkedin"
              >
                <Linkedin size={18} className="group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/innervea_25?igsh=MTV4eXBtcnB5cnhoNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="group w-11 h-11 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 transform hover:scale-110 hover:shadow-lg border border-white/10 hover:border-white/20"
                data-testid="social-instagram"
              >
                <Instagram size={18} className="group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://x.com/NSatishMohan1?t=8bmTYDscXDNrjgCi1th_lA&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-11 h-11 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 transform hover:scale-110 hover:shadow-lg border border-white/10 hover:border-white/20"
                data-testid="social-twitter"
              >
                <Twitter size={18} className="group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://youtube.com/@innervea?si=VNwZh4esoDIsxKWF"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-11 h-11 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 transform hover:scale-110 hover:shadow-lg border border-white/10 hover:border-white/20"
                data-testid="social-youtube"
              >
                <Youtube size={18} className="group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.facebook.com/Innervea"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-11 h-11 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 transform hover:scale-110 hover:shadow-lg border border-white/10 hover:border-white/20"
                data-testid="social-facebook"
              >
                <Facebook size={18} className="group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white/90 relative">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Services</span>
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("10-12-students")}
                  className="group text-white/70 hover:text-white transition-all duration-300 text-sm flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-primary transition-colors"></span>
                  <span>Career Guidance</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("life-coaching")}
                  className="group text-white/70 hover:text-white transition-all duration-300 text-sm flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-primary transition-colors"></span>
                  <span>Life Coaching</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("meditation")}
                  className="group text-white/70 hover:text-white transition-all duration-300 text-sm flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-primary transition-colors"></span>
                  <span>Meditation</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("workshops")}
                  className="group text-white/70 hover:text-white transition-all duration-300 text-sm flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-primary transition-colors"></span>
                  <span>Seminars / Workshops</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("hospitality-consulting")}
                  className="group text-white/70 hover:text-white transition-all duration-300 text-sm flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-primary transition-colors"></span>
                  <span>Hospitality Consulting</span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white/90 relative">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Quick Links</span>
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="group text-white/70 hover:text-white transition-all duration-300 text-sm flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-secondary transition-colors"></span>
                  <span>About</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("blog")}
                  className="group text-white/70 hover:text-white transition-all duration-300 text-sm flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-secondary transition-colors"></span>
                  <span>Blog</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="group text-white/70 hover:text-white transition-all duration-300 text-sm flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-secondary transition-colors"></span>
                  <span>Contact</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onBookingClick()}
                  className="group text-white/70 hover:text-white transition-all duration-300 text-sm flex items-center space-x-2 font-medium"
                >
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-accent transition-colors"></span>
                  <span>Book a Free Call</span>
                </button>
              </li>
            </ul>
          </div>


        </div>

        <div className="relative mt-16 pt-8">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="text-center space-y-4">
            <p className="text-white/70 text-sm font-medium">
              © 2024 <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-semibold">Innervea</span>. All rights reserved.
            </p>
            <p className="text-white/60 text-xs max-w-md mx-auto leading-relaxed" data-testid="text-partnership-mentoria">
              In partnership with <span className="text-white/80 font-medium">Mentoria</span> for enhanced career guidance services.
            </p>
            <div className="flex justify-center space-x-4 text-xs">
              <Link href="/privacy-policy" className="text-white/60 hover:text-white transition-colors" data-testid="link-privacy-policy">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
