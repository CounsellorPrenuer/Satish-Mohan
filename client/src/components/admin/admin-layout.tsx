import { Link, useLocation } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, LogOut } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface AdminLayoutProps {
  title: string;
  description?: string;
  tabs?: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  onExportAll?: () => void;
  exportLoading?: boolean;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
}

export default function AdminLayout({
  title,
  description,
  tabs,
  activeTab,
  onTabChange,
  onExportAll,
  exportLoading,
  headerActions,
  children,
}: AdminLayoutProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/auth/logout", {});
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of the admin dashboard.",
      });
      // Invalidate auth status to refresh the authentication state
      queryClient.invalidateQueries({ queryKey: ["/api/auth/status"] });
      // Redirect to login page
      setLocation("/admin/login");
    },
    onError: (error: any) => {
      toast({
        title: "Logout failed",
        description: error.message || "Failed to logout. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 gap-4">
            <div className="flex items-center space-x-4 min-w-0">
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="back-to-home" className="shrink-0">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Site
                </Button>
              </Link>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate" data-testid="admin-title">
                  {title}
                </h1>
                {description && (
                  <span className="text-sm text-muted-foreground line-clamp-1" data-testid="admin-description">
                    {description}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap shrink-0">
              {headerActions}
              {onExportAll && (
                <Button 
                  onClick={onExportAll}
                  disabled={exportLoading}
                  className="bg-rose-500 hover:bg-rose-600 text-white"
                  data-testid="export-all-data"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {exportLoading ? "Exporting..." : "Export All Data"}
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                data-testid="admin-logout"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Navigation Tabs */}
      {tabs && (
        <nav className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange?.(tab.id)}
                    className={`admin-tab flex items-center py-4 px-2 font-medium transition-colors ${
                      isActive
                        ? "border-b-2 border-primary text-primary"
                        : "border-b-2 border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                    data-testid={`tab-${tab.id}`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      )}

      {/* Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="admin-content">
        {children}
      </main>
    </div>
  );
}
