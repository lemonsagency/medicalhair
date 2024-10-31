'use client'

import { Suspense } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

function NotFoundContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-black text-white p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">Page Not Found</h1>
        <p className="text-xl text-gray-400">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button className="bg-[#0063af] hover:bg-[#004d8c] text-white mt-4">
            Return to Home Page
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function NotFoundPage() {
  return (
    <Suspense fallback={<NotFoundContent />}>
      <NotFoundContent />
    </Suspense>
  )
}