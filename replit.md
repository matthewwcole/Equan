# Overview

A breathing meditation application built with React and Express that guides users through various breathing techniques for relaxation, stress relief, and better sleep. The app features an interactive visualization interface with audio guidance and session tracking capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **State Management**: TanStack Query for server state, local React state for UI interactions
- **Routing**: Wouter for lightweight client-side routing
- **Audio**: Web Audio API implementation for breathing sound guidance
- **Animation**: Framer Motion for smooth breathing visualizations

The frontend follows a component-based architecture with clear separation between presentation and business logic. Custom hooks manage complex state like breathing sessions and local storage persistence.

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Development**: Hot reload via Vite middleware in development mode
- **API Design**: RESTful endpoints for techniques and session management
- **Storage**: In-memory storage with interface pattern for easy database migration
- **Error Handling**: Centralized error middleware with proper HTTP status codes

The server uses a clean layered architecture with separate routing, storage, and configuration modules.

## Database Schema
Currently uses in-memory storage with predefined breathing techniques:
- **Breathing Techniques**: ID, name, description, timing patterns, visual styling
- **Session Stats**: Session tracking with duration and completion metrics
- **User Settings**: Volume, session preferences, theme settings

The storage layer is abstracted through an interface pattern, making it easy to swap to a persistent database later.

## Authentication
No authentication system currently implemented - the app operates as a single-user experience with settings stored locally in browser storage.

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: Database driver (configured but not actively used)
- **drizzle-orm & drizzle-kit**: Database ORM and migration tools
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router

## UI Component Libraries
- **@radix-ui**: Comprehensive set of accessible UI primitives
- **framer-motion**: Animation library for smooth transitions
- **lucide-react**: Icon library
- **tailwindcss**: Utility-first CSS framework

## Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Type safety and developer experience
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development environment integration

## Audio & Utility Libraries
- **date-fns**: Date manipulation utilities
- **class-variance-authority & clsx**: Dynamic class name generation
- **zod**: Runtime type validation for API data

The application is structured to easily integrate with Neon Database through the existing Drizzle configuration, though currently operating with in-memory storage for simplicity.