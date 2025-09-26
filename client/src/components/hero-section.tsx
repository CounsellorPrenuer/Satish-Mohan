import { useEffect, useRef } from "react";

interface HeroSectionProps {
  onBookingClick: () => void;
}

export default function HeroSection({ onBookingClick }: HeroSectionProps) {
  const animationRef = useRef<HTMLDivElement>(null);
  
  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!animationRef.current) return;

    // Animate entrance with JavaScript-controlled CSS
    const container = animationRef.current.querySelector('.hero-animation-container');
    if (container) {
      // Start with initial state
      (container as HTMLElement).style.opacity = '0';
      (container as HTMLElement).style.transform = 'scale(0.8)';
      
      // Trigger entrance animation
      setTimeout(() => {
        (container as HTMLElement).style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        (container as HTMLElement).style.opacity = '1';
        (container as HTMLElement).style.transform = 'scale(1)';
      }, 100);

      // Start ring rotations with staggered delays
      const rings = animationRef.current.querySelectorAll('[class*="ring-"]');
      rings.forEach((ring, index) => {
        setTimeout(() => {
          (ring as HTMLElement).style.animation = `rotate-${index === 0 ? 'slow' : index === 1 ? 'medium' : 'fast'} ${20 - index * 4}s linear infinite`;
        }, 500 + index * 300);
      });

      // Start compass center pulsing
      const compass = animationRef.current.querySelector('.compass-center');
      if (compass) {
        setTimeout(() => {
          (compass as HTMLElement).style.animation = 'compass-pulse 4s ease-in-out infinite';
        }, 1500);
      }

      // Start needle rotation
      const needle = animationRef.current.querySelector('.compass-needle');
      if (needle) {
        setTimeout(() => {
          (needle as HTMLElement).style.animation = 'needle-rotate 8s ease-in-out infinite';
        }, 2000);
      }

      // Start floating icons
      const icons = animationRef.current.querySelectorAll('[class*="icon-"]');
      icons.forEach((icon, index) => {
        setTimeout(() => {
          (icon as HTMLElement).style.animation = `float-${index % 2 === 0 ? 'up' : 'down'} ${5 + index}s ease-in-out infinite`;
        }, 2500 + index * 500);
      });

      // Start background elements
      const bgElements = animationRef.current.querySelectorAll('[class*="bg-float-"]');
      bgElements.forEach((bg, index) => {
        setTimeout(() => {
          (bg as HTMLElement).style.animation = `bg-float-${index + 1} ${15 + index * 3}s ease-in-out infinite`;
        }, 4500 + index * 500);
      });
    }
  }, []);

  return (
    <>
      <style>{`
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes rotate-medium {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes rotate-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes compass-pulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 30px rgba(139, 69, 19, 0.4);
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.08);
            box-shadow: 0 0 50px rgba(139, 69, 19, 0.7);
          }
        }
        
        @keyframes needle-rotate {
          0% { transform: translateX(-50%) rotate(0deg); }
          25% { transform: translateX(-50%) rotate(90deg); }
          50% { transform: translateX(-50%) rotate(180deg); }
          75% { transform: translateX(-50%) rotate(270deg); }
          100% { transform: translateX(-50%) rotate(360deg); }
        }
        
        @keyframes float-up {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          33% { transform: translateY(-12px) scale(1.05) rotate(8deg); }
          66% { transform: translateY(12px) scale(1) rotate(-8deg); }
        }
        
        @keyframes float-down {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          33% { transform: translateY(12px) scale(1.05) rotate(-8deg); }
          66% { transform: translateY(-12px) scale(1) rotate(8deg); }
        }
        
        @keyframes bg-float-1 {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
        }
        
        @keyframes bg-float-2 {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.15) rotate(-180deg); }
        }
      `}</style>
      
      <section id="home" className="pt-24 pb-24 sm:pb-24 lg:pb-20 sm:pt-24 lg:pt-24 min-h-screen flex items-center gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-white animate-fade-in-up order-2 lg:order-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight tracking-tight" data-testid="hero-title">
                Unlock Your
                <span className="text-accent"> Inner Potential</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0" data-testid="hero-description">
                Transform your life through innovative coaching, holistic guidance, and powerful inner work that awakens your true potential.
              </p>
              <div className="
                flex flex-col sm:flex-row gap-3 sm:gap-4
                items-center justify-center
                lg:justify-start lg:items-start
              ">
                <button 
                  onClick={onBookingClick} 
                  className="bg-white text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white/95 hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  data-testid="hero-start-journey"
                >
                  Start Your Journey
                </button>
                <button 
                  onClick={scrollToServices}
                  className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-primary transition-colors text-center"
                  data-testid="hero-explore-services"
                >
                  Explore Services
                </button>
              </div>
            </div>
            
            <div ref={animationRef} className="relative flex items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] order-1 lg:order-2 mb-8 lg:mb-0">
              {/* Anime.js Style Animation Container */}
              <div 
                className="hero-animation-container relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px] flex items-center justify-center mx-auto"
                data-testid="hero-animation"
              >
                {/* Rotating Rings */}
                <div className="ring-outer absolute inset-4 border-4 border-accent/30 rounded-full"></div>
                <div className="ring-middle absolute inset-8 border-[3px] border-white/40 rounded-full"></div>
                <div className="ring-inner absolute inset-16 border-2 border-accent/50 rounded-full"></div>
                
                {/* Central Compass */}
                <div className="compass-center absolute top-1/2 left-1/2 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-accent via-primary to-accent rounded-full flex items-center justify-center shadow-2xl z-10">
                  {/* Compass Needle */}
                  <div
                    className="compass-needle absolute w-1 h-6 sm:h-8 bg-white rounded-full shadow-lg"
                    style={{ 
                      transformOrigin: "center bottom",
                      bottom: "50%",
                      left: "50%"
                    }}
                  />
                  <div className="w-3 h-3 bg-white rounded-full shadow-lg relative z-10" />
                </div>
                
                {/* Floating Career Icons */}
                <div className="icon-success absolute top-6 right-6 sm:top-8 sm:right-8 w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <div className="icon-people absolute bottom-6 left-6 sm:bottom-8 sm:left-8 w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                
                <div className="icon-chart absolute top-16 left-6 sm:top-20 sm:left-8 w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                
                <div className="icon-growth absolute bottom-16 right-6 sm:bottom-20 sm:right-8 w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.414 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}