import { Service, BlogPost, Testimonial, TeamMember } from "./types";

export const mockServices: Service[] = [
    {
        id: "1",
        serviceId: "life-coaching",
        title: "Life Coaching",
        description: "Unlock your potential and create meaningful change in your personal and professional life.",
        icon: "Heart",
        color: "secondary",
        price: "₹3,000",
        featured: true,
        isQueryForm: false,
        displayOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "2",
        serviceId: "meditation",
        title: "Meditation & Mindfulness",
        description: "Find inner peace and clarity through guided meditation and mindfulness practices.",
        icon: "Leaf",
        color: "accent",
        price: "₹997",
        featured: false,
        isQueryForm: false,
        displayOrder: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "3",
        serviceId: "workshops",
        title: "Workshops & Seminars",
        description: "Interactive sessions to inspire and educate.",
        icon: "Users",
        color: "primary",
        price: "Contact for Details",
        featured: false,
        isQueryForm: true,
        displayOrder: 3,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "4",
        serviceId: "hospitality-consulting",
        title: "Hospitality Consulting",
        description: "Strategic consulting for hospitality businesses.",
        icon: "Building",
        color: "accent",
        price: "Contact for Details",
        featured: false,
        isQueryForm: true,
        displayOrder: 4,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

export const mockBlogPosts: BlogPost[] = [
    {
        id: "1",
        slug: "5-signs-career-change",
        title: "5 Signs It's Time for a Career Change",
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
        id: "2",
        slug: "power-of-meditation",
        title: "The Power of Daily Meditation",
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
        id: "3",
        slug: "choosing-right-course",
        title: "Choosing the Right College Course",
        excerpt: "A comprehensive guide to selecting a college course that aligns with your interests, skills, and career aspirations.",
        content: "<p>Choosing the right college course is one of the most important decisions you'll make...</p>",
        featuredImage: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Education",
        published: true,
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

export const mockTestimonials: Testimonial[] = [
    {
        id: "1",
        name: "Priya Sharma",
        role: "Product Manager, Tech Startup",
        content: "Satish helped me transition from engineering to product management. His holistic approach gave me the confidence to pursue my dreams.",
        imageUrl: "/assets/generated_images/Priya_Sharma_professional_portrait_d5be0c8d.png",
        rating: 5,
        featured: true,
        displayOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "2",
        name: "Rajesh Kumar",
        role: "Senior Manager, Finance",
        content: "The meditation sessions transformed my stress levels. I now handle work pressure with calmness and clarity.",
        imageUrl: "/assets/generated_images/Rajesh_Kumar_professional_portrait_da743fc6.png",
        rating: 5,
        featured: true,
        displayOrder: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "3",
        name: "Meera Agarwal",
        role: "Parent & Entrepreneur",
        content: "His admission guidance was invaluable. My daughter got into her dream college with the perfect career path mapped out.",
        imageUrl: "/assets/generated_images/Meera_Agarwal_professional_portrait_8750340f.png",
        rating: 5,
        featured: true,
        displayOrder: 3,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];
