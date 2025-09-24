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
  type InsertPayment
} from "@shared/schema";
import { randomUUID } from "crypto";

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

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private bookings: Map<string, Booking>;
  private contactForms: Map<string, ContactForm>;
  private blogPosts: Map<string, BlogPost>;
  private leadDownloads: Map<string, LeadDownload>;
  private payments: Map<string, Payment>;

  constructor() {
    this.users = new Map();
    this.bookings = new Map();
    this.contactForms = new Map();
    this.blogPosts = new Map();
    this.leadDownloads = new Map();
    this.payments = new Map();

    // Create default admin user
    this.createDefaultAdmin();
    this.createSampleBlogPosts();
  }

  private async createDefaultAdmin() {
    const adminUser: User = {
      id: randomUUID(),
      username: "admin",
      password: "admin123" // In production, this should be hashed
    };
    this.users.set(adminUser.id, adminUser);
  }

  private async createSampleBlogPosts() {
    const samplePosts: BlogPost[] = [
      {
        id: randomUUID(),
        title: "5 Signs It's Time for a Career Change",
        slug: "5-signs-time-for-career-change",
        excerpt: "Discover the key indicators that suggest you're ready for a new professional direction and how to make the transition smoothly.",
        content: "<p>Career transitions can be both exciting and daunting. Here are five clear signs that indicate it might be time to consider a career change...</p>",
        featuredImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Career Growth",
        published: true,
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "The Power of Daily Meditation",
        slug: "power-of-daily-meditation",
        excerpt: "Learn how incorporating meditation into your daily routine can transform your stress levels and decision-making abilities.",
        content: "<p>Meditation is more than just a relaxation technique. It's a powerful tool for personal transformation...</p>",
        featuredImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Mindfulness",
        published: true,
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Choosing the Right College Course",
        slug: "choosing-right-college-course",
        excerpt: "A comprehensive guide for students and parents on selecting the perfect college course aligned with career aspirations.",
        content: "<p>Choosing the right college course is one of the most important decisions in a student's life...</p>",
        featuredImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Education",
        published: true,
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    samplePosts.forEach(post => {
      this.blogPosts.set(post.id, post);
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Bookings
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const now = new Date();
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      createdAt: now,
      updatedAt: now,
      paymentId: null,
      paymentStatus: "pending",
      description: insertBooking.description || null,
      status: insertBooking.status || "pending"
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking: Booking = { ...booking, ...updates, updatedAt: new Date() };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  async deleteBooking(id: string): Promise<boolean> {
    return this.bookings.delete(id);
  }

  // Contact Forms
  async getAllContactForms(): Promise<ContactForm[]> {
    return Array.from(this.contactForms.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getContactForm(id: string): Promise<ContactForm | undefined> {
    return this.contactForms.get(id);
  }

  async createContactForm(insertForm: InsertContactForm): Promise<ContactForm> {
    const id = randomUUID();
    const form: ContactForm = { 
      ...insertForm, 
      id, 
      status: "new",
      createdAt: new Date() 
    };
    this.contactForms.set(id, form);
    return form;
  }

  async updateContactForm(id: string, updates: Partial<ContactForm>): Promise<ContactForm | undefined> {
    const form = this.contactForms.get(id);
    if (!form) return undefined;
    
    const updatedForm: ContactForm = { ...form, ...updates };
    this.contactForms.set(id, updatedForm);
    return updatedForm;
  }

  // Blog Posts
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.published)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const slug = insertPost.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    const now = new Date();
    const post: BlogPost = { 
      ...insertPost, 
      id, 
      slug,
      createdAt: now,
      updatedAt: now,
      published: insertPost.published || false,
      featured: insertPost.featured || false,
      featuredImage: insertPost.featuredImage || null
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    if (!post) return undefined;
    
    const updatedPost: BlogPost = { ...post, ...updates, updatedAt: new Date() };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  // Lead Downloads
  async getAllLeadDownloads(): Promise<LeadDownload[]> {
    return Array.from(this.leadDownloads.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async createLeadDownload(insertLead: InsertLeadDownload): Promise<LeadDownload> {
    const id = randomUUID();
    const lead: LeadDownload = { 
      ...insertLead, 
      id, 
      createdAt: new Date(),
      resourceId: insertLead.resourceId || null
    };
    this.leadDownloads.set(id, lead);
    return lead;
  }

  // Payments
  async getAllPayments(): Promise<Payment[]> {
    return Array.from(this.payments.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getPayment(id: string): Promise<Payment | undefined> {
    return this.payments.get(id);
  }

  async getPaymentByBookingId(bookingId: string): Promise<Payment | undefined> {
    return Array.from(this.payments.values()).find(payment => payment.bookingId === bookingId);
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const id = randomUUID();
    const now = new Date();
    const payment: Payment = { 
      ...insertPayment, 
      id, 
      createdAt: now,
      updatedAt: now,
      status: insertPayment.status || "pending",
      razorpayPaymentId: insertPayment.razorpayPaymentId || null,
      razorpayOrderId: insertPayment.razorpayOrderId || null,
      currency: insertPayment.currency || "INR",
      paymentMethod: insertPayment.paymentMethod || null
    };
    this.payments.set(id, payment);
    return payment;
  }

  async updatePayment(id: string, updates: Partial<Payment>): Promise<Payment | undefined> {
    const payment = this.payments.get(id);
    if (!payment) return undefined;
    
    const updatedPayment: Payment = { ...payment, ...updates, updatedAt: new Date() };
    this.payments.set(id, updatedPayment);
    return updatedPayment;
  }

  // Statistics
  async getStats() {
    const bookings = Array.from(this.bookings.values());
    const payments = Array.from(this.payments.values());
    
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === "pending").length;
    const completedBookings = bookings.filter(b => b.status === "completed").length;
    const contactedBookings = bookings.filter(b => b.status === "confirmed").length;
    const contactForms = this.contactForms.size;
    const leadDownloads = this.leadDownloads.size;
    const totalPayments = payments.filter(p => p.status === "success").length;
    const totalRevenue = payments
      .filter(p => p.status === "success")
      .reduce((sum, p) => sum + parseFloat(p.amount), 0);

    return {
      totalBookings,
      pendingBookings,
      completedBookings,
      contactedBookings,
      contactForms,
      leadDownloads,
      totalPayments,
      totalRevenue,
      investments: 0 // Can be implemented based on business needs
    };
  }
}

export const storage = new MemStorage();
