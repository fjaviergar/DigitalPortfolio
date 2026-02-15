import { PortfolioItem } from '@/types/portfolio'

/**
 * Filter portfolio items by categories and tags
 * @param items - Array of portfolio items to filter
 * @param selectedCategories - Array of selected category filters
 * @param selectedTags - Array of selected tag filters
 * @returns Filtered array of portfolio items
 */
export function filterArtwork(
  items: PortfolioItem[],
  selectedCategories: string[],
  selectedTags: string[]
): PortfolioItem[] {
  // If no filters are selected, return all items
  if (selectedCategories.length === 0 && selectedTags.length === 0) {
    return items
  }

  return items.filter((item) => {
    // Check category filter
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category)

    // Check tags filter (item must have at least one of the selected tags)
    const tagsMatch =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => item.tags.includes(tag))

    // Item must match both category and tags filters
    return categoryMatch && tagsMatch
  })
}

/**
 * Extract all unique categories from portfolio items
 * @param items - Array of portfolio items
 * @returns Sorted array of unique categories
 */
export function getUniqueCategories(items: PortfolioItem[]): string[] {
  const categories = items.map((item) => item.category)
  return Array.from(new Set(categories)).sort()
}

/**
 * Extract all unique tags from portfolio items
 * @param items - Array of portfolio items
 * @returns Sorted array of unique tags
 */
export function getUniqueTags(items: PortfolioItem[]): string[] {
  const allTags = items.flatMap((item) => item.tags)
  return Array.from(new Set(allTags)).sort()
}
