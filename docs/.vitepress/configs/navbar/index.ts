import { DefaultTheme } from 'vitepress';

export const navbar: DefaultTheme.NavItem[] = [
  {
    text: '杂项',
    link: '/chore/chore.md',
  },
  {
    text: '源码解析',
    items: [
      {
        text: 'Angular',
        link: '/angular/directive/ngTemplateOutlet.md',
      },
    ],
  },
  {
    text: '翻译',
    items: [
      {
        text: 'pagedjs',
        link: '/pagedjs/big-picture.md',
      },
      {
        text: 'primeng',
        link: 'https://enochgao.github.io/primeng-cn/',
      },
    ],
  },
  {
    text: '视频',
    items: [
      {
        text: 'es5',
        link: 'https://space.bilibili.com/7557420/channel/seriesdetail?sid=2857263',
      },
    ],
  },
  {
    text: '项目',
    items: [
      {
        text: '组件',
        link: 'https://enochgao.github.io/ng-zorro-antd-extension/',
      },
    ],
  },
  {
    text: '设计模式',
    link: '/design-patterns',
  },
  {
    text: '随笔',
    link: '/weekly-dairy',
  },
];
