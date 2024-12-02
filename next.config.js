/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.data.gov.sg'],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/weather',
        destination: 'https://api.data.gov.sg/v1/environment/4-day-weather-forecast',
      },
    ];
  },
  onError(error, req, res) {
    console.error('Application error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  },
  webpack: (config, { isServer, dev }) => {
    if (!dev && !isServer) {
      config.devtool = 'source-map';
    }
    return config;
  },
}

module.exports = nextConfig 