/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['randomuser.me', 'cdn-icons-png.flaticon.com', 'lh3.googleusercontent.com', 'cdn.pixabay.com', 'firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig
