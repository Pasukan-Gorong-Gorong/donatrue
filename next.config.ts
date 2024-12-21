/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true // Disable Image Optimization API for static export
  }
}

module.exports = nextConfig
