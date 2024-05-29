import{_ as n,o as s,c as a,a as e}from"./app-CnbvU9a-.js";const t="/assets/adapter-CxNyDjm8.png",p={},c=e('<h1 id="适配器模式-adapter-pattern" tabindex="-1"><a class="header-anchor" href="#适配器模式-adapter-pattern" aria-hidden="true">#</a> 适配器模式 Adapter Pattern</h1><h2 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h2><p>将一个接口转换成客户希望的另一个接口，适配器模式使接口不兼容的那些类可以一起工作</p><h2 id="角色" tabindex="-1"><a class="header-anchor" href="#角色" aria-hidden="true">#</a> 角色</h2><ol><li>目标（Target）接口：当前系统业务所期待的接口，它可以是抽象类或接口。</li><li>适配者（Adaptee）类：需要被适配的类。</li><li>适配器（Adapter）类：它是一个转换器，通过继承或引用适配者的对象，把适配者接口转换成目标接口，让客户按目标接口的格式访问适配者</li></ol><h2 id="类图" tabindex="-1"><a class="header-anchor" href="#类图" aria-hidden="true">#</a> 类图</h2><p><img src="'+t+`" alt="类图"></p><h2 id="解释" tabindex="-1"><a class="header-anchor" href="#解释" aria-hidden="true">#</a> 解释</h2><p>类模式：定义期望的抽象（Target）,适配器类（Adapter）实现这个抽象，然后继承需要被适配的类，方法中调用适配者类中的方法。</p><p>对象模式：适配器中含有被适配类的实例引用，然后调用被适配者的方法。</p><h2 id="代码案例" tabindex="-1"><a class="header-anchor" href="#代码案例" aria-hidden="true">#</a> 代码案例</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 目标抽象</span>
<span class="token keyword">interface</span> <span class="token class-name">ITarget</span> <span class="token punctuation">{</span>
  <span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 适配者（Adaptee）类：需要被适配的类</span>
<span class="token keyword">class</span> <span class="token class-name">Adaptee</span> <span class="token punctuation">{</span>
  <span class="token function">specificRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;specificRequest&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//  适配器（Adapter）类</span>
<span class="token keyword">class</span> <span class="token class-name">ClassAdapter</span> <span class="token keyword">extends</span> <span class="token class-name">Adaptee</span> <span class="token keyword">implements</span> <span class="token class-name">ITarget</span> <span class="token punctuation">{</span>
  <span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">specificRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 对象适配器</span>
<span class="token keyword">class</span> <span class="token class-name">ObjectAdapter</span> <span class="token keyword">implements</span> <span class="token class-name">ITarget</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> adaptee<span class="token operator">:</span> Adaptee<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>adaptee<span class="token punctuation">.</span><span class="token function">specificRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// client</span>
<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> target<span class="token operator">:</span> ITarget <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassAdapter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    target<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> targetObj<span class="token operator">:</span> ITarget <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectAdapter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Adaptee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    targetObj<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// specificRequest</span>
<span class="token comment">// specificRequest</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),o=[c];function i(l,u){return s(),a("div",null,o)}const r=n(p,[["render",i],["__file","adapter.html.vue"]]);export{r as default};
