import FacebookPixel from '../components/FacebookPixel'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <FacebookPixel pixelId="416000848222538" />
      </body>
    </html>
  )
}