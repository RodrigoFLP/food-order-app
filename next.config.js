/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "cdnimg.webstaurantstore.com",
      "dummyimage.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
