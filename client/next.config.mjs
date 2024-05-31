/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: false, // Set to true if this is a permanent redirect
            },
        ];
    },
};

export default nextConfig;
