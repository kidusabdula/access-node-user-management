import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: 'postgresql://postgres:1015@localhost:5432/access-node-db',
  },
};

export default nextConfig;
