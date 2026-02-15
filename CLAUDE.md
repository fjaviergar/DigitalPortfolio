# Digital Portfolio - Project Configuration

## Project Overview

A personal digital portfolio web application for showcasing drawings and pictures. Built with modern web technologies, focusing on simplicity, maintainability, and ease of content management.

## User Profile & Requirements

- **Experience Level:** Beginner in web development
- **Project Type:** Personal showcase (no user authentication required)
- **Content Type:** Drawings and pictures
- **Management Preference:** File-based content editing (no CMS)
- **Hosting Preference:** Free hosting (Vercel)

## Feature Requirements

### Core Features
- ✅ **Image Gallery:** Display artwork in a responsive grid layout
- ✅ **Categories/Tags:** Organize artwork by categories and tags
- ✅ **Image Lightbox:** Full-screen image viewer with navigation
- ✅ **Search Functionality:** Real-time search across titles, descriptions, and tags
- ✅ **Filter System:** Filter artwork by categories and tags
- ✅ **Dark Mode:** Toggle between light and dark themes with persistent preference

### User Experience
- Responsive design (mobile-first approach)
- Fast loading with image optimization
- Intuitive navigation
- Clean, modern interface
- Dark mode support for reduced eye strain

## Technical Stack Decisions

### Frontend Framework
**Decision:** Next.js 13 (Pages Router)
**Rationale:**
- Beginner-friendly compared to App Router
- Excellent static site generation capabilities
- Perfect for Vercel deployment
- Built-in image optimization
- Strong community and documentation

**Alternative Considered:**
- Next.js App Router (too complex for beginner)
- Vite + React (less feature-rich, more manual setup)

### Programming Language
**Decision:** TypeScript
**Rationale:**
- Better IDE support with autocomplete
- Catches errors during development
- Industry standard
- Worth the slight learning curve for long-term benefits

**Alternative Considered:**
- JavaScript (simpler but less robust)

### Styling Framework
**Decision:** Tailwind CSS
**Rationale:**
- Utility-first approach for rapid development
- Modern, popular framework
- Excellent documentation
- No context switching between files
- Easy to create responsive designs

**Alternative Considered:**
- Component libraries like Material UI (less customization)
- Custom CSS/SCSS (more time-consuming)

### Image Storage
**Decision:** Local files in project
**Rationale:**
- Simple setup with no external dependencies
- Version controlled with code
- No API limits or costs
- Suitable for moderate image counts
- Works perfectly with Next.js Image component

**Alternative Considered:**
- Cloud storage like Cloudinary (adds complexity)
- GitHub LFS (unnecessary for this scale)

### Content Management
**Decision:** JSON files for metadata
**Rationale:**
- Easy to edit with any text editor
- No database setup required
- Version controlled
- Type-safe with TypeScript interfaces
- Perfect for static site generation

**Structure:**
```json
{
  "id": "unique-id",
  "title": "Artwork Title",
  "description": "Description",
  "imagePath": "/images/filename.jpg",
  "category": "Drawing",
  "tags": ["watercolor", "portrait"],
  "date": "2024-02-15"
}
```

**Alternative Considered:**
- Visual admin panel (requires backend)
- Headless CMS (adds unnecessary complexity)

### Key Dependencies

#### UI & Interactions
- **yet-another-react-lightbox** - Lightbox image viewer
- **@headlessui/react** - Accessible UI components for filters/modals
- **clsx** - Utility for conditional CSS classes

#### Search & Filter
- **fuse.js** - Client-side fuzzy search
- React state for filter management

## Dark Mode Implementation

### Overview
The portfolio includes a complete dark mode implementation with toggle functionality, persistent user preferences, and system color scheme detection.

**Status:** ✅ Fully implemented and production-ready

### Technical Architecture

**Theme Management:**
- **React Context API** (`src/contexts/ThemeContext.tsx`) - Global theme state management
- **localStorage** - Persists user's theme preference across sessions
- **System Preferences** - Detects and respects `prefers-color-scheme` on first visit
- **Tailwind CSS** - Class-based dark mode with `dark:` utility variants

**Key Components:**
- `ThemeContext.tsx` - Context provider and custom `useTheme` hook
- `ThemeToggle.tsx` - Toggle button with sun/moon icons
- All UI components updated with `dark:` variants

### How It Works

1. **Theme Provider** wraps the entire app in `_app.tsx`
2. **ThemeContext** manages theme state ('light' | 'dark')
3. **Theme Toggle** button dynamically imported (SSR disabled)
4. When theme changes:
   - Updates HTML element class (`<html class="dark">`)
   - Saves preference to localStorage
   - All components with `dark:` classes update automatically

### Color Scheme

**Light Mode (Default):**
- Background: White / Gray 50
- Text: Gray 900 / Gray 600
- Accents: Blue 100 / Blue 800

**Dark Mode:**
- Background: Slate 900 (#0F172A) / Gray 800
- Text: White / Gray 300
- Accents: Blue 900 / Blue 200

### Usage for Developers

**Accessing Theme State:**
```typescript
import { useTheme } from '@/contexts/ThemeContext'

function MyComponent() {
  const { theme, toggleTheme } = useTheme()
  // theme is 'light' or 'dark'
  // toggleTheme() switches between modes
}
```

**Adding Dark Mode to Components:**
```tsx
// Always pair light and dark variants together
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content
</div>
```

**Common Color Patterns:**
- `bg-white` → `dark:bg-gray-800`
- `bg-gray-100` → `dark:bg-gray-700`
- `text-gray-900` → `dark:text-white`
- `text-gray-600` → `dark:text-gray-300`
- `border-gray-300` → `dark:border-gray-600`

### Important Technical Notes

**SSR Consideration:**
The `ThemeToggle` component is imported with Next.js dynamic import and `ssr: false` to prevent server-side rendering errors. This is required because:
- React Context isn't available during SSR
- `localStorage` and `window.matchMedia` are browser-only APIs
- Without this, you'll get "useTheme must be used within a ThemeProvider" errors

**Example (Layout.tsx):**
```typescript
const ThemeToggle = dynamic(() => import('./ThemeToggle'), {
  ssr: false,
  loading: () => <div className="p-2 w-9 h-9" aria-hidden="true" />
})
```

### Configuration Files

**Tailwind Config** (`tailwind.config.js`):
```javascript
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  // ... rest of config
}
```

**Global CSS** (`src/styles/globals.css`):
```css
/* Dark mode colors */
.dark {
  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 15, 23, 42;
  --background-end-rgb: 15, 23, 42;
}
```

### Adding Dark Mode to New Components

When creating new components:
1. Import and use existing dark mode classes from other components as reference
2. Follow the pattern: `className="light-class dark:dark-class"`
3. Test in both light and dark modes
4. Ensure sufficient color contrast for accessibility

### User Features

- **Toggle Button:** Sun/moon icon in header (upper right)
- **Persistent:** Preference saved in browser localStorage
- **Smart Default:** Respects system color scheme on first visit
- **Smooth Transitions:** All color changes animate smoothly
- **Keyboard Accessible:** Fully navigable with keyboard

## Project Structure

```
DigitalPortfolio/
├── public/
│   └── images/              # All portfolio images
├── src/
│   ├── components/
│   │   ├── Gallery.tsx      # Main gallery grid
│   │   ├── Lightbox.tsx     # Image viewer
│   │   ├── SearchBar.tsx    # Search input
│   │   ├── FilterPanel.tsx  # Category/tag filters
│   │   ├── PortfolioCard.tsx # Individual artwork card
│   │   ├── ThemeToggle.tsx  # Dark mode toggle button
│   │   └── Layout.tsx       # Page wrapper
│   ├── contexts/
│   │   └── ThemeContext.tsx # Theme state management
│   ├── data/
│   │   └── portfolio.json   # Portfolio metadata
│   ├── pages/
│   │   ├── _app.tsx         # App wrapper + ThemeProvider
│   │   ├── _document.tsx    # HTML document
│   │   └── index.tsx        # Homepage
│   ├── styles/
│   │   └── globals.css      # Global styles + Tailwind + dark mode
│   ├── types/
│   │   └── portfolio.ts     # TypeScript interfaces
│   └── utils/
│       ├── filterArtwork.ts # Filter logic
│       └── searchArtwork.ts # Search logic
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js       # Dark mode config
├── next.config.js
└── README.md
```

## Development Workflow

### Adding New Artwork
1. Place image file in `public/images/`
2. Add entry to `src/data/portfolio.json`
3. Commit changes to Git
4. Push to GitHub (triggers automatic Vercel deployment)

### Local Development
```bash
npm install          # Install dependencies
npm run dev         # Start development server (http://localhost:3000)
npm run build       # Build for production
npm run start       # Start production server
```

## Deployment Strategy

**Platform:** Vercel
**Process:**
1. Push code to GitHub repository
2. Connect GitHub repo to Vercel
3. Automatic deployments on every push to main branch
4. Preview deployments for pull requests

**Benefits:**
- Free hosting
- Automatic HTTPS
- Global CDN
- Zero configuration
- Continuous deployment

## Design Guidelines

### Responsive Breakpoints
- Mobile: 1 column
- Tablet: 2-3 columns
- Desktop: 3-4 columns

### Visual Style
- Clean, minimal design
- Focus on the artwork
- Smooth transitions and hover effects
- Fast, optimized image loading
- Accessible color contrast

### Performance
- Use Next.js `<Image>` component for automatic optimization
- Lazy loading for images
- Optimized bundle size
- Static generation for fast page loads

## Content Guidelines

### Image Requirements
- Supported formats: JPG, PNG, WebP
- Recommended: High-quality originals (Next.js will optimize)
- Store in `public/images/` directory

### Metadata Best Practices
- **Title:** Clear, descriptive artwork name
- **Description:** Brief context or story (2-3 sentences)
- **Category:** Broad classification (Drawing, Painting, Digital, etc.)
- **Tags:** Specific attributes (watercolor, portrait, landscape, abstract, etc.)
- **Date:** Creation date in YYYY-MM-DD format

## Future Enhancement Ideas

Documented for potential future development:
- Animations with Framer Motion
- Pagination for large portfolios
- Sorting options (by date, title, category)
- Analytics integration
- Contact form or social links
- Individual detail pages for each artwork
- Blog/about section
- Keyboard shortcuts for dark mode (e.g., Ctrl+Shift+D)
- Theme sync across browser tabs

## Technical Notes

### For Beginners
- **Pages Router:** Simpler file-based routing compared to App Router
- **TypeScript:** Provides autocomplete and error checking in your IDE
- **Tailwind:** Uses utility classes directly in JSX (e.g., `className="flex gap-4"`)
- **No Database:** Everything is file-based and version controlled
- **Static Site:** Pre-rendered HTML for best performance

### Key Concepts
- **Static Generation (SSG):** Pages are built at build time
- **Image Optimization:** Next.js automatically optimizes images
- **Client-Side Filtering:** Search and filters run in the browser
- **Component Architecture:** Reusable UI pieces
- **Type Safety:** TypeScript ensures data structure consistency

## Version Control

### Git Strategy
- Commit frequently with clear messages
- Push to GitHub for automatic deployment
- Use `.gitignore` to exclude node_modules and build files

### Branching (Optional for future)
- `main` - Production branch (auto-deploys to Vercel)
- `dev` - Development branch for testing features

## Support & Documentation

### Official Documentation
- [Next.js Pages Router](https://nextjs.org/docs/pages)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vercel Deployment](https://vercel.com/docs)

### Project-Specific
- Implementation plan: `.claude/plans/dynamic-seeking-clarke.md`
- This configuration file: `CLAUDE.md`

---

**Last Updated:** 2026-02-15
**Project Status:** In Development
**Target Deployment:** Vercel

**Recent Updates:**
- ✅ Dark mode implementation complete (2026-02-15)
