import { SidebarConfig } from 'vuepress';

export const sidebar: SidebarConfig = {
  '/chore': [
    {
      text: '',
      children: ['/chore/chore.md', '/chore/emoji.md', '/chore/vscode.md','/chore/git.md','/chore/pointing-and-calling'],
    },
  ],
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
        '/pagedjs/supported-feature-of-w3c.md',
        '/pagedjs/specifications-for-printing.md',
        '/pagedjs/named-page.md',
        '/pagedjs/cross-references.md',
        '/pagedjs/handlers.md',
      ],
    },
  ],
  '/weekly-dairy': [
    {
      text: '2024-01',
      collapsible: true,
      children: ['/weekly-dairy/2401/1.md'],
    },
  ],
};
