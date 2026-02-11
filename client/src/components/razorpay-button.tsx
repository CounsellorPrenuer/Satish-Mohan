import { useEffect, useRef } from "react";

interface RazorpayButtonProps {
    paymentButtonId: string;
}

export default function RazorpayButton({ paymentButtonId }: RazorpayButtonProps) {
    const containerRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear previous scripts if any (though in this specific usage it shouldn't flip often)
        containerRef.current.innerHTML = "";

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/payment-button.js";
        script.setAttribute("data-payment_button_id", paymentButtonId);
        script.async = true;

        containerRef.current.appendChild(script);

        return () => {
            // Cleanup not strictly necessary for simple static unmount, but good practice
            if (containerRef.current) {
                containerRef.current.innerHTML = "";
            }
        };
    }, [paymentButtonId]);

    return <form ref={containerRef} className="flex justify-center w-full" />;
}
