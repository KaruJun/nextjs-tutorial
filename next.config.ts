import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'nextjs-tutorial'; // GitHubリポジトリ名に合わせて変更

const nextConfig: NextConfig = {
  // 静的HTMLエクスポートを有効化
  output: 'export',

  // GitHub Pages用のベースパス設定
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',

  // 画像最適化は静的エクスポートでは使えないので無効化
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
