// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress';
import { useData, useRoute } from 'vitepress';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import './style.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  },

  setup() {
    // Get frontmatter and route
    const { frontmatter } = useData();
    const route = useRoute();
    // giscus配置
    giscusTalk(
      {
        repo: 'EnochGao/enochgao.github.io', //仓库
        repoId: 'R_kgDOHy84IA', //仓库ID
        category: 'Announcements', // 讨论分类
        categoryId: 'DIC_kwDOHy84IM4Cb_5c', //讨论分类ID
        mapping: 'pathname',
        inputPosition: 'bottom',
        lang: 'zh-CN',
      },
      {
        frontmatter,
        route,
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    );
  },
} satisfies Theme;
