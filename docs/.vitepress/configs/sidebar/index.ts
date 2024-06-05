import { DefaultTheme } from 'vitepress';

export const sidebar: DefaultTheme.Sidebar = {
  chore: [
    {
      text: '杂项',
      collapsed: true,
      items: [
        { text: 'github 中的语言缩写', link: '/chore/chore.md' },
        { text: 'vscode', link: '/chore/vscode.md' },
        { text: 'git 分支规范', link: '/chore/git.md' },
        { text: '指差确认', link: '/chore/pointing-and-calling' },
        { text: '小组学习计划', link: '/chore/plan.md' },
        { text: 'Vue3 快速上手', link: '/chore/vue3.md' },
      ],
    },
  ],
  angular: [
    {
      text: '指令',
      collapsed: false,
      items: [
        {
          text: 'ngTemplateOutlet',
          link: '/angular/directive/ngTemplateOutlet.md',
        },
        {
          text: 'ngComponentOutlet',
          link: '/angular/directive/ngComponentOutlet.md',
        },
        { text: 'ngIf', link: '/angular/directive/ngIf.md' },
      ],
    },
  ],
  pagedjs: [
    {
      text: 'pagedjs',
      collapsed: true,
      items: [
        { text: '总览', link: '/pagedjs/big-picture.md' },
        { text: '开始使用paged.js', link: '/pagedjs/getting-start.md' },
        {
          text: 'paged.js 是如何工作的',
          link: '/pagedjs/how-pagedjs-works.md',
        },
        {
          text: '面向 web 打印的网页设计',
          link: '/pagedjs/web-design-print.md',
        },
        { text: '生成内容', link: '/pagedjs/generated-content.md' },
        {
          text: '边距框中生成内容',
          link: '/pagedjs/generated-content-in-margin-boxes.md',
        },
        {
          text: 'W3C 规范支持的特性',
          link: '/pagedjs/supported-feature-of-w3c.md',
        },
        {
          text: 'W3C 打印规范',
          link: '/pagedjs/specifications-for-printing.md',
        },
        { text: '指定界面', link: '/pagedjs/named-page.md' },
        { text: '交叉引用', link: '/pagedjs/cross-references.md' },
        {
          text: '处理器、钩子和自定义 javascript',
          link: '/pagedjs/handlers.md',
        },
      ],
    },
  ],
  'design-patterns': [
    {
      text: '设计原则',
      collapsed: true,
      link: '/design-patterns/design-principle.md',
    },
    {
      text: '创建型',
      collapsed: true,
      items: [],
    },
    {
      text: '结构型',
      collapsed: true,
      items: [
        {
          text: '装饰器模式',
          link: '/design-patterns/structural/decorator.md',
        },
        { text: '适配器模式', link: '/design-patterns/structural/adapter.md' },
        { text: '桥接模式', link: '/design-patterns/structural/bridge.md' },
        { text: '组合模式', link: '/design-patterns/structural/composite.md' },
      ],
    },
    {
      text: '行为型',
      collapsed: true,
      items: [],
    },
  ],
  'weekly-dairy': [
    {
      text: '2024-01',
      collapsed: true,
      link: '/weekly-dairy/2401/1.md',
    },
  ],
};
