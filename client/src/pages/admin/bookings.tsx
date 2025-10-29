import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useRequireAuth } from "@/hooks/use-auth";
import AdminLayout from "@/components/admin/admin-layout";
import StatsCard from "@/components/admin/stats-card";
import DataTable from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Calendar, Inbox, CreditCard, Users } from "lucide-react";
import type { Booking } from "@shared/schema";

const tabs = [
  { id: "overview", label: "Overview", icon: Calendar, path: "/admin/bookings" },
  { id: "bookings", label: "Bookings", icon: Calendar, path: "/admin/bookings" },
  { id: "contact-forms", label: "Contact Forms", icon: Inbox, path: "/admin/bookings" },
  { id: "payments", label: "Payments", icon: CreditCard, path: "/admin/bookings" },
  { id: "leads", label: "Lead Downloads", icon: Users, path: "/admin/bookings" },
];

const statusColors = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800", 
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800"
};

const paymentStatusColors = {
  pending: "bg-orange-100 text-orange-800",
  paid: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800"
};

export default function AdminBookings() {
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch statistics
  const { data: stats, isLoading: statsLoading } = useQuery<{
    totalBookings: number;
    pendingBookings: number;
    completedBookings: number;
    contactedBookings: number;
    contactForms: number;
    leadDownloads: number;
    totalPayments: number;
    totalRevenue: number;
    investments: number;
  }>({
    queryKey: ["/api/stats"],
  });

  // Fetch bookings
  const { data: bookings, isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
  });

  // Fetch contact forms
  const { data: contactForms, isLoading: contactFormsLoading } = useQuery({
    queryKey: ["/api/contact-forms"],
  });

  // Fetch payments
  const { data: payments, isLoading: paymentsLoading } = useQuery({
    queryKey: ["/api/payments"],
  });

  // Fetch lead downloads
  const { data: leadDownloads, isLoading: leadDownloadsLoading } = useQuery({
    queryKey: ["/api/lead-downloads"],
  });

  // Update booking status mutation
  const updateBookingMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Booking> }) => {
      const response = await apiRequest("PUT", `/api/bookings/${id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      toast({
        title: "Booking updated successfully",
        description: "The booking status has been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error updating booking",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  // Export data mutation
  const exportMutation = useMutation({
    mutationFn: async (endpoint: string) => {
      const response = await apiRequest("GET", endpoint);
      return response.blob();
    },
    onSuccess: (blob, endpoint) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = endpoint.includes('all') ? 'careerclarity-data.json' : `${endpoint.split('/').pop()}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Export successful",
        description: "Data has been downloaded successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Export failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleStatusUpdate = (bookingId: string, status: string) => {
    updateBookingMutation.mutate({
      id: bookingId,
      updates: { status }
    });
  };

  const bookingColumns = [
    {
      header: "Customer",
      accessor: "fullName" as keyof Booking,
      render: (booking: Booking) => (
        <div>
          <div className="font-medium" data-testid={`booking-name-${booking.id}`}>{booking.fullName}</div>
          <div className="text-sm text-muted-foreground" data-testid={`booking-email-${booking.id}`}>{booking.email}</div>
        </div>
      )
    },
    {
      header: "Service",
      accessor: "serviceType" as keyof Booking,
      render: (booking: Booking) => (
        <div>
          <div className="font-medium" data-testid={`booking-service-${booking.id}`}>
            {booking.serviceType.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </div>
          <div className="text-sm text-muted-foreground" data-testid={`booking-amount-${booking.id}`}>₹{booking.amount}</div>
        </div>
      )
    },
    {
      header: "Date & Time",
      accessor: "preferredDate" as keyof Booking,
      render: (booking: Booking) => (
        <div>
          <div className="font-medium" data-testid={`booking-date-${booking.id}`}>{booking.preferredDate}</div>
          <div className="text-sm text-muted-foreground" data-testid={`booking-time-${booking.id}`}>{booking.preferredTime}</div>
        </div>
      )
    },
    {
      header: "Status",
      accessor: "status" as keyof Booking,
      render: (booking: Booking) => (
        <div className="flex flex-col gap-2">
          <Badge className={statusColors[booking.status as keyof typeof statusColors]} data-testid={`booking-status-${booking.id}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
          <Badge className={paymentStatusColors[booking.paymentStatus as keyof typeof paymentStatusColors]} data-testid={`booking-payment-status-${booking.id}`}>
            {booking.paymentStatus?.charAt(0).toUpperCase() + booking.paymentStatus?.slice(1)}
          </Badge>
        </div>
      )
    },
    {
      header: "Actions",
      accessor: "id" as keyof Booking,
      render: (booking: Booking) => (
        <Select onValueChange={(value) => handleStatusUpdate(booking.id, value)} data-testid={`booking-actions-${booking.id}`}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Update" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      )
    }
  ];

  const contactFormColumns = [
    {
      header: "Contact",
      accessor: "name" as keyof any,
      render: (form: any) => (
        <div>
          <div className="font-medium" data-testid={`contact-name-${form.id}`}>{form.name}</div>
          <div className="text-sm text-muted-foreground" data-testid={`contact-email-${form.id}`}>{form.email}</div>
        </div>
      )
    },
    {
      header: "Subject",
      accessor: "subject" as keyof any,
      render: (form: any) => (
        <div className="font-medium" data-testid={`contact-subject-${form.id}`}>{form.subject}</div>
      )
    },
    {
      header: "Message",
      accessor: "message" as keyof any,
      render: (form: any) => (
        <div className="text-sm text-muted-foreground max-w-xs truncate" data-testid={`contact-message-${form.id}`}>
          {form.message}
        </div>
      )
    },
    {
      header: "Date",
      accessor: "createdAt" as keyof any,
      render: (form: any) => (
        <div className="text-sm" data-testid={`contact-date-${form.id}`}>
          {form.createdAt ? new Date(form.createdAt).toLocaleDateString() : ''}
        </div>
      )
    },
    {
      header: "Status",
      accessor: "status" as keyof any,
      render: (form: any) => (
        <Badge className={form.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} data-testid={`contact-status-${form.id}`}>
          {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
        </Badge>
      )
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatsCard
                title="Total Bookings"
                value={stats?.totalBookings || 0}
                color="text-amber-600"
                loading={statsLoading}
                data-testid="stat-total-bookings"
              />
              <StatsCard
                title="Contacted"
                value={stats?.contactedBookings || 0}
                color="text-blue-600"
                loading={statsLoading}
                data-testid="stat-contacted"
              />
              <StatsCard
                title="Completed"
                value={stats?.completedBookings || 0}
                color="text-green-600"
                loading={statsLoading}
                data-testid="stat-completed"
              />
              <StatsCard
                title="Revenue"
                value={`₹${stats?.totalRevenue || 0}`}
                color="text-emerald-600"
                loading={statsLoading}
                data-testid="stat-revenue"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatsCard
                title="Pending"
                value={stats?.pendingBookings || 0}
                color="text-orange-600"
                loading={statsLoading}
                data-testid="stat-pending"
              />
              <StatsCard
                title="Contact Forms"
                value={stats?.contactForms || 0}
                color="text-purple-600"
                loading={statsLoading}
                data-testid="stat-contact-forms"
              />
              <StatsCard
                title="Lead Downloads"
                value={stats?.leadDownloads || 0}
                color="text-red-600"
                loading={statsLoading}
                data-testid="stat-lead-downloads"
              />
              <StatsCard
                title="Total Payments"
                value={stats?.totalPayments || 0}
                color="text-blue-600"
                loading={statsLoading}
                data-testid="stat-total-payments"
              />
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <StatsCard
                title="Investments"
                value={stats?.investments || 0}
                color="text-orange-600"
                loading={statsLoading}
                data-testid="stat-investments"
              />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="bg-card rounded-xl shadow-sm border border-border">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Recent Bookings</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => exportMutation.mutate("/api/export/bookings")}
                      data-testid="export-bookings"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  {bookingsLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-12 skeleton rounded"></div>
                      ))}
                    </div>
                  ) : bookings && bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <div className="font-medium text-sm">{booking.fullName}</div>
                            <div className="text-xs text-muted-foreground">{booking.serviceType}</div>
                          </div>
                          <Badge className={statusColors[booking.status as keyof typeof statusColors]}>
                            {booking.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No bookings yet</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-card rounded-xl shadow-sm border border-border">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Recent Contact Forms</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => exportMutation.mutate("/api/export/contact-forms")}
                      data-testid="export-contact-forms"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  {contactFormsLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-12 skeleton rounded"></div>
                      ))}
                    </div>
                  ) : contactForms && contactForms.length > 0 ? (
                    <div className="space-y-4">
                      {contactForms.slice(0, 3).map((form: any) => (
                        <div key={form.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <div className="font-medium text-sm">{form.name}</div>
                            <div className="text-xs text-muted-foreground">{form.subject}</div>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">
                            {form.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Inbox className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No contact forms yet</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-card rounded-xl shadow-sm border border-border">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Recent Payments</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => exportMutation.mutate("/api/payments")}
                      data-testid="export-payments"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  {paymentsLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-12 skeleton rounded"></div>
                      ))}
                    </div>
                  ) : payments && payments.length > 0 ? (
                    <div className="space-y-4">
                      {payments.slice(0, 3).map((payment: any) => (
                        <div key={payment.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <div className="font-medium text-sm">₹{payment.amount}</div>
                            <div className="text-xs text-muted-foreground">{payment.bookingId}</div>
                          </div>
                          <Badge className={paymentStatusColors[payment.status as keyof typeof paymentStatusColors]}>
                            {payment.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No payments yet</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-card rounded-xl shadow-sm border border-border">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Recent Lead Downloads</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => exportMutation.mutate("/api/lead-downloads")}
                      data-testid="export-lead-downloads"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  {leadDownloadsLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-12 skeleton rounded"></div>
                      ))}
                    </div>
                  ) : leadDownloads && leadDownloads.length > 0 ? (
                    <div className="space-y-4">
                      {leadDownloads.slice(0, 3).map((lead: any) => (
                        <div key={lead.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <div className="font-medium text-sm">{lead.email}</div>
                            <div className="text-xs text-muted-foreground">{lead.downloadType}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Download className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No downloads yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "bookings":
        return (
          <DataTable
            data={bookings || []}
            columns={bookingColumns}
            loading={bookingsLoading}
            title="All Bookings"
            onExport={() => exportMutation.mutate("/api/export/bookings")}
            data-testid="bookings-table"
          />
        );

      case "contact-forms":
        return (
          <DataTable
            data={contactForms || []}
            columns={contactFormColumns}
            loading={contactFormsLoading}
            title="Contact Forms"
            onExport={() => exportMutation.mutate("/api/export/contact-forms")}
            data-testid="contact-forms-table"
          />
        );

      case "payments":
        return (
          <DataTable
            data={payments || []}
            columns={[
              {
                header: "Payment ID",
                accessor: "razorpayPaymentId" as keyof any,
                render: (payment: any) => (
                  <div className="font-mono text-sm" data-testid={`payment-id-${payment.id}`}>
                    {payment.razorpayPaymentId || payment.id}
                  </div>
                )
              },
              {
                header: "Amount",
                accessor: "amount" as keyof any,
                render: (payment: any) => (
                  <div className="font-semibold" data-testid={`payment-amount-${payment.id}`}>
                    ₹{payment.amount}
                  </div>
                )
              },
              {
                header: "Status",
                accessor: "status" as keyof any,
                render: (payment: any) => (
                  <Badge className={paymentStatusColors[payment.status as keyof typeof paymentStatusColors]} data-testid={`payment-status-${payment.id}`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </Badge>
                )
              },
              {
                header: "Date",
                accessor: "createdAt" as keyof any,
                render: (payment: any) => (
                  <div className="text-sm" data-testid={`payment-date-${payment.id}`}>
                    {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : ''}
                  </div>
                )
              }
            ]}
            loading={paymentsLoading}
            title="All Payments"
            onExport={() => exportMutation.mutate("/api/payments")}
            data-testid="payments-table"
          />
        );

      case "leads":
        return (
          <DataTable
            data={leadDownloads || []}
            columns={[
              {
                header: "Email",
                accessor: "email" as keyof any,
                render: (lead: any) => (
                  <div className="font-medium" data-testid={`lead-email-${lead.id}`}>{lead.email}</div>
                )
              },
              {
                header: "Download Type",
                accessor: "downloadType" as keyof any,
                render: (lead: any) => (
                  <div data-testid={`lead-type-${lead.id}`}>{lead.downloadType}</div>
                )
              },
              {
                header: "Date",
                accessor: "createdAt" as keyof any,
                render: (lead: any) => (
                  <div className="text-sm" data-testid={`lead-date-${lead.id}`}>
                    {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : ''}
                  </div>
                )
              }
            ]}
            loading={leadDownloadsLoading}
            title="Lead Downloads"
            onExport={() => exportMutation.mutate("/api/lead-downloads")}
            data-testid="leads-table"
          />
        );

      default:
        return null;
    }
  };

  // Show loading while checking authentication (after all hooks are called)
  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <AdminLayout
      title="Admin Dashboard"
      description="Manage all customer data, bookings, and submissions"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onExportAll={() => exportMutation.mutate("/api/export/all")}
      exportLoading={exportMutation.isPending}
    >
      {renderContent()}
    </AdminLayout>
  );
}
