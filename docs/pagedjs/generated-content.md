# 生成内容

CSS 中的 content 属性是一种强大的向内容添加结构的方法，无需在 HTML 中进行修改

CSS 的一个重要优点是它可以帮助你将文档的样式与内容分开。HTML 和 CSS 的分离使得维护站点、跨页面共享样式表以及在不同环境下显示文档变得更加容易。
在某些情况下，一些元素并不是内容本身的一部分，但有助于在不同环境下阅读。这可以是辅助信息，比如在图表标题前插入单词“Figure”，或者在第七章标题前插入单词“Chapter 7”。

这些通常是使用 CSS 内容属性生成的，这将避免在内容中间添加数字时出现问题，而且如果你想在另一本书中重用这一章节，有了一种新的数字编号方式。

从技术上说，生成的内容只存在于网页文档的布局中：它们不是 DOM 树的一部分。

## 内容属性

`content` 属性用于 `::before` 和 `::after` 伪元素中，在声明中，指定 `content` 属性的值，例如，下面的规则在每个含有 “note”样式类的元素前插入字符串 “Note：”：

```css
.note::before {
  content: 'Note: ';
}
```

你可以在设置元素的地方为它赋予样式，如下所示：

```css
.note::before {
  content: 'Note: ';
  color: red;
  font-weight: bold;
}
```

## 生成文本

你可以直接在 CSS 中声明你的文本(如上)，但你也可以使用 data- 自定义属性中指定的文本。

在你的 HTML 中:

```html
<p class="ref" data-ref-id="0215">Some blabla as a reference</p>
```

在你的 CSS 中:

```css
p.ref::before {
  content: attr(data-ref-id);
}
```

也可以在 content 属性中组合元素：

```css
p.ref::before {
  content: 'Reference ' attr(data-ref-id) ': ';
}
```

一旦显示，您将得到以下文本：

```text
Reference 0215: Some blabla as a reference
```

## 生成计数器

`css-counter` 是一个 CSS 属性，可以对内容中的元素进行计数，
例如，你可能想在每个图片标题前添加一个数字，为此，你需要在 `<body>` 选择器中重置计数器，
每当内容中出现一个标题时就增加计数器，并在 `::before` 伪元素中显示该数字。

```css
body {
  counter-reset: figureNumber;
}

figcaption {
  counter-increment: figureNumber;
}

figcaption::before {
  content: counter(figureNumber);
}
```

## 生成图像

如果你需要在生成的内容中包含图像，可以像这样做：

```css
.glossary::after {
  content: ' ' url('/images/glossary-icon.png');
}
```

## 生成链接

当你想打印你的网页时，它可以用一个长 URL 来显示你内容的实际链接。下面的例子在每个`<a>` 元素后面的括号中插入 `href` 属性的值：

```css
a::after {
  content: ' (' attr(href) ')';
}
```

## 为分页媒体生成内容

即使没有 paged.js，也可以使用生成的内容; `content` 是所有浏览器都实现的 CSS 属性。

但是，要设计一本书(或分页内容)，您需要添加一些元素来帮助读者在页面之间导航:页眉和页脚、页码、目录、索引、交叉引用等。

这些元素不作为内容存在于 HTML 中，您需要自动创建它们。要做到这一点，你可以使用 paged.js 实现的一种语法和属性的组合，即为页面媒体生成内容(Generated Content for page Media)。
