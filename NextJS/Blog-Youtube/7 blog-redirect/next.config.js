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
    redirects: async()=>{
        return [
            {
                source: '/user',
                destination: '/',
                permanent: false
            },
            {
                source: '/user/:userId',
                destination: '/',
                permanent: false
            },
        ]
    }
    // output: 'export' //For static html generation
}

module.exports = nextConfig
