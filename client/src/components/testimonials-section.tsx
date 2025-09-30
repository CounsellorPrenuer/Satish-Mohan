const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Product Manager, Tech Startup",
    content: "Satish helped me transition from engineering to product management. His holistic approach gave me the confidence to pursue my dreams.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Senior Manager, Finance",
    content: "The meditation sessions transformed my stress levels. I now handle work pressure with calmness and clarity.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64"
  },
  {
    id: 3,
    name: "Meera Agarwal",
    role: "Parent & Entrepreneur",
    content: "His admission guidance was invaluable. My daughter got into her dream college with the perfect career path mapped out.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-20 gradient-bg border-t-4 border-primary/20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-secondary rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 drop-shadow-lg" data-testid="testimonials-title">
            What Clients Say
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed" data-testid="testimonials-description">
            Real stories from individuals whose lives have been transformed through our guidance
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="group relative testimonial-card rounded-3xl p-8 sm:p-10 text-white transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl"
              data-testid={`testimonial-card-${testimonial.id}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Decorative quote mark */}
              <div className="absolute top-6 right-6 text-white/10 text-6xl font-serif leading-none">"</div>
              
              {/* Star rating with enhanced styling */}
              <div className="flex gap-1 text-accent mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className="w-6 h-6 fill-current drop-shadow-lg transition-transform duration-300 group-hover:scale-110" 
                    style={{ transitionDelay: `${i * 50}ms` }}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              
              {/* Testimonial content */}
              <p className="text-lg sm:text-xl mb-8 leading-relaxed relative z-10 font-light" data-testid={`testimonial-content-${testimonial.id}`}>
                "{testimonial.content}"
              </p>
              
              {/* Author info with enhanced styling */}
              <div className="flex items-center relative z-10 pt-6 border-t border-white/20">
                <div className="relative">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full mr-5 ring-4 ring-white/20 group-hover:ring-accent/50 transition-all duration-300"
                    data-testid={`testimonial-image-${testimonial.id}`}
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full border-2 border-white/20"></div>
                </div>
                <div>
                  <div className="font-bold text-lg" data-testid={`testimonial-name-${testimonial.id}`}>
                    {testimonial.name}
                  </div>
                  <div className="text-white/70 text-sm mt-1" data-testid={`testimonial-role-${testimonial.id}`}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
              
              {/* Decorative corner accent */}
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-accent/20 to-transparent rounded-bl-3xl transition-all duration-500 group-hover:w-32 group-hover:h-32"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
