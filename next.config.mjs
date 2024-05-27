/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [{
            source: '/api/:path*',
            destination: 'https://diplomas.medilawvichi.com/:path*' // Proxy to Backend
        }]
    }
};

export default nextConfig;
