/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/budget',
        permanent: true,
      },
    ]
  },
  experimental: {
    serverActions: {
      allowedOrigins: [ 'budgetwarden.com', "*.budgetwarden.com" ]
    }
  }
};

export default nextConfig;
