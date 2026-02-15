import { useState } from 'react'
import clsx from 'clsx'

interface FilterPanelProps {
  categories: string[]
  tags: string[]
  selectedCategories: string[]
  selectedTags: string[]
  onCategoryToggle: (category: string) => void
  onTagToggle: (tag: string) => void
  onClearFilters: () => void
}

export default function FilterPanel({
  categories,
  tags,
  selectedCategories,
  selectedTags,
  onCategoryToggle,
  onTagToggle,
  onClearFilters,
}: FilterPanelProps) {
  const [showAllTags, setShowAllTags] = useState(false)

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedTags.length > 0

  const displayedTags = showAllTags ? tags : tags.slice(0, 8)

  return (
    <div className="space-y-6">
      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
        >
          Clear All Filters
        </button>
      )}

      {/* Categories Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category)
            return (
              <button
                key={category}
                onClick={() => onCategoryToggle(category)}
                className={clsx(
                  'w-full text-left px-3 py-2 rounded-md text-sm transition-all',
                  isSelected
                    ? 'bg-blue-100 text-blue-900 font-medium'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                )}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tags Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {displayedTags.map((tag) => {
            const isSelected = selectedTags.includes(tag)
            return (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={clsx(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                  isSelected
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {tag}
              </button>
            )
          })}
        </div>

        {/* Show More/Less Tags Button */}
        {tags.length > 8 && (
          <button
            onClick={() => setShowAllTags(!showAllTags)}
            className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {showAllTags ? 'Show Less' : `Show All (${tags.length})`}
          </button>
        )}
      </div>
    </div>
  )
}
