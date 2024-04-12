# paged.js 是如何工作的

如果你曾经尝试过用 HTML 设计一个网站以供打印或出版一本图书，你就会体验到在屏幕上显示滚动文本的样式限制，Paged.js 可以帮助你在浏览器中生成分页的材料。

![img](https://pagedjs.org/images/flux-page.png)

Paged.js 由三个模块组成，每个模块都有非常明确的任务：

- chunker 将内容分成独立的页面
- polisher 将 CSS 声明转换为浏览器可以理解的格式；
- previewer 会在浏览器中为你的图书创建预览。

要开始使用 paged.js，你所要做的就是编写标准化的 CSS 声明并调用脚本。该库将通过将它们转换为浏览器原生支持的 CSS 样式或用 JavaScript 实现替换它们来解释这些声明。

## chunker 分割内容

分块器(chunker)将所有已渲染的内容和应用于它的所有设计规则，将尽可能多的内容放在第一个盒子中，并寻找溢出的内容。

之后，脚本创建一个新的盒子，将尽可能多的溢出内容放入其中，寻找下一个溢出内容，如此反复，直到没有内容可以放入框中。Paged.js 会重复这个操作，直到完成。

![img](https://pagedjs.org/images/chuncker-2.png)

为此，我们使用强大的 CSS columns 属性:每个页面都是一列。这样我们就可以方便地访问一些已经在浏览器中实现的属性，例如 column-breaks、element()或 widows 和 orphan。

PS.这并不妨碍你在内容中使用 CSS 的 column 属性

因为每个页面上的内容是固定的，所以当 HTML 或 CSS 发生变化时，你需要刷新页面来重复这个过程。

我们将看到，通过使用页面主布局改变页面之间的边距，可以控制分页和改变内容区域的大小。

## Polisher：填充打印声明

Polisher 是 Paged.js 的一部分，它为每个页面翻译 CSS 规则。它构建新的盒子来创建页面布局，并将内容放置在这些页面中。我们使用 css-tree 这个库从文本中解析 CSS，并用类替换 @page 规则。Polisher 还用 DOM 变量替换了诸如运行标题、页面计数器或 CSS 生成的内容函数的调用。

![img](https://pagedjs.org/images/div-pages.png)

让我们以下面的 CSS 为例：

```css
@page {
  size: 148mm 210mm;
  margin-top: 10mm;
  margin-right: 20mm;
  margin-bottom: 25mm;
  margin-left: 15mm;

  @bottom-left {
    content: counter(page);
  }

  @bottom-center {
    content: string(title);
    text-transform: uppercase;
  }

}

h1#title {
  <!-- "Moby Dick" -->
  string-set: title content(text);
}
```

Paged.js 将这些转换为浏览器可以理解的 CSS：

```css
.pagedjs_page {
  --pagedjs-string-title: 'Moby Dick';
  margin-top: 10mm;
  margin-right: 20mm;
  margin-bottom: 25mm;
  margin-left: 15mm;
}

.pagedjs_page .pagedjs_margin-bottom-left::after {
  content: string(title);
}

.pagedjs_page .pagedjs_margin-bottom-center::after {
  content: var(--pagedjs-string-title);
  text-transform: uppercase;
}
```

这将应用于转换后的 DOM(这是 Paged.js 生成的简化版本)：

```html
<div id="page-1" class="pagedjs_page">
 <div class="pagedjs_pagebox">
     <div class="pagedjs_margin pagedjs_margin-bottom-left hasContent">
    <div class="pagedjs_margin-content">
          <!-- ::after -->
        </div>
   </div>
      <div class="pagedjs_margin pagedjs_margin-bottom-center hasContent">
    <div class="pagedjs_margin-content">
          <!-- ::after -->
        </div>
   </div>
    </div>
  <div class="pagedjs_area">
   <!-- content of the page -->
  </div>
 </div>
</div>
```

在本文档中，我们将指定我们实现的 CSS 属性和我们使用的属性，以便浏览器能够解释它们。

## Previewer: 渲染分页的文档

Paged.js 的预览器加载模块，使用 polisher 和 chunker 布局内容，在浏览器中构建文档的预览，这样你就能准确地看到内容的外观，然后相应地调整内容。

在幕后，Paged.js 通过添加一些 HTML 元素来修改 DOM 结构，构建并渲染你的布局。这些修改是在渲染期间进行的，原始的 HTML 文档没有修改。

它还为每个节点添加了引用(例如，它添加了类来区分右边或左边页面)，这使我们能够完全控制页面布局，而不需要任何 hack。

这个文档将为每个 CSS 属性指定构建和渲染书籍所需的 DOM 修改，如果你想进一步使用 Paged.js 并添加自己的函数，你也可以在 Javascript 中直接使用这些元素的类来访问它们。
