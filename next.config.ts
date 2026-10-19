import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  // Allows production validation alongside the running development server.
  distDir: process.env.PORTFOLIO_DIST_DIR || ".next",
  typescript: {
    // R3F JSX (mesh, planeGeometry, etc.) no extiende JSX.IntrinsicElements en el typecheck de Next
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
