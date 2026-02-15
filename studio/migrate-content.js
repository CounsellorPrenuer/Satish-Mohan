const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
const https = require('https');

// --- CONFIGURATION ---
const client = createClient({
    projectId: 'f6u82n2q',
    dataset: 'production',
    apiVersion: '2023-05-03',
    token: 'skmdBbcKodRqpWHD2No8DYVcHweodFOkV1uu1XaGIQIstqOFGh851VYuwqgmVzDpoaHsuY3TVR1u9LSYMBBpmnnoL8az3Leroxy2preZcOWwDyNJMb5J4RGumHyPhV2C8JZrJeE2bMsQq8HLGUl8OgrxNYssu8KVESDJLK9oxpDOpS06O6Nm',
    useCdn: false, // We are writing data
});

const ASSETS_DIR = path.resolve(__dirname, '..', 'attached_assets');
console.log('Assets Directory:', ASSETS_DIR);

// --- DATA ---
const services = [
    {
        serviceId: "life-coaching",
        title: "Life Coaching",
        description: "Unlock your potential and create meaningful change in your personal and professional life.",
        icon: "Heart",
        price: "₹3,000",
        featured: true,
        displayOrder: 1,
    },
    {
        serviceId: "meditation",
        title: "Meditation & Mindfulness",
        description: "Find inner peace and clarity through guided meditation and mindfulness practices.",
        icon: "Leaf",
        price: "₹997",
        featured: false,
        displayOrder: 2,
    },
    {
        serviceId: "workshops",
        title: "Workshops & Seminars",
        description: "Interactive sessions to inspire and educate.",
        icon: "Users",
        price: "Contact for Details",
        featured: false,
        displayOrder: 3,
    },
    {
        serviceId: "hospitality-consulting",
        title: "Hospitality Consulting",
        description: "Strategic consulting for hospitality businesses.",
        icon: "Building",
        price: "Contact for Details",
        featured: false,
        displayOrder: 4,
    }
];

const testimonials = [
    {
        name: "Priya Sharma",
        role: "Product Manager, Tech Startup",
        content: "Satish helped me transition from engineering to product management. His holistic approach gave me the confidence to pursue my dreams.",
        imageName: "Priya_Sharma_professional_portrait_d5be0c8d.png",
        rating: 5,
        featured: true,
        displayOrder: 1,
    },
    {
        name: "Rajesh Kumar",
        role: "Senior Manager, Finance",
        content: "The meditation sessions transformed my stress levels. I now handle work pressure with calmness and clarity.",
        imageName: "Rajesh_Kumar_professional_portrait_da743fc6.png",
        rating: 5,
        featured: true,
        displayOrder: 2,
    },
    {
        name: "Meera Agarwal",
        role: "Parent & Entrepreneur",
        content: "His admission guidance was invaluable. My daughter got into her dream college with the perfect career path mapped out.",
        imageName: "Meera_Agarwal_professional_portrait_8750340f.png",
        rating: 5,
        featured: true,
        displayOrder: 3,
    }
];

const blogPosts = [
    {
        slug: "5-signs-career-change",
        title: "5 Signs It's Time for a Career Change",
        excerpt: "Discover the key indicators that suggest you're ready for a new professional direction and how to make the transition smoothly.",
        content: [
            {
                _key: 'block1',
                _type: 'block',
                children: [{ _key: 'span1', _type: 'span', text: "Career transitions can be both exciting and daunting. Here are five clear signs that indicate it might be time to consider a career change..." }]
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Career Growth",
        published: true,
        featured: true,
    },
    {
        slug: "power-of-meditation",
        title: "The Power of Daily Meditation",
        excerpt: "Learn how incorporating meditation into your daily routine can transform your stress levels and decision-making abilities.",
        content: [
            {
                _key: 'block1',
                _type: 'block',
                children: [{ _key: 'span1', _type: 'span', text: "Meditation is more than just a relaxation technique. It's a powerful tool for personal transformation..." }]
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Mindfulness",
        published: true,
        featured: false,
    },
    {
        slug: "choosing-right-course",
        title: "Choosing the Right College Course",
        excerpt: "A comprehensive guide to selecting a college course that aligns with your interests, skills, and career aspirations.",
        content: [
            {
                _key: 'block1',
                _type: 'block',
                children: [{ _key: 'span1', _type: 'span', text: "Choosing the right college course is one of the most important decisions you'll make..." }]
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Education",
        published: true,
        featured: false,
    }
];

const pricingData = {
    "8-9-students": {
        heading: "Packages for 8th-9th Students",
        subheading: "Early career exploration & foundation building",
        title: "8th-9th STUDENTS",
        subtitle: "Early career exploration & foundation building",
        plans: [
            {
                id: "8-9-discover",
                name: "Discover",
                price: "₹5,500",
                for: "Standard Package",
                features: [
                    { text: "Psychometric assessment to measure your interests", included: true },
                    { text: "1 career counselling session with Mentoria's expert career coaches", included: true },
                    { text: "Lifetime access to Knowledge Gateway", included: true },
                    { text: "Invites to live webinars by industry experts", included: true },
                    { text: "Customized reports after each session with education pathways", included: false },
                    { text: "Guidance on studying abroad", included: false },
                    { text: "CV building during internship/graduation", included: false },
                ],
                buttonText: "BUY NOW",
                paymentButtonId: "pl_RwDuOx96VYrsyN"
            },
            {
                id: "8-9-discover-plus",
                name: "Discover plus+",
                price: "₹15,000",
                for: "Premium Package",
                features: [
                    { text: "Psychometric assessments to measure your interests, personality and abilities", included: true },
                    { text: "8 career counselling sessions (1 every year) with Mentoria's expert career coaches until graduation", included: true },
                    { text: "Lifetime access to Knowledge Gateway", included: true },
                    { text: "Invites to live webinars by industry experts", included: true },
                    { text: "Customized reports after each session with education pathways", included: true },
                    { text: "Guidance on studying abroad", included: true },
                    { text: "CV building during internship/graduation", included: true },
                ],
                buttonText: "BUY NOW",
                highlighted: true,
                paymentButtonId: "pl_RwDq8XpK76OhB3"
            },
        ],
    },
    "10-12-students": {
        heading: "Packages for 10th-12th Students",
        subheading: "Strategic career planning & college preparation",
        title: "10th-12th STUDENTS",
        subtitle: "Strategic career planning & college preparation",
        plans: [
            {
                id: "10-12-achieve-online",
                name: "Achieve Online",
                price: "₹5,999",
                for: "Standard Package",
                features: [
                    { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
                    { text: "1 career counselling session", included: true },
                    { text: "Lifetime access to Knowledge Gateway", included: true },
                    { text: "Pre-recorded webinars by industry experts", included: true },
                    { text: "Customized reports after each session with education pathways", included: false },
                    { text: "Guidance on studying abroad", included: false },
                    { text: "CV reviews during internship/graduation", included: false },
                ],
                buttonText: "BUY NOW",
                paymentButtonId: "pl_RwDxvLPQP7j4rG"
            },
            {
                id: "10-12-achieve-plus",
                name: "Achieve Plus+",
                price: "₹10,599",
                for: "Premium Package",
                features: [
                    { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
                    { text: "4 career counselling sessions", included: true },
                    { text: "Lifetime access to Knowledge Gateway", included: true },
                    { text: "Attend live webinars by industry experts", included: true },
                    { text: "Customized reports after each session with education pathways", included: true },
                    { text: "Guidance on studying abroad", included: true },
                    { text: "CV reviews during internship/graduation", included: true },
                ],
                buttonText: "BUY NOW",
                highlighted: true,
                paymentButtonId: "pl_RwDzfVkQYEdAIf"
            },
        ],
    },
    "college-graduates": {
        heading: "Packages for College Graduates",
        subheading: "Career launch & professional positioning",
        title: "COLLEGE GRADUATES",
        subtitle: "Career launch & professional positioning",
        plans: [
            {
                id: "graduates-ascend-online",
                name: "Ascend Online",
                price: "₹6,499",
                for: "Standard Package",
                features: [
                    { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
                    { text: "1 career counselling session", included: true },
                    { text: "Lifetime access to Knowledge Gateway", included: true },
                    { text: "Pre-recorded webinars by industry experts", included: true },
                    { text: "Customized reports after each session with information on certificate/online courses", included: false },
                    { text: "Guidance on studying abroad", included: false },
                    { text: "CV reviews for job application", included: false },
                ],
                buttonText: "BUY NOW",
                paymentButtonId: "pl_RwE1evNHrHWJDW"
            },
            {
                id: "graduates-ascend-plus",
                name: "Ascend Plus+",
                price: "₹10,599",
                for: "Premium Package",
                features: [
                    { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
                    { text: "3 career counselling sessions", included: true },
                    { text: "Lifetime access to Knowledge Gateway", included: true },
                    { text: "Attend live webinars by industry experts", included: true },
                    { text: "Customized reports after each session with information on certificate/online courses", included: true },
                    { text: "Guidance on studying abroad", included: true },
                    { text: "CV reviews for job application", included: true },
                ],
                buttonText: "BUY NOW",
                highlighted: true,
                paymentButtonId: "pl_RwE3WEILWB9WeJ"
            },
        ],
    },
    "working-professionals": {
        heading: "Packages for Working Professionals",
        subheading: "Career growth & strategic advancement",
        title: "WORKING PROFESSIONALS",
        subtitle: "Career growth & strategic advancement",
        plans: [
            {
                id: "professionals-ascend-online",
                name: "Ascend Online",
                price: "₹6,499",
                for: "Standard Package",
                features: [
                    { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
                    { text: "1 career counselling session", included: true },
                    { text: "Lifetime access to Knowledge Gateway", included: true },
                    { text: "Pre-recorded webinars by industry experts", included: true },
                    { text: "Customized reports after each session with information on certificate/online courses", included: false },
                    { text: "Guidance on studying abroad", included: false },
                    { text: "CV reviews for job application", included: false },
                ],
                buttonText: "BUY NOW",
                paymentButtonId: "pl_RwE1evNHrHWJDW"
            },
            {
                id: "professionals-ascend-plus",
                name: "Ascend Plus+",
                price: "₹10,599",
                for: "Premium Package",
                features: [
                    { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
                    { text: "2 career counselling sessions", included: true },
                    { text: "Lifetime access to Knowledge Gateway", included: true },
                    { text: "Attend live webinars by industry experts", included: true },
                    { text: "Customized reports after each session with information on certificate/online courses", included: true },
                    { text: "Guidance on studying abroad", included: true },
                    { text: "CV reviews for job application", included: true },
                ],
                buttonText: "BUY NOW",
                highlighted: true,
                paymentButtonId: "pl_RwE3WEILWB9WeJ"
            },
        ],
    },
};

const heroData = {
    title: "The Path Within to",
    subtitle: "Purpose & Growth",
    description: "In life, many of us chase success, yet feel lost. Careers stall, purpose feels distant, and the mind never rests. Innervea was created to change that. Transform from confusion to clarity, from self-doubt to self-belief, from restless striving to purposeful living.",
    imageName: "hero_1759750789247.png" // In attached_assets
};

const aboutData = {
    title: "The Innervea Story",
    description: [
        {
            _key: 'block1',
            _type: 'block',
            children: [{ _key: 'span1', _type: 'span', text: "The name itself is a promise: \"inner\" – your authentic self, and \"vea\" – the path. Innervea is the path within. It is where clarity meets action, and calm meets ambition. In today's fast-changing world, many feel torn between ambition, personal fulfillment, and inner peace." }]
        },
        {
            _key: 'block2',
            _type: 'block',
            children: [{ _key: 'span1', _type: 'span', text: "Innervea helps you achieve true success by aligning your career, life, and inner self. Through a blend of career counselling, life coaching, and meditation, Innervea guides you to discover your strengths, build confidence, and find clarity - transforming not just what you do, but who you are." }]
        }
    ],
    imageName: "profile_1758707452399.jpg", // In attached_assets
    stats: [
        { value: "500+", label: "Clients Guided", icon: "Users", description: "Lives Transformed" },
        { value: "10+", label: "Years Experience", icon: "Calendar", description: "Professional Expertise" },
        { value: "50+", label: "Workshops", icon: "Trophy", description: "Interactive Sessions" },
        { value: "98%", label: "Success Rate", icon: "TrendingUp", description: "Client Satisfaction" }
    ]
};


// --- HELPER FUNCTIONS ---

const uploadImage = async (filePath) => {
    try {
        console.log(`Uploading image: ${filePath}`);
        const absolutePath = path.join(ASSETS_DIR, filePath);
        if (!fs.existsSync(absolutePath)) {
            // Check generated_images
            const genPath = path.join(ASSETS_DIR, 'generated_images', filePath);
            if (fs.existsSync(genPath)) {
                return client.assets.upload('image', fs.createReadStream(genPath), { filename: path.basename(filePath) });
            }
            console.warn(`File not found: ${filePath}`);
            return null;
        }
        return client.assets.upload('image', fs.createReadStream(absolutePath), { filename: path.basename(filePath) });
    } catch (error) {
        console.error(`Upload failed for ${filePath}:`, error.message);
        return null;
    }
};

const uploadRemoteImage = async (url) => {
    try {
        console.log(`Fetching remote image: ${url}`);
        return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                if (res.statusCode !== 200) {
                    reject(new Error(`Failed to fetch ${url}, status: ${res.statusCode}`));
                    return;
                }
                client.assets.upload('image', res, { filename: 'remote-image.jpg' })
                    .then(resolve)
                    .catch(reject);
            }).on('error', reject);
        });
    } catch (error) {
        console.error(`Remote upload failed for ${url}:`, error.message);
        return null;
    }
};

// --- MAIN MIGRATION ---

async function migrate() {
    console.log('--- Starting Migration ---');

    // 1. SERVICES
    // console.log('Migrating Services...');
    // const serviceTransaction = client.transaction();
    // for (const service of services) {
    //     serviceTransaction.createOrReplace({
    //         _id: `service-${service.serviceId}`,
    //         _type: 'service',
    //         serviceId: service.serviceId,
    //         title: service.title,
    //         description: service.description,
    //         icon: service.icon,
    //         price: service.price,
    //         featured: service.featured,
    //         displayOrder: service.displayOrder,
    //     });
    // }
    // await serviceTransaction.commit();
    // console.log('Services migrated.');

    // 2. TESTIMONIALS
    // console.log('Migrating Testimonials...');
    // const testimonialTransaction = client.transaction();
    // for (const t of testimonials) {
    //     let imageAsset = null;
    //     if (t.imageName) {
    //         const asset = await uploadImage(t.imageName);
    //         imageAsset = asset ? { _type: 'image', asset: { _ref: asset._id } } : null;
    //     }

    //     testimonialTransaction.createOrReplace({
    //         _id: `testimonial-${t.displayOrder}`,
    //         _type: 'testimonial',
    //         name: t.name,
    //         role: t.role,
    //         content: t.content,
    //         rating: t.rating,
    //         imageUrl: imageAsset,
    //         featured: t.featured,
    //         displayOrder: t.displayOrder,
    //     });
    // }
    // await testimonialTransaction.commit();
    // console.log('Testimonials migrated.');

    // 3. BLOG POSTS
    console.log('Migrating Blog Posts...');
    const postTransaction = client.transaction();
    for (const p of blogPosts) {
        let imageAsset = null;
        try {
            if (p.imageUrl && p.imageUrl.startsWith('http')) {
                const asset = await uploadRemoteImage(p.imageUrl);
                imageAsset = asset ? { _type: 'image', asset: { _ref: asset._id } } : null;
            }
        } catch (e) {
            console.error(`Failed to upload image for ${p.slug}:`, e.message);
        }

        // Generate a random ID or use slug
        postTransaction.createOrReplace({
            _id: `post-${p.slug}`,
            _type: 'post',
            slug: { _type: 'slug', current: p.slug },
            title: p.title,
            excerpt: p.excerpt,
            content: p.content, // Using block content
            category: p.category,
            featuredImage: imageAsset,
            published: p.published,
            featured: p.featured,
            publishedAt: new Date().toISOString(),
        });
    }
    await postTransaction.commit();
    console.log('Blog Posts migrated.');

    // 4. PRICING
    console.log('Migrating Pricing...');
    const pricingTransaction = client.transaction();
    for (const [key, data] of Object.entries(pricingData)) {
        pricingTransaction.createOrReplace({
            _id: `pricing-${key}`,
            _type: 'pricing',
            id: key,
            title: data.title,
            subtitle: data.subtitle,
            heading: data.heading,
            subheading: data.subheading,
            plans: data.plans.map(plan => ({
                _key: plan.id,
                id: plan.id,
                name: plan.name,
                price: plan.price,
                for: plan.for,
                buttonText: plan.buttonText,
                highlighted: plan.highlighted || false,
                paymentButtonId: plan.paymentButtonId,
                features: plan.features.map((f, i) => ({
                    _key: `f-${i}`,
                    text: f.text,
                    included: f.included
                }))
            }))
        });
    }
    await pricingTransaction.commit();
    console.log('Pricing migrated.');

    // 5. HERO
    console.log('Migrating Hero...');
    const heroAsset = await uploadImage(heroData.imageName);
    await client.createOrReplace({
        _id: 'hero',
        _type: 'hero',
        title: heroData.title,
        subtitle: heroData.subtitle,
        description: heroData.description,
        heroImage: heroAsset ? { _type: 'image', asset: { _ref: heroAsset._id } } : undefined
    });
    console.log('Hero migrated.');

    // 6. ABOUT
    console.log('Migrating About...');
    const aboutAsset = await uploadImage(aboutData.imageName);
    await client.createOrReplace({
        _id: 'about',
        _type: 'about',
        title: aboutData.title,
        description: aboutData.description,
        stats: aboutData.stats.map((s, i) => ({ _key: `s-${i}`, ...s })),
        profileImage: aboutAsset ? { _type: 'image', asset: { _ref: aboutAsset._id } } : undefined
    });
    console.log('About migrated.');

    console.log('--- Migration Complete ---');
}

migrate().catch(err => console.error('Migration failed:', err));
