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
          
          <div className="relative flex items-center justify-center">
            {/* Animated Compass Container */}
            <motion.div 
              className="relative w-80 h-80 flex items-center justify-center"
              data-testid="hero-animation"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Outer Ring */}
              <motion.div
                className="absolute w-72 h-72 border-4 border-accent/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Middle Ring */}
              <motion.div
                className="absolute w-56 h-56 border-2 border-white/40 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner Ring */}
              <motion.div
                className="absolute w-40 h-40 border-2 border-accent/50 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Central Compass */}
              <motion.div 
                className="relative w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center shadow-2xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 20px rgba(139, 69, 19, 0.3)",
                    "0 0 40px rgba(139, 69, 19, 0.6)", 
                    "0 0 20px rgba(139, 69, 19, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Compass Needle */}
                <motion.div
                  className="absolute w-1 h-8 bg-white rounded-full"
                  style={{ transformOrigin: "center bottom" }}
                  animate={{ rotate: [0, 90, 180, 270, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="w-2 h-2 bg-white rounded-full" />
              </motion.div>
              
              {/* Floating Career Icons */}
              <motion.div
                className="absolute top-8 right-8 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              
              <motion.div
                className="absolute bottom-8 left-8 w-12 h-12 bg-accent/30 rounded-lg flex items-center justify-center backdrop-blur-sm"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </motion.div>
              
              <motion.div
                className="absolute top-16 left-4 w-10 h-10 bg-primary/40 rounded-full flex items-center justify-center backdrop-blur-sm"
                animate={{ 
                  scale: [1, 1.2, 1],
                  x: [0, 5, 0]
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </motion.div>
              
              <motion.div
                className="absolute bottom-16 right-4 w-10 h-10 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-sm"
                animate={{ 
                  scale: [1, 1.1, 1],
                  x: [0, -5, 0]
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.414 14.586 7H12z" clipRule="evenodd" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>      
    </section>
  );
}
