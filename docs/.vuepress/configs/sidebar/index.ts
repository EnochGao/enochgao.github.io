import { SidebarConfig } from 'vuepress';

export const sidebar: SidebarConfig = {
  '/angular/directive': [
    {
      text: '指令',
      collapsible: true,
      children: [
        '/angular/directive/ngTemplateOutlet.md',
        '/angular/directive/ngComponentOutlet.md',
        '/angular/directive/ngIf.md',
      ],
    },
  ],
  '/design-patterns': [
    {
      text: '设计模式',
      collapsible: true,
      children: ['/design-patterns/design-principle.md'],
    },
  ],
  '/pagedjs': [
    {
      text: '',
      children: [
        '/pagedjs/big-picture.md',
        '/pagedjs/getting-start.md',
        '/pagedjs/how-pagedjs-works.md',
        '/pagedjs/web-design-print.md',
        '/pagedjs/generated-content.md',
        '/pagedjs/generated-content-in-margin-boxes.md',
      ],
    },
  ],
};
