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

### User Experience
- Responsive design (mobile-first approach)
- Fast loading with image optimization
- Intuitive navigation
- Clean, modern interface

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
│   │   └── Layout.tsx       # Page wrapper
│   ├── data/
│   │   └── portfolio.json   # Portfolio metadata
│   ├── pages/
│   │   ├── _app.tsx         # App wrapper
│   │   ├── _document.tsx    # HTML document
│   │   └── index.tsx        # Homepage
│   ├── styles/
│   │   └── globals.css      # Global styles + Tailwind
│   ├── types/
│   │   └── portfolio.ts     # TypeScript interfaces
│   └── utils/
│       ├── filterArtwork.ts # Filter logic
│       └── searchArtwork.ts # Search logic
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
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
- Dark mode toggle
- Contact form or social links
- Individual detail pages for each artwork
- Blog/about section

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
