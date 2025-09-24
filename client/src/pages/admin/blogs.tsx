import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBlogPostSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useRequireAuth } from "@/hooks/use-auth";
import AdminLayout from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Eye, FileText, Bold, Italic, Underline, Heading, Link, Image, List, ListOrdered, X } from "lucide-react";
import type { InsertBlogPost, BlogPost } from "@shared/schema";

const categories = [
  "Career Growth",
  "Mindfulness",
  "Education",
  "Life Coaching",
  "Personal Development"
];

export default function AdminBlogs() {
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Show loading while checking authentication
  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Fetch blog posts
  const { data: blogPosts, isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const form = useForm<InsertBlogPost>({
    resolver: zodResolver(insertBlogPostSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      featuredImage: "",
      category: "Career Growth",
      published: false,
      featured: false,
    },
  });

  // Create blog post mutation
  const createPostMutation = useMutation({
    mutationFn: async (data: InsertBlogPost) => {
      const response = await apiRequest("POST", "/api/blog-posts", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({
        title: "Blog post created successfully",
        description: "Your new blog post has been published.",
      });
      form.reset();
      setIsEditing(false);
      setSelectedPost(null);
    },
    onError: () => {
      toast({
        title: "Error creating blog post",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  // Update blog post mutation
  const updatePostMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<BlogPost> }) => {
      const response = await apiRequest("PUT", `/api/blog-posts/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({
        title: "Blog post updated successfully",
        description: "The blog post has been updated.",
      });
      setIsEditing(false);
      setSelectedPost(null);
    },
    onError: () => {
      toast({
        title: "Error updating blog post",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  // Delete blog post mutation
  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/blog-posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({
        title: "Blog post deleted successfully",
        description: "The blog post has been removed.",
      });
      setSelectedPost(null);
      setIsEditing(false);
    },
    onError: () => {
      toast({
        title: "Error deleting blog post",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setIsEditing(true);
    form.reset({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage || "",
      category: post.category,
      published: post.published,
      featured: post.featured,
    });
  };

  const handleNewPost = () => {
    setSelectedPost(null);
    setIsEditing(true);
    form.reset({
      title: "",
      excerpt: "",
      content: "",
      featuredImage: "",
      category: "Career Growth",
      published: false,
      featured: false,
    });
  };

  const onSubmit = (data: InsertBlogPost) => {
    if (selectedPost) {
      updatePostMutation.mutate({
        id: selectedPost.id,
        data: { ...data, updatedAt: new Date() }
      });
    } else {
      createPostMutation.mutate(data);
    }
  };

  const handleDeletePost = (post: BlogPost) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      deletePostMutation.mutate(post.id);
    }
  };

  return (
    <AdminLayout
      title="Blog Management"
      description="Create and manage blog posts"
      headerActions={
        <Button onClick={handleNewPost} data-testid="new-post-button">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Blog Posts List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Published Posts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {postsLoading ? (
                <div className="p-6 space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-20 skeleton rounded"></div>
                  ))}
                </div>
              ) : blogPosts && blogPosts.length > 0 ? (
                <div className="divide-y divide-border">
                  {blogPosts.map((post) => (
                    <div 
                      key={post.id} 
                      className="p-4 hover:bg-muted/30 cursor-pointer transition-colors"
                      onClick={() => setSelectedPost(post)}
                      data-testid={`blog-post-item-${post.id}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium mb-2 truncate" data-testid={`blog-title-${post.id}`}>
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={post.published ? "default" : "secondary"}>
                              {post.published ? "Published" : "Draft"}
                            </Badge>
                            {post.featured && (
                              <Badge variant="outline">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground" data-testid={`blog-date-${post.id}`}>
                            {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditPost(post);
                            }}
                            data-testid={`edit-post-${post.id}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePost(post);
                            }}
                            data-testid={`delete-post-${post.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No blog posts yet</p>
                  <Button onClick={handleNewPost} className="mt-4" size="sm">
                    Create your first post
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Blog Editor */}
        <div className="lg:col-span-2">
          {isEditing ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {selectedPost ? "Edit Post" : "Create New Post"}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedPost(null);
                    }}
                    data-testid="close-editor"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="blog-form">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Post Title</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your blog post title..." 
                              {...field} 
                              data-testid="input-title"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-category">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="featuredImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Featured Image URL</FormLabel>
                          <FormControl>
                            <Input 
                              type="url" 
                              placeholder="https://images.unsplash.com/photo-..." 
                              {...field} 
                              value={field.value || ""}
                              data-testid="input-featured-image"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Excerpt</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={3} 
                              placeholder="Brief description of your post..." 
                              className="resize-none" 
                              {...field}
                              data-testid="input-excerpt"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <div className="border border-input rounded-lg">
                            {/* Rich Text Editor Toolbar */}
                            <div className="flex items-center space-x-2 p-3 border-b border-border bg-muted/30">
                              <Button type="button" variant="ghost" size="sm" title="Bold">
                                <Bold className="w-4 h-4" />
                              </Button>
                              <Button type="button" variant="ghost" size="sm" title="Italic">
                                <Italic className="w-4 h-4" />
                              </Button>
                              <Button type="button" variant="ghost" size="sm" title="Underline">
                                <Underline className="w-4 h-4" />
                              </Button>
                              <div className="w-px h-6 bg-border"></div>
                              <Button type="button" variant="ghost" size="sm" title="Heading">
                                <Heading className="w-4 h-4" />
                              </Button>
                              <Button type="button" variant="ghost" size="sm" title="Link">
                                <Link className="w-4 h-4" />
                              </Button>
                              <Button type="button" variant="ghost" size="sm" title="Image">
                                <Image className="w-4 h-4" />
                              </Button>
                              <div className="w-px h-6 bg-border"></div>
                              <Button type="button" variant="ghost" size="sm" title="Bullet List">
                                <List className="w-4 h-4" />
                              </Button>
                              <Button type="button" variant="ghost" size="sm" title="Numbered List">
                                <ListOrdered className="w-4 h-4" />
                              </Button>
                            </div>
                            <FormControl>
                              <Textarea 
                                rows={12} 
                                placeholder="Start writing your blog post content here..." 
                                className="border-0 rounded-t-none resize-none focus:ring-0" 
                                {...field}
                                data-testid="input-content"
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center space-x-6">
                      <FormField
                        control={form.control}
                        name="published"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox 
                                checked={field.value || false} 
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-published"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Publish immediately</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="featured"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox 
                                checked={field.value || false} 
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-featured"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Featured post</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          const draft = { ...form.getValues(), published: false };
                          if (selectedPost) {
                            updatePostMutation.mutate({ id: selectedPost.id, data: draft });
                          } else {
                            createPostMutation.mutate(draft);
                          }
                        }}
                        data-testid="save-draft"
                      >
                        Save as Draft
                      </Button>
                      <div className="flex space-x-4">
                        <Button type="button" variant="outline" data-testid="preview-post">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={createPostMutation.isPending || updatePostMutation.isPending}
                          data-testid="publish-post"
                        >
                          {selectedPost ? "Update Post" : "Publish Post"}
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          ) : selectedPost ? (
            // Post Preview
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {selectedPost.title}
                      <div className="flex gap-2">
                        <Badge variant={selectedPost.published ? "default" : "secondary"}>
                          {selectedPost.published ? "Published" : "Draft"}
                        </Badge>
                        {selectedPost.featured && (
                          <Badge variant="outline">Featured</Badge>
                        )}
                      </div>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedPost.category} • {selectedPost.createdAt ? new Date(selectedPost.createdAt).toLocaleDateString() : ''}
                    </p>
                  </div>
                  <Button onClick={() => handleEditPost(selectedPost)} data-testid="edit-selected-post">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {selectedPost.featuredImage && (
                  <img 
                    src={selectedPost.featuredImage} 
                    alt={selectedPost.title}
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                )}
                <p className="text-lg text-muted-foreground mb-6 font-medium">
                  {selectedPost.excerpt}
                </p>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
              </CardContent>
            </Card>
          ) : (
            // Welcome State
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                <FileText className="w-16 h-16 text-muted-foreground mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Blog Management</h3>
                <p className="text-muted-foreground mb-8 max-w-md">
                  Create and manage your blog posts. Share insights on career development, personal growth, and life transformation.
                </p>
                <Button onClick={handleNewPost} size="lg" data-testid="welcome-new-post">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Post
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
