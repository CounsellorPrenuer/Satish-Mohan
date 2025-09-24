// Extend Express session types for admin authentication
declare module 'express-session' {
  interface SessionData {
    adminId?: string;
    isAuthenticated?: boolean;
  }
}

export {};