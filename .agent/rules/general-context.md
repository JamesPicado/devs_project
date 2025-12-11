---
trigger: always_on
---

# Project Context & Guidelines

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript throughout
- **Styling**: Tailwind CSS v4, Vanilla CSS variables (in `globals.css`)
- **Animation**: Framer Motion (heavy usage for scroll, transitions, and hover effects)
- **Icons/Assets**: Local assets in `public/` (no dedicated icon library verified, mostly images/custom)

## Key Conventions

### 1. Architecture (App Router)
- **Route Structure**: Files located in `app/` directory (`page.tsx`, `layout.tsx`).
- **Client Components**: Explicit `"use client"` directive used at the top of interactive components.
- **Data Fetching**: Currently `NavigationMenu.tsx` and `TypingTitle.tsx` are client-side. `page.tsx` is also a client component due to heavy Framer Motion usage.

### 2. Styling (Tailwind v4 + CSS Variables)
- **Theme**: Dark/Light mode supported via `data-theme` attribute on `<html>` or `<body>`.
- **Variables**: Defined in `app/globals.css` (e.g., `--background`, `--foreground`, `--dot-color`).
- **Tailwind Config**: minimal `tailwind.config.ts`, mostly using CSS variables and standard utility classes.
- **Glassmorphism**: Frequent use of `backdrop-blur`, `bg-opacity`, and semi-transparent borders for a premium feel.

### 3. Localization / Language
- **Current State**: Hardcoded English and Spanish mixed.
- **Spanish Content**: Primarily in `app/page.tsx` (Projects, Experiences, Contact Form).
- **English Content**: `app/NavigationMenu.tsx` and some headers in `page.tsx`.
- **Strategy**: No formal i18n library currently.

### 4. Components & Content
- **Images**: Sourced from `public/` (e.g., `/img_projects/`) and external URLs (Unsplash).
- **Hardcoded Data**: Content arrays (e.g., `PROJECTS`, `EXPERIENCES`) are defined directly in component files (`page.tsx`).

## Development Rules
- **Prefer strict TypeScript types.**
- **Use "use client" only when necessary**, though the current landing page is highly interactive and mostly client-side.
- **Maintain the "Premium" aesthetic**: extensive use of subtle gradients, blurs, and smooth motion.
