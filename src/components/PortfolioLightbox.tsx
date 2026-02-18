import { useState, useEffect } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import { PortfolioItem } from '@/types/portfolio'

interface PortfolioLightboxProps {
  items: PortfolioItem[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
}

export default function PortfolioLightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
}: PortfolioLightboxProps) {
  const [activeIndex, setActiveIndex] = useState(currentIndex)

  useEffect(() => {
    setActiveIndex(currentIndex)
  }, [currentIndex])

  const slides = items.map((item) => ({
    src: item.imagePath,
    alt: item.title,
  }))

  const activeItem = items[activeIndex]

  return (
    <>
      <Lightbox
        open={isOpen}
        close={onClose}
        index={currentIndex}
        slides={slides}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
          zoomInMultiplier: 2,
        }}
        carousel={{
          finite: true,
          padding: 0,
        }}
        on={{
          view: ({ index }) => setActiveIndex(index),
        }}
      />

      {isOpen && activeItem && (
        <div className="fixed bottom-0 left-0 right-0 z-[10000] p-2 sm:p-4">
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-3 sm:p-4 rounded-lg max-h-[40vh] overflow-y-auto">
            {/* Header row: Title and Counter */}
            <div className="flex items-start justify-between mb-1 sm:mb-2">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex-1">
                {activeItem.title}
              </h3>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-4 flex-shrink-0">
                {activeIndex + 1} of {items.length}
              </span>
            </div>

            {/* Category and tags */}
            <div className="flex items-center gap-1 flex-wrap mb-1 sm:mb-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {activeItem.category}
              </span>
              {activeItem.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {activeItem.description}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
