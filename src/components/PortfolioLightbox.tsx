import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { PortfolioItem } from '@/types/portfolio'

interface PortfolioLightboxProps {
  items: PortfolioItem[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
}

export default function PortfolioLightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
}: PortfolioLightboxProps) {
  // Convert portfolio items to lightbox slides
  const slides = items.map((item) => ({
    src: item.imagePath,
    alt: item.title,
    title: item.title,
    description: item.description,
  }))

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      index={currentIndex}
      slides={slides}
      carousel={{
        finite: true,
      }}
    />
  )
}
