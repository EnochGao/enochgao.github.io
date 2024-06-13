import { defineConfig } from 'vitepress';
import { navbar } from './configs/navbar';
import { sidebar } from './configs/sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Enoch Blog',
  description: '珍惜眼前，技术并不是生活的全部...',
  lastUpdated: true,
  base: '/',
  head: [['link', { rel: 'icon', href: '/images/avatar.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/images/avatar.png',
    nav: navbar,
    sidebar: sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/EnochGao' }],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
            },
          },
        },
      },
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    outline: {
      label: '页面导航',
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
    footer: {
      message: '转载请注明来源',
      copyright: 'Copyright © 2022-present EnochGao',
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
});
