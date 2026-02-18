import { ReactNode } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Import ThemeToggle with SSR disabled to avoid context errors during server-side rendering
const ThemeToggle = dynamic(() => import('./ThemeToggle'), {
  ssr: false,
  loading: () => (
    <div className="p-2 w-9 h-9" aria-hidden="true">
      {/* Placeholder while loading */}
    </div>
  ),
})

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Flex container for title and toggle button */}
          <div className="flex items-start justify-between">
            {/* Logo + Title group */}
            <div className="flex items-center gap-3">
              <Image
                src="/images/og-banner.jpg"
                alt="Javier Garcia logo"
                width={48}
                height={48}
                className="rounded-full object-cover w-12 h-12 flex-shrink-0"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Javier Garcia
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Festival del humor de la libreta a la web
                </p>
              </div>
            </div>
            {/* Theme toggle button in upper right */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-white dark:bg-gray-900">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Digital Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
