import FacebookPixel from '../components/FacebookPixel'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <FacebookPixel pixelId="YOUR_PIXEL_ID" />
      </body>
    </html>
  )
}