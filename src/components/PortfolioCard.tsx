import Image from 'next/image'
import { PortfolioItem } from '@/types/portfolio'
import clsx from 'clsx'

interface PortfolioCardProps {
  item: PortfolioItem
  onClick: () => void
}

export default function PortfolioCard({ item, onClick }: PortfolioCardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'group relative overflow-hidden rounded-lg cursor-pointer',
        'bg-gray-100 transition-all duration-300',
        'hover:shadow-xl hover:scale-105'
      )}
    >
      {/* Image */}
      <div className="aspect-square relative">
        <Image
          src={item.imagePath}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {item.description}
        </p>

        {/* Category badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {item.category}
          </span>

          {/* Tags */}
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700"
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 2 && (
            <span className="text-xs text-gray-500">
              +{item.tags.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
