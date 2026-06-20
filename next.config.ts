import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'media.licdn.com'],
  },
}

export default nextConfig
