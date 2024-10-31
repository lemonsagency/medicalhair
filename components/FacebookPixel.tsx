'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'
import Image from 'next/image'

declare global {
  interface Window {
    fbq: (type: string, eventName: string, params?: Record<string, any>) => void;
  }
}

export default function FacebookPixel({ pixelId }: { pixelId: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      console.log('PageView event fired')
      window.fbq('track', 'PageView')
    }
  }, [pathname])

  useEffect(() => {
    const formSubmitted = searchParams.get('submitted') === 'true'
    console.log('Form submitted:', formSubmitted)
    if (formSubmitted) {
      console.log('Attempting to fire CompleteRegistration event')
      window.fbq('track', 'CompleteRegistration', {
        content_name: 'Hair Restoration Consultation',
        status: 'success'
      })
      console.log('CompleteRegistration event fired')
    }
  }, [searchParams])

  return (
    <>
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
          console.log('Facebook Pixel initialized');
        `}
      </Script>
      <noscript>
        <Image
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
          width={1}
          height={1}
          style={{ display: 'none' }}
          unoptimized
        />
      </noscript>
    </>
  )
}