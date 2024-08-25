/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, _) => ({
    ...config,
    watchOptions: {
      ...config.watchOptions,
      poll: 800,
      aggregateTimeout: 300,
    },
  }),
  async redirects() {
    return [
      {
        source: '/',
        destination: '/budget',
        permanent: true,
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [ 'budgetwarden.com', "*.budgetwarden.com" ]
    }
  }
};

export default nextConfig;
