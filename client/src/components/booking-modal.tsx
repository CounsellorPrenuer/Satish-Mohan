import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { insertBookingSchema, type InsertBooking } from "@/lib/types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string | null;
}

const services = [
  { id: "career-guidance", name: "Career Guidance", price: 2500 },
  { id: "life-coaching", name: "Life Coaching", price: 3000 },
  { id: "meditation", name: "Meditation Session", price: 997 },
  { id: "admission-guidance", name: "Admission Guidance", price: 2000 },
];

// Package to service mapping (includes individual services that should use simplified purchase flow)
const packageMapping: Record<string, { serviceId: string; price: number; name: string; paymentMethod: "upi" | "razorpay" }> = {
  // Individual services (UPI payment only)
  "life-coaching": { serviceId: "life-coaching", price: 3000, name: "Life Coaching", paymentMethod: "upi" },
  "meditation": { serviceId: "meditation", price: 997, name: "Meditation & Mindfulness", paymentMethod: "upi" },
  // 8-9 Students (Razorpay payment)
  "8-9-discover": { serviceId: "career-guidance", price: 5500, name: "Discover - 8-9 Students", paymentMethod: "razorpay" },
  "8-9-discover-plus": { serviceId: "career-guidance", price: 15000, name: "Discover plus+ - 8-9 Students", paymentMethod: "razorpay" },
  // 10-12 Students (Razorpay payment)
  "10-12-achieve-online": { serviceId: "career-guidance", price: 5999, name: "Achieve Online - 10-12 Students", paymentMethod: "razorpay" },
  "10-12-achieve-plus": { serviceId: "career-guidance", price: 10599, name: "Achieve Plus+ - 10-12 Students", paymentMethod: "razorpay" },
  // College Graduates (Razorpay payment)
  "graduates-ascend-online": { serviceId: "career-guidance", price: 6499, name: "Ascend Online - College Graduates", paymentMethod: "razorpay" },
  "graduates-ascend-plus": { serviceId: "career-guidance", price: 10599, name: "Ascend Plus+ - College Graduates", paymentMethod: "razorpay" },
  // Working Professionals (Razorpay payment)
  "professionals-ascend-online": { serviceId: "career-guidance", price: 6499, name: "Ascend Online - Working Professionals", paymentMethod: "razorpay" },
  "professionals-ascend-plus": { serviceId: "career-guidance", price: 10599, name: "Ascend Plus+ - Working Professionals", paymentMethod: "razorpay" },
};

const timeSlots = [
  "10:00 AM - 11:00 AM",
  "11:30 AM - 12:30 PM",
  "2:00 PM - 3:00 PM",
  "3:30 PM - 4:30 PM",
  "5:00 PM - 6:00 PM",
];

export default function BookingModal({ isOpen, onClose, selectedService }: BookingModalProps) {
  // Check if selectedService is a package ID or a regular service ID
  const packageInfo = selectedService ? packageMapping[selectedService] : null;
  const initialServiceId = packageInfo ? packageInfo.serviceId : (selectedService || "career-guidance");
  const initialPrice = packageInfo ? packageInfo.price : (services.find(s => s.id === selectedService)?.price || 2500);

  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId);
  const [selectedPackageId, setSelectedPackageId] = useState(packageInfo ? selectedService : null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      serviceType: initialServiceId,
      sessionType: "online",
      preferredDate: "",
      preferredTime: "",
      description: "",
      amount: initialPrice.toString(),
      status: "pending",
    },
  });

  const selectedServiceData = packageInfo
    ? { id: packageInfo.serviceId, name: packageInfo.name, price: packageInfo.price }
    : services.find(s => s.id === selectedServiceId);

  const bookingMutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: async (booking) => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });

      // Determine payment method based on package
      const paymentMethod = packageInfo?.paymentMethod || "upi";

      if (paymentMethod === "upi") {
        // Redirect to UPI payment page
        const paymentUrl = `/upi-payment?bookingId=${booking.id}&amount=${booking.amount}&name=${encodeURIComponent(booking.fullName)}`;

        toast({
          title: "Booking created!",
          description: "Redirecting to UPI payment page...",
        });

        onClose();
        form.reset();
        setLocation(paymentUrl);
      } else {
        // Use Razorpay checkout
        handleRazorpayPayment(booking);
      }
    },
    onError: () => {
      toast({
        title: "Booking failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleRazorpayPayment = async (booking: any) => {
    try {
      // Get Razorpay key
      const keyResponse = await fetch("/api/payments/razorpay-key");
      const { key } = await keyResponse.json();

      // Create Razorpay order
      const orderResponse = await apiRequest("POST", "/api/payments/create-order", {
        amount: booking.amount,
        currency: "INR",
      });
      const order = await orderResponse.json();

      // Load Razorpay script if not already loaded
      if (!(window as any).Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Open Razorpay checkout
      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        name: "Innervea",
        description: packageInfo?.name || "Career Coaching Session",
        order_id: order.id,
        handler: async (response: any) => {
          try {
            // Verify payment on backend
            const verifyResponse = await apiRequest("POST", "/api/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              booking_id: booking.id,
            });

            if (verifyResponse.ok) {
              toast({
                title: "Payment successful!",
                description: "Your booking has been confirmed.",
              });
              onClose();
              form.reset();
              setLocation("/");
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            toast({
              title: "Payment verification failed",
              description: "Please contact support.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: booking.fullName,
          email: booking.email,
          contact: booking.phone,
        },
        theme: {
          color: "#6366f1",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();

      // Close the booking modal
      onClose();
      form.reset();
    } catch (error) {
      toast({
        title: "Payment initialization failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = (data: InsertBooking) => {
    // Use package pricing if available, otherwise use regular service pricing
    const price = packageInfo?.price || services.find(s => s.id === data.serviceType)?.price || 2500;
    const bookingData = {
      ...data,
      amount: price.toString(),
    };
    bookingMutation.mutate(bookingData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="booking-modal">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-foreground">
            {packageInfo ? "Purchase Package" : "Book Your Session"}
          </DialogTitle>
          <DialogDescription>
            {packageInfo
              ? "Complete your details to purchase the coaching package."
              : "Fill in your details to schedule your coaching session."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="booking-form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} required data-testid="input-fullname" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} required data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+91 9876543210" {...field} required data-testid="input-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    {packageInfo ? (
                      <div className="relative">
                        <Input
                          value={packageInfo.name}
                          disabled
                          className="bg-muted"
                          data-testid="input-package-name"
                        />
                        <p className="text-sm text-muted-foreground mt-1">Package pre-selected</p>
                      </div>
                    ) : (
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedServiceId(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-service">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name} - ₹{service.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {!packageInfo && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            min={new Date().toISOString().split('T')[0]}
                            data-testid="input-date"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-time">
                              <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="sessionType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Session Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                          data-testid="radio-session-type"
                        >
                          <div className="flex items-center space-x-2 p-4 border border-input rounded-lg">
                            <RadioGroupItem value="online" id="online" />
                            <Label htmlFor="online" className="flex-1 cursor-pointer">
                              <div className="font-medium">Online</div>
                              <div className="text-sm text-muted-foreground">Video call</div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border border-input rounded-lg">
                            <RadioGroupItem value="offline" id="offline" />
                            <Label htmlFor="offline" className="flex-1 cursor-pointer">
                              <div className="font-medium">In-Person</div>
                              <div className="text-sm text-muted-foreground">Office visit</div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border border-input rounded-lg">
                            <RadioGroupItem value="phone" id="phone" />
                            <Label htmlFor="phone" className="flex-1 cursor-pointer">
                              <div className="font-medium">Phone</div>
                              <div className="text-sm text-muted-foreground">Audio call</div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brief Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Tell me about your current situation and what you'd like to achieve..."
                      className="resize-none"
                      {...field}
                      value={field.value || ""}
                      data-testid="input-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Payment Summary</h3>
              <div className="flex justify-between items-center mb-4">
                <span>{selectedServiceData?.name || "Selected Service"}</span>
                <span className="font-semibold">₹{selectedServiceData?.price || 2500}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Amount</span>
                  <span>₹{selectedServiceData?.price || 2500}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg font-semibold hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={bookingMutation.isPending}
                data-testid="button-proceed-payment"
              >
                {bookingMutation.isPending ? "Processing..." : "Proceed to Payment"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
