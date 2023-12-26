import { defaultTheme, defineUserConfig } from 'vuepress';
import { backToTopPlugin } from '@vuepress/plugin-back-to-top';
import { nprogressPlugin } from '@vuepress/plugin-nprogress';
import { docsearchPlugin } from '@vuepress/plugin-docsearch';
import { prismjsPlugin } from '@vuepress/plugin-prismjs';
import { commentPlugin } from 'vuepress-plugin-comment2';

import { sidebar } from './configs/sidebar';
import { navbar } from './configs/navbar';

const isProd = process.env.NODE_ENV === 'production';

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'EnochGao的博客',
  description: '活在当下，珍惜眼前。技术并不是生活的全部...',
  base: '/',
  theme: defaultTheme({
    logo: 'https://avatars.githubusercontent.com/u/41459067?v=4',
    repo: 'https://github.com/EnochGao/blog',
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
      // only enable git plugin in production mode
      git: isProd,
      // use shiki plugin in production mode instead
      prismjs: !isProd,
    },
  }),
  plugins: [
    backToTopPlugin(),
    nprogressPlugin(),
    prismjsPlugin(),
    commentPlugin({
      provider: 'Giscus',
      repo: 'EnochGao/enochgao.github.io',
      repoId: 'R_kgDOHy84IA',
      category: 'Announcements',
      categoryId: 'DIC_kwDOHy84IM4Cb_5c',
    }),
  ],
  alias: {},
});
