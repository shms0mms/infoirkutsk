import { NextConfig } from "next"
import "./src/env"

const config: NextConfig = {
  transpilePackages: ["lucide-react"],
  experimental: { reactCompiler: true },
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        pathname: "/a/**"
      },
      {
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**"
      },
      {
        hostname: "cdn.discordapp.com",
        pathname: "/avatars/**"
      },
      {
        hostname: "utfs.io",
        pathname: "/f/*"
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

export default config
