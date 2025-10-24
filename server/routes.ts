import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import crypto from "crypto";
import { storage } from "./storage";
import { 
  insertBookingSchema, 
  insertContactFormSchema, 
  insertBlogPostSchema,
  insertPaymentSchema 
} from "@shared/schema";
import Razorpay from "razorpay";
import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_key",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "rzp_test_secret",
});

// Hardcoded admin credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";
const AUTH_SECRET = process.env.SESSION_SECRET || "fallback-auth-secret";

// Simple token-based authentication helpers
function createAuthToken(username: string): string {
  const payload = JSON.stringify({ username, exp: Date.now() + 24 * 60 * 60 * 1000 });
  const signature = crypto.createHmac("sha256", AUTH_SECRET).update(payload).digest("hex");
  return `${Buffer.from(payload).toString("base64")}.${signature}`;
}

function verifyAuthToken(token: string): { username: string } | null {
  try {
    const [payloadB64, signature] = token.split(".");
    const payload = Buffer.from(payloadB64, "base64").toString();
    const expectedSignature = crypto.createHmac("sha256", AUTH_SECRET).update(payload).digest("hex");
    
    if (signature !== expectedSignature) return null;
    
    const data = JSON.parse(payload);
    if (data.exp < Date.now()) return null;
    
    return { username: data.username };
  } catch {
    return null;
  }
}

// Authentication middleware for admin routes
function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.authToken;
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }
  
  const verified = verifyAuthToken(token);
  if (!verified) {
    return res.status(401).json({ message: "Authentication required" });
  }
  
  return next();
}

export async function registerRoutes(app: Express): Promise<Server> {

  // Authentication endpoints
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const token = createAuthToken(username);
        
        res.cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });
        
        return res.json({ success: true, message: "Login successful" });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Login failed", error: String(error) });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("authToken");
    res.json({ success: true, message: "Logout successful" });
  });

  app.get("/api/auth/status", (req, res) => {
    const token = req.cookies?.authToken;
    const verified = token ? verifyAuthToken(token) : null;
    
    res.json({ 
      isAuthenticated: !!verified,
      adminId: verified?.username || null
    });
  });
  
  // Statistics endpoint (admin only)
  app.get("/api/stats", requireAuth, async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  // Bookings endpoints
  app.get("/api/bookings", requireAuth, async (req, res) => {
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
      
      // Automatically create a lead from this booking (non-blocking)
      try {
        await storage.createLeadDownload({
          name: booking.fullName,
          email: booking.email,
          phone: booking.phone || undefined,
          source: "booking",
          sourceId: booking.id,
        });
      } catch (leadError) {
        // Log error but don't fail the booking
        console.error("Failed to create lead from booking:", leadError);
      }
      
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ message: "Invalid booking data", error });
    }
  });

  app.put("/api/bookings/:id", requireAuth, async (req, res) => {
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

  app.delete("/api/bookings/:id", requireAuth, async (req, res) => {
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
  app.get("/api/contact-forms", requireAuth, async (req, res) => {
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
      
      // Automatically create a lead from this contact form (non-blocking)
      try {
        await storage.createLeadDownload({
          name: form.name,
          email: form.email,
          source: "contact",
          sourceId: form.id,
        });
      } catch (leadError) {
        // Log error but don't fail the contact form submission
        console.error("Failed to create lead from contact form:", leadError);
      }
      
      res.status(201).json(form);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact form data", error });
    }
  });

  app.put("/api/contact-forms/:id", requireAuth, async (req, res) => {
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

  app.post("/api/blog-posts", requireAuth, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid blog post data", error });
    }
  });

  app.put("/api/blog-posts/:id", requireAuth, async (req, res) => {
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

  app.delete("/api/blog-posts/:id", requireAuth, async (req, res) => {
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

  // AI Blog Generation endpoint
  app.post("/api/generate-blog", requireAuth, async (req, res) => {
    try {
      const { topic, keywords, tone, length } = req.body;
      
      if (!topic) {
        return res.status(400).json({ message: "Topic is required" });
      }

      // Extract word count from length string
      const wordCountMatch = length.match(/\d+-\d+/);
      const wordCountRange = wordCountMatch ? wordCountMatch[0] : "1500-2000";

      // Generate blog post using OpenAI
      const prompt = `You are a professional blog writer for Innervea, a transformation and life coaching platform. Write a comprehensive, engaging blog post with the following specifications:

Topic: ${topic}
Keywords: ${keywords || 'career development, personal growth, life coaching'}
Tone: ${tone}
Length: ${wordCountRange} words

Please provide the response in the following JSON format:
{
  "title": "Blog post title",
  "excerpt": "A compelling 2-3 sentence excerpt",
  "content": "Full blog post content in HTML format with proper headings, paragraphs, lists, and formatting",
  "category": "One of: Career Growth, Mindfulness, Education, Life Coaching, or Personal Development",
  "imageUrl": "Suggest an Unsplash image URL related to the topic"
}

Make the content insightful, actionable, and aligned with Innervea's mission of empowering individuals through transformation and life coaching. Include practical tips, examples, and a strong conclusion.`;

      const response = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: "You are a professional content writer specializing in life coaching, career development, and personal transformation. Your writing is clear, inspiring, and actionable."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
      });

      const generatedContent = JSON.parse(response.choices[0].message.content || "{}");
      
      res.json({
        title: generatedContent.title || topic,
        excerpt: generatedContent.excerpt || "",
        content: generatedContent.content || "",
        category: generatedContent.category || "Personal Development",
        imageUrl: generatedContent.imageUrl || "",
      });
    } catch (error) {
      console.error("AI blog generation error:", error);
      res.status(500).json({ message: "Failed to generate blog post", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  // Payments endpoints
  app.get("/api/payments", requireAuth, async (req, res) => {
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
      
      // Get the booking to retrieve the actual amount
      const booking = await storage.getBooking(booking_id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      // Create payment record with actual booking amount
      const paymentData = {
        bookingId: booking_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        amount: booking.amount,
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

      // Automatically create a lead from this payment (non-blocking)
      try {
        await storage.createLeadDownload({
          name: booking.fullName,
          email: booking.email,
          phone: booking.phone || undefined,
          source: "payment",
          sourceId: payment.id,
        });
      } catch (leadError) {
        // Log error but don't fail the payment
        console.error("Failed to create lead from payment:", leadError);
      }

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
