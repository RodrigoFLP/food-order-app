/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdnimg.webstaurantstore.com",
      "dummyimage.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
