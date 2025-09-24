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
    queryFn: () => fetch("/api/auth/status").then(res => res.json()),
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
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  return { isAuthenticated, isLoading };
}