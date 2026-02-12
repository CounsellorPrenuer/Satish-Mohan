import { Switch, Route, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
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
import { Suspense, lazy } from "react";

// Lazy load admin pages to isolate dependencies (charts, etc.)
const AdminLogin = lazy(() => import("@/pages/admin/login"));
const AdminBookings = lazy(() => import("@/pages/admin/bookings"));
const AdminBlogs = lazy(() => import("@/pages/admin/blogs"));
const AdminTestimonials = lazy(() => import("@/pages/admin/testimonials"));
const AdminServices = lazy(() => import("@/pages/admin/services"));

function Router() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
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
    </Suspense>
  );
}

// Custom hook to ensure hash exists
const useHashCorrection = () => {
  if (!window.location.hash) {
    window.location.hash = "#/";
  }
};

function App() {
  useHashCorrection();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <CookieConsentBanner />
        <WouterRouter hook={useHashLocation}>
          <Router />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
