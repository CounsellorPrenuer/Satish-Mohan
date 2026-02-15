import { createClient } from "@sanity/client";
import { mockServices, mockTestimonials, mockBlogPosts, mockEvents } from "./mockData";

// Note: In a real environment, project ID would be an env var.
// For local studio without a cloud project, this client won't fetch much unless configured properly.
// But the logic serves to demonstrate the fallback.
export const sanityClient = createClient({
    projectId: "f6u82n2q",
    dataset: "production",
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
    token: "skmdBbcKodRqpWHD2No8DYVcHweodFOkV1uu1XaGIQIstqOFGh851VYuwqgmVzDpoaHsuY3TVR1u9LSYMBBpmnnoL8az3Leroxy2preZcOWwDyNJMb5J4RGumHyPhV2C8JZrJeE2bMsQq8HLGUl8OgrxNYssu8KVESDJLK9oxpDOpS06O6Nm"
});

// Helper to fetch data with automatic fallback
async function fetchWithFallback<T>(query: string, mockData: T, fallbackReason: string = "Fetching failed"): Promise<T> {
    try {
        const data = await sanityClient.fetch(query);
        if (!data || (Array.isArray(data) && data.length === 0)) {
            console.warn(`[Sanity] No data found for query: ${query}. Using fallback.`);
            return mockData;
        }
        return data;
    } catch (error) {
        console.warn(`[Sanity] Error fetching data (${fallbackReason}):`, error);
        // In production, we might want to log this to a monitoring service
        return mockData;
    }
}

export async function getServices() {
    const query = `*[_type == "service"] | order(displayOrder asc) {
    title,
    serviceId,
    description,
    icon,
    price,
    features,
    featured,
    displayOrder
  }`;
    // Fallback map since mock data structure mirrors schema mostly but might check types
    return fetchWithFallback(query, mockServices, "Services fetch failed");
}

export async function getTestimonials() {
    const query = `*[_type == "testimonial"] | order(displayOrder asc) {
    name,
    role,
    content,
    rating,
    "imageUrl": imageUrl.asset->url,
    featured
  }`;
    return fetchWithFallback(query, mockTestimonials, "Testimonials fetch failed");
}

export async function getPosts() {
    const query = `*[_type == "post" && published == true] | order(publishedAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    category,
    "createdAt": publishedAt,
    featured
  }`;
    // Note: mockBlogPosts structure might need mapping if we change mock data often
    return fetchWithFallback(query, mockBlogPosts, "Posts fetch failed");
}

export async function getPost(id: string) {
    const query = `*[_type == "post" && _id == "${id}"][0] {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    "featuredImage": featuredImage.asset->url,
    category,
    "createdAt": publishedAt,
    featured
  }`;
    const mockPost = mockBlogPosts.find(p => p.id === id);
    return fetchWithFallback(query, mockPost, `Post ${id} fetch failed`);
}

export async function getPricing() {
    const query = `*[_type == "pricing"] {
        id,
        title,
        subtitle,
        heading,
        subheading,
        plans
    }`;
    // Pricing is complex. We return null or mock data. 
    // Since mock data is a specialized object, we might just return mock packages directly if fail.
    // The component expects the 'packages' Record structure. 
    // This function will need to transform the array from Sanity into that record or return the mock record.

    try {
        const data = await sanityClient.fetch(query);
        if (!data || data.length === 0) throw new Error("No pricing data");

        // Transform array to Record<string, PackageContent>
        const pricingMap: Record<string, any> = {};
        data.forEach((item: any) => {
            if (item.id) {
                pricingMap[item.id] = {
                    heading: item.heading,
                    subheading: item.subheading,
                    plans: item.plans,
                    // Handle missing fields if needed
                };
            }
        });
        return pricingMap;
    } catch (e) {
        console.warn("[Sanity] Pricing fetch failed, using mock", e);
        // We need to import 'packages' from somewhere or just return undefined and let component handle?
        // Better: The component currently imports 'packages' locally. 
        // We should export 'packages' from mockData or let this function return it.
        // I will update mockData to export 'packages' constant if not potential circular dep.
        // Ideally, we move 'packages' constant to mockData.ts
        return null; // Let component use its internal fallback/import
    }
}

// Helper to get image URL from sanity asset
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
    return builder.image(source);
}

export async function getHero() {
    const query = `*[_type == "hero"][0] {
    title,
    subtitle,
    description,
    "heroImage": heroImage.asset->url
  }`;
    // No mock data for Hero typically (it's hardcoded in component), so we return null and component falls back
    return fetchWithFallback(query, null, "Hero fetch failed");
}

export async function getAbout() {
    const query = `*[_type == "about"][0] {
    title,
    description,
    "profileImage": profileImage.asset->url,
    stats
  }`;
    return fetchWithFallback(query, null, "About fetch failed");
}

export async function getEvents() {
    const query = `*[_type == "event" && isActive == true] | order(date asc) {
    "id": _id,
    title,
    "slug": slug.current,
    date,
    location,
    description,
    "image": image.asset->url,
    registrationLink,
    isActive
  }`;
    return fetchWithFallback(query, mockEvents, "Events fetch failed");
}

export async function getLogo(): Promise<string | null> {
    const query = `*[_type == "siteSettings"][0] {
    "logoUrl": logo.asset->url
  }`;
    try {
        const data = await sanityClient.fetch(query);
        if (data && data.logoUrl) return data.logoUrl;
        return null;
    } catch (error) {
        console.error("[Sanity] Logo fetch failed:", error);
        return null;
    }
}
