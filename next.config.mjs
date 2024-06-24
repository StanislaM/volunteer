/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [{
            source: '/api/:path*',
            destination: 'https://volunteer.stu.cn.ua/api/:path*' // Proxy to Backend
        }]
    }
};

export default nextConfig;
