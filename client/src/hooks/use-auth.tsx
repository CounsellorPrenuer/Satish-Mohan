import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useEffect } from "react";

interface AuthStatus {
  isAuthenticated: boolean;
  adminId: string | null;
}

export function useAuth() {
  const { data: authStatus, isLoading } = useQuery<AuthStatus>({
    queryKey: ["/api/auth/status"],
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes to keep session alive
  });

  return {
    isAuthenticated: authStatus?.isAuthenticated || false,
    adminId: authStatus?.adminId || null,
    isLoading,
  };
}

export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login with current path as redirect parameter
      const currentPath = location;
      setLocation(`/admin/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [isAuthenticated, isLoading, setLocation, location]);

  return { isAuthenticated, isLoading };
}