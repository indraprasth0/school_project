import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {    
    reactCompiler: true,
  },
  images:{
    remotePatterns:[
      {hostname: "images.pexels.com"},
    ]
  },  
};

export default nextConfig;
