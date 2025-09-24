# Overview

CareerMentoria is a comprehensive career counseling and life coaching platform built for Satish Mohan, a professional career counselor and life coach. The application provides a complete solution for showcasing services, managing client bookings, handling payments, and content management. It features a modern landing page with service information, client testimonials, and blog content, alongside an admin dashboard for managing bookings, contact forms, and blog posts.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client-side is built as a React Single Page Application (SPA) using modern React patterns and TypeScript. The architecture follows a component-based approach with clear separation of concerns:

- **React with TypeScript**: Provides type safety and improved developer experience
- **Wouter for routing**: Lightweight client-side routing solution
- **TanStack React Query**: Handles data fetching, caching, and synchronization with the backend
- **React Hook Form with Zod**: Form management with schema validation
- **Shadcn/UI components**: Provides a consistent, accessible design system built on Radix UI primitives
- **Tailwind CSS**: Utility-first styling with CSS custom properties for theming

The frontend is structured into logical components for different sections (hero, services, about, testimonials, contact) and includes specialized booking and admin interfaces.

## Backend Architecture

The server follows a RESTful API design using Express.js with TypeScript:

- **Express.js server**: Handles HTTP requests and API endpoints
- **RESTful API structure**: Clean separation between different resource endpoints (bookings, contact forms, blog posts, payments)
- **Middleware-based architecture**: Request logging, JSON parsing, and error handling through Express middleware
- **Storage abstraction**: Interface-based storage layer allowing for easy database switching

API endpoints are organized by resource type with full CRUD operations where appropriate.

## Data Storage Solutions

The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations:

- **PostgreSQL**: Relational database providing ACID compliance and complex query capabilities
- **Drizzle ORM**: Type-safe ORM with automatic schema generation and migrations
- **Neon Database**: Cloud PostgreSQL provider for hosting
- **Schema-driven design**: Shared schema definitions between frontend and backend using Zod

The database schema includes tables for users, bookings, contact forms, blog posts, lead downloads, and payment records with proper relationships and constraints.

## Authentication and Authorization

The system implements a basic authentication mechanism for admin access:

- **Session-based authentication**: Uses Express sessions for maintaining admin login state
- **Password-based login**: Simple username/password authentication for administrative access
- **Role-based access**: Admin-only routes and functions for managing content and bookings

## External Service Integrations

### Payment Processing
- **Razorpay Integration**: Complete payment gateway integration for handling booking payments
- **Order creation and verification**: Secure payment flow with order creation, payment processing, and verification
- **Payment status tracking**: Links payments to bookings with status updates

### Email and Communications
The architecture is prepared for email integration for booking confirmations and contact form notifications.

### Development and Deployment
- **Vite build system**: Fast development server with hot module replacement
- **ESBuild for production**: Optimized production builds for both client and server
- **Replit integration**: Special development plugins for the Replit environment
- **Environment-based configuration**: Separate development and production configurations

## Design Patterns and Architectural Decisions

1. **Shared Schema Approach**: Common TypeScript types and Zod schemas shared between frontend and backend prevent type mismatches and ensure consistency

2. **Query-based State Management**: TanStack React Query eliminates the need for complex state management while providing caching, background updates, and error handling

3. **Component Composition**: Modular component design allows for easy maintenance and reusability across different pages

4. **API-First Design**: Clear separation between frontend and backend through well-defined REST APIs

5. **Type Safety Throughout**: End-to-end TypeScript ensures type safety from database to UI components

6. **Responsive Design**: Mobile-first approach with Tailwind CSS ensures optimal experience across all devices

The architecture prioritizes developer experience, type safety, and maintainability while providing a solid foundation for scaling the career counseling business.