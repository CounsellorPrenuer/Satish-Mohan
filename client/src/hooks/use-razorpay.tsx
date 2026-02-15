import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createPaymentOrder, verifyPayment } from "@/lib/api";

interface PaymentOptions {
  amount: number;
  currency: string;
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function useRazorpay() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initializePayment = async (options: PaymentOptions): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast({
          title: "Payment Error",
          description: "Failed to load payment gateway. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      // Create Razorpay order via Worker
      const order = await createPaymentOrder({
        amount: options.amount,
        fullName: options.customerName,
        email: options.customerEmail,
        phone: options.customerPhone,
        serviceType: options.serviceType || "Mentoria Package",
      });

      if (!order) {
        toast({
          title: "Order Creation Failed",
          description: "Could not initialize payment with the server. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      // Razorpay payment options
      const razorpayOptions = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Innervea",
        description: `${options.serviceType || "Career Counseling"} - Order: ${options.bookingId}`,
        order_id: order.orderId,
        prefill: {
          name: options.customerName,
          email: options.customerEmail,
          contact: options.customerPhone,
        },
        theme: {
          color: "#4f46e5", // Claryntia Purple/Indigo
        },
        handler: async (response: any) => {
          try {
            // Verify payment on backend
            const verification = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verification?.verified) {
              toast({
                title: "Payment Successful!",
                description: "Your booking has been confirmed. We'll contact you soon.",
              });
              return true;
            } else {
              throw new Error("Verification failed");
            }
          } catch (error) {
            toast({
              title: "Payment Verification Failed",
              description: "We couldn't verify your payment. Please contact support with payment ID: " + response.razorpay_payment_id,
              variant: "destructive",
            });
            return false;
          }
        },
        modal: {
          ondismiss: () => {
            toast({
              title: "Payment Cancelled",
              description: "Your booking was not completed.",
              variant: "destructive",
            });
          },
        },
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();

      // We return true here to indicate the MODAL opened successfully.
      // The handler will manage the final success/failure.
      return true;
    } catch (error) {
      console.error("Payment initialization error:", error);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initializePayment,
    isLoading,
  };
}
