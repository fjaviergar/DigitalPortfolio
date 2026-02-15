import { useState, useMemo } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
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
        <title>Digital Portfolio</title>
        <meta
          name="description"
          content="Personal digital portfolio showcasing drawings and pictures"
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
              <div className="mb-4 text-sm text-gray-600">
                Showing {filteredItems.length} of {portfolioItems.length}{' '}
                {filteredItems.length === 1 ? 'artwork' : 'artworks'}
              </div>

              <Gallery items={filteredItems} onItemClick={handleItemClick} />
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
