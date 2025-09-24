const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Product Manager, Tech Startup",
    content: "Satish helped me transition from engineering to product management. His holistic approach gave me the confidence to pursue my dreams.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64"
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
    <section className="py-16 sm:py-24 lg:py-20 gradient-bg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" data-testid="testimonials-title">
            What Clients Say
          </h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto" data-testid="testimonials-description">
            Real stories from individuals whose lives have been transformed through our guidance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="testimonial-card rounded-xl p-6 sm:p-8 text-white"
              data-testid={`testimonial-card-${testimonial.id}`}
            >
              <div className="flex text-accent mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg mb-6 leading-relaxed" data-testid={`testimonial-content-${testimonial.id}`}>
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4"
                  data-testid={`testimonial-image-${testimonial.id}`}
                />
                <div>
                  <div className="font-semibold" data-testid={`testimonial-name-${testimonial.id}`}>
                    {testimonial.name}
                  </div>
                  <div className="text-white/80 text-sm" data-testid={`testimonial-role-${testimonial.id}`}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
