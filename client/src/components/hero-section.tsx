import { useEffect, useRef, useState } from "react";
import heroImageStatic from "@assets/hero_1759750789247.png";
import { getHero } from "@/lib/sanity";

interface HeroSectionProps {
  onBookingClick: (serviceType?: string) => void;
}

interface HeroData {
  title?: string;
  subtitle?: string;
  description?: string;
  heroImage?: string;
}

declare global {
  interface Window {
    __PRELOADED_HERO__?: string;
  }
}

export default function HeroSection({ onBookingClick }: HeroSectionProps) {
  const animationRef = useRef<HTMLDivElement>(null);
  const [heroData, setHeroData] = useState<HeroData | null>(() => {
    const cachedHero = typeof window !== 'undefined' ? (window as any).__PRELOADED_HERO__ || localStorage.getItem('hero-image') : null;
    return cachedHero ? { heroImage: cachedHero } : null;
  });

  useEffect(() => {
    getHero().then((data: HeroData | null) => {
      if (data) {
        // Force high resolution for the uploaded GIF
        const highResUrl = data.heroImage ? `${data.heroImage}?q=100&auto=format` : null;
        const modernizedData: HeroData = { ...data, heroImage: highResUrl || data.heroImage };

        setHeroData(modernizedData);
        if (highResUrl) {
          localStorage.setItem('hero-image', highResUrl);
        }
      }
    });
  }, []);

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

  const titleText = heroData?.title || "The Path Within to";
  const subtitleText = heroData?.subtitle || "Purpose & Growth";
  const descText = heroData?.description || "In life, many of us chase success, yet feel lost. Careers stall, purpose feels distant, and the mind never rests. Innervea was created to change that. Transform from confusion to clarity, from self-doubt to self-belief, from restless striving to purposeful living.";
  const displayImage = heroData?.heroImage || heroImageStatic;

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
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 sm:mb-8 leading-tight tracking-tight" data-testid="hero-title">
                {titleText}
                <span className="text-accent"> {subtitleText}</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0" data-testid="hero-description">
                {descText}
              </p>
              <div className="
                flex flex-col sm:flex-row gap-3 sm:gap-4
                items-center justify-center
                lg:justify-start lg:items-start
              ">
                <button
                  onClick={() => onBookingClick()}
                  className="bg-white text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white/95 hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  data-testid="hero-start-journey"
                >
                  Free Discovery Call
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
              <img
                src={displayImage}
                alt="Innervea - Transformation and Life Coaching"
                className="w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] lg:w-[700px] lg:h-[700px] object-contain mx-auto"
                data-testid="hero-image"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}