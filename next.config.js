/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // experimental: { esmExternals: true },
  // webpack: config => {
  //   config.module.rules.push({
  //     test: /\.svg$/i,
  //     issuer: /\.[jt]sx?$/,
  //     use: ["@svgr/webpack"]
  //   });
  //   return config;
  // },
  images: {
    domains: ['interviewbank.s3.us-west-2.amazonaws.com'],
  }
}

module.exports = nextConfig
