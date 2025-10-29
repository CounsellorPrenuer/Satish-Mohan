import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import BlogPostPage from "@/pages/blog-post";
import BlogsPage from "@/pages/blogs";
import PrivacyPolicy from "@/pages/privacy-policy";
import UPIPayment from "@/pages/upi-payment";
import AdminLogin from "@/pages/admin/login";
import AdminBookings from "@/pages/admin/bookings";
import AdminBlogs from "@/pages/admin/blogs";
import AdminTestimonials from "@/pages/admin/testimonials";
import AdminServices from "@/pages/admin/services";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blogs" component={BlogsPage} />
      <Route path="/blog/:id" component={BlogPostPage} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/upi-payment" component={UPIPayment} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/bookings" component={AdminBookings} />
      <Route path="/admin/blogs" component={AdminBlogs} />
      <Route path="/admin/testimonials" component={AdminTestimonials} />
      <Route path="/admin/services" component={AdminServices} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <CookieConsentBanner />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
