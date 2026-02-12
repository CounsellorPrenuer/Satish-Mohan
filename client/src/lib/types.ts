import { z } from "zod";

export interface Service {
    id: string;
    serviceId: string;
    title: string;
    description: string;
    icon: string;
    price: string;
    features?: string[];
    featured: boolean;
    displayOrder: number;
    color: string;
    isQueryForm: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
    imageUrl?: string;
    featured: boolean;
    displayOrder: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage?: string;
    category: string;
    published: boolean;
    publishedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    featured: boolean;
}

export interface TeamMember {
    name: string;
    role: string;
    image: string;
    bio: string;
}

export interface Booking {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    serviceType: string;
    sessionType: string;
    preferredDate?: string;
    preferredTime?: string;
    description?: string;
    amount: string;
    status: string;
    paymentStatus?: string;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    createdAt?: Date;
}

export interface ContactForm {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
    createdAt?: Date;
}

export interface Payment {
    id: string;
    razorpayPaymentId?: string;
    amount: string;
    status: string;
    bookingId?: string;
    createdAt?: Date;
}

export interface LeadDownload {
    id: string;
    email: string;
    downloadType: string;
    createdAt?: Date;
}

export const insertContactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InsertContactForm = z.infer<typeof insertContactFormSchema>;

export const insertBookingSchema = z.object({
    fullName: z.string().min(2, "Full Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    serviceType: z.string(),
    sessionType: z.string(),
    preferredDate: z.string().optional().or(z.literal("")),
    preferredTime: z.string().optional().or(z.literal("")),
    description: z.string().optional().or(z.literal("")),
    amount: z.string(),
    status: z.string().default("pending"),
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;

export const insertTestimonialSchema = z.object({
    name: z.string().min(2, "Name is required"),
    role: z.string().min(2, "Role is required"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    imageUrl: z.string().optional().or(z.literal("")),
    rating: z.number().min(1).max(5).default(5),
    featured: z.boolean().default(false),
    displayOrder: z.number().default(0),
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export const insertServiceSchema = z.object({
    serviceId: z.string().min(2, "Service ID is required"),
    title: z.string().min(2, "Title is required"),
    description: z.string().min(10, "Description is required"),
    icon: z.string().min(1, "Icon is required"),
    color: z.string().min(1, "Color is required"),
    price: z.string().min(1, "Price is required"),
    featured: z.boolean().default(false),
    isQueryForm: z.boolean().default(false),
    displayOrder: z.number().default(0),
});

export type InsertService = z.infer<typeof insertServiceSchema>;

export const insertBlogPostSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
    content: z.string().min(50, "Content must be at least 50 characters"),
    featuredImage: z.string().optional().or(z.literal("")),
    category: z.string().default("Career Growth"),
    published: z.boolean().default(false),
    featured: z.boolean().default(false),
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
