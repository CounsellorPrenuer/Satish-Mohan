var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";
import cookieParser from "cookie-parser";
import path3 from "path";

// server/routes.ts
import { createServer } from "http";
import crypto from "crypto";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  blogPosts: () => blogPosts,
  bookings: () => bookings,
  bookingsRelations: () => bookingsRelations,
  clients: () => clients,
  clientsRelations: () => clientsRelations,
  contactForms: () => contactForms,
  insertBlogPostSchema: () => insertBlogPostSchema,
  insertBookingSchema: () => insertBookingSchema,
  insertClientSchema: () => insertClientSchema,
  insertContactFormSchema: () => insertContactFormSchema,
  insertLeadDownloadSchema: () => insertLeadDownloadSchema,
  insertPaymentSchema: () => insertPaymentSchema,
  insertServiceSchema: () => insertServiceSchema,
  insertTestimonialSchema: () => insertTestimonialSchema,
  insertTimeSlotSchema: () => insertTimeSlotSchema,
  insertUserSchema: () => insertUserSchema,
  leadDownloads: () => leadDownloads,
  payments: () => payments,
  paymentsRelations: () => paymentsRelations,
  services: () => services,
  servicesRelations: () => servicesRelations,
  testimonials: () => testimonials,
  testimonialsRelations: () => testimonialsRelations,
  timeSlots: () => timeSlots,
  timeSlotsRelations: () => timeSlotsRelations,
  users: () => users
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, decimal, boolean, jsonb, date, time, integer, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  serviceType: text("service_type").notNull(),
  sessionType: text("session_type").notNull(),
  preferredDate: text("preferred_date").notNull(),
  // Keep for backward compatibility
  preferredTime: text("preferred_time").notNull(),
  // Keep for backward compatibility
  timeSlotId: varchar("time_slot_id"),
  // New field for linking to time slots
  clientId: varchar("client_id"),
  // New field for linking to clients
  description: text("description"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  // pending, confirmed, completed, cancelled
  paymentId: text("payment_id"),
  paymentStatus: text("payment_status").default("pending"),
  // pending, paid, failed
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var contactForms = pgTable("contact_forms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  // new, contacted, resolved
  createdAt: timestamp("created_at").defaultNow()
});
var blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  featuredImage: text("featured_image"),
  category: text("category").notNull(),
  published: boolean("published").default(false),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var leadDownloads = pgTable("lead_downloads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name"),
  // Full name of the lead
  email: text("email").notNull(),
  phone: text("phone"),
  // Phone number
  source: text("source").notNull(),
  // booking, payment, contact, download
  sourceId: text("source_id"),
  // ID of the booking/payment/contact/resource
  downloadType: text("download_type"),
  // blog, guide, etc. (for downloads)
  resourceId: text("resource_id"),
  // Resource ID (for downloads)
  createdAt: timestamp("created_at").defaultNow()
});
var payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bookingId: text("booking_id").notNull(),
  razorpayPaymentId: text("razorpay_payment_id"),
  razorpayOrderId: text("razorpay_order_id"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("INR"),
  status: text("status").notNull().default("pending"),
  // pending, success, failed
  paymentMethod: text("payment_method"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var timeSlots = pgTable("time_slots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: date("date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  serviceType: text("service_type").notNull(),
  isAvailable: boolean("is_available").default(true),
  maxBookings: integer("max_bookings").default(1),
  currentBookings: integer("current_bookings").default(0),
  createdAt: timestamp("created_at").defaultNow()
}, (table) => {
  return {
    uniqueSlot: unique().on(table.date, table.startTime, table.serviceType)
  };
});
var clients = pgTable("clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  dateOfBirth: date("date_of_birth"),
  profession: text("profession"),
  experience: text("experience"),
  preferences: jsonb("preferences"),
  // Store client preferences as JSON
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  rating: integer("rating").default(5),
  featured: boolean("featured").default(false),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  serviceId: text("service_id").notNull().unique(),
  // e.g., "life-coaching", "meditation"
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  // Icon name from lucide-react
  color: text("color").notNull(),
  // primary, secondary, accent
  price: text("price").notNull(),
  featured: boolean("featured").default(false),
  isQueryForm: boolean("is_query_form").default(false),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var bookingsRelations = relations(bookings, ({ one }) => ({
  payment: one(payments, {
    fields: [bookings.paymentId],
    references: [payments.id]
  }),
  timeSlot: one(timeSlots, {
    fields: [bookings.timeSlotId],
    references: [timeSlots.id]
  }),
  client: one(clients, {
    fields: [bookings.clientId],
    references: [clients.id]
  })
}));
var paymentsRelations = relations(payments, ({ one }) => ({
  booking: one(bookings, {
    fields: [payments.bookingId],
    references: [bookings.id]
  })
}));
var timeSlotsRelations = relations(timeSlots, ({ many }) => ({
  bookings: many(bookings)
}));
var clientsRelations = relations(clients, ({ many }) => ({
  bookings: many(bookings)
}));
var testimonialsRelations = relations(testimonials, ({}) => ({}));
var servicesRelations = relations(services, ({}) => ({}));
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertTimeSlotSchema = createInsertSchema(timeSlots).omit({
  id: true,
  createdAt: true,
  currentBookings: true
});
var insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  paymentId: true,
  paymentStatus: true
});
var insertContactFormSchema = createInsertSchema(contactForms).omit({
  id: true,
  createdAt: true,
  status: true
});
var insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  slug: true
});
var insertLeadDownloadSchema = createInsertSchema(leadDownloads).omit({
  id: true,
  createdAt: true
});
var insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, count, sum, desc, and, sql as sql2 } from "drizzle-orm";
import bcrypt from "bcryptjs";
var DatabaseStorage = class {
  constructor() {
    this.initializeDefaultData();
  }
  async initializeDefaultData() {
    try {
      const existingAdmin = await this.getUserByUsername("admin");
      if (!existingAdmin) {
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!adminPassword) {
          console.error("\u274C FATAL: ADMIN_PASSWORD environment variable is required for first-time setup.");
          console.error("Please set a secure password and restart the application.");
          process.exit(1);
        }
        await this.createUser({
          username: "admin",
          password: adminPassword
        });
        console.log("\u2713 Admin user created successfully. Please ensure ADMIN_PASSWORD is kept secure.");
      }
      const existingPosts = await this.getAllBlogPosts();
      if (existingPosts.length === 0) {
        await this.createSampleBlogPosts();
      }
      const existingTestimonials = await this.getAllTestimonials();
      if (existingTestimonials.length === 0) {
        await this.createDefaultTestimonials();
      }
      const existingServices = await this.getAllServices();
      if (existingServices.length === 0) {
        await this.createDefaultServices();
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("ADMIN_PASSWORD")) {
        throw error;
      }
      console.log("Note: Database tables not ready yet, will initialize after migration");
    }
  }
  async createSampleBlogPosts() {
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
        featuredImage: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Education",
        published: true,
        featured: false
      }
    ];
    for (const post of samplePosts) {
      await this.createBlogPost(post);
    }
  }
  async createDefaultTestimonials() {
    const defaultTestimonials = [
      {
        name: "Priya Sharma",
        role: "Product Manager, Tech Startup",
        content: "Satish helped me transition from engineering to product management. His holistic approach gave me the confidence to pursue my dreams.",
        imageUrl: "/assets/generated_images/Priya_Sharma_professional_portrait_d5be0c8d.png",
        rating: 5,
        featured: true,
        displayOrder: 1
      },
      {
        name: "Rajesh Kumar",
        role: "Senior Manager, Finance",
        content: "The meditation sessions transformed my stress levels. I now handle work pressure with calmness and clarity.",
        imageUrl: "/assets/generated_images/Rajesh_Kumar_professional_portrait_da743fc6.png",
        rating: 5,
        featured: true,
        displayOrder: 2
      },
      {
        name: "Meera Agarwal",
        role: "Parent & Entrepreneur",
        content: "His admission guidance was invaluable. My daughter got into her dream college with the perfect career path mapped out.",
        imageUrl: "/assets/generated_images/Meera_Agarwal_professional_portrait_8750340f.png",
        rating: 5,
        featured: true,
        displayOrder: 3
      }
    ];
    for (const testimonial of defaultTestimonials) {
      await this.createTestimonial(testimonial);
    }
    console.log("\u2713 Default testimonials created");
  }
  async createDefaultServices() {
    const defaultServices = [
      {
        serviceId: "life-coaching",
        title: "Life Coaching",
        description: "Unlock your potential and create meaningful change in your personal and professional life.",
        icon: "Heart",
        color: "secondary",
        price: "\u20B93,000",
        featured: true,
        isQueryForm: false,
        displayOrder: 1
      },
      {
        serviceId: "meditation",
        title: "Meditation & Mindfulness",
        description: "Find inner peace and clarity through guided meditation and mindfulness practices.",
        icon: "Leaf",
        color: "accent",
        price: "\u20B9997",
        featured: false,
        isQueryForm: false,
        displayOrder: 2
      },
      {
        serviceId: "workshops",
        title: "Workshops & Seminars",
        description: "Interactive sessions to inspire and educate.",
        icon: "Users",
        color: "primary",
        price: "Contact for Details",
        featured: false,
        isQueryForm: true,
        displayOrder: 3
      },
      {
        serviceId: "hospitality-consulting",
        title: "Hospitality Consulting",
        description: "Strategic consulting for hospitality businesses.",
        icon: "Building",
        color: "accent",
        price: "Contact for Details",
        featured: false,
        isQueryForm: true,
        displayOrder: 4
      }
    ];
    for (const service of defaultServices) {
      await this.createService(service);
    }
    console.log("\u2713 Default services created");
  }
  // Users
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const [user] = await db.insert(users).values({
      ...insertUser,
      password: hashedPassword
    }).returning();
    return user;
  }
  async validateUserCredentials(username, password) {
    const user = await this.getUserByUsername(username);
    if (!user) {
      return null;
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    return isValidPassword ? user : null;
  }
  // Bookings
  async getAllBookings() {
    return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }
  async getBooking(id) {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || void 0;
  }
  async createBooking(insertBooking) {
    const [booking] = await db.insert(bookings).values(insertBooking).returning();
    return booking;
  }
  async updateBooking(id, updates) {
    const [booking] = await db.update(bookings).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(bookings.id, id)).returning();
    return booking || void 0;
  }
  async deleteBooking(id) {
    const result = await db.delete(bookings).where(eq(bookings.id, id));
    return (result.rowCount || 0) > 0;
  }
  // Contact Forms
  async getAllContactForms() {
    return await db.select().from(contactForms).orderBy(desc(contactForms.createdAt));
  }
  async getContactForm(id) {
    const [form] = await db.select().from(contactForms).where(eq(contactForms.id, id));
    return form || void 0;
  }
  async createContactForm(insertForm) {
    const [form] = await db.insert(contactForms).values(insertForm).returning();
    return form;
  }
  async updateContactForm(id, updates) {
    const [form] = await db.update(contactForms).set(updates).where(eq(contactForms.id, id)).returning();
    return form || void 0;
  }
  // Blog Posts
  async getAllBlogPosts() {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }
  async getPublishedBlogPosts() {
    return await db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.createdAt));
  }
  async getBlogPost(id) {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || void 0;
  }
  async getBlogPostBySlug(slug) {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || void 0;
  }
  async createBlogPost(insertPost) {
    const slug = insertPost.title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").trim();
    const [post] = await db.insert(blogPosts).values({ ...insertPost, slug }).returning();
    return post;
  }
  async updateBlogPost(id, updates) {
    if (updates.title) {
      updates.slug = updates.title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").trim();
    }
    const [post] = await db.update(blogPosts).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(blogPosts.id, id)).returning();
    return post || void 0;
  }
  async deleteBlogPost(id) {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return (result.rowCount || 0) > 0;
  }
  // Lead Downloads
  async getAllLeadDownloads() {
    return await db.select().from(leadDownloads).orderBy(desc(leadDownloads.createdAt));
  }
  async createLeadDownload(insertLead) {
    const [lead] = await db.insert(leadDownloads).values(insertLead).returning();
    return lead;
  }
  // Payments
  async getAllPayments() {
    return await db.select().from(payments).orderBy(desc(payments.createdAt));
  }
  async getPayment(id) {
    const [payment] = await db.select().from(payments).where(eq(payments.id, id));
    return payment || void 0;
  }
  async getPaymentByBookingId(bookingId) {
    const [payment] = await db.select().from(payments).where(eq(payments.bookingId, bookingId));
    return payment || void 0;
  }
  async createPayment(insertPayment) {
    const [payment] = await db.insert(payments).values(insertPayment).returning();
    return payment;
  }
  async updatePayment(id, updates) {
    const [payment] = await db.update(payments).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(payments.id, id)).returning();
    return payment || void 0;
  }
  // Time Slots
  async getAllTimeSlots() {
    return await db.select().from(timeSlots).orderBy(desc(timeSlots.date));
  }
  async getAvailableTimeSlots(date2, serviceType) {
    const conditions = [
      eq(timeSlots.date, date2),
      eq(timeSlots.isAvailable, true),
      sql2`current_bookings < max_bookings`
    ];
    if (serviceType) {
      conditions.push(eq(timeSlots.serviceType, serviceType));
    }
    return await db.select().from(timeSlots).where(and(...conditions)).orderBy(timeSlots.startTime);
  }
  async getTimeSlot(id) {
    const [slot] = await db.select().from(timeSlots).where(eq(timeSlots.id, id));
    return slot || void 0;
  }
  async createTimeSlot(insertTimeSlot) {
    const [slot] = await db.insert(timeSlots).values(insertTimeSlot).returning();
    return slot;
  }
  async updateTimeSlot(id, updates) {
    const [slot] = await db.update(timeSlots).set(updates).where(eq(timeSlots.id, id)).returning();
    return slot || void 0;
  }
  async deleteTimeSlot(id) {
    const result = await db.delete(timeSlots).where(eq(timeSlots.id, id));
    return (result.rowCount || 0) > 0;
  }
  async reserveTimeSlot(slotId) {
    const [reservedSlot] = await db.update(timeSlots).set({
      currentBookings: sql2`current_bookings + 1`,
      isAvailable: sql2`CASE WHEN current_bookings + 1 >= max_bookings THEN false ELSE true END`
    }).where(
      and(
        eq(timeSlots.id, slotId),
        sql2`current_bookings < max_bookings`,
        eq(timeSlots.isAvailable, true)
      )
    ).returning();
    return reservedSlot || null;
  }
  // Clients
  async getAllClients() {
    return await db.select().from(clients).orderBy(desc(clients.createdAt));
  }
  async getClient(id) {
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client || void 0;
  }
  async getClientByEmail(email) {
    const [client] = await db.select().from(clients).where(eq(clients.email, email));
    return client || void 0;
  }
  async createClient(insertClient) {
    const [client] = await db.insert(clients).values(insertClient).returning();
    return client;
  }
  async updateClient(id, updates) {
    const [client] = await db.update(clients).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(clients.id, id)).returning();
    return client || void 0;
  }
  // Testimonials
  async getAllTestimonials() {
    return await db.select().from(testimonials).orderBy(testimonials.displayOrder, desc(testimonials.createdAt));
  }
  async getTestimonial(id) {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial || void 0;
  }
  async createTestimonial(insertTestimonial) {
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    return testimonial;
  }
  async updateTestimonial(id, updates) {
    const [testimonial] = await db.update(testimonials).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(testimonials.id, id)).returning();
    return testimonial || void 0;
  }
  async deleteTestimonial(id) {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id));
    return (result.rowCount || 0) > 0;
  }
  // Services
  async getAllServices() {
    return await db.select().from(services).orderBy(services.displayOrder, desc(services.createdAt));
  }
  async getService(id) {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || void 0;
  }
  async getServiceByServiceId(serviceId) {
    const [service] = await db.select().from(services).where(eq(services.serviceId, serviceId));
    return service || void 0;
  }
  async createService(insertService) {
    const [service] = await db.insert(services).values(insertService).returning();
    return service;
  }
  async updateService(id, updates) {
    const [service] = await db.update(services).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(services.id, id)).returning();
    return service || void 0;
  }
  async deleteService(id) {
    const result = await db.delete(services).where(eq(services.id, id));
    return (result.rowCount || 0) > 0;
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
      investments: 0
      // Can be implemented based on business needs
    };
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import Razorpay from "razorpay";
import OpenAI from "openai";
var openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_key",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "rzp_test_secret"
});
var ADMIN_USERNAME = "admin";
var ADMIN_PASSWORD = "admin";
var AUTH_SECRET = process.env.SESSION_SECRET || "fallback-auth-secret";
function createAuthToken(username) {
  const payload = JSON.stringify({ username, exp: Date.now() + 24 * 60 * 60 * 1e3 });
  const signature = crypto.createHmac("sha256", AUTH_SECRET).update(payload).digest("hex");
  return `${Buffer.from(payload).toString("base64")}.${signature}`;
}
function verifyAuthToken(token) {
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
function requireAuth(req, res, next) {
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
async function registerRoutes(app2) {
  app2.post("/api/auth/login", async (req, res) => {
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
          maxAge: 24 * 60 * 60 * 1e3
          // 24 hours
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
  app2.post("/api/auth/logout", (req, res) => {
    res.clearCookie("authToken");
    res.json({ success: true, message: "Logout successful" });
  });
  app2.get("/api/auth/status", (req, res) => {
    const token = req.cookies?.authToken;
    const verified = token ? verifyAuthToken(token) : null;
    res.json({
      isAuthenticated: !!verified,
      adminId: verified?.username || null
    });
  });
  app2.get("/api/stats", requireAuth, async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });
  app2.get("/api/bookings", requireAuth, async (req, res) => {
    try {
      const bookings2 = await storage.getAllBookings();
      res.json(bookings2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });
  app2.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      try {
        await storage.createLeadDownload({
          name: booking.fullName,
          email: booking.email,
          phone: booking.phone || void 0,
          source: "booking",
          sourceId: booking.id
        });
      } catch (leadError) {
        console.error("Failed to create lead from booking:", leadError);
      }
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ message: "Invalid booking data", error });
    }
  });
  app2.put("/api/bookings/:id", requireAuth, async (req, res) => {
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
  app2.delete("/api/bookings/:id", requireAuth, async (req, res) => {
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
  app2.get("/api/contact-forms", requireAuth, async (req, res) => {
    try {
      const forms = await storage.getAllContactForms();
      res.json(forms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact forms" });
    }
  });
  app2.post("/api/contact-forms", async (req, res) => {
    try {
      const validatedData = insertContactFormSchema.parse(req.body);
      const form = await storage.createContactForm(validatedData);
      try {
        await storage.createLeadDownload({
          name: form.name,
          email: form.email,
          source: "contact",
          sourceId: form.id
        });
      } catch (leadError) {
        console.error("Failed to create lead from contact form:", leadError);
      }
      res.status(201).json(form);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact form data", error });
    }
  });
  app2.put("/api/contact-forms/:id", requireAuth, async (req, res) => {
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
  app2.get("/api/blog-posts", async (req, res) => {
    try {
      const { published } = req.query;
      const posts = published === "true" ? await storage.getPublishedBlogPosts() : await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });
  app2.get("/api/blog-posts/:id", async (req, res) => {
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
  app2.post("/api/blog-posts", requireAuth, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid blog post data", error });
    }
  });
  app2.put("/api/blog-posts/:id", requireAuth, async (req, res) => {
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
  app2.delete("/api/blog-posts/:id", requireAuth, async (req, res) => {
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
  app2.post("/api/generate-blog", requireAuth, async (req, res) => {
    try {
      const { topic, keywords, tone, length } = req.body;
      if (!topic) {
        return res.status(400).json({ message: "Topic is required" });
      }
      const wordCountMatch = length.match(/\d+-\d+/);
      const wordCountRange = wordCountMatch ? wordCountMatch[0] : "1500-2000";
      const prompt = `You are a professional blog writer for Innervea, a transformation and life coaching platform. Write a comprehensive, engaging blog post with the following specifications:

Topic: ${topic}
Keywords: ${keywords || "career development, personal growth, life coaching"}
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
        response_format: { type: "json_object" }
      });
      const generatedContent = JSON.parse(response.choices[0].message.content || "{}");
      res.json({
        title: generatedContent.title || topic,
        excerpt: generatedContent.excerpt || "",
        content: generatedContent.content || "",
        category: generatedContent.category || "Personal Development",
        imageUrl: generatedContent.imageUrl || ""
      });
    } catch (error) {
      console.error("AI blog generation error:", error);
      res.status(500).json({ message: "Failed to generate blog post", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });
  app2.get("/api/payments", requireAuth, async (req, res) => {
    try {
      const payments2 = await storage.getAllPayments();
      res.json(payments2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch payments" });
    }
  });
  app2.get("/api/payments/razorpay-key", async (req, res) => {
    res.json({ key: process.env.RAZORPAY_KEY_ID || "rzp_test_key" });
  });
  app2.post("/api/payments/create-order", async (req, res) => {
    try {
      const { amount, currency = "INR" } = req.body;
      const options = {
        amount: Math.round(amount * 100),
        // Amount in paise
        currency,
        receipt: `receipt_${Date.now()}`
      };
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to create Razorpay order", error });
    }
  });
  app2.post("/api/payments/verify", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking_id } = req.body;
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "").update(body.toString()).digest("hex");
      if (expectedSignature !== razorpay_signature) {
        console.error("Razorpay signature verification failed");
        return res.status(400).json({
          success: false,
          message: "Payment verification failed. Invalid signature."
        });
      }
      const booking = await storage.getBooking(booking_id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
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
      await storage.updateBooking(booking_id, {
        paymentId: razorpay_payment_id,
        paymentStatus: "paid",
        status: "confirmed"
      });
      try {
        await storage.createLeadDownload({
          name: booking.fullName,
          email: booking.email,
          phone: booking.phone || void 0,
          source: "payment",
          sourceId: payment.id
        });
      } catch (leadError) {
        console.error("Failed to create lead from payment:", leadError);
      }
      res.json({ success: true, payment });
    } catch (error) {
      res.status(500).json({ message: "Payment verification failed", error });
    }
  });
  app2.post("/api/payments/confirm-upi", async (req, res) => {
    try {
      const { booking_id } = req.body;
      if (!booking_id) {
        return res.status(400).json({ message: "Booking ID is required" });
      }
      const booking = await storage.getBooking(booking_id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      const paymentData = {
        bookingId: booking_id,
        amount: booking.amount,
        currency: "INR",
        status: "pending",
        // Admin will verify manually
        paymentMethod: "upi"
      };
      const payment = await storage.createPayment(paymentData);
      await storage.updateBooking(booking_id, {
        paymentStatus: "pending",
        status: "pending"
      });
      try {
        await storage.createLeadDownload({
          name: booking.fullName,
          email: booking.email,
          phone: booking.phone || void 0,
          source: "upi_payment",
          sourceId: payment.id
        });
      } catch (leadError) {
        console.error("Failed to create lead from UPI payment:", leadError);
      }
      res.json({ success: true, payment, message: "Payment confirmation received. We will verify and contact you soon." });
    } catch (error) {
      console.error("UPI payment confirmation error:", error);
      res.status(500).json({ message: "Failed to confirm payment", error: String(error) });
    }
  });
  app2.get("/api/lead-downloads", async (req, res) => {
    try {
      const leads = await storage.getAllLeadDownloads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lead downloads" });
    }
  });
  app2.post("/api/lead-downloads", async (req, res) => {
    try {
      const lead = await storage.createLeadDownload(req.body);
      res.status(201).json(lead);
    } catch (error) {
      res.status(400).json({ message: "Failed to create lead download", error });
    }
  });
  app2.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials2 = await storage.getAllTestimonials();
      res.json(testimonials2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  app2.get("/api/testimonials/:id", async (req, res) => {
    try {
      const testimonial = await storage.getTestimonial(req.params.id);
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      res.json(testimonial);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonial" });
    }
  });
  app2.post("/api/testimonials", requireAuth, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error) {
      res.status(400).json({ message: "Failed to create testimonial", error });
    }
  });
  app2.patch("/api/testimonials/:id", requireAuth, async (req, res) => {
    try {
      const testimonial = await storage.updateTestimonial(req.params.id, req.body);
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      res.json(testimonial);
    } catch (error) {
      res.status(400).json({ message: "Failed to update testimonial", error });
    }
  });
  app2.delete("/api/testimonials/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deleteTestimonial(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete testimonial" });
    }
  });
  app2.get("/api/services", async (req, res) => {
    try {
      const services2 = await storage.getAllServices();
      res.json(services2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });
  app2.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getService(req.params.id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });
  app2.post("/api/services", requireAuth, async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ message: "Failed to create service", error });
    }
  });
  app2.patch("/api/services/:id", requireAuth, async (req, res) => {
    try {
      const service = await storage.updateService(req.params.id, req.body);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(400).json({ message: "Failed to update service", error });
    }
  });
  app2.delete("/api/services/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deleteService(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete service" });
    }
  });
  app2.get("/api/export/bookings", async (req, res) => {
    try {
      const bookings2 = await storage.getAllBookings();
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-Disposition", 'attachment; filename="bookings.json"');
      res.json(bookings2);
    } catch (error) {
      res.status(500).json({ message: "Failed to export bookings" });
    }
  });
  app2.get("/api/export/contact-forms", async (req, res) => {
    try {
      const forms = await storage.getAllContactForms();
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-Disposition", 'attachment; filename="contact-forms.json"');
      res.json(forms);
    } catch (error) {
      res.status(500).json({ message: "Failed to export contact forms" });
    }
  });
  app2.get("/api/export/all", async (req, res) => {
    try {
      const [bookings2, contactForms2, payments2, leadDownloads2, stats] = await Promise.all([
        storage.getAllBookings(),
        storage.getAllContactForms(),
        storage.getAllPayments(),
        storage.getAllLeadDownloads(),
        storage.getStats()
      ]);
      const exportData = {
        bookings: bookings2,
        contactForms: contactForms2,
        payments: payments2,
        leadDownloads: leadDownloads2,
        stats,
        exportedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-Disposition", 'attachment; filename="careerclarity-data.json"');
      res.json(exportData);
    } catch (error) {
      res.status(500).json({ message: "Failed to export all data" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
var vite_config_default = defineConfig({
  base: "./",
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/assets", express2.static(path3.resolve(process.cwd(), "attached_assets")));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
