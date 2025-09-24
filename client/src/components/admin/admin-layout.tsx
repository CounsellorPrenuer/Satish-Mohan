import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, LogOut } from "lucide-react";

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
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="back-to-home">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Site
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground" data-testid="admin-title">
                  {title}
                </h1>
                {description && (
                  <span className="text-muted-foreground" data-testid="admin-description">
                    {description}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
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
              <Button variant="outline" data-testid="admin-logout">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
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
