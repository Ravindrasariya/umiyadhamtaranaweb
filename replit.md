# Umiya Dham Tarana Temple Website

## Overview

This is a bilingual (English/Hindi) temple website for Umiya Dham Tarana, a Hindu temple dedicated to Goddess Umiya. The application serves as an informational and devotional platform featuring hero sliders, temple information, pooja timings, services, and a photo/video gallery. It includes an admin panel for content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Build Tool**: Vite with hot module replacement

The frontend follows a component-based architecture with:
- Page components in `client/src/pages/`
- Reusable UI components in `client/src/components/`
- Context providers for cross-cutting concerns (language switching)
- Custom hooks in `client/src/hooks/`

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful JSON APIs under `/api/*` prefix
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

The server follows a layered architecture:
- `server/routes.ts` - API endpoint definitions
- `server/storage.ts` - Data access layer with interface abstraction
- `server/db.ts` - Database connection pool
- `server/seed.ts` - Initial data seeding

### Data Storage
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` using Drizzle ORM table definitions
- **Migrations**: Managed via `drizzle-kit push` command

Key database tables:
- `users` - Admin authentication
- `slider_images` - Hero carousel content
- `about_content` - Temple description (bilingual)
- `pooja_timings` - Seasonal darshan and aarti schedules
- `services` - Temple service offerings
- `gallery_items` - Photos and videos
- `site_settings` - Configurable site options

### Internationalization
- Language context (`LanguageContext.tsx`) manages EN/HI switching
- All content tables store both `titleEn`/`titleHi` and `contentEn`/`contentHi` fields
- Translation helper function `t(en, hi)` selects appropriate text based on current language
- Language preference persisted in localStorage

### Design System
The project follows design guidelines documented in `design_guidelines.md`:
- Traditional Hindu temple aesthetic with cultural respect
- Orange/saffron primary color scheme with warm accents
- Generous spacing and large touch targets for accessibility
- Responsive layouts with mobile-first considerations

## External Dependencies

### Database
- PostgreSQL database (connection via `DATABASE_URL` environment variable)
- Drizzle ORM for type-safe database operations
- `connect-pg-simple` for session storage

### UI/Frontend Libraries
- Radix UI primitives for accessible components
- Embla Carousel for hero slider
- Lucide React and React Icons for iconography
- class-variance-authority for component variants

### Development Tools
- Vite for development server and bundling
- esbuild for production server bundling
- Drizzle Kit for database schema management

### Build Configuration
- TypeScript with strict mode
- Path aliases: `@/*` for client source, `@shared/*` for shared code
- Production build outputs to `dist/` directory