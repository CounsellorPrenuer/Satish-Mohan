import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowLeft, Calendar, User } from "lucide-react";
import type { BlogPost } from "@/lib/types";

export default function BlogsPage() {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts?published=true"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-12">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
              data-testid="back-to-home"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">All Articles</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover valuable insights on career development, personal growth, and life transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
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
      </div>
    );
  }

  const allPosts = blogPosts || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
            data-testid="back-to-home"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6" data-testid="blogs-title">
            All Articles
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="blogs-description">
            Discover valuable insights on career development, personal growth, and life transformation
          </p>
        </div>

        {allPosts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">No Articles Yet</h3>
            <p className="text-muted-foreground mb-8">Check back soon for inspiring content!</p>
            <Link
              href="/"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Return Home
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts.map((post) => (
                <article
                  key={post.id}
                  className="blog-card bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  data-testid={`blog-post-${post.id}`}
                >
                  {post.featuredImage && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        data-testid={`blog-image-${post.id}`}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full" data-testid={`blog-category-${post.id}`}>
                        {post.category}
                      </div>
                      {post.featured && (
                        <div className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full font-medium">
                          Featured
                        </div>
                      )}
                    </div>
                    <h2 className="text-xl font-bold mb-3 text-foreground hover:text-primary transition-colors" data-testid={`blog-title-${post.id}`}>
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed" data-testid={`blog-excerpt-${post.id}`}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground" data-testid={`blog-date-${post.id}`}>
                        <Calendar size={16} className="mr-2" />
                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : ''}
                      </div>
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-primary hover:text-primary/80 font-medium text-sm transition-colors flex items-center"
                        data-testid={`blog-read-more-${post.id}`}
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-16">
              <p className="text-muted-foreground mb-6">
                Showing {allPosts.length} article{allPosts.length !== 1 ? 's' : ''}
              </p>
              <Link
                href="/"
                className="inline-block bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
                data-testid="return-home"
              >
                Return to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}