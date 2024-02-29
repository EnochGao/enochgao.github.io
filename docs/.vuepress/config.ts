import { docsearchPlugin } from '@vuepress/plugin-docsearch';
import { defaultTheme, defineUserConfig } from 'vuepress';
import { commentPlugin } from 'vuepress-plugin-comment2';
import { copyCodePlugin } from 'vuepress-plugin-copy-code2';
import { readingTimePlugin } from 'vuepress-plugin-reading-time2';
import { prismjsPlugin } from '@vuepress/plugin-prismjs';

import { navbar } from './configs/navbar';
import { sidebar } from './configs/sidebar';

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Enoch Blog',
  description: '珍惜眼前，技术并不是生活的全部。',
  base: '/',
  theme: defaultTheme({
    logo: '/images/avatar.png',
    repo: 'https://github.com/EnochGao',
    docsDir: 'docs',
    locales: {
      '/': {
        navbar,
        sidebar,
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        // page meta
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',
        // 404 page
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',
        // a11y
        openInNewWindow: '在新窗口打开',
        toggleColorMode: '切换颜色模式',
        toggleSidebar: '切换侧边栏',
      },
    },
    themePlugins: {
      activeHeaderLinks: true,
      git: true,
      prismjs: true,
      nprogress: true,
      backToTop: true,
      mediumZoom: true,
    },
  }),
  plugins: [
    copyCodePlugin(),
    readingTimePlugin({}),
    commentPlugin({
      provider: 'Giscus',
      repo: 'EnochGao/enochgao.github.io',
      repoId: 'R_kgDOHy84IA',
      category: 'Announcements',
      categoryId: 'DIC_kwDOHy84IM4Cb_5c',
    }),
    docsearchPlugin({
      appId: 'GVP52MKQ3I',
      apiKey: 'e9069e1fc4843517d12e07735a87104b',
      indexName: 'enochgaoio',
    }),
  ],
  alias: {},
});
