import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { BlogPost } from "@/lib/types";
import { getPosts } from "@/lib/sanity";

export default function BlogPreviewSection() {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["sanity-posts-featured"],
    queryFn: getPosts
  });

  if (isLoading) {
    return (
      <section id="blog" className="pt-20 bg-muted/30 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-foreground mb-4">Latest Insights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl shadow-lg overflow-hidden">
                <div className="w-full h-48 skeleton"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 skeleton w-20"></div>
                  <div className="h-6 skeleton w-full"></div>
                  <div className="h-16 skeleton w-full"></div>
                  <div className="h-4 skeleton w-32"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const featuredPosts = blogPosts?.slice(0, 3) || [];

  return (
    <section id="blog" className="py-20 bg-muted/30 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4" data-testid="blog-title">
            Latest Insights
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="blog-description">
            Discover valuable insights on career development, personal growth, and life transformation
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="blog-card bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              data-testid={`blog-post-${post.id}`}
            >
              {post.featuredImage && (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  data-testid={`blog-image-${post.id}`}
                />
              )}
              <div className="p-6">
                <div className="text-sm text-primary font-medium mb-2" data-testid={`blog-category-${post.id}`}>
                  {post.category}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground hover:text-primary transition-colors" data-testid={`blog-title-${post.id}`}>
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed" data-testid={`blog-excerpt-${post.id}`}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground" data-testid={`blog-date-${post.id}`}>
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : ''}
                  </span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                    data-testid={`blog-read-more-${post.id}`}
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blogs"
            className="inline-block bg-primary text-dark px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors btn-primary border border-2"
            data-testid="blog-view-all"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
