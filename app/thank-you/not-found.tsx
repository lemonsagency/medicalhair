import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">
        We&apos;re sorry, but the thank you page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/">
        <Button className="bg-[#0063af] hover:bg-[#004d8c] text-white">
          Return to Home Page
        </Button>
      </Link>
    </div>
  )
}