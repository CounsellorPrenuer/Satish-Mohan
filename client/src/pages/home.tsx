import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import PricingTierSection from "@/components/pricing-tier-section";
import AboutSection from "@/components/about-section";
import PartnershipSection from "@/components/partnership-section";
import TestimonialsSection from "@/components/testimonials-section";
import BlogPreviewSection from "@/components/blog-preview-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import FreeCallModal from "@/components/free-call-modal";
import BookingModal from "@/components/booking-modal";
import ServiceQueryModal from "@/components/service-query-modal";
import { useState } from "react";

// Services that require query forms instead of direct booking
const queryServices = ["workshops", "hospitality-consulting"];
const serviceNames: Record<string, string> = {
  "workshops": "Workshops & Seminars",
  "hospitality-consulting": "Hospitality Consulting"
};

export default function Home() {
  const [isFreeCallModalOpen, setIsFreeCallModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const openBookingModal = (serviceType?: string) => {
    // Handle empty string or undefined as "no service" - open Free Call Modal
    if (!serviceType || typeof serviceType !== 'string' || serviceType.trim() === '') {
      setIsFreeCallModalOpen(true);
      return;
    }
    
    setSelectedService(serviceType);
    // Check if this service requires a query form
    if (queryServices.includes(serviceType)) {
      setIsQueryModalOpen(true);
    } else {
      // Open booking modal for paid services
      setIsBookingModalOpen(true);
    }
  };

  const closeFreeCallModal = () => {
    setIsFreeCallModalOpen(false);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedService(null);
  };

  const closeQueryModal = () => {
    setIsQueryModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onBookingClick={openBookingModal} />
      <HeroSection onBookingClick={openBookingModal} />
      <ServicesSection onServiceSelect={openBookingModal} />
      <PricingTierSection onPackageSelect={openBookingModal} />
      <AboutSection onBookingClick={openBookingModal} />
      <TestimonialsSection />
      <BlogPreviewSection />
      <ContactSection />
      <PartnershipSection />
      <Footer onBookingClick={openBookingModal} />
      
      {isFreeCallModalOpen && (
        <FreeCallModal 
          isOpen={isFreeCallModalOpen} 
          onClose={closeFreeCallModal}
        />
      )}

      {isBookingModalOpen && (
        <BookingModal 
          isOpen={isBookingModalOpen} 
          onClose={closeBookingModal}
          selectedService={selectedService}
        />
      )}
      
      {isQueryModalOpen && selectedService && (
        <ServiceQueryModal
          isOpen={isQueryModalOpen}
          onClose={closeQueryModal}
          serviceTitle={serviceNames[selectedService] || "Service"}
        />
      )}
    </div>
  );
}
