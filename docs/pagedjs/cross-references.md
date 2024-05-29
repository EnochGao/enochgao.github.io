# 交叉引用

许多文档包含内部引用，如“参见第 7 章”或“在第 23 页”。引用可能会根据布局而改变(特别是页码)。因此，您可以使用生成的内容来创建它。

你可以使用 content 属性的特定值来自动创建这些类型的交叉引用：target-counter()、target-text()。 它们中的每一个都显示从链接目标中获得的信息。

你可以使用这个 target-counter() 和 target-text() 函数来创建目录和书籍索引(参见下面的部分)。

## 链接目标

对于交叉引用，使用链接来定位文档中的锚点。

首先，在 HTML 中，您在文档中定义了一个具有唯一 id 的相关元素。例如，文档的图 3：

```html
<figure id="figure-3">
  <img src="image.jpg" />
  <p class="caption">Figure 3: an image</p>
</figure>
```

在 HTML 的其他地方，创建一个链接锚，引用相关元素的唯一标识符：

```html
<p>see the <a class="link" href="#figure-3">figure 3</a></p>
```

## Target-counter()

生成的内容被设置到你的 CSS 中。为了找到在文档中出现相关元素的页面，在 content 属性中使用 [target-counter()](https://www.w3.org/TR/css-gcpm-3/#target-counter)函数，该属性被设置为 ::before 或 ::after 伪元素。与所有内容属性一样，它可以包含一些文本：

```css
.link::after {
  content: ', page ' target-counter(attr(href url), page);
}
```

此代码使用名为 link 的样式类获取所有元素，并使用在每个第一个元素的 href 属性中指定的唯一标识符搜索元素。当您的文档被呈现时，它将生成具有唯一标识符的元素所在页面的页码。

使用下面的示例，在文档中生成的文本将是“see the figure 3, page 27”。

你也可以指定一个计数器样式:

```css
.link::after {
  content: target-counter(attr(href url), page, lower-roman);
}
```

目前， target-counter() 函数只对计数器页起作用。这意味着你不能使用其他给定名称的计数器。

## Target-text()

target-text()函数的工作原理与 target-counter()类似，但它取得的是由 URL 指向的元素的文本值。例如，你可以用它来设置章节的标题

在 HTML 中，使用唯一标识符创建章节标题:

```html
<h1 id="chapter-1">Chapter 1. The beginning</h1>
```

在文档的后面创建一个指向本章内容的链接:

```html
<p>
  Some text that refer to the <a class="link" href="#chapter-1">chapter</a>.
</p>
<p></p>
```

在 CSS 中，使用 target-text 来生成交叉引用:

```css
.link::after {
  content: '(see ' target-text(attr(href url)) ')';
}
```

在你的文档中生成的文本将是“Some text that refer to the chapter (see Chapter 1. The beginning).”

W3C 定义了一个可选的第二个参数，用于指定检索什么内容，使用与 string-set 属性相同的值( content ， before ， after ， first-letter )，但尚未在 paged.js 中实现。

## 调试

这些函数只接受指向当前文档中某个位置的片段 URL。如果没有片段，或者引用的 ID 不存在，或者 URL 指向外部文档，那么对于 target-text()，函数什么也不返回;对于 target-counter()，函数返回 0

然而，如果你的文档很长，可能你的目标元素还没有加载，函数也不会返回任何内容或 0 。等待加载完成，生成页码。

如果你的页码看起来错了，可能是因为你的目标元素在几页上被分割了。我们推荐使用简短的元素作为目标(章节标题而不是整个章节部分)。
