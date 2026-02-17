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

  return (
    <>
      <Head>
        <title>Javier Garcia</title>
        <meta
          name="description"
          content="Festival del humor de la libreta a la web"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
