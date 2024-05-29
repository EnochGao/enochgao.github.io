# 指定界面

> 如何根据 HTML 内容设置页面布局：命名页面

书中可能有一些页面需要自己的、更具体的布局：不同的背景、不同的边距，甚至与主规则不同的风格。 你可以使用所谓的“命名页面”来定义这些。基于你的 HTML，你可以将特定的布局绑定到任何内容上。
![images](https://pagedjs.org/images/named-pages.png)

假设你想要一个特定的布局，比如你的前言页面。

page 属性用于指定特定的页面类型。使用这个属性，您定义了 frontmatter 类的 所有 section 都有一个名为 frontmatterLayout 的页面模板。请注意，页面类型名称是区分大小写的标识符。

还可以使用相同的页面类型名称创建一个特定的@page 规则，用于创建页面的新属性。

```css
.frontmatter {
  page: frontmatterLayout;
}

@page frontmatterLayout {
  /* specifics rules for the frontmatter*/
}
```

根据该规则，每个 frontmatter 类的元素默认都有一个换页符。对于 frontmatter 类的每个页元素实例，都创建一个页组。

可以将不同的部分绑定到同一个@page 规则。

```css
#half-title,
#copyright,
#table-of-content,
#introduction {
  page: frontmatterLayout;
}
```

## 混合页面选择器和命名页面

您可以混合使用页面选择器和命名页面。

例如，每个章节的首页通常需要特殊处理，您可以为所有章节定义一个布局，并选择每个章节(每个页面组)的首页。

在下面的代码中，选择了每个具有类 chapter 的元素的第一个页面：

```css
.chapter {
  page: chapter;
}

@page chapter:first {
  /* specifics rules for first page of each chapter */
}
```

你也可以选择命名页和页组的 :left 和 :right 页。

:nth() 和 :blank 选择器目前还不能用于命名页面，但你可以使用这个技巧来选择命名页面中的空白页面：

```css
.pagedjs_chapter_page + .pagedjs_blank_page {
  /* specific rules for blank pages of named page called "chapter" */
}
```

## @page 规则的优先级

在 paged.js 中，页面规则并不是完全层叠的。这些规则按以下优先级顺序定义(从优先级最低到优先级最高):

- `@page { }`
- `@page :left { }` 或 `@page :right { }`
- `@page <namedPage> { }`
- `@page <namedPage> :left { }` 或 `@page <namedPage> :right { }`
- `@page :blank { }`
- `@page :first { }`

如果在优先级较低的页面中定义了 CSS 属性，但没有在优先级页面中定义，则优先级页面将继承此属性及其值。否则，属性将采用优先级页面中定义的新值。
