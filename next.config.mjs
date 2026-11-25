import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// next.config.mjs
const nextConfig = {
    images: {
      domains: ['images.pexels.com'],
    },
  };
  
  export default nextConfig;