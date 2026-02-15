/**
 * Represents a single portfolio item (artwork/picture)
 */
export interface PortfolioItem {
  /** Unique identifier for the portfolio item */
  id: string;

  /** Title of the artwork */
  title: string;

  /** Description or story behind the artwork */
  description: string;

  /** Path to the image file (relative to /public) */
  imagePath: string;

  /** Main category (e.g., "Drawing", "Painting", "Digital Art") */
  category: string;

  /** Array of tags for filtering (e.g., ["watercolor", "portrait", "landscape"]) */
  tags: string[];

  /** Creation date in YYYY-MM-DD format */
  date: string;

  /** Optional: Image width in pixels (for Next.js Image optimization) */
  width?: number;

  /** Optional: Image height in pixels (for Next.js Image optimization) */
  height?: number;
}

/**
 * Filter state for the portfolio gallery
 */
export interface FilterState {
  /** Currently selected categories */
  categories: string[];

  /** Currently selected tags */
  tags: string[];

  /** Search query string */
  searchQuery: string;
}
