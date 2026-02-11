import { QueryClient } from "@tanstack/react-query";
import { mockServices, mockBlogPosts, mockTestimonials } from "./mockData";

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  console.log(`[MOCK API] ${method} ${url}`, data);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Handle Mock GET Requests
  if (method === "GET") {
    if (url.startsWith("/api/services")) {
      const id = url.split("/").pop();
      if (id && id !== "services") {
        const service = mockServices.find(s => s.id === id || s.serviceId === id);
        if (service) return new Response(JSON.stringify(service));
        return new Response("Not Found", { status: 404 });
      }
      return new Response(JSON.stringify(mockServices));
    }

    if (url.startsWith("/api/blog-posts")) {
      const id = url.split("/").pop();
      if (id && id !== "blog-posts") {
        const post = mockBlogPosts.find(p => p.id === id || p.slug === id);
        if (post) return new Response(JSON.stringify(post));
        return new Response("Not Found", { status: 404 });
      }
      return new Response(JSON.stringify(mockBlogPosts));
    }

    if (url.startsWith("/api/testimonials")) {
      return new Response(JSON.stringify(mockTestimonials));
    }

    if (url === "/api/auth/status") {
      return new Response(JSON.stringify({ isAuthenticated: false, adminId: null }));
    }
  }

  // Handle Mock Mutation Requests (POST, PUT, DELETE)
  // For static site, we just log and succeed.
  return new Response(JSON.stringify({ success: true, message: "Mock operation successful" }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Direct query function that bypasses fetch
      queryFn: async ({ queryKey }) => {
        const url = queryKey.join("/");
        const res = await apiRequest("GET", url);
        if (!res.ok) throw new Error("Mock fetch failed to " + url);
        return res.json();
      },
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
