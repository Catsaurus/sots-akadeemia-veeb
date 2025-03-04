/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.sanity.io"],
    },
    experimental: { esmExternals: 'loose' }
};

export default nextConfig;
