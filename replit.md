# Overview

This is a dark avant-garde art exhibition website built with React and TypeScript. The application showcases contemporary minimalist artworks through an immersive, gallery-like digital experience. The design emphasizes dark aesthetics, smooth scrolling interactions, and artistic typography to create a sophisticated presentation of visual art pieces.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast hot module replacement
- **Wouter** for lightweight client-side routing instead of React Router
- **Tailwind CSS** with custom dark theme configuration for styling
- **shadcn/ui** component library providing accessible UI primitives via Radix UI

## Design System
- **Dark-only theme** with carefully crafted color palette (deep charcoal backgrounds, near-white text)
- **Custom typography** using Inter/Helvetica Neue with light weights and generous spacing
- **Smooth scroll interactions** with intersection observers for progressive content reveals
- **Minimal animations** focused on fade-ins and subtle parallax effects
- **Responsive layout system** using Tailwind's spacing utilities (4, 8, 16, 24)

## Component Architecture
- **Reusable gallery components**: HeroSection, ImageBlock, StickyImageSection, VideoSection
- **Interactive elements**: ScrollIndicator, TextOverlay with viewport-based animations
- **Custom scroll behaviors** with resistance and smooth transitions
- **Asset management** through Vite's import system for images and media

## State Management
- **TanStack Query** for server state management and caching
- **React hooks** (useState, useEffect, useRef) for component-level state
- **Custom hooks** like `useIsMobile` for responsive behavior detection
- **Context API** through shadcn/ui components for theme and UI state

## Backend Architecture
- **Express.js** server with TypeScript support
- **Modular route system** with separation between API routes and static serving
- **Development middleware** with Vite integration for HMR during development
- **Static file serving** for production builds

## Database Layer
- **Drizzle ORM** with PostgreSQL dialect for type-safe database operations
- **Neon Database** integration via `@neondatabase/serverless` for serverless PostgreSQL
- **Schema definition** with Zod validation for runtime type checking
- **Migration system** using Drizzle Kit for database schema management

## Development Workflow
- **TypeScript** strict mode configuration with path mapping for clean imports
- **ESBuild** for production server bundling with ESM format
- **Replit integration** with custom banners and cartographer plugin for development
- **Hot reload** setup with runtime error overlays during development

# External Dependencies

## UI and Styling
- **Radix UI primitives** for accessible component foundations (dialogs, dropdowns, etc.)
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Google Fonts** CDN integration for typography (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono)
- **Lucide React** for consistent icon library

## Database and ORM
- **Neon Database** as the serverless PostgreSQL provider
- **Drizzle ORM** for database operations and migrations
- **connect-pg-simple** for PostgreSQL session store integration

## Development Tools
- **Vite plugins** for React, runtime error modals, and Replit cartographer integration
- **PostCSS** with Autoprefixer for CSS processing
- **Class Variance Authority** for component variant management
- **clsx and tailwind-merge** for conditional class name utilities

## Form and Data Handling
- **React Hook Form** with Hookform resolvers for form validation
- **Zod** for runtime schema validation and type inference
- **date-fns** for date manipulation utilities

## Media and Interaction
- **Embla Carousel** for image carousel functionality
- **CMDK** for command palette/search interfaces
- **Input-OTP** for one-time password input components