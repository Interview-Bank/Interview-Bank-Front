/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // webpack: config => {
  //   config.module.rules.push({
  //     test: /\.svg$/i,
  //     issuer: /\.[jt]sx?$/,
  //     use: ["@svgr/webpack"]
  //   });
  //   return config;
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/sitemap.xml",
  //       destination: '/api/seo/sitemap',
  //     },
  //   ];
  // },
  images: {
    domains: ['interviewbank.s3.us-west-2.amazonaws.com'],
  }
}

module.exports = nextConfig
