/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'your-repo-name'; // IMPORTANT: Replace with your GitHub repository name

const nextConfig = {
  output: 'export',
  
  // Configure basePath and assetPrefix for GitHub Pages deployment
  // basePath adds a prefix to all paths in the application
  // assetPrefix adds a prefix to all assets (JS, CSS, images, etc.)
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',

  // Optional: Disable image optimization for static export if not using a custom loader
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig; 