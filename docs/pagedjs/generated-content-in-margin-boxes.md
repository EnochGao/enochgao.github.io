# 边距框中生成内容

## 页面边距框

页面框由两种类型的区域组成:页面区域和页边距框。

页面区域是页面框的内容区域。它是所有 HTML 内容将流入的空间。当此内容耗尽空间时，将自动创建另一个页面。这就是 paged.js 的 chunker 部分所做的。

页面的边缘被分成 16 个方框，你可以把生成的内容放在这些方框里，比如页码和页头。这些方框被称为`margin boxes`。

每个都有自己的边距、边框、填充和内容区域。默认情况下，它们的大小由页面框的边距决定。

下面的图表代表了 W3C 定义的 16 个边框：

![img](https://pagedjs.org/images/margin-boxes.png)

你可以在 @page 规则中选择这个边距框，规则如`@top-left` ，`@bottom-right-corner` ， `@left-middle` 等。 你可以在页面边距框中添加内容，属性为 `content` 。

下面的代码将标题放在所有右页的`@top-right` 边距框中：

```css
@page: right {
  @top-right {
    content: 'My title';
  }
}
```

页边空白框列表：

```css
@top-left-corner {
}
@top-left {
}
@top-center {
}
@top-right {
}
@top-right-corner {
}
@left-top {
}
@left-middle {
}
@left-bottom {
}
@right-top {
}
@right-middle {
}
@right-bottom {
}
@bottom-left-corner {
}
@bottom-left {
}
@bottom-center {
}
@bottom-right {
}
@bottom-right-corner {
}
```

## 页计数器

为了定义页码，Paged.js 使用了一个 CSS 计数器，它在每个新页面上都会增加。

为了在页面上插入页码或检索文档中的总页数，W3C 提出了一个名为 `page` 的特定计数器。计数器声明必须在 `margin-boxes` 声明中的 `content` 属性中使用。
下面的示例在左下角的方框中声明页码：

```css
@page {
  @bottom-left {
    content: counter(page);
  }
}
```

你也可以在页码前添加一些文本：

```css
@page {
  @bottom-left {
    content: 'page ' counter(page);
  }
}
```

要计算文档的总页数，可以这样写：

```css
@page {
  @bottom-left {
    content: 'Page ' counter(page) ' of ' counter(pages);
  }
}
```

### 重置页计数器

现在，重置页面计数为 1 是唯一可能的情况。请查看 [Issue #31](https://gitlab.coko.foundation/pagedjs/pagedjs/-/issues/91) 以跟踪该情况。

## 命名字符串：传统的页眉页脚

创建页眉页脚最快的方法是使用内容区域中已有的内容。命名字符串用于创建页眉页脚：它们复制文本以便在边距框中重复使用。

首先，所选元素的文本内容使用 `string-set` 和自定义标识符(在下面的代码中，我们称它为“title”，作为变量，你可以给它取任何有意义的名字)克隆到一个命名字符串中。在下面的例子中，每当一个新的 `<h2>` 出现在 HTML 中，命名字符串中的内容就会更新为 `<h2>`中的文本。(如果你喜欢，也可以用类选择器来选择它)。

```css
h2 {
  string-set: title content(text);
}
```

接下来， `string()` 函数通过 `content` 属性将一个命名字符串的值复制到外边距框中。

```css
@page {
  @bottom-center {
    content: string(title);
  }
}
```

`string` 属性的作用类似于变量。它读取 DOM，每次遇到新的 2 级标题时，它都会更改页面上的变量。这个变量会被传递到页面的外边距框中，以及接下来的所有外边距框中，直到有新的标题为止。

![img](https://pagedjs.org/images/string-set.png)
