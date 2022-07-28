/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['randomuser.me', 'cdn-icons-png.flaticon.com'],
  },
}

module.exports = nextConfig
