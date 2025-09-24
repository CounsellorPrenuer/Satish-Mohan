import { motion } from "framer-motion";

interface HeroSectionProps {
  onBookingClick: () => void;
}

export default function HeroSection({ onBookingClick }: HeroSectionProps) {
  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="pt-16 min-h-screen flex items-center gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-white animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Guiding Careers,
              <span className="text-accent"> Inspiring Lives</span>
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-white/90 leading-relaxed" data-testid="hero-description">
              Discover clarity and purpose in your professional and personal journey with holistic career counseling, life coaching, and spiritual guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onBookingClick} 
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                data-testid="hero-start-journey"
              >
                Start Your Journey
              </button>
              <button 
                onClick={scrollToServices}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors text-center"
                data-testid="hero-explore-services"
              >
                Explore Services
              </button>
            </div>
          </div>
          
          <div className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
            {/* Animated Compass Container */}
            <motion.div 
              className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px] flex items-center justify-center mx-auto"
              data-testid="hero-animation"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {/* Outer Ring - Better positioned */}
              <motion.div
                className="absolute inset-4 border-4 border-accent/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Middle Ring - Better spacing */}
              <motion.div
                className="absolute inset-8 border-[3px] border-white/40 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner Ring - Better proportion */}
              <motion.div
                className="absolute inset-16 border-2 border-accent/50 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Central Compass - Better centered */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-accent via-primary to-accent rounded-full flex items-center justify-center shadow-2xl z-10"
                animate={{ 
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    "0 0 30px rgba(139, 69, 19, 0.4)",
                    "0 0 50px rgba(139, 69, 19, 0.7)", 
                    "0 0 30px rgba(139, 69, 19, 0.4)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Compass Needle - Perfect centered */}
                <motion.div
                  className="absolute w-1 h-6 sm:h-8 bg-white rounded-full shadow-lg"
                  style={{ 
                    transformOrigin: "center bottom",
                    bottom: "50%",
                    left: "50%",
                    transform: "translateX(-50%)"
                  }}
                  animate={{ rotate: [0, 90, 180, 270, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="w-3 h-3 bg-white rounded-full shadow-lg relative z-10" />
              </motion.div>
              
              {/* Floating Career Icons - Better positioned */}
              <motion.div
                className="absolute top-6 right-6 sm:top-8 sm:right-8 w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-lg"
                animate={{ 
                  y: [0, -12, 0],
                  rotate: [0, 8, -8, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              
              <motion.div
                className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 w-14 h-14 bg-accent/25 rounded-xl flex items-center justify-center backdrop-blur-sm border border-accent/20 shadow-lg"
                animate={{ 
                  y: [0, 12, 0],
                  rotate: [0, -8, 8, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </motion.div>
              
              <motion.div
                className="absolute top-16 left-6 sm:top-20 sm:left-8 w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/20 shadow-lg"
                animate={{ 
                  scale: [1, 1.15, 1],
                  x: [0, 8, 0],
                  rotate: [0, 360, 0]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </motion.div>
              
              <motion.div
                className="absolute bottom-16 right-6 sm:bottom-20 sm:right-8 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-lg"
                animate={{ 
                  scale: [1, 1.12, 1],
                  x: [0, -8, 0],
                  rotate: [0, -360, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.414 14.586 7H12z" clipRule="evenodd" />
                </svg>
              </motion.div>
            </motion.div>
            
            {/* Enhanced Background Elements - Better positioned */}
            <motion.div 
              className="absolute -top-6 -right-6 w-20 h-20 sm:w-24 sm:h-24 bg-accent/15 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute -bottom-6 -left-6 w-16 h-16 sm:w-20 sm:h-20 bg-white/15 rounded-full"
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: [0, -180, -360]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </div>
        </div>
      </div>      
    </section>
  );
}
