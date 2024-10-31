'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from 'next/link'
import { MapPin, Phone } from "lucide-react"

interface FacebookPixelParams {
  content_name?: string;
  status?: string;
  value?: number;
  currency?: string;
}

declare global {
  interface Window {
    fbq: (
      type: string,
      eventName: string,
      params?: FacebookPixelParams
    ) => void;
  }
}

function Header() {
  return (
    <header className="flex justify-between items-center py-4">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-IqTAyj66AeUCYNjtKTPGb4j4doLg1K.png"
        alt="Medical Hair Logo"
        width={222}
        height={38}
      />
      <Button variant="outline" className="bg-[#e5f1f8] text-[#0063af] hover:bg-[#d0e8f5]">
        Free Consultation
      </Button>
    </header>
  )
}

function ThankYouContent() {
  return (
    <main className="py-16 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Thank You for Your Submission!</h1>
      <p className="text-xl mb-8">
        We appreciate your interest in our hair restoration services. One of our sales representatives will contact you as soon as possible to discuss your needs and schedule your free consultation.
      </p>
      <Link href="/">
        <Button className="bg-[#0063af] hover:bg-[#004d8c] text-white">
          Return to Home Page
        </Button>
      </Link>
    </main>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Miami Office</h2>
          <address className="not-italic">
            <div className="flex justify-center items-center mb-2">
              <MapPin className="mr-2 flex-shrink-0" size={18} />
              <p>
                Av. 323 Sunny Isles Blvd.<br />
                Suite 502, Sunny Isles Beach, FL 33160
              </p>
            </div>
            <div className="flex justify-center items-center">
              <Phone className="mr-2 flex-shrink-0" size={18} />
              <a href="tel:+13058684811" className="hover:underline">+1 (305) 868-4811</a>
            </div>
          </address>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MedicalHair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const [eventFired, setEventFired] = useState(false)

  useEffect(() => {
    // Check if searchParams is not null and has the method
    const formSubmitted = searchParams && searchParams.get 
      ? searchParams.get('submitted') === 'true' 
      : false

    if (formSubmitted && !eventFired) {
      setEventFired(true)
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        const params: FacebookPixelParams = {
          content_name: 'Hair Restoration Consultation',
          status: 'success'
        }
        window.fbq('track', 'CompleteRegistration', params)
      }
    }
  }, [searchParams, eventFired])

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <ThankYouContent />
      </div>
      <Footer />
    </div>
  )
}