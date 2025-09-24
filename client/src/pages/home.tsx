import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section";
import TestimonialsSection from "@/components/testimonials-section";
import BlogPreviewSection from "@/components/blog-preview-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import BookingModal from "@/components/booking-modal";
import { useState } from "react";

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const openBookingModal = (serviceType?: string) => {
    if (serviceType) {
      setSelectedService(serviceType);
    }
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onBookingClick={openBookingModal} />
      <HeroSection onBookingClick={openBookingModal} />
      <ServicesSection onServiceSelect={openBookingModal} />
      <AboutSection onBookingClick={openBookingModal} />
      <TestimonialsSection />
      <BlogPreviewSection />
      <ContactSection />
      <Footer onBookingClick={openBookingModal} />
      
      {isBookingModalOpen && (
        <BookingModal 
          isOpen={isBookingModalOpen} 
          onClose={closeBookingModal}
          selectedService={selectedService}
        />
      )}
    </div>
  );
}
