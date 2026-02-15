import { PortfolioItem } from '@/types/portfolio'
import PortfolioCard from './PortfolioCard'

interface GalleryProps {
  items: PortfolioItem[]
  onItemClick: (item: PortfolioItem, index: number) => void
}

export default function Gallery({ items, onItemClick }: GalleryProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No artwork found. Try adjusting your search or filters.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <PortfolioCard
          key={item.id}
          item={item}
          onClick={() => onItemClick(item, index)}
        />
      ))}
    </div>
  )
}
