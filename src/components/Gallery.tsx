import { PortfolioItem } from '@/types/portfolio'
import { motion, AnimatePresence } from 'framer-motion'
import PortfolioCard from './PortfolioCard'

interface GalleryProps {
  items: PortfolioItem[]
  onItemClick: (item: PortfolioItem, index: number) => void
}

export default function Gallery({ items, onItemClick }: GalleryProps) {
  return (
    <AnimatePresence mode="popLayout">
      {items.length === 0 ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No artwork found. Try adjusting your search or filters.
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="grid"
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
              >
                <PortfolioCard
                  item={item}
                  onClick={() => onItemClick(item, index)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
