import { defineConfig } from 'vitepress';
import { navbar } from './configs/navbar';
import { sidebar } from './configs/sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Enoch Blog',
  description: '珍惜眼前，技术并不是生活的全部...',
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/images/avatar.png',
    nav: navbar,
    sidebar: sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/EnochGao' }],
    search: {
      provider: 'algolia',
      options: {
        appId: 'GVP52MKQ3I',
        apiKey: 'e9069e1fc4843517d12e07735a87104b',
        indexName: 'enochgaoio',
      },
    },
    footer: {
      message: '转载请注明来源',
      copyright: 'Copyright © 2022-present EnochGao',
    },
  },
});
