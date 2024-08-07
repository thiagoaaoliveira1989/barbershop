/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'encrypted-tbn0.gstatic.com',
          port: '',
          pathname: '/images/**',
        },
        {
          protocol: 'https',
          hostname: 'utfs.io',
          port: '',
          pathname: '/f/**',
        },
      ],
    },
  };
  
  export default nextConfig;