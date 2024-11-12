import type { NextConfig } from "next";
const path = require('path');

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')], // 2. sassOptions 옵션 추가
  },
};

export default nextConfig;
