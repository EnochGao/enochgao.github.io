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

## string-set 选择内容

这部分在 Paged.js 中暂时不能正常工作，问题 [#45](https://gitlab.coko.foundation/pagedjs/pagedjs/issues/45),[#42](https://gitlab.coko.foundation/pagedjs/pagedjs/issues/42)

文档需要完成

可以指定要选择元素的哪一部分来构造命名字符串的值。此参数是强制的。

- `string-set: <identifier> content(text)` ：元素的字符串值(默认值)
- `string-set: <identifier> content(first-letter)` ：元素的第一个字母(定义在 `::first-letter` 伪元素中)
- `string-set: <identifier> content(after)` ：`::after` 伪元素的字符串值
- `string-set: <identifier> attr(<identifier-attr>)` ：返回由属性标识符( data-attribute ， href ， title ...) 定义的属性的字符串值。

在同一个 `string-set` 中可以定义多个值。

示例:

```css
h2::before {
  content: 'Chapter ' counter(countChapter, upper-roman);
}

h2 {
  string-set: titleBefore content(before), title content(text);
}

@page {
  @bottom-center {
    content: string(titleBefore) '. ' string(title, first);
  }
}
```

## 命名字符串的样式

内容是复制的，因此要对其进行样式化，必须直接在页边距框中应用样式。

例如，如果你想把标题的字体大小设置为 11px：

```css
@page {
  @bottom-center {
    content: string(title);
    text-transform: uppercasse;
    font-size: 11px;
  }
}
```

这就是在 margin box 中“调用”指定字符串时创建的 DOM：

```html
<div class="pagedjs_margin pagedjs_margin-bottom-center hasContent">
  <div class="pagedjs_margin-content">::after</div>
</div>
```

margin 盒子的内容被插入到 `div` 元素的 `::after` 伪元素的 `content` 属性中，该伪元素的类名为 “pagedjs_margin-content”。

你也可以使用这个类和 ::after 伪元素来进行样式。

## 运行元素:包含特定(复杂)内容的页眉/页脚

在某些情况下，`string-set` 并不适合特定或复杂的运行页眉和页脚。例如，如果你需要:

- 要保持 HTML 标签包含在页眉/页脚( `<em>` ， `<span>` ，`<br>`…)
- 在页眉/页脚插入图像或象形图(使用 `<img>` 或 `<svg>` )
- 如果标题太长，要从语义上缩短它(不要使用 `text-overflow: ellipsis`属性，而是用一个片段替换标题)
- 在发票或报告等文件的所有页面上重复复杂的元素(地址、联系方式…)

为此，你可以使用具有 `position` 属性和 `element()` 函数的运行元素。 `position` 属性从正常流中删除元素(而不是像 `string-set` 属性那样复制它)，并使用 `element()` 函数将它移动到外边距框中

这种技术可以让你保留元素的所有 HTML 结构。但你必须在 HTML 中添加专用元素。

在下面的示例中，我们希望保留标题中包含的斜体。

```html
<section id="chapitre-4">
  <h1>The protagonist of <em>Macbeth<em></h1>
  <p><em>Macbeth</em> is a tragedy by William Shakespeare; it is thought to have been first performed in 1606. It dramatises the damaging physical and psychological effects of political ambition on those who seek power for its own sake...</p>
</section>
```

首先，在 HTML 中添加用于运行 title 的专用元素(就在标题之后)，并将标题复制进去。在这里，它是一个带有 `.title` 样式类的段落。

```html
<section id="chapitre-4">
  <h1>The protagonist of <em>Macbeth<em></h1>
  <p class="title">The protagonist of <em>Macbeth<em></p>
  <p><em>Macbeth</em> is a tragedy by William Shakespeare; it is thought to have been first performed in 1606. It dramatises the damaging physical and psychological effects of political ambition on those who seek power for its own sake...</p>
</section>
```

之后，将元素的 `position` 设置为 `running`。在这里，`titleRunning` 是一个自定义标识符，你可以将其命名为对你有意义的任何名称。

```css
.title {
  position: running(titleRunning);
}
```

然后，通过 `content` 属性，用 `element()` 函数将元素放入外边距框中:

```css
@page {
  @top-center {
    content: element(titleRunning);
  }
}
```

`.title` 元素现在从您的文档流中删除，并重复到页面的顶部中心边距框中。它的行为与命名字符串类似，如果在 `DOM` 中遇到一个新的 `.title` 元素，该元素在新页面和下一个页面中都会发生变化。

注意: `element()` 函数不能与 `content` 属性的其他可能值组合使用。

## 设置运行元素的样式

因为复制了元素，所以所有的样式都被复制了，也就是说，如果你对 `.title` 元素进行了样式化，那么样式将被保留在页边距框中。

使用以下代码，你的运行标题将以大写字母和 11px 的大小显示：

```css
.title {
  position: running(titleRunning);
  text-transform: uppercasse;
  font-size: 11px;
}

@page {
  @top-center {
    content: element(titleRunning);
  }
}
```

这是当你把一个正在运行的元素移到边距中时创建的 DOM:

```html
<div class="pagedjs_margin pagedjs_margin-top-center hasContent">
  <div class="pagedjs_margin-content">
    <p class="title">The protagonist of <em>Macbeth<em></p>
  </div>
</div>
```

你可以看到这个段落和它的所有内容一样被保留在页面边距框中。由于层叠样式的存在，你可以在段落或页面边距 n 框中应用样式。

## 选择页面中运行 title/headers 的元素

在一个页面中，一个命名字符串的值或一个正在运行的元素的值可能会改变几次(例如，在同一个页面中有多个相同级别的标题)。你可以在 `string()` 函数或 `element()`函数上添加第二个可选参数，以表示页面中有多个元素时应该使用哪个元素。这个参数指定了命名字符串的值。可以与 `content` 属性的其他可能值结合使用。

- `string(<identifier>, first)`: 使用页面上第一个赋值的值(默认)
- `string(<identifier>, start)`: 使用在页面开头分配的值。如果该元素是页面上的第一个元素，则就是这个元素。如果不是，则它是上一页的元素。
- `string(<identifier>, last)`: 使用页面上最后一个元素的值
- `string(<identifier>, first-except)`: 如果在页面上分配了值，则正在运行的元素不会显示在此页面上，但会显示在下一页上。

前三个参数对于词典或术语表很有用。下面的图显示了根据参数显示的值：

![image.png](https://pagedjs.org/images/string-argument.png)

## 删除空白页中生成的内容

强制分页可以创建空白页，例如，自动添加以确保新章节从所需的左页或右页开始。 :blank 伪类选择器从流中选择没有内容的页面。要删除空白页中生成的内容，只需在空白页的选定边距框中使用 content: none

```css
@page: blank {
  @top-left {
    content: none;
  }
}
```

## 设置外边距框和生成内容的样式

您可以通过将样式直接应用到页边距框的 at 规则中来风格化页边距框。

```css
@page {
  @top-left {
    content: 'My title';
    padding-left: 15mm;
    color: #ff5733;
  }
}
```

## 生成内容的默认对齐方式

每个边距框都有默认的内容对齐方式(如下表所示)。你可以通过在 at 规则中使用 text-align 和 vertical-align 属性来轻松地修改它

| 边距框               | text-align | vertical-align |
| -------------------- | ---------- | -------------- |
| @top-left-corner     | right      | middle         |
| @top-left            | left       | middle         |
| @top-center          | center     | middle         |
| @top-right           | right      | middle         |
| @top-right-corner    | left       | middle         |
| @left-top            | center     | top            |
| @left-middle         | center     | middle         |
| @left-bottom         | center     | bottom         |
| @right-top           | center     | top            |
| @right-middle        | center     | middle         |
| @right-bottom        | center     | bottom         |
| @bottom-left-corner  | right      | middle         |
| @bottom-left         | left       | middle         |
| @bottom-center       | center     | middle         |
| @bottom-right        | right      | middle         |
| @bottom-right-corner | left       | middle         |

## 在生成的内容上应用样式

你可以指定一些 CSS 规则只适用于外边距框，而其他规则适用于生成的内容。这取决于你如何创建生成的内容

### 使用 position:running()

如果你使用了 `position: running` ，应用于生成内容的样式必须声明在运行元素中，应用于页边距框的样式必须声明在 at-rules 的页边距框中。

```css
.running {
  position: running(chapTitle);
  font-size: 12px;
  text-transform: uppercase;
}

@page: left {
  @top-left {
    content: element(chapTitle);
    vertical-align: top;
    padding-top: 24px;
  }
}
```

### 使用 string-set

如果使用，则所有样式都声明在外边距框中，因此应用于外边距框。如果你想要某些规则只应用于文本，而不是整个外边距框，你将不得不使用 paged.js 创建的类来获取文本

例如，如果在页边距框的 at 规则中使用 background-color 和 padding，则样式将应用于边距框

```css
@page: left {
  @top-left {
    background-color: #ffd2b5;
    color: #fe4017;
    padding: 2mm 5mm;
  }
}
```

结果:

![image.png](https://pagedjs.org/images/marginbox-style-01.png)

如果你只想在生成的内容上应用这个背景色和内边距，你需要在 paged.js 创建的一个特殊 div 上应用这个样式:`.pagedjs_margin-content`

```css
.pagedjs_left_page .pagedjs_margin-top-left .pagedjs_margin-content {
  width: auto;
  background-color: #ffd2b5;
  color: #fe4017;
  padding: 2mm 5mm;
}
```

结果：

![image.png](https://pagedjs.org/images/marginbox-style-02.png)

## 定义边距框的宽度和高度

外边距框的高度和宽度由 paged.js 自动计算(参见下面的“外边距框的渲染”)，但是你可以轻松地使用相对值( % )或绝对值( mm ， in ， px )来定义你想要的大小。

```css
@page {
  @left-top {
    width: 28mm;
    height: 10mm;
  }
}
```

## 旋转边距框

通过使用 `transform()` 属性，你可以轻松地旋转文档的边距框

```css
@page {
  @left-top {
    width: 28mm;
    height: 10mm;
    transform: rotate(-90deg);
    transform-origin: top left;
    position: relative;
    top: 28mm;
  }
}
```

结果:

![image.png](https://pagedjs.org/images/marginbox-style-03.png)

## 使用 paged.js 渲染外边距框

paged.js 使用 CSS grid 和 flexbox 来创建页面的外边距框。下图展示了 margin box 是如何与 div 类一起放置的

页面边距框

![image.png](https://pagedjs.org/images/margin-boxes_grid_01.png)

页面由四个角落边距和四组边距组成，放置在一个三列三行的网格上。网格使用 Paged.js 根据你的边距和页面大小声明创建的边距变量来设置项目的大小。

### 网格模板

```css
.pagedjs_pagebox {
  grid-template-columns:
    [left] var(--pagedjs-margin-left)
    [center] calc(
      var(--pagedjs-pagebox-width) - var(--pagedjs-margin-left) - var(--pagedjs-margin-right)
    )
    [right] var(--pagedjs-margin-right);
  grid-template-rows:
    [header] var(--pagedjs-margin-top)
    [page] calc(
      var(--pagedjs-pagebox-height) - var(--pagedjs-margin-top) - var(--pagedjs-margin-bottom)
    )
    [footer] var(--pagedjs-margin-bottom);
}
```

### 角落边距的类别(以及在页面网格中的位置)

- `div.pagedjs_margin-top-left-corner-holder` (grid-column: left / grid-row: header)
- `div.pagedjs_margin-top-right-corner-holder` (grid-column: right / grid-row: header)
- `div.pagedjs_margin-bottom-left-corner-holder` (grid-column: left / grid-row: footer)
- `div.pagedjs_margin-bottom-right-corner-holder` (grid-column: right / grid-row: header)

### 页边距组的类(以及在页面网格上的位置)

- 顶部页边距:`div.pagedjs_margin-top` (grid-column: center / grid-row: header)
- 底部页边距:`div.pagedjs_margin-bottom` (grid-column: center / grid-row: bottom)
- 左边距:`div.pagedjs_margin-left` (grid-column: left / grid-row: page)
- 右边距: `div.pagedjs_margin-right` (grid-column: right / grid-row: page)

## 边距框组

每个页边距组包含三个页边距框，它们包含在一个单向网格中(页顶和页底页边距为水平，页左和页右页边距为垂直)。

![image.png](https://pagedjs.org/images/margin-boxes_grid_02.png)

### Top page margins

- `div.pagedjs_margin-top-left` (A)
- `div.pagedjs_margin-top-center` (B)
- `div.pagedjs_margin-top-right` (C)

### Bottom page margins

- `div.pagedjs_margin-bottom-left` (A)
- `div.pagedjs_margin-bottom-center` (B)
- `div.pagedjs_margin-bottom-right` (C)

### Left page margins

- `div.pagedjs_margin-left-top` (A)
- `div.pagedjs_margin-left-middle` (B)
- `div.pagedjs_margin-left-bottom` (C)

### Right page margins

- `div.pagedjs_margin-right-top` (A)
- `div.pagedjs_margin-right-middle` (B)
- `div.pagedjs_margin-right-bottom` (C)

## 将生成的内容放到边距框中

每个边距框以 `flex` 显示，并包含一个 `div` 元素和 `pagedjs_margin-content` 类，生成的内容将放在其中。
更多细节请参阅上面的两部分:“为命名字符串添加样式”和“为运行元素添加样式”。

## 边距框组的计算规则

如果在样式表中没有设置固定的外边距框大小，每个外边距组的外边距框将根据以下规则自动计算。

- 对于顶部和底部页边距，高度为 margin box 组的 100%
- 对于左右页边距，宽度为 margin box 组的 100%

对于上下页边距宽度和左右页边距高度，计算规则遵循相同的模式。这种模式取决于在组中生成(填充)多少边距——例如，
content 已经在 at 规则中为页边距框设置了

在这里，为了解释这种计算规则模式，我们使用字母对应每组的三个框。"Size"对应于上下页边距的"width"，左右页边距的"height"。

### 如果只生成一个外边距框

如果只生成一个外边距框，外边距框将占据外边距组的全部宽度/高度。

![image.png](https://pagedjs.org/images/margin-boxes_size_sample-01.png)

### 如果生成两个边距框

如果生成 A 和 C

没有设置大小：B 的大小为 0 ，A 和 C 继承 margin 组的大小。它们的大小与生成的内容的长度有关。

![image.png](https://pagedjs.org/images/margin-boxes_size_sample-02.png)

如果只设置一个尺寸(A 或 C)：B 的尺寸为 0。 A 和 C 的尺寸分布在 margin 组的大小上.未设置尺寸的 margin 框填充 margin 组的剩余空间

![image.png](https://pagedjs.org/images/margin-boxes_size_sample-03.png)

对于设置两个大小(A 和 C)：A 对齐 margin 组的左边，C 对齐 margin 组的右边，B 占用剩余空间但没有内容。

![image.png](https://pagedjs.org/images/margin-boxes_size_sample-04.png)

如果 A 和 B 或 B 和 C 产生

没有设置大小：margin-box 的大小将与生成的内容的长度相关，位于中间的将始终位于中间(“中心规则”)，即 A 的大小将始终等于 C 的大小。

![image.png](https://pagedjs.org/images/margin-boxes_size_sample-05.png)

当设置一个尺寸(A,B 或 C)时，其他两个边距框(没有设置尺寸)将扩展剩余空间，“中心规则”仍然有效，因此两个边距框的自动尺寸将根据该规则分配。

![image.png](https://pagedjs.org/images/margin-boxes_size_sample-06.png)

两个大小设置：两个大小设置的 margin box 将具有声明的大小，第三个 margin box(没有内容)将取组中剩余空间的大小

![image.png](https://pagedjs.org/images/margin-boxes_size_sample-07.png)

### 如果所有边距框都生成了

如果没有设置大小：margin-boxes 的大小将与生成的内容的长度相关，位于中间的将始终处于中间(“中心规则”)，即 A 的大小将始终等于 C 的大小。
![image.png](https://pagedjs.org/images/margin-boxes_size_sample-08.png)

如果设置了一个尺寸(A, B 或 C):其他两个边距(没有设置尺寸)将扩展剩余的空间。“中心规则”仍然有效，因此两个边距框的自动大小将根据该规则分配。
![image.png](https://pagedjs.org/images/margin-boxes_size_sample-09.png)

如果设置了两个大小:两个设置了大小的边距框将具有声明的大小。第三个边距框(它没有内容)将占用组中剩余空间的大小。
![image.png](https://pagedjs.org/images/margin-boxes_size_sample-10.png)

如果设置了所有的尺寸:所有的边距框都有声明的尺寸。它们将在顶部/底部页边距的左侧对齐，在顶部为左侧/右侧页边距对齐。
![image.png](https://pagedjs.org/images/margin-boxes_size_sample-11.png)
