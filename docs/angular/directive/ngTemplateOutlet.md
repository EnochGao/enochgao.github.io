# ngTemplateOutlet指令

## 前提

假设你已了解Angular框架的基本使用，知晓[指令](https://angular.cn/guide/built-in-directives)等相关概念及作用。

## 功能

`ngTemplateOutlet`：根据一个提前备好的`TemplateRef`插入一个内嵌视图。

## 用法

平常在使用一些第三方库组件的时候，比如[ng-zorro](https://ng.ant.design/docs/introduce/zh)中的[Rate评分](https://ng.ant.design/components/rate/zh)组件，查看api文档时会发现其中`nzCharacter`属性可以传递一个TemplateRef类型值，从而实现用户自定义功能。

| 属性 | 说明 |类型|默认值|
| --- |---| --- | --- |
|[nzCharacter]|自定义字符|`TemplateRef<void>`|`<i nz-icon nzType="star"></i>` |

demo:

![image.png](./images/ngTemplateOutlet-heart.png)

```ts
import { Component } from '@angular/core';

@Component({ selector: 'nz-demo-rate-character',
template: `
    <nz-rate [ngModel]="0" nzAllowHalf [nzCharacter]="characterIcon"></nz-rate>
    <ng-template #characterIcon let-num><i nz-icon nzType="heart"></i></ng-template>
`,
styles: []
})
export class NzDemoRateCharacterComponent {}
```

那他是怎么实现的，为什么传递一个TemplateRef类型模板就会实现自定义，看一下它的[源码](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/rate/rate-item.component.ts)
因为评分列表有多个item，所以`nzCharacter`最终作用到`NzRateItemComponent`组件上：

```html
<div class="ant-rate-star-second" (mouseover)="hoverRate(false); $event.stopPropagation()"
(click)="clickRate(false)">
    <ng-template
      [ngTemplateOutlet]="character || defaultCharacter"
      [ngTemplateOutletContext]="{ $implicit: index }"
    ></ng-template>
</div>

<div class="ant-rate-star-first" (mouseover)="hoverRate(true); $event.stopPropagation()" (click)="clickRate(true)">
    <ng-template
      [ngTemplateOutlet]="character || defaultCharacter"
      [ngTemplateOutletContext]="{ $implicit: index }"
    ></ng-template>
</div>

<ng-template #defaultCharacter>
<i nz-icon nzType="star" nzTheme="fill"></i>
</ng-template>
```

如上所示我们发现`character`属性赋值给了`ngTemplateOutlet`。

综述上层用户自定义的模板（这里的小心心）作为扩展传递给评分组件，组件通过`ngTemplateOutlet`从而实现了用户可定制化功能。

让我们继续剖析`ngTemplateOutlet`是怎么实现的。

## 源码分析（v13.3.x）

其实`ngTemplateOutlet`是一个angular框架的内置结构指令。源码地址[戳](https://github.com/angular/angular/tree/13.3.x/packages/common/src/directives/ng_template_outlet.ts)。

它在common包的directives文件夹中，所以说要想使用这个指令，项目module中必须引入`CommonModule`,当然`CommonModule`还有很多东西，它实现Angular框架的基本功能，包括指令和管道、路由中使用的位置服务、HTTP服务、本地化支持等等，这个以后再进行介绍。（ps:如果你是使用`ng g m xxx`脚手架生成，cli会默认将`CommonModule`导入到xxx.module中，开发时内置组件指令使用报错可以检查一下是否不小心删掉了`CommonModule`这是一个小技巧）。

言归正传，我们看一下`ngTemplateOutlet`的实现，代码不多，直接贴出来方便阅读：

```ts
import {Directive, EmbeddedViewRef, Injector, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef} from '@angular/core';

/**
 * @ngModule CommonModule
 *
 * @description
 *
 * 根据一个提前备好的 TemplateRef 插入一个内嵌视图。
 *
 * 你可以通过设置 [ngTemplateOutletContext] 来给 EmbeddedViewRef 附加一个上下文对象。
 * [ngTemplateOutletContext] 是一个对象，该对象的 key 可在模板中使用 let 语句进行绑定。
 *
 * @usageNotes
 * ```html
 * <ng-container *ngTemplateOutlet="templateRefExp; context: contextExp"></ng-container>
 * ```
 * 在上下文对象中使用 $implicit 这个 key 会把对应的值设置为默认值
 *
 */
@Directive({ selector: '[ngTemplateOutlet]' })
export class NgTemplateOutlet implements OnChanges {
  private _viewRef: EmbeddedViewRef<any> | null = null;

  /**
   * 附加到 {@link EmbeddedViewRef} 的上下文对象。这应该是一个对象，该对象的键名将可以在局部模板中使用 let 声明中进行绑定。
   * 在上下文对象中使用 $implicit 为键名时，将把它作为默认值
   */
  @Input() public ngTemplateOutletContext: Object | null = null;

  /**
   * 一个字符串，用于定义模板引用以及模板的上下文对象
   */
  @Input() public ngTemplateOutlet: TemplateRef<any> | null = null;

  constructor(private _viewContainerRef: ViewContainerRef) { }

  /** @nodoc */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['ngTemplateOutlet']) {
      const viewContainerRef = this._viewContainerRef;

      if (this._viewRef) {
        viewContainerRef.remove(viewContainerRef.indexOf(this._viewRef));
      }

      this._viewRef = this.ngTemplateOutlet ?
        viewContainerRef.createEmbeddedView(this.ngTemplateOutlet, this.ngTemplateOutletContext) :
        null;
    } else if (
      this._viewRef && changes['ngTemplateOutletContext'] && this.ngTemplateOutletContext) {
      this._viewRef.context = this.ngTemplateOutletContext;
    }
  }
}
```

*个人还是觉得angular源码注释做的还是很好(上述注释给翻译了一下)，我们应该养成写注释的好习惯。*

我们发现`NgTemplateOutlet`类实现了`OnChanges`钩子函数，目的是当@Input属性值发生改变时能够进行创建新的视图。它有两个输入属性:`ngTemplateOutlet`和`ngTemplateOutletContext`。`ngTemplateOutlet`就是TemplateRef类型的模板片段，`ngTemplateOutletContext`是一个的对象，他来给 `EmbeddedViewRef`(内嵌式视图，也就是自定义的ng-template) 附加一个上下文，该对象的 key 可在模板中使用 let 语句进行绑定。

例如刚才的评分组件，如果`[ngTemplateOutletContext]="{ $implicit: index ;a:1}"`就可以将index的值，a=1传递给上层的`<ng-template>`

```html
<ng-template let-num let-xxx="a">{{num}}{{xxx}}</ng-template>
```

用let定义两个变量分别是num和xxx，这将会获得num(实际组件内部的index)和xxx(实际a的值也就是1)的值。这么做的好处是，组件内部状态可以传递出去，让上层获取到想要的数据。

这里有个小技巧，`$implicit`作为默认key，模板中用let-num定义变量时默认取`$implicit`对应的值，其他key值需要被赋值：let-xxx='a'。

## 实现逻辑

本质使用`ViewContainerRef`里的`createEmbeddedView()`方法创建内嵌式视图。`ViewContainerRef`不仅是创建内嵌式视图，还可以用来创建组件。后续会介绍`ViewContainerRef`。

代码逻辑：

1. 如果ngTemplateOutlet有输入
2. 先判断当前容器内有没有视图（_viewRef），如果有先清空视图容器
3. 调用`createEmbeddedView()`创建内嵌式视图
4. 如果当前视图容器不为空且ngTemplateOutletContext有输入，则给创建的视图（_viewRef）添加上下文

## 简写形式

```html
<ng-container *ngTemplateOutlet="temp;context:context;"></ng-container>
这是ng的简写形式，最终由编译器解开等同于下面的格式
```

```html
<ng-container [ngTemplateOutlet]="temp" [ngTemplateOutletContext]="context"></ng-container>
```

```ts
// 使用简写形式确保都是以ngTemplateOutlet开头
@Directive({ selector: '[ngTemplateOutlet]' })
@Input() public ngTemplateOutlet: TemplateRef<any> | null = null;
@Input() public ngTemplateOutletContext: Object | null = null;
```

## 思维扩展

可以用投影的方式实现组件扩展，类似于：

```html
<a-component>
  <ng-template>hi,Enoch Gao!</ng-template>
</a-component>
```

a-component内部通过@ContentChild注解获取TemplateRef也是一种比较常见扩展实现方式。

TemplateRef的获取方式有多种方式：

1. 可以通过@ViewChild@ViewChildren@ContentChild@ContentChildren查询的方式
2. 也可以`<ng-template #temp>`定义变量的形式
3. 还可以自定义指令

```html
<ng-template appCustomDir>我是扩展内容</ng-template>
```

通过appCustomDir指令构造函数中注入`constructor(private temp:TemplateRef){}`获取到TemplateRef
4. ...

万变不离其宗，只要我们获取到了TemplateRef就可以实现扩展。

## 总结

通过内置指令`ngTemplateOutlet`可以实现组件定制化功能，在我们写通用组件的时候可提高组件的规范化，定制化能力。
