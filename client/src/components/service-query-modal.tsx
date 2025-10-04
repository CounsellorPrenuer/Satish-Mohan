import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { insertContactFormSchema, type InsertContactForm } from "@shared/schema";

interface ServiceQueryModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
}

export default function ServiceQueryModal({ isOpen, onClose, serviceTitle }: ServiceQueryModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContactForm>({
    resolver: zodResolver(insertContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: `Inquiry about ${serviceTitle}`,
      message: "",
    },
  });

  const queryMutation = useMutation({
    mutationFn: async (data: InsertContactForm) => {
      const response = await apiRequest("POST", "/api/contact-forms", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Query sent successfully!",
        description: "We'll review your request and get back to you via email soon.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contact-forms"] });
      onClose();
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error sending query",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactForm) => {
    queryMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="query-modal">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-foreground">
            {serviceTitle} - Send Query
          </DialogTitle>
          <DialogDescription>
            Please fill in your details and we'll get back to you with more information.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="query-form">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} data-testid="input-query-name" />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} data-testid="input-query-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-query-subject" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Query</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Please describe your requirements in detail..."
                      className="resize-none"
                      {...field}
                      data-testid="input-query-message"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                data-testid="button-cancel-query"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90"
                disabled={queryMutation.isPending}
                data-testid="button-send-query"
              >
                {queryMutation.isPending ? "Sending..." : "Send Query"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
