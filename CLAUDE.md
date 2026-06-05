# Sotsiaaltöö Akadeemia Website

Estonian Social Work Academy website built with Next.js 14 (App Router) + Sanity CMS.

## Tech Stack

- **Framework**: Next.js 14 (App Router), React 18, TypeScript 5
- **CMS**: Sanity v3 (embedded Studio at `/studio`, Estonian locale)
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion
- **Video**: Mux, Vimeo, YouTube, Wistia players
- **Package Manager**: npm
- **Deployment**: Vercel

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- `npm run gen-types` — Generate TypeScript types from Sanity schemas

## Project Structure

- `app/` — Next.js pages and components (App Router)
- `app/components/` — Shared React components
- `app/helpers/` — Utility functions
- `app/hooks/` — Custom React hooks
- `app/[slug]` — Dynamic content pages
- `app/studio` — Embedded Sanity Studio
- `app/api/` — API routes (draft mode)
- `sanity/schemas/` — Sanity content schemas (documents + objects)
- `sanity/lib/` — Sanity client config and fetch helpers
- `sanity/structure/` — Sanity Studio desk structure
- `public/` — Static assets (fonts, images)

## Key Conventions

- Content is fetched server-side via GROQ queries
- Path alias: `@/*` maps to project root
- Site language is Estonian
- Sanity singletons: `homePage`, `settings`, `contact`
- Sanity collections: `masterClass`, `shortCourse`, `courseModule`, `genericPage`, `teacher`, `calendar`
