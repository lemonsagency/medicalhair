import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import FacebookPixel from '@/components/FacebookPixel'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MedicalHair Landing Page',
  description: 'Regain Your Hair in Just One Day – For Life!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <FacebookPixel pixelId="416000848222538" />
      </body>
    </html>
  )
}