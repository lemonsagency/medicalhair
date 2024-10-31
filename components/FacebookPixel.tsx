'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import ReactPixel from 'react-facebook-pixel'

export default function FacebookPixel({ pixelId }: { pixelId: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    ReactPixel.init(pixelId)
    ReactPixel.pageView()

    // This function will run on route changes
    const handleRouteChange = () => {
      ReactPixel.pageView()
    }

    // Call it once on mount
    handleRouteChange()
  }, [pixelId, pathname, searchParams])

  return null
}