/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "plus.unsplash.com",
        pathname: "/premium_photo-*",
      },
      {
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
