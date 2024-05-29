# 开始使用paged.js

## 开始Paged.js

paged.js有两种版本: 一种是启动浏览器时自动运行的腻子脚本，还有一种是可以运行的npm模块，或者使用无头浏览器的命令行。所有这些都可以很容易地适应您的需要，选择对你更方便的方式。

### 在web浏览器中使用paged.js作为腻子脚本

为了在你的文档上运行paged.js，你需要准备:

- 要转换成书的html和css文件;
- paged.js脚本(本地或使用CDN链接)
- 一个web服务器，让polyfill访问你的CSS文件;
- 一个web浏览器可以在屏幕上看到神奇效果。

### 获取脚本

要下载polyfill，请访问[https://unpkg.com/pagedjs/dist/](https://unpkg.com/pagedjs/dist/)。从这里，您可以选择 paged.polyfill.js 的最新版本或者老版本。

将脚本复制到一个文件中，并在HTML文件的头部调用它

```html
<script src="js/paged.polyfill.js"></script>
```

如果您愿意，可以使用在[unpkg.com/pagedjs](https://unpkg.com/pagedjs@0.4.3/dist/paged.js)上的托管版本，
您可以通过复制文档以下代码行放置到你html中head标签中来使用它。如果你需要paged.js以前的版本，可以在[unpgk.com/browse/pagedjs](https://unpkg.com/browse/pagedjs@0.4.3/)上查看发行版。请注意右上角的版本选择，以获得旧版本。

```html
<script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>
```

一旦浏览器加载了所有需要显示在屏幕上的 HTML 内容(包括图像、字体文件等)，脚本将开始进行分页，页面也将出现在屏幕上。

### 预览你的工作(界面)

Paged.js 将操纵 DOM，以便浏览器能够理解你编写的 CSS 规则。在屏幕上，页面将从上到下显示在页面的左侧。为了更好地理解页面上发生了什么，我们制作了一个小的 CSS 文件调用接口，定义了在屏幕上显示书本的布局。由于我们使用的是  `@media screen` ，所以打印时页面边框和阴影不会出现在纸上。要下载接口文件，请访问 [gitlab](https://gitlab.coko.foundation/pagedjs/interface-polyfill) 上的仓库，下载  `interface.css`  文件，并在  `<head>`  中将其链接到您的文档中。请检查该文件，因为它已经提供了显示对页、正反面、基线等选项。

```html
<link href="path/to/file/interface.css" rel="stylesheet" type="text/css" />
```

### 从浏览器生成您的第一个 PDF

一旦Paged.js完成工作，你就可以使用浏览器的保存为PDF功能生成PDF文件。

1 单击浏览器的`打印`按钮(它很可能位于 `文件 > 打印` 处，或者在键盘上是`CTRL/CMD + P` )。
2 将`目标`改为`保存为PDF文件`。
3 在更多设置中，由于 Paged.js 没有使用任何这些选项，所以你需要确保以下语句是正确的:

- 边距设置为无
- 页眉页脚设置为不选中
- 背景图形选中

然后，您可以在您喜欢的 PDF 阅读工具中打开 PDF

## 命令行版本

Paged.js 的命令行版本使用无头浏览器(没有任何图形界面的浏览器)生成 PDF。它可以在服务器上运行，以在完全自动化的工作流中启动无头 Chromium.使用命令行版本，您不需要在文档中调用 Paged.js 脚本：它将自动完成。

首先，在你的终端中下载并安装 `pagedjs-cli` (你需要安装 `git`，`node`和 `npm`)：

```bash
npm install -g pagedjs-cli pagedjs
```

然后，在新的终端窗口中，转到文档代码所在的文件夹(使用 `cd` 命令)，并使用以下命令生成 PDF：

```bash
pagedjs-cli index.html -o result.pdf
```

生成 PDF 的一些选项：

```text
-h, --help                  输出使用信息
-V, --version               输出版本号
-i, --inputs [inputs]       输入
-o, --output [output]       输出
-d, --debug                 展示 Electron 窗方便调试
-l, --landscape             横向打印
-s, --page-size [size]      打印的页面大小 [size]
-w, --width [size]          打印的页面宽度 [width]
-h --height [size]          打印的页面高度 [weight]
-m, --page-margin [margin]  打印的编剧 [margin]
-n, --hyphenate [lang]      语言连字符[language], 默认为 "en-us"
-hi, --hypher_ignore [str]  被忽略的元素选择器,例如 ".class_to_ignore, h1"
-ho, --hypher_only [str]    O只能使用连字符连接传递的元素选择器, 例如 ".hyphenate, aside"
-e, --encoding [type]       设置输入html文件的编码, 默认为 "utf-8"
-t, --timeout [ms]          设置最大超时时间 [ms]
```
