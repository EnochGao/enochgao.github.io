import { NavbarConfig } from 'vuepress';

export const navbar: NavbarConfig = [
  {
    text: '杂项',
    link: '/chore/chore.md',
  },
  {
    text: '源码解析',
    children: [
      {
        text: 'Angular',
        link: '/angular/directive/ngTemplateOutlet.md',
      },
    ],
  },
  {
    text: '翻译',
    children: [
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
    children: [
      {
        text: 'es5',
        link: 'https://space.bilibili.com/7557420/channel/seriesdetail?sid=2857263',
      },
    ],
  },
  {
    text: '设计模式',
    link: '/design-patterns',
  },
  {
    text: '周记',
    link: '/weekly-dairy',
  },
];
