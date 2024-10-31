'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

export default function FacebookPixel({ pixelId }: { pixelId: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Initialize Facebook Pixel
    const initFbq = () => {
      const fbq = function(...args: unknown[]) {
        if (fbq.callMethod) {
          fbq.callMethod.apply(fbq, args);
        } else {
          fbq.queue.push(args);
        }
      };
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.queue = [];
      window.fbq = fbq;
    };

    if (!window.fbq) {
      initFbq();
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);
    }

    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');

    // Track page views on route changes
    const handleRouteChange = () => {
      window.fbq('track', 'PageView');
    }

    handleRouteChange();
  }, [pixelId, pathname, searchParams])

  return null
}