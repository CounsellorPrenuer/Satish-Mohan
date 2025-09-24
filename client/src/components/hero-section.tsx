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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white animate-fade-in-up">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Guiding Careers,
              <span className="text-accent"> Inspiring Lives</span>
            </h1>
            <p className="text-xl mb-8 text-white/90 leading-relaxed" data-testid="hero-description">
              Discover clarity and purpose in your professional and personal journey with holistic career counseling, life coaching, and spiritual guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onBookingClick} 
                className="bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent/90 transition-colors btn-primary"
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
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=500" 
              alt="Satish Mohan - Career Counselor" 
              className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
              data-testid="hero-image"
            />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full animate-bounce-gentle"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/20 rounded-full animate-bounce-gentle float"></div>
          </div>
        </div>
      </div>

      {/* Floating testimonial card */}
      <div className="absolute top-1/4 right-8 glass rounded-lg p-4 shadow-lg max-w-xs hidden lg:block testimonial-card">
        <div className="flex text-accent mb-2">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <p className="text-sm text-white mb-2">"Satish transformed my career path completely!"</p>
        <p className="text-xs text-white/80">- Priya S., Software Engineer</p>
      </div>
    </section>
  );
}
