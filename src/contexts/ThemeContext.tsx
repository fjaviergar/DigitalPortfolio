import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

// Define the possible theme values
type Theme = 'light' | 'dark'

// Define the shape of our context
interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

// Create the context with undefined default (will be provided by provider)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Props for the provider component
interface ThemeProviderProps {
  children: ReactNode
}

/**
 * ThemeProvider Component
 *
 * Manages theme state and persistence across the application.
 * - Respects system preferences on first visit
 * - Saves user preference to localStorage
 * - Applies 'dark' class to html element when dark mode is active
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  // State to track current theme
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  // Initialize theme on component mount
  useEffect(() => {
    setMounted(true)

    // Check localStorage for saved preference
    const savedTheme = localStorage.getItem('theme') as Theme | null

    if (savedTheme) {
      // Use saved preference
      setTheme(savedTheme)
    } else {
      // Check system preference using media query
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  // Update HTML class and localStorage when theme changes
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement

    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Save to localStorage
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  // Function to toggle between light and dark
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  // Prevent flash of incorrect theme on initial load
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Custom hook to use theme context
 *
 * Usage: const { theme, toggleTheme } = useTheme()
 */
export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
