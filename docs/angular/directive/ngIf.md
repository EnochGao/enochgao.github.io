---
next:
  text: 下一篇
  link: ./ngComponentOutlet.md
---

# ngIf指令

## 前提

假设你已了解 Angular 框架的基本使用，知晓[指令](https://angular.cn/guide/built-in-directives)等相关概念及作用。

## 功能

`NgIf`根据表达式的值（强转为 boolean）是否为真值，来有条件的包含某个模板。当表达式计算为 true 时，Angular 会渲染 then 子句中提供的模板，当为 false 或 null 时则渲染可选的 else 子句中的模板。else 子句的默认模板是空白模板。

## 用法

通常使用指令的简写形式: `*ngIf="condition"`，作为插入模板的锚点元素的属性提供。
Angular 将其扩展为更明确的版本，其中锚点元素包含在 `<ng-template>` 元素中。

具有简写语法的简单形式:

```html
<div *ngIf="condition">condition为true时内容将被渲染</div>
```

具有扩展语法形式:

```html
<ng-template [ngIf]="condition">
  <div>condition为true时内容将被渲染</div>
</ng-template>
```

带有 else 块的格式:

```html
<div *ngIf="condition; else elseBlock">条件为true时内容将被渲染</div>

<ng-template #elseBlock>condition为false时内容将被渲染</ng-template>
```

带有 then else 块的格式:

```html
<div *ngIf="condition; then thenBlock else elseBlock"></div>
<ng-template #thenBlock>condition为true时内容将被渲染</ng-template>
<ng-template #elseBlock>condition为false时内容将被渲染</ng-template>
```

将值存储为本地变量：

```html
<div *ngIf="condition as value; else elseBlock">{{value}}</div>
<ng-template #elseBlock>value为null时内容被渲染</ng-template>
```

### 简写语法

```html
<div class="hero-list" *ngIf="heroes else loading">...</div>

<ng-template #loading>
  <div>Loading...</div>
</ng-template>
```

等同于

```html
<ng-template [ngIf]="heroes" [ngIfElse]="loading">
  <div class="hero-list">...</div>
</ng-template>

<ng-template #loading>
  <div>Loading...</div>
</ng-template>
```
## 源码分析

源码：

```ts
@Directive({
  selector: '[ngIf]',
  standalone: true,
})
export class NgIf<T = unknown> {
  private _context: NgIfContext<T> = new NgIfContext<T>();
  private _thenTemplateRef: TemplateRef<NgIfContext<T>>|null = null;
  private _elseTemplateRef: TemplateRef<NgIfContext<T>>|null = null;
  private _thenViewRef: EmbeddedViewRef<NgIfContext<T>>|null = null;
  private _elseViewRef: EmbeddedViewRef<NgIfContext<T>>|null = null;

  constructor(private _viewContainer: ViewContainerRef, templateRef: TemplateRef<NgIfContext<T>>) {
    this._thenTemplateRef = templateRef;
  }

  /**
   * The Boolean expression to evaluate as the condition for showing a template.
   */
  @Input()
  set ngIf(condition: T) {
    this._context.$implicit = this._context.ngIf = condition;
    this._updateView();
  }

  /**
   * A template to show if the condition expression evaluates to true.
   */
  @Input()
  set ngIfThen(templateRef: TemplateRef<NgIfContext<T>>|null) {
    assertTemplate('ngIfThen', templateRef);
    this._thenTemplateRef = templateRef;
    this._thenViewRef = null;  // clear previous view if any.
    this._updateView();
  }

  /**
   * A template to show if the condition expression evaluates to false.
   */
  @Input()
  set ngIfElse(templateRef: TemplateRef<NgIfContext<T>>|null) {
    assertTemplate('ngIfElse', templateRef);
    this._elseTemplateRef = templateRef;
    this._elseViewRef = null;  // clear previous view if any.
    this._updateView();
  }

  private _updateView() {
    if (this._context.$implicit) {
      if (!this._thenViewRef) {
        this._viewContainer.clear();
        this._elseViewRef = null;
        if (this._thenTemplateRef) {
          this._thenViewRef =
              this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context);
        }
      }
    } else {
      if (!this._elseViewRef) {
        this._viewContainer.clear();
        this._thenViewRef = null;
        if (this._elseTemplateRef) {
          this._elseViewRef =
              this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context);
        }
      }
    }
  }

  /** @internal */
  public static ngIfUseIfTypeGuard: void;

  /**
   * Assert the correct type of the expression bound to the `ngIf` input within the template.
   *
   * The presence of this static field is a signal to the Ivy template type check compiler that
   * when the `NgIf` structural directive renders its template, the type of the expression bound
   * to `ngIf` should be narrowed in some way. For `NgIf`, the binding expression itself is used to
   * narrow its type, which allows the strictNullChecks feature of TypeScript to work with `NgIf`.
   */
  static ngTemplateGuard_ngIf: 'binding';

  /**
   * Asserts the correct type of the context for the template that `NgIf` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `NgIf` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard<T>(dir: NgIf<T>, ctx: any):
      ctx is NgIfContext<Exclude<T, false|0|''|null|undefined>> {
    return true;
  }
}

/**
 * @publicApi
 */
export class NgIfContext<T = unknown> {
  public $implicit: T = null!;
  public ngIf: T = null!;
}

function assertTemplate(property: string, templateRef: TemplateRef<any>|null): void {
  const isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
  if (!isTemplateRefOrNull) {
    throw new Error(`${property} must be a TemplateRef, but received '${stringify(templateRef)}'.`);
  }
}
```

核心实现部分是47行`_updateView()`方法，主要是使用`ViewContainer`的`createEmbeddedView`方法，将`ng-template`实例传入，进行显示