'use client'

import { useEffect, useState } from 'react'

export function useFacebookPixel() {
  const [fbq, setFbq] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFbq(() => window.fbq)
    }
  }, [])

  return fbq
}