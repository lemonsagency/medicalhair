/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com', 'rest.gohighlevel.com'],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: '/',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig