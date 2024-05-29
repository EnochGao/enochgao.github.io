import{_ as n,o as s,c as a,a as t}from"./app-CnbvU9a-.js";const e="/assets/decorator-DyM_T-t9.png",p={},o=t('<h1 id="装饰器模式-decorator-pattern" tabindex="-1"><a class="header-anchor" href="#装饰器模式-decorator-pattern" aria-hidden="true">#</a> 装饰器模式 Decorator Pattern</h1><h2 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h2><p>装饰器（Decorator）模式的定义: 指在不改变现有对象结构的情况下，动态地给该对象增加一些职责（即增加其额外功能）的模式，它属于对象结构型模式。</p><h2 id="角色" tabindex="-1"><a class="header-anchor" href="#角色" aria-hidden="true">#</a> 角色</h2><ol><li>抽象构件（Component）角色：定义一个抽象接口以规范准备接收附加责任的对象。类图中的<code>IComponent</code></li><li>具体构件（ConcreteComponent）角色(被装饰的类)：实现抽象构件，通过装饰角色为其添加一些职责。类图中的<code>ConcreteComponent</code></li><li>抽象装饰（Decorator）角色：继承抽象构件，并包含具体构件的实例，可以通过其子类扩展具体构件的功能。类图中的<code>Decorator</code></li><li>具体装饰（ConcreteDecorator）角色(具体装饰器/包装类)：实现抽象装饰的相关方法，并给具体构件对象添加附加的责任。类图中的<code>ConcreteDecoratorA</code> <code>ConcreteDecoratorB</code></li></ol><h2 id="类图" tabindex="-1"><a class="header-anchor" href="#类图" aria-hidden="true">#</a> 类图</h2><p><img src="'+e+`" alt="类图"></p><h2 id="解释" tabindex="-1"><a class="header-anchor" href="#解释" aria-hidden="true">#</a> 解释</h2><p>向一个现有的对象/类中添加新的功能，同时又不改变现有对象/类,首先我们要找到被装饰的类，建立抽象，然后建立装饰类的抽象并要符合被装饰类的结构，另外装饰器类的抽象要保存被装饰类的实例引用，方法要调用被包住的对象的方法。</p><h2 id="代码案例" tabindex="-1"><a class="header-anchor" href="#代码案例" aria-hidden="true">#</a> 代码案例</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 抽象构件</span>
<span class="token keyword">interface</span> <span class="token class-name">IComponent</span> <span class="token punctuation">{</span>
  <span class="token function">operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//具体构件角色</span>
<span class="token keyword">class</span> <span class="token class-name">ConcreteComponent</span> <span class="token keyword">implements</span> <span class="token class-name">IComponent</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;创建具体构件角色&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;调用具体构件角色的方法operation()&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 抽象装饰角色</span>
<span class="token keyword">class</span> <span class="token class-name">Decorator</span> <span class="token keyword">implements</span> <span class="token class-name">IComponent</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> component<span class="token operator">:</span> IComponent<span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>component<span class="token operator">:</span> IComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>component <span class="token operator">=</span> component<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>component<span class="token punctuation">.</span><span class="token function">operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//具体装饰角色A</span>
<span class="token keyword">class</span> <span class="token class-name">ConcreteDecoratorA</span> <span class="token keyword">extends</span> <span class="token class-name">Decorator</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>component<span class="token operator">:</span> IComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>component<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  override <span class="token function">operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addedFunctionA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">addedFunctionA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;为具体构件角色增加额外的功能 addedFunctionA()&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//具体装饰角色B</span>
<span class="token keyword">class</span> <span class="token class-name">ConcreteDecoratorB</span> <span class="token keyword">extends</span> <span class="token class-name">Decorator</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>component<span class="token operator">:</span> IComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>component<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  override <span class="token function">operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addedFunctionB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">addedFunctionB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;为具体构件角色增加额外的功能 addedFunctionB()&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// client</span>
<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> c<span class="token operator">:</span> IComponent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> da<span class="token operator">:</span> IComponent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteDecoratorA</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> db<span class="token operator">:</span> IComponent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteDecoratorB</span><span class="token punctuation">(</span>da<span class="token punctuation">)</span><span class="token punctuation">;</span>
    db<span class="token punctuation">.</span><span class="token function">operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 创建具体构件角色</span>
<span class="token comment">// 调用具体构件角色的方法operation()</span>
<span class="token comment">// 为具体构件角色增加额外的功能 addedFunctionA()</span>
<span class="token comment">// 为具体构件角色增加额外的功能 addedFunctionB()</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),c=[o];function i(l,u){return s(),a("div",null,c)}const r=n(p,[["render",i],["__file","decorator.html.vue"]]);export{r as default};
