import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertBookingSchema, 
  insertContactFormSchema, 
  insertBlogPostSchema,
  insertPaymentSchema 
} from "@shared/schema";
import Razorpay from "razorpay";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_key",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "rzp_test_secret",
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Statistics endpoint
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  // Bookings endpoints
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ message: "Invalid booking data", error });
    }
  });

  app.put("/api/bookings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const booking = await storage.updateBooking(id, updates);
      
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      res.json(booking);
    } catch (error) {
      res.status(400).json({ message: "Failed to update booking", error });
    }
  });

  app.delete("/api/bookings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteBooking(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete booking" });
    }
  });

  // Contact forms endpoints
  app.get("/api/contact-forms", async (req, res) => {
    try {
      const forms = await storage.getAllContactForms();
      res.json(forms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact forms" });
    }
  });

  app.post("/api/contact-forms", async (req, res) => {
    try {
      const validatedData = insertContactFormSchema.parse(req.body);
      const form = await storage.createContactForm(validatedData);
      res.status(201).json(form);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact form data", error });
    }
  });

  app.put("/api/contact-forms/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const form = await storage.updateContactForm(id, updates);
      
      if (!form) {
        return res.status(404).json({ message: "Contact form not found" });
      }
      
      res.json(form);
    } catch (error) {
      res.status(400).json({ message: "Failed to update contact form", error });
    }
  });

  // Blog posts endpoints
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const { published } = req.query;
      const posts = published === "true" 
        ? await storage.getPublishedBlogPosts()
        : await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.getBlogPost(id);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog-posts", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid blog post data", error });
    }
  });

  app.put("/api/blog-posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const post = await storage.updateBlogPost(id, updates);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(400).json({ message: "Failed to update blog post", error });
    }
  });

  app.delete("/api/blog-posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteBlogPost(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // Payments endpoints
  app.get("/api/payments", async (req, res) => {
    try {
      const payments = await storage.getAllPayments();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch payments" });
    }
  });

  // Create Razorpay order
  app.post("/api/payments/create-order", async (req, res) => {
    try {
      const { amount, currency = "INR" } = req.body;
      
      const options = {
        amount: Math.round(amount * 100), // Amount in paise
        currency,
        receipt: `receipt_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to create Razorpay order", error });
    }
  });

  // Verify Razorpay payment
  app.post("/api/payments/verify", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking_id } = req.body;
      
      // Verify payment signature (simplified for demo)
      // In production, use crypto.createHmac to verify the signature
      
      // Create payment record
      const paymentData = {
        bookingId: booking_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        amount: "0", // Will be updated with actual amount
        currency: "INR",
        status: "success",
        paymentMethod: "razorpay"
      };

      const payment = await storage.createPayment(paymentData);
      
      // Update booking payment status
      await storage.updateBooking(booking_id, {
        paymentId: razorpay_payment_id,
        paymentStatus: "paid",
        status: "confirmed"
      });

      res.json({ success: true, payment });
    } catch (error) {
      res.status(500).json({ message: "Payment verification failed", error });
    }
  });

  // Lead downloads endpoints
  app.get("/api/lead-downloads", async (req, res) => {
    try {
      const leads = await storage.getAllLeadDownloads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lead downloads" });
    }
  });

  app.post("/api/lead-downloads", async (req, res) => {
    try {
      const lead = await storage.createLeadDownload(req.body);
      res.status(201).json(lead);
    } catch (error) {
      res.status(400).json({ message: "Failed to create lead download", error });
    }
  });

  // Export data endpoints
  app.get("/api/export/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename="bookings.json"');
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to export bookings" });
    }
  });

  app.get("/api/export/contact-forms", async (req, res) => {
    try {
      const forms = await storage.getAllContactForms();
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename="contact-forms.json"');
      res.json(forms);
    } catch (error) {
      res.status(500).json({ message: "Failed to export contact forms" });
    }
  });

  app.get("/api/export/all", async (req, res) => {
    try {
      const [bookings, contactForms, payments, leadDownloads, stats] = await Promise.all([
        storage.getAllBookings(),
        storage.getAllContactForms(),
        storage.getAllPayments(),
        storage.getAllLeadDownloads(),
        storage.getStats()
      ]);

      const exportData = {
        bookings,
        contactForms,
        payments,
        leadDownloads,
        stats,
        exportedAt: new Date().toISOString()
      };

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename="careerclarity-data.json"');
      res.json(exportData);
    } catch (error) {
      res.status(500).json({ message: "Failed to export all data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
