import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
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
  // Convert portfolio items to lightbox slides with enhanced metadata
  const slides = items.map((item, index) => ({
    src: item.imagePath,
    alt: item.title,
    title: item.title,
    description: (
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg">
        {/* Header row: Title and Counter */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex-1">
            {item.title}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-4 flex-shrink-0">
            {index + 1} of {items.length}
          </span>
        </div>

        {/* Category badge */}
        <div className="mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
            {item.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {item.description}
        </p>
      </div>
    ),
  }))

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      index={currentIndex}
      slides={slides}
      plugins={[Captions]}
      captions={{
        descriptionTextAlign: 'start',
      }}
      carousel={{
        finite: true,
      }}
    />
  )
}
