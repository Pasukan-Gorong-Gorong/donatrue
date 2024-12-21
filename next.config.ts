import { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
      // more patterns go here
      // https://regex101.com/library/mW5sD
    ],
    unoptimized: true // Disable Image Optimization API for static export
  }
}

export default nextConfig
