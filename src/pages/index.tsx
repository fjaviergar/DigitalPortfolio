import { useState, useMemo, useEffect } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '@/components/Layout'
import Gallery from '@/components/Gallery'
import PortfolioLightbox from '@/components/PortfolioLightbox'
import SearchBar from '@/components/SearchBar'
import FilterPanel from '@/components/FilterPanel'
import { PortfolioItem } from '@/types/portfolio'
import { searchArtwork } from '@/utils/searchArtwork'
import { filterArtwork, getUniqueCategories, getUniqueTags } from '@/utils/filterArtwork'
import portfolioData from '@/data/portfolio.json'

// TODO: Replace with your actual Vercel URL before deploying
const SITE_URL = 'https://digital-portfolio-two-orcin.vercel.app'
const SITE_TITLE = 'Javier Garcia - Portfolio'
const SITE_DESCRIPTION = 'Festival del humor de la libreta a la web. Portfolio de viñetas y caricaturas de Javier Garcia.'
// TODO: Replace with your actual OG banner image path
const OG_IMAGE = '/images/og-banner.jpg'

interface HomeProps {
  portfolioItems: PortfolioItem[]
}

export default function Home({ portfolioItems }: HomeProps) {
  // State management
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(8) // Pagination: show 8 initially

  // Get unique categories and tags
  const categories = useMemo(
    () => getUniqueCategories(portfolioItems),
    [portfolioItems]
  )
  const tags = useMemo(() => getUniqueTags(portfolioItems), [portfolioItems])

  // Apply filters and search
  const filteredItems = useMemo(() => {
    // First apply category and tag filters
    let items = filterArtwork(
      portfolioItems,
      selectedCategories,
      selectedTags
    )

    // Then apply search
    items = searchArtwork(items, searchQuery)

    return items
  }, [portfolioItems, selectedCategories, selectedTags, searchQuery])

  // Reset pagination when filters or search changes
  useEffect(() => {
    setItemsToShow(8)
  }, [selectedCategories, selectedTags, searchQuery])

  // Get paginated items to display
  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, itemsToShow)
  }, [filteredItems, itemsToShow])

  // Check if there are more items to load
  const hasMoreItems = filteredItems.length > itemsToShow

  // Handle load more
  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + 8)
  }

  // Handle category filter toggle
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  // Handle tag filter toggle
  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategories([])
    setSelectedTags([])
    setSearchQuery('')
  }

  // Open lightbox
  const handleItemClick = (item: PortfolioItem, index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_TITLE,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    author: {
      '@type': 'Person',
      name: 'Javier Garcia',
    },
    mainEntity: {
      '@type': 'ImageGallery',
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      image: portfolioItems.map((item) => ({
        '@type': 'ImageObject',
        name: item.title,
        description: item.description,
        contentUrl: `${SITE_URL}${item.imagePath}`,
        width: item.width,
        height: item.height,
        datePublished: item.date,
      })),
    },
  }

  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={SITE_URL} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}${OG_IMAGE}`} />
        <meta property="og:locale" content="es_ES" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}${OG_IMAGE}`} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-8">
                <FilterPanel
                  categories={categories}
                  tags={tags}
                  selectedCategories={selectedCategories}
                  selectedTags={selectedTags}
                  onCategoryToggle={handleCategoryToggle}
                  onTagToggle={handleTagToggle}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </aside>

            {/* Gallery */}
            <div className="flex-1">
              {/* Results count */}
              <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Showing {displayedItems.length} of {filteredItems.length}{' '}
                {filteredItems.length === 1 ? 'artwork' : 'artworks'}
              </div>

              <Gallery items={displayedItems} onItemClick={handleItemClick} />

              {/* Load More Button */}
              <AnimatePresence>
                {hasMoreItems && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8 flex justify-center"
                  >
                    <button
                      onClick={handleLoadMore}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
                    >
                      Cargar más
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Lightbox */}
        <PortfolioLightbox
          items={filteredItems}
          currentIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      </Layout>
    </>
  )
}

// Fetch portfolio data at build time
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      portfolioItems: portfolioData as PortfolioItem[],
    },
  }
}
