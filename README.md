# Digital Portfolio

A modern, responsive digital portfolio web application for showcasing drawings and artwork. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📸 **Responsive Image Gallery** - Beautiful grid layout that adapts to all screen sizes
- 🔍 **Fuzzy Search** - Real-time search across titles, descriptions, categories, and tags
- 🏷️ **Smart Filtering** - Filter artwork by categories and tags
- 🖼️ **Lightbox Viewer** - Full-screen image viewing with keyboard navigation
- ⚡ **Fast Performance** - Static site generation with optimized images
- 🎨 **Modern UI** - Clean design with smooth transitions and hover effects
- 📱 **Mobile-First** - Optimized for mobile, tablet, and desktop

## Tech Stack

- **Framework:** Next.js 13 (Pages Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Search:** Fuse.js (fuzzy search)
- **Lightbox:** yet-another-react-lightbox
- **UI Components:** Headless UI
- **Deployment:** Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed on your system
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd DigitalPortfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
DigitalPortfolio/
├── public/
│   └── images/          # Portfolio images
├── src/
│   ├── components/      # React components
│   │   ├── Layout.tsx
│   │   ├── Gallery.tsx
│   │   ├── PortfolioCard.tsx
│   │   ├── PortfolioLightbox.tsx
│   │   ├── SearchBar.tsx
│   │   └── FilterPanel.tsx
│   ├── data/
│   │   └── portfolio.json    # Portfolio metadata
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   └── index.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── types/
│   │   └── portfolio.ts      # TypeScript interfaces
│   └── utils/
│       ├── searchArtwork.ts  # Search logic
│       └── filterArtwork.ts  # Filter logic
├── CLAUDE.md            # Project configuration and decisions
├── package.json
└── README.md
```

## Adding New Artwork

To add new artwork to your portfolio:

1. **Add your image file** to `public/images/`
   - Supported formats: JPG, PNG, WebP
   - Recommended: High-quality originals (Next.js will optimize them)

2. **Update portfolio metadata** in `src/data/portfolio.json`:
```json
{
  "id": "unique-artwork-id",
  "title": "Artwork Title",
  "description": "Brief description of the artwork",
  "imagePath": "/images/your-image.jpg",
  "category": "Drawing",
  "tags": ["watercolor", "landscape", "nature"],
  "date": "2024-02-15",
  "width": 1200,
  "height": 800
}
```

3. **Commit and push** your changes (triggers automatic deployment if connected to Vercel)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Changing Colors
Edit `tailwind.config.js` to customize your color scheme.

### Updating Header/Footer
Modify `src/components/Layout.tsx` to change the header or footer content.

### Adjusting Grid Layout
Update the grid classes in `src/components/Gallery.tsx`:
```tsx
// Current: 1 col mobile, 2 tablet, 3 laptop, 4 desktop
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Import Project" and select your repository
4. Vercel will auto-detect Next.js and deploy
5. Your site will be live with automatic deployments on every push!

### Deploy to Other Platforms

This is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Any platform supporting Node.js

## Performance Tips

- Next.js automatically optimizes images using the `<Image>` component
- Static pages are pre-rendered at build time for fast loading
- Lazy loading is enabled by default for images
- Search and filtering happen client-side for instant results

## Troubleshooting

### Images not showing
- Ensure images are in the `public/images/` folder
- Check that `imagePath` in `portfolio.json` starts with `/images/`
- Verify image filenames match exactly (case-sensitive)

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript errors: `npm run lint`
- Verify all JSON syntax in `portfolio.json` is valid

## Future Enhancements

Ideas for future development:
- Add animations with Framer Motion
- Implement pagination for large portfolios
- Add sorting options (by date, title, category)
- Integrate analytics
- Add dark mode toggle
- Create individual detail pages for each artwork
- Add contact form

## Contributing

This is a personal portfolio project, but suggestions and improvements are welcome!

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
- Check the [CLAUDE.md](CLAUDE.md) file for project configuration
- Review the implementation plan in `.claude/plans/`
- Open an issue on GitHub

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
