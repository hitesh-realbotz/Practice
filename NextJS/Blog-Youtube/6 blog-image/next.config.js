/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ["images.unsplash.com"]
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "images.unsplash.com",
            }
        ]
    },
    output: 'export'
}

module.exports = nextConfig
