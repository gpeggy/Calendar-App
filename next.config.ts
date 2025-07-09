import type { NextConfig } from "next";

module.exports = {
  images: {
    remotePatterns: [new URL('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')],
  },
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
