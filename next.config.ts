import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [30, 62, 70, 75],
  },
  serverExternalPackages: ["@prisma/client", "pg", "ws"],
};

export default nextConfig;
