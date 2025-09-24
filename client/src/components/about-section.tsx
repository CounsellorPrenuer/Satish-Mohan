interface AboutSectionProps {
  onBookingClick: () => void;
}

export default function AboutSection({ onBookingClick }: AboutSectionProps) {
  const stats = [
    { value: "500+", label: "Clients Guided" },
    { value: "10+", label: "Years Experience" },
    { value: "50+", label: "Workshops" },
    { value: "98%", label: "Success Rate" }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Counseling session environment" 
              className="rounded-2xl shadow-lg w-full"
              data-testid="about-image"
            />
          </div>
          
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6" data-testid="about-title">
              About Satish Mohan
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="about-description-1">
              Satish Mohan is a passionate career counsellor, life coach, and holistic guide dedicated to empowering individuals to discover clarity and purpose in their professional and personal lives.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid="about-description-2">
              With extensive experience in career counselling, life coaching, training, meditation mentoring, tarot reading, and manifestation guidance, Satish blends practical advice with spiritual insight. He offers comprehensive support to clients seeking growth, direction, and lasting fulfillment.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center stat-card" data-testid={`stat-${index}`}>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <button 
              onClick={onBookingClick} 
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors btn-primary"
              data-testid="about-book-consultation"
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
