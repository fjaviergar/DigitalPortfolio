import Fuse from 'fuse.js'
import { PortfolioItem } from '@/types/portfolio'

/**
 * Search portfolio items using fuzzy search
 * @param items - Array of portfolio items to search through
 * @param query - Search query string
 * @returns Filtered array of portfolio items matching the query
 */
export function searchArtwork(
  items: PortfolioItem[],
  query: string
): PortfolioItem[] {
  // If no query, return all items
  if (!query || query.trim() === '') {
    return items
  }

  // Configure Fuse.js for fuzzy search
  const fuse = new Fuse(items, {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'description', weight: 0.3 },
      { name: 'category', weight: 0.2 },
      { name: 'tags', weight: 0.1 },
    ],
    threshold: 0.4, // Lower = more strict matching
    includeScore: true,
  })

  // Perform search
  const results = fuse.search(query)

  // Extract items from search results
  return results.map((result) => result.item)
}
