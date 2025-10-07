import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, X, Phone, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface FreeCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const freeCallSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  background: z.string().min(1, "Please select your current background"),
});

type FreeCallFormData = z.infer<typeof freeCallSchema>;

const backgrounds = [
  "College Student",
  "Recent Graduate",
  "Working Professional (0-3 years)",
  "Working Professional (3-7 years)",
  "Mid-level Professional (7-12 years)",
  "Senior Professional (12+ years)",
  "Career Break/Gap",
  "Entrepreneur/Business Owner",
  "Other",
];

export default function FreeCallModal({ isOpen, onClose }: FreeCallModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FreeCallFormData>({
    resolver: zodResolver(freeCallSchema),
    defaultValues: {
      name: "",
      phone: "",
      background: "",
    },
  });

  const callMutation = useMutation({
    mutationFn: async (data: FreeCallFormData) => {
      const contactData = {
        name: data.name,
        email: `${data.phone}@phone.contact`,
        subject: `Free Discovery Call Request - ${data.background}`,
        message: `Free Discovery Call Request\n\nName: ${data.name}\nPhone: ${data.phone}\nBackground: ${data.background}`,
      };
      const response = await apiRequest("POST", "/api/contact-forms", contactData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Request submitted successfully!",
        description: "We'll call you within 4 hours to schedule your free discovery call.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contact-forms"] });
      onClose();
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error submitting request",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FreeCallFormData) => {
    callMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0" data-testid="free-call-modal">
        <div className="p-6">
          <DialogHeader className="mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center relative">
                  <Phone className="w-6 h-6 text-white" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold text-foreground">Free Discovery Call</DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground mt-1">
                    ✓ Trusted by 3,725+ professionals
                  </DialogDescription>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* What You'll Get (Free) */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Check className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-foreground">What You'll Get (Free)</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    <strong>10-min focused discussion</strong> about your career situation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    <strong>Actionable roadmap</strong> with 2-3 immediate next steps
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    <strong>Expert assessment</strong> of your primary career challenge
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    <strong>Personalized guidance</strong> based on your background
                  </span>
                </li>
              </ul>
            </div>

            {/* Not Included (Paid Only) */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <X className="w-5 h-5 text-gray-400" />
                <h3 className="font-semibold text-foreground">Not Included (Paid Only)</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground line-through opacity-60">
                    Full psychometric assessment & detailed report
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground line-through opacity-60">
                    60-90 minute deep-dive counselling session
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground line-through opacity-60">
                    Career compatibility analysis
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground line-through opacity-60">
                    Ongoing mentorship support
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick & Valuable Banner */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Quick & Valuable</h4>
                <p className="text-sm opacity-90">Get clarity in just 10 minutes - no strings attached</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="free-call-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} data-testid="input-free-call-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 98765 43210" {...field} data-testid="input-free-call-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="background"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Background *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-free-call-background">
                          <SelectValue placeholder="Select your current background" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {backgrounds.map((bg) => (
                          <SelectItem key={bg} value={bg}>
                            {bg}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-6 rounded-xl text-base"
                disabled={callMutation.isPending}
                data-testid="button-submit-free-call"
              >
                <Phone className="w-5 h-5 mr-2" />
                {callMutation.isPending ? "Submitting..." : "Book a Free Call →"}
              </Button>
            </form>
          </Form>

          {/* Timeline */}
          <div className="mt-6 bg-orange-50 dark:bg-orange-950/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-foreground">Your 10-Minute Call Timeline</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Minutes 0-3: Quick Introduction</p>
                  <p className="text-xs text-muted-foreground">We'll understand your career situation & immediate concerns</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Minutes 3-7: Problem Diagnosis</p>
                  <p className="text-xs text-muted-foreground">We'll identify your core challenges & their root causes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Minutes 7-10: Action Plan</p>
                  <p className="text-xs text-muted-foreground">You'll get 2-3 specific steps to implement immediately</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Badges */}
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-600" />
              <span>We'll call within 24 hours</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-primary" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-600" />
              <span>Results-focused</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
