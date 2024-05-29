import { defineConfig } from 'vitepress';
import { navbar } from './configs/navbar';
import { sidebar } from './configs/sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Enoch Blog',
  base: '/',
  description: '珍惜眼前，技术并不是生活的全部...',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: navbar,
    sidebar: sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/EnochGao' }],
  },
});
