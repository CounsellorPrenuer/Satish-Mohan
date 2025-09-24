import { 
  type User, 
  type InsertUser, 
  type Booking, 
  type InsertBooking,
  type ContactForm,
  type InsertContactForm,
  type BlogPost,
  type InsertBlogPost,
  type LeadDownload,
  type InsertLeadDownload,
  type Payment,
  type InsertPayment,
  users,
  bookings,
  contactForms,
  blogPosts,
  leadDownloads,
  payments
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, count, sum, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Bookings
  getAllBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | undefined>;
  deleteBooking(id: string): Promise<boolean>;

  // Contact Forms
  getAllContactForms(): Promise<ContactForm[]>;
  getContactForm(id: string): Promise<ContactForm | undefined>;
  createContactForm(form: InsertContactForm): Promise<ContactForm>;
  updateContactForm(id: string, updates: Partial<ContactForm>): Promise<ContactForm | undefined>;

  // Blog Posts
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;

  // Lead Downloads
  getAllLeadDownloads(): Promise<LeadDownload[]>;
  createLeadDownload(lead: InsertLeadDownload): Promise<LeadDownload>;

  // Payments
  getAllPayments(): Promise<Payment[]>;
  getPayment(id: string): Promise<Payment | undefined>;
  getPaymentByBookingId(bookingId: string): Promise<Payment | undefined>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePayment(id: string, updates: Partial<Payment>): Promise<Payment | undefined>;

  // Statistics
  getStats(): Promise<{
    totalBookings: number;
    pendingBookings: number;
    completedBookings: number;
    contactedBookings: number;
    contactForms: number;
    leadDownloads: number;
    totalPayments: number;
    totalRevenue: number;
    investments: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Initialize default data if needed
    this.initializeDefaultData();
  }

  private async initializeDefaultData() {
    try {
      // Check if admin user exists, if not create one
      const existingAdmin = await this.getUserByUsername("admin");
      if (!existingAdmin) {
        await this.createUser({
          username: "admin",
          password: "admin123" // In production, this should be hashed
        });
      }

      // Create sample blog posts if none exist
      const existingPosts = await this.getAllBlogPosts();
      if (existingPosts.length === 0) {
        await this.createSampleBlogPosts();
      }
    } catch (error) {
      console.log("Note: Database tables not ready yet, will initialize after migration");
    }
  }

  private async createSampleBlogPosts() {
    const samplePosts = [
      {
        title: "5 Signs It's Time for a Career Change",
        excerpt: "Discover the key indicators that suggest you're ready for a new professional direction and how to make the transition smoothly.",
        content: "<p>Career transitions can be both exciting and daunting. Here are five clear signs that indicate it might be time to consider a career change...</p>",
        featuredImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Career Growth",
        published: true,
        featured: true
      },
      {
        title: "The Power of Daily Meditation",
        excerpt: "Learn how incorporating meditation into your daily routine can transform your stress levels and decision-making abilities.",
        content: "<p>Meditation is more than just a relaxation technique. It's a powerful tool for personal transformation...</p>",
        featuredImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Mindfulness",
        published: true,
        featured: false
      },
      {
        title: "Choosing the Right College Course",
        excerpt: "A comprehensive guide to selecting a college course that aligns with your interests, skills, and career aspirations.",
        content: "<p>Choosing the right college course is one of the most important decisions you'll make...</p>",
        featuredImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Education",
        published: true,
        featured: false
      }
    ];

    for (const post of samplePosts) {
      await this.createBlogPost(post);
    }
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Bookings
  async getAllBookings(): Promise<Booking[]> {
    return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db
      .insert(bookings)
      .values(insertBooking)
      .returning();
    return booking;
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | undefined> {
    const [booking] = await db
      .update(bookings)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(bookings.id, id))
      .returning();
    return booking || undefined;
  }

  async deleteBooking(id: string): Promise<boolean> {
    const result = await db.delete(bookings).where(eq(bookings.id, id));
    return result.rowCount > 0;
  }

  // Contact Forms
  async getAllContactForms(): Promise<ContactForm[]> {
    return await db.select().from(contactForms).orderBy(desc(contactForms.createdAt));
  }

  async getContactForm(id: string): Promise<ContactForm | undefined> {
    const [form] = await db.select().from(contactForms).where(eq(contactForms.id, id));
    return form || undefined;
  }

  async createContactForm(insertForm: InsertContactForm): Promise<ContactForm> {
    const [form] = await db
      .insert(contactForms)
      .values(insertForm)
      .returning();
    return form;
  }

  async updateContactForm(id: string, updates: Partial<ContactForm>): Promise<ContactForm | undefined> {
    const [form] = await db
      .update(contactForms)
      .set(updates)
      .where(eq(contactForms.id, id))
      .returning();
    return form || undefined;
  }

  // Blog Posts
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    // Generate slug from title
    const slug = insertPost.title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    
    const [post] = await db
      .insert(blogPosts)
      .values({ ...insertPost, slug })
      .returning();
    return post;
  }

  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | undefined> {
    // If title is being updated, regenerate slug
    if (updates.title) {
      updates.slug = updates.title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
    }

    const [post] = await db
      .update(blogPosts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return post || undefined;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return result.rowCount > 0;
  }

  // Lead Downloads
  async getAllLeadDownloads(): Promise<LeadDownload[]> {
    return await db.select().from(leadDownloads).orderBy(desc(leadDownloads.createdAt));
  }

  async createLeadDownload(insertLead: InsertLeadDownload): Promise<LeadDownload> {
    const [lead] = await db
      .insert(leadDownloads)
      .values(insertLead)
      .returning();
    return lead;
  }

  // Payments
  async getAllPayments(): Promise<Payment[]> {
    return await db.select().from(payments).orderBy(desc(payments.createdAt));
  }

  async getPayment(id: string): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.id, id));
    return payment || undefined;
  }

  async getPaymentByBookingId(bookingId: string): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.bookingId, bookingId));
    return payment || undefined;
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const [payment] = await db
      .insert(payments)
      .values(insertPayment)
      .returning();
    return payment;
  }

  async updatePayment(id: string, updates: Partial<Payment>): Promise<Payment | undefined> {
    const [payment] = await db
      .update(payments)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(payments.id, id))
      .returning();
    return payment || undefined;
  }

  // Statistics
  async getStats() {
    const [bookingsCount] = await db.select({ count: count() }).from(bookings);
    const [pendingCount] = await db.select({ count: count() }).from(bookings).where(eq(bookings.status, "pending"));
    const [completedCount] = await db.select({ count: count() }).from(bookings).where(eq(bookings.status, "completed"));
    const [confirmedCount] = await db.select({ count: count() }).from(bookings).where(eq(bookings.status, "confirmed"));
    const [contactFormsCount] = await db.select({ count: count() }).from(contactForms);
    const [leadDownloadsCount] = await db.select({ count: count() }).from(leadDownloads);
    const [successPaymentsCount] = await db.select({ count: count() }).from(payments).where(eq(payments.status, "success"));
    
    const [revenueResult] = await db.select({ 
      revenue: sum(payments.amount) 
    }).from(payments).where(eq(payments.status, "success"));

    return {
      totalBookings: bookingsCount.count,
      pendingBookings: pendingCount.count,
      completedBookings: completedCount.count,
      contactedBookings: confirmedCount.count,
      contactForms: contactFormsCount.count,
      leadDownloads: leadDownloadsCount.count,
      totalPayments: successPaymentsCount.count,
      totalRevenue: parseFloat(revenueResult.revenue || "0"),
      investments: 0 // Can be implemented based on business needs
    };
  }
}

export const storage = new DatabaseStorage();