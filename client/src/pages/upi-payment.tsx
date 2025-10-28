import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const UPI_ID = "n.shobana2013@okicici";
const PAYEE_NAME = "Innervae - Satish Mohan";

export default function UPIPayment() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [bookingId, setBookingId] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>("");

  useEffect(() => {
    // Get payment details from URL parameters
    const params = new URLSearchParams(window.location.search);
    const id = params.get("bookingId");
    const amt = params.get("amount");
    const name = params.get("name");

    if (id) setBookingId(id);
    if (amt) setAmount(parseFloat(amt));
    if (name) setCustomerName(name);

    // If no booking details, redirect to home
    if (!id || !amt) {
      setLocation("/");
    }
  }, [setLocation]);

  // Generate UPI payment URL with pre-filled details
  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Payment for booking ${bookingId}`)}`;

  const confirmPaymentMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/payments/confirm-upi", {
        booking_id: bookingId,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Thank you for your payment!",
        description: "We will verify your payment and confirm your booking shortly.",
      });
      setLocation("/");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to confirm payment. Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const handlePaymentComplete = () => {
    confirmPaymentMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-6"
          data-testid="button-back-home"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-xl" data-testid="upi-payment-card">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Complete Your Payment
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Scan the QR code below to pay with any UPI app
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Payment Details */}
            <div className="bg-muted/50 rounded-lg p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Booking ID:</span>
                <span className="font-mono font-semibold" data-testid="text-booking-id">
                  {bookingId}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Customer Name:</span>
                <span className="font-semibold" data-testid="text-customer-name">
                  {customerName}
                </span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Amount to Pay:</span>
                  <span className="text-2xl font-bold text-primary" data-testid="text-amount">
                    ₹{amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-primary/20">
                <QRCodeSVG
                  id="upi-qr-code"
                  value={upiUrl}
                  size={280}
                  level="H"
                  includeMargin={true}
                  data-testid="qr-code"
                />
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Scan this QR code with any UPI app
                </p>
                <p className="text-xs text-muted-foreground">
                  (Google Pay, PhonePe, Paytm, BHIM, etc.)
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-6 space-y-3">
              <h3 className="font-semibold text-lg">Payment Instructions:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Open any UPI app on your phone</li>
                <li>Scan the QR code shown above</li>
                <li>Verify the amount (₹{amount.toFixed(2)}) and payee name</li>
                <li>Complete the payment using your UPI PIN</li>
                <li>Click "I've Completed Payment" below after payment</li>
              </ol>
            </div>

            {/* Payment Confirmation Button */}
            <div className="space-y-4 pt-4">
              <Button
                onClick={handlePaymentComplete}
                disabled={confirmPaymentMutation.isPending}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-6 text-lg font-semibold hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="button-confirm-payment"
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                {confirmPaymentMutation.isPending ? "Confirming..." : "I've Completed Payment"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                We will verify your payment and contact you within 24 hours to confirm your booking.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card className="mt-6">
          <CardContent className="py-6">
            <p className="text-center text-sm text-muted-foreground">
              Having trouble with payment?{" "}
              <a
                href="/#contact"
                className="text-primary font-semibold hover:underline"
                data-testid="link-contact-support"
              >
                Contact Support
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
