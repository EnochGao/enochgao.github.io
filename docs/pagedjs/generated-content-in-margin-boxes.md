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

## 传统的行头/尾命名
