/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['wooahhana-bucket.s3.ap-northeast-2.amazonaws.com'], // S3 버킷 호스트명 추가
  },
};

export default nextConfig;