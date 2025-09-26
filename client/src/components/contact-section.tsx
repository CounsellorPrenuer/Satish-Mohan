import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactFormSchema } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Phone, Mail, Linkedin, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import type { InsertContactForm } from "@shared/schema";

export default function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContactForm>({
    resolver: zodResolver(insertContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactForm) => {
      const response = await apiRequest("POST", "/api/contact-forms", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact-forms"] });
    },
    onError: () => {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactForm) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="contact-title">
            Get in Touch
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="contact-description">
            Ready to begin your transformation journey? Let's connect and explore how we can help you achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
              <div className="bg-card rounded-xl p-6 shadow-lg" data-testid="contact-phone">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="text-primary" size={20} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Phone</h3>
                <p className="text-muted-foreground">+91-7011845614</p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-lg" data-testid="contact-email">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="text-secondary" size={20} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <p className="text-muted-foreground">innervea@gmail.com</p>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-lg mb-8">
              <h3 className="font-semibold text-lg mb-4">Follow on Social Media</h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a 
                  href="https://www.linkedin.com/in/satish-mohan-n-8560684" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                  data-testid="social-linkedin"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://www.instagram.com/innervea_25?igsh=MTV4eXBtcnB5cnhoNw==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors"
                  data-testid="social-instagram"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="https://www.facebook.com/Innervea" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-colors"
                  data-testid="social-facebook"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href="https://x.com/NSatishMohan1?t=8bmTYDscXDNrjgCi1th_lA&s=09" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-foreground/10 rounded-lg flex items-center justify-center text-foreground hover:bg-foreground hover:text-white transition-colors"
                  data-testid="social-twitter"
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href="https://youtube.com/@innervea?si=VNwZh4esoDIsxKWF" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  data-testid="social-youtube"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} data-testid="input-name" />
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
                          <Input type="email" placeholder="your@email.com" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="How can I help you?" {...field} data-testid="input-subject" />
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
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={5} 
                          placeholder="Tell me about your goals and challenges..." 
                          className="resize-none" 
                          {...field}
                          data-testid="input-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg font-semibold hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
                  disabled={contactMutation.isPending}
                  data-testid="button-send-message"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
