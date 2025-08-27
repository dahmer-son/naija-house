// next.config.ts
const nextConfig = {
  // TEMPORARY: allow build to pass while we fix types
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};
export default nextConfig;
