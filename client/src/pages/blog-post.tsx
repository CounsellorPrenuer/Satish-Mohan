import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import type { BlogPost } from "@/lib/types";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { useState } from "react";
import BookingModal from "@/components/booking-modal";
import { getPost } from "@/lib/sanity";

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const { data: post, isLoading, error } = useQuery<BlogPost | undefined | null>({
    queryKey: ["sanity-post", id],
    queryFn: () => getPost(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-4 skeleton w-32 mb-6"></div>
          </div>
          <div className="space-y-6">
            <div className="h-8 skeleton w-3/4"></div>
            <div className="h-64 skeleton w-full rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-4 skeleton w-full"></div>
              <div className="h-4 skeleton w-full"></div>
              <div className="h-4 skeleton w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/" className="text-primary hover:text-primary/80 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Component for rendering custom portable text types if needed
  const components = {
    block: {
      h1: ({ children }: any) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
      h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-6 mb-4">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>,
      normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
    },
  };

  return (
    <div className="min-h-screen bg-background" data-testid="blog-post-page">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-white hover:text-white/80 transition-colors mb-6"
            data-testid="back-home-link"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="text-white">
            <div className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium mb-4" data-testid="blog-category">
              <Tag className="w-3 h-3 inline mr-1" />
              {post.category}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" data-testid="blog-title">
              {post.title}
            </h1>

            <div className="flex items-center space-x-6 text-white/90">
              <div className="flex items-center" data-testid="blog-author">
                <User className="w-4 h-4 mr-2" />
                Satish Mohan
              </div>
              <div className="flex items-center" data-testid="blog-date">
                <Calendar className="w-4 h-4 mr-2" />
                {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-lg mb-6 sm:mb-8 shadow-lg"
            data-testid="blog-featured-image"
          />
        )}

        {post.excerpt && (
          <div className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 p-4 sm:p-6 bg-muted/30 rounded-lg border-l-4 border-primary" data-testid="blog-excerpt">
            {post.excerpt}
          </div>
        )}

        <div
          className="prose prose-lg max-w-none dark:prose-invert text-foreground
            prose-headings:text-foreground prose-p:text-foreground 
            prose-strong:text-foreground prose-code:text-foreground
            prose-a:text-primary hover:prose-a:text-primary/80
            prose-blockquote:border-primary prose-blockquote:text-foreground
            prose-pre:bg-muted prose-pre:text-foreground
            prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-img:rounded-lg prose-img:shadow-lg"
          data-testid="blog-content"
        >
          {typeof post.content === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <PortableText value={post.content} components={components} />
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-8 sm:mt-12 p-6 sm:p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Ready to Transform Your Career?</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              Get personalized guidance from Satish Mohan to accelerate your professional growth.
            </p>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              data-testid="blog-cta-button"
            >
              Book a Session
            </button>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}