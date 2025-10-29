import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useRequireAuth } from "@/hooks/use-auth";
import AdminLayout from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { Service, InsertService } from "@shared/schema";

const iconOptions = [
  { value: "Heart", label: "Heart" },
  { value: "Leaf", label: "Leaf" },
  { value: "Users", label: "Users" },
  { value: "Building", label: "Building" },
  { value: "Compass", label: "Compass" },
  { value: "GraduationCap", label: "Graduation Cap" },
];

const colorOptions = [
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "accent", label: "Accent" },
];

export default function AdminServices() {
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<InsertService>({
    serviceId: "",
    title: "",
    description: "",
    icon: "Heart",
    color: "primary",
    price: "",
    featured: false,
    isQueryForm: false,
    displayOrder: 0,
  });

  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertService) => {
      const response = await apiRequest("POST", "/api/services", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({
        title: "Service created",
        description: "The service has been created successfully.",
      });
      handleCloseDialog();
    },
    onError: () => {
      toast({
        title: "Error creating service",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Service> }) => {
      const response = await apiRequest("PATCH", `/api/services/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({
        title: "Service updated",
        description: "The service has been updated successfully.",
      });
      handleCloseDialog();
    },
    onError: () => {
      toast({
        title: "Error updating service",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/services/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({
        title: "Service deleted",
        description: "The service has been deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error deleting service",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        serviceId: service.serviceId,
        title: service.title,
        description: service.description,
        icon: service.icon,
        color: service.color,
        price: service.price,
        featured: service.featured || false,
        isQueryForm: service.isQueryForm || false,
        displayOrder: service.displayOrder || 0,
      });
    } else {
      setEditingService(null);
      setFormData({
        serviceId: "",
        title: "",
        description: "",
        icon: "Heart",
        color: "primary",
        price: "",
        featured: false,
        isQueryForm: false,
        displayOrder: 0,
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingService(null);
    setFormData({
      serviceId: "",
      title: "",
      description: "",
      icon: "Heart",
      color: "primary",
      price: "",
      featured: false,
      isQueryForm: false,
      displayOrder: 0,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      updateMutation.mutate({ id: editingService.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteMutation.mutate(id);
    }
  };

  if (authLoading || !isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout 
      title="Admin Dashboard"
      description="Manage your website content"
      headerActions={
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.href = '/admin/bookings'}>
            Bookings
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/admin/blogs'}>
            Blogs
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/admin/testimonials'}>
            Testimonials
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold" data-testid="services-title">Services</h1>
            <p className="text-muted-foreground">Manage service offerings</p>
          </div>
          <Button onClick={() => handleOpenDialog()} data-testid="button-add-service">
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading services...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services?.map((service) => (
              <Card key={service.id} data-testid={`service-card-${service.id}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <CardDescription className="text-xs">{service.serviceId}</CardDescription>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {service.featured && (
                        <Badge variant="secondary">Featured</Badge>
                      )}
                      {service.isQueryForm && (
                        <Badge variant="outline">Query Form</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="space-y-1">
                        <div><span className="font-medium">Icon:</span> {service.icon}</div>
                        <div><span className="font-medium">Color:</span> {service.color}</div>
                        <div><span className="font-medium">Price:</span> {service.price}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Order: {service.displayOrder}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDialog(service)}
                        data-testid={`button-edit-${service.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(service.id)}
                        data-testid={`button-delete-${service.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingService ? "Edit Service" : "Add Service"}
              </DialogTitle>
              <DialogDescription>
                {editingService
                  ? "Update the service details below"
                  : "Fill in the details to create a new service"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Service ID * (e.g., life-coaching)</label>
                  <Input
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    required
                    disabled={!!editingService}
                    data-testid="input-service-id"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    data-testid="input-title"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description *</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                  data-testid="input-description"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Icon *</label>
                  <Select
                    value={formData.icon}
                    onValueChange={(value) => setFormData({ ...formData, icon: value })}
                  >
                    <SelectTrigger data-testid="select-icon">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Color *</label>
                  <Select
                    value={formData.color}
                    onValueChange={(value) => setFormData({ ...formData, color: value })}
                  >
                    <SelectTrigger data-testid="select-color">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Display Order</label>
                  <Input
                    type="number"
                    value={formData.displayOrder || 0}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                    data-testid="input-display-order"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Price *</label>
                <Input
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  placeholder="e.g., ₹3,000 or Contact for Details"
                  data-testid="input-price"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded"
                    data-testid="input-featured"
                  />
                  <span className="text-sm font-medium">Featured</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isQueryForm || false}
                    onChange={(e) => setFormData({ ...formData, isQueryForm: e.target.checked })}
                    className="rounded"
                    data-testid="input-query-form"
                  />
                  <span className="text-sm font-medium">Query Form (Contact for Details)</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingService ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
