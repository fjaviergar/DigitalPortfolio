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
          className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors"
        >
          Clear All Filters
        </button>
      )}

      {/* Categories Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
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
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-200 font-medium'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
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
                    ? 'bg-blue-500 dark:bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
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
            className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            {showAllTags ? 'Show Less' : `Show All (${tags.length})`}
          </button>
        )}
      </div>

      {/* Aviso Importante Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Aviso Importante
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Mi nombre es Javier Garcia y a veces se me ocurren estas chorradas. Hasta el momento vivían en una libreta pero ahora, gracias a la IA, las puedo compartir conmigo mismo en esta web. Si has llegado hasta aquí y por algún extraño motivo quieres contactarme puedes hacerlo a través de los siguientes links.
        </p>

        {/* Contact Links */}
        <div className="flex gap-4">
          {/* Email Link */}
          <a
            href="mailto:fjaviergar@gmail.com"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="Email"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
          </a>

          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/javier-garc%C3%ADa-04838527/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
