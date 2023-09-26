![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a18f8caac72c44ccb29197298f65809e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

# [原文](https://juejin.cn/post/6905294475539513352)

# src和href的区别
src和href都是用来引用外部的资源，它们的区别如下：

+ `src`： 表示对`资源的引用`，它指向的内容`会嵌入到当前标签所在的位置`。src会将其指向的资源下载并应⽤到⽂档内，如请求js脚本。当浏览器解析到该元素时，会`暂停其他资源的下载和处理，直到将该资源加载、编译、执⾏完毕`，所以⼀般js脚本会放在页面底部。
+ `href`： 表示`超文本引用`，它`指向`一些网络资源，`建立和当前元素或本文档的链接关系`。当浏览器识别到它他指向的⽂件时，就会并⾏下载资源，`不会停⽌对当前⽂档的处理`。 常用在a、link等标签上。

# 对HTML语义化的理解
语义化是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化）。通俗来讲就是用正确的标签做正确的事情。
语义化的优点如下：

+ 对机器友好，带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效信息，有利于SEO。除此之外，语义类还支持读屏软件，根据文章可以自动生成目录；
+ 对开发者友好，使用语义类标签增强了`可读性`，`结构更加清晰`，开发者能清晰的看出网页的结构，便于团队的`开发与维护`。

```html
<!-- 头部 -->
<header></header>  

<!-- 导航栏 -->
<nav></nav>  

<!--  区块（有语义化的div） -->
<section></section> 

<!-- 主要区域 -->
<main></main>  

<!-- 主要内容 -->
<article></article>  

<!-- 侧边栏 -->
<aside></aside>  

<!-- 底部 -->
<footer></footer>  
```

# script标签中defer和async的区别
如果没有defer或async属性，浏览器会立即加载并执行相应的脚本。它不会等待后续加载的文档元素，读取到就会开始加载和执行，这样就阻塞了后续文档的加载。
下图可以直观的看出三者之间的区别:
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0a8a139519f46dfa2d1992c58eb5397~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

其中`蓝色`代表`js脚本网络加载时间`，`红色`代表`js脚本执行时间`，`绿色`代表`html解析`。

`defer` 和 `async`属性都是去`异步加载外部的JS脚本文件`，它们都不会阻塞页面的解析，其区别如下：

+ `执行顺序`： 多个带`async`属性的标签，`不能保证加载的顺序`；多个带`defer`属性的标签，`按照加载顺序执行`；
+ `脚本是否并行执行`：
    - `async`属性，表示后续文档的加载和执行与js脚本的加载和执行是并行进行的，即异步执行；
    - `defer`属性，加载后续文档的过程和js脚本的加载(此时仅加载不执行)是并行进行的(异步)，js脚本需要等到文档所有元素解析完成之后才执行，DOMContentLoaded事件触发执行之前。


# iframe 有那些优点和缺点？
> iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。

## 优点：
+ 用来加载速度较慢的内容（如广告）
+ 可以使脚本可以并行下载
+ 可以实现跨子域通信

## 缺点：
+ iframe 会阻塞主页面的 onload 事件
+ 无法被一些搜索引擎索识别
+ 会产生很多页面，不容易管理

# Canvas和SVG的区别
1. SVG：
>SVG可缩放矢量图形（Scalable Vector Graphics）是基于可扩展标记语言XML描述的2D图形的语言，SVG基于XML就意味着SVG DOM中的每个元素都是可用的，可以为某个元素附加Javascript事件处理器。在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。

其特点如下：
+ 不依赖分辨率
+ 支持事件处理器
+ 最适合带有大型渲染区域的应用程序（比如谷歌地图）
+ 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
+ 不适合游戏应用

2. Canvas：
> Canvas是画布，通过Javascript来绘制2D图形，是逐像素进行渲染的。其位置发生改变，就会重新进行绘制。

其特点如下：
+ 依赖分辨率
+ 不支持事件处理器
+ 弱的文本渲染能力
+ 能够以 .png 或 .jpg 格式保存结果图像
+ 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

> 注：矢量图，也称为面向对象的图像或绘图图像，在数学上定义为一系列由线连接的点。矢量文件中的图形元素称为对象。每个对象都是一个自成一体的实体，它具有颜色、形状、轮廓、大小和屏幕位置等属性。