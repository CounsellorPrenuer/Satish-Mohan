import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface PaymentOptions {
  amount: number;
  currency: string;
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
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

      // Create Razorpay order
      const orderResponse = await apiRequest("POST", "/api/payments/create-order", {
        amount: options.amount,
        currency: options.currency,
      });
      const order = await orderResponse.json();

      // Razorpay payment options
      const razorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_key", // Use environment variable
        amount: order.amount,
        currency: order.currency,
        name: "Career Clarity by Satish",
        description: "Career Counseling Session",
        order_id: order.id,
        prefill: {
          name: options.customerName,
          email: options.customerEmail,
          contact: options.customerPhone,
        },
        theme: {
          color: "#2563eb", // Primary color
        },
        handler: async (response: any) => {
          try {
            // Verify payment on backend
            await apiRequest("POST", "/api/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              booking_id: options.bookingId,
            });

            toast({
              title: "Payment Successful!",
              description: "Your booking has been confirmed. We'll contact you soon.",
            });
            
            return true;
          } catch (error) {
            toast({
              title: "Payment Verification Failed",
              description: "Please contact support for assistance.",
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
