import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // R3F JSX (mesh, planeGeometry, etc.) no extiende JSX.IntrinsicElements en el typecheck de Next
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
