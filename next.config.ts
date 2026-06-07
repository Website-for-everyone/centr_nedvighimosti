import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Говорим Next.js собирать проект в статические файлы
  
  // ИСПРАВЛЕНО: Указываем имя твоего репозитория, чтобы пути к медиа не ломались
  basePath: '/centr_nedvighimosti',
  assetPrefix: '/centr_nedvighimosti/',

  images: {
    // ИСПРАВЛЕНО: Отключаем серверную оптимизацию картинок, так как на GitHub Pages нет Node.js сервера
    unoptimized: true,
  },
};

export default nextConfig;
