![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64931630a728403bb0caa99f86f5f662~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
# [原文](https://juejin.cn/post/6905539198107942919)

# CSS选择器及优先级

|   选择器  |   格式    |   优先级权重  |
|----|----|----|
|id选择器|#id|100|
|类选择器|.classname|10|
|属性选择器|a[ref='aaa']|10|
|伪类选择器|li:last-child|10|
|标签选择器|div|1|
|伪元素选择器|li::after|1|
|相邻兄弟选择器|h1+p|0|
|子选择器|ul>li|0|
|后代选择器|li a|0|
|通配符|*|0|

对于选择器优先级：
+ 标签选择器、伪元素选择器：1
+ 类选择器、伪类选择器、属性选择器：10
+ id 选择器：100
+ 内联样式：1000

注意事项：
+ `!important`声明的样式的优先级最高
+ 如果优先级相同，则最后出现的样式生效
+ `继承`得到的样式的优先级最`低`
+ 通用选择器（*）、子选择器（>）和相邻同胞选择器（+）并不在这四个等级中，所以它们的权值都为 0
+ 样式表的来源不同时，优先级顺序为：`内联样式` > `内部样式` > `外部样式` > `浏览器用户自定义样式` > `浏览器默认样式`

> 伪元素：在内容`元素的前后插入额外的元素或样式`，但是这些元素实际上并`不在文档中生成`。它们`只在外部显示可见`，但不会在文档的源代码中找到它们，因此，称为“伪”元素

> 伪类：将特殊的效果添加到特定选择器上。`它是已有元素上添加类别的，不会产生新的元素`

# CSS中可继承与不可继承属性有哪些

## 无继承性的属性

1. display：规定元素应该生成的框的类型

2. 文本属性：
    + vertical-align：垂直文本对齐
    + text-decoration：规定添加到文本的装饰
    + text-shadow：文本阴影效果
    + white-space：空白符的处理
    + unicode-bidi：设置文本的方向

3. 盒子模型的属性：width、height、margin、border、padding

4. 背景属性：background、background-color、background-image、background-repeat、background-position、background-attachment

5. 定位属性：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index

6. 生成内容属性：content、counter-reset、counter-increment

7. 轮廓样式属性：outline-style、outline-width、outline-color、outline

8. 页面样式属性：size、page-break-before、page-break-after

9. 声音样式属性：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

## 有继承性的属性

1. 字体系列属性
    + font-family：字体系列
    + font-weight：字体的粗细
    + font-size：字体的大小
    + font-style：字体的风格

2. 文本系列属性
    + text-indent：文本缩进
    + text-align：文本水平对齐
    + line-height：行高
    + word-spacing：单词之间的间距
    + letter-spacing：中文或者字母之间的间距
    + text-transform：控制文本大小写（就是uppercase、lowercase、capitalize这三个）
    + color：文本颜色

3. 元素可见性
    + visibility：控制元素显示隐藏

4. 列表布局属性
    + list-style：列表风格，包括list-style-type、list-style-image等

5. 光标属性
    + cursor：光标显示为何种形态

# display的属性值及其作用
|属性值|作用|
|----|----|
|none|元素不显示，并且会从文档流中移除。|
|block|块类型。默认宽度为父元素宽度，可设置宽高，换行显示。|
|inline|行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。|
|inline-block|默认宽度为内容宽度，可以设置宽高，同行显示。|
|list-item|像块类型元素一样显示，并添加样式列表标记。|
|table|此元素会作为块级表格来显示。|
|inherit|规定应该从父元素继承display属性的值。|

# link和@import的区别
两者都是外部引用CSS的方式，它们的区别如下：

+ `link`是`XHTML标签`，除了加载CSS外，还可以定义RSS等其他事务；`@import`属于`CSS`范畴，只能加载CSS。
+ `link`引用CSS时，在页面载入时`同时加载`；`@import`需要页面网页`完全载入以后加载`。
+ `link`是XHTML标签，`无兼容问题`；`@import`是在CSS2.1提出的，`低版本的浏览器不支持`。
+ `link`支持使用`Javascript控制DOM去改变样式`；而`@import不支持`。


# CSS 优化和提高性能的方法有哪些？

## 加载性能：
  1. css压缩：将写好的css进行打包压缩，可以减小文件体积。
  2. css单一样式：当需要下边距和左边距的时候，很多时候会选择使用 margin:top 0 bottom 0；但margin-bottom:bottom;margin-left:left;执行效率会更高。
  3. 减少使用@import，建议使用link，因为后者在页面加载时一起加载，前者是等待页面加载完成之后再进行加载。

## 选择器性能：
  1. 关键选择器（key selector）。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）。CSS选择符是从右到左进行匹配的。当使用后代选择器的时候，浏览器会遍历所有子元素来确定是否是指定的元素等等；
  2. 如果规则拥有ID选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）。
  3. 避免使用通配规则，如*{}计算次数惊人，只对需要用到的元素进行选择。
  4. 尽量少的去对标签进行选择，而是用class。
  5. 尽量少的去使用后代选择器，降低选择器的权重值。后代选择器的开销是最高的，尽量将选择器的深度降到最低，最高不要超过三层，更多的使用类来关联每一个标签元素。
  6. 了解哪些属性是可以通过继承而来的，然后避免对这些属性重复指定规则。

## 渲染性能：
  1. 慎重使用高性能属性：浮动、定位。
  2. 尽量减少页面重排、重绘。
  3. 去除空规则：｛｝。空规则的产生原因一般来说是为了预留样式。去除这些空规则无疑能减少css文档体积。
  4. 属性值为 0 时，不加单位。
  5. 属性值为浮动小数0.**，可以省略小数点之前的0。
  6. 标准化各种浏览器前缀：带浏览器前缀的在前。标准属性在后。
  7. 不使用@import前缀，它会影响css的加载速度。
  8. 选择器优化嵌套，尽量避免层级过深。
  9. css雪碧图，同一页面相近部分的小图标，方便使用，减少页面的请求次数，但是同时图片本身会变大，使用时，优劣考虑清楚，再使用。
  10. 正确使用display的属性，由于display的作用，某些样式组合会无效，徒增样式体积的同时也影响解析性能。
  11. 不滥用web字体。对于中文网站来说WebFonts可能很陌生，国外却很流行。web fonts通常体积庞大，而且一些浏览器在下载web fonts时会阻塞页面渲染损伤性能。

## 可维护性、健壮性：
  1. 将具有相同属性的样式抽离出来，整合并通过class在页面中进行使用，提高css的可维护性。
  2. 样式与内容分离：将css代码定义到外部css中。

# CSS预处理器/后处理器是什么？为什么要使用它们？

`预处理器`， 如：less，sass，stylus，用来预编译sass或者less，增加了css代码的复用性。层级，mixin， 变量，循环， 函数等对编写以及开发UI组件都极为方便。

`后处理器`， 如： postCss，通常是在完成的样式表中根据css规范处理css，让其更加有效。目前最常做的是给css属性添加`浏览器私有前缀`，实现`跨浏览器兼容性的问题`。

css预处理器为css增加一些编程特性，无需考虑浏览器的兼容问题，可以在CSS中使用变量，简单的逻辑程序，函数等在编程语言中的一些基本的性能，可以让css更加的简洁，增加适应性以及可读性，可维护性等。

其它css预处理器语言：Sass（Scss）, Less, Stylus, Turbine, Swithch css, CSS Cacheer, DT Css。

## 使用原因：

+ 结构清晰， 便于扩展
+ 可以很方便的屏蔽浏览器私有语法的差异
+ 可以轻松实现多重继承
+ 完美的兼容了CSS代码，可以应用到老项目中

# 为什么需要清除浮动？清除浮动的方式

> 浮动的定义： 非IE浏览器下，容器不设高度且子元素浮动时，容器高度不能被内容撑开。 此时，内容会溢出到容器外面而影响布局。这种现象被称为浮动（溢出）。

## 浮动的工作原理：

+ 浮动元素脱离文档流，不占据空间（引起“高度塌陷”现象）
+ 浮动元素碰到包含它的边框或者其他浮动元素的边框停留

浮动元素可以左右移动，直到遇到另一个浮动元素或者遇到它外边缘的包含框。浮动框不属于文档流中的普通流，当元素浮动之后，不会影响块级元素的布局，只会影响内联元素布局。此时文档流中的普通流就会表现得该浮动框不存在一样的布局模式。当包含框的高度小于浮动框的时候，此时就会出现“高度塌陷”。

## 浮动元素引起的问题？

+ 父元素的高度无法被撑开，影响与父元素同级的元素
+ 与浮动元素同级的非浮动元素会跟随其后
+ 若浮动的元素不是第一个元素，则该元素之前的元素也要浮动，否则会影响页面的显示结构

## 清除浮动的方式如下：

+ 给父级div定义height属性
+ 最后一个浮动元素之后添加一个空的div标签，并添加clear:both样式
+ 包含浮动元素的父级标签添加overflow:hidden或者overflow:auto
+ 使用 :after 伪元素。由于IE6-7不支持 :after，使用 zoom:1

```css
.clearfix:after{
    content: "\200B";
    display: table; 
    height: 0;
    clear: both;
}
.clearfix{
   *zoom: 1;
}
```

# 对BFC的理解，如何创建BFC

+ Box: Box 是 CSS 布局的对象和基本单位，⼀个⻚⾯是由很多个 Box 组成的，这个Box就是我们所说的盒模型。
+ Formatting context：`块级上下⽂格式化`，它是⻚⾯中的⼀块渲染区域，并且有⼀套渲染规则，它决定了其⼦元素将如何定位，以及和其他元素的关系和相互作⽤。

块格式化上下文（Block Formatting Context，BFC）是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。

通俗来讲：BFC是一个`独立的布局环境`，可以理解为一个容器，在这个容器中按照一定规则进行物品摆放，并且不会影响其它环境中的物品。如果一个元素符合触发BFC的条件，则`BFC中的元素布局不受外部影响`。

## 创建BFC的条件：

+ 根元素：body
+ 元素设置浮动：float 除 none 以外的值
+ 元素设置绝对定位：position (absolute、fixed)
+ display 值为：inline-block、table-cell、table-caption、flex等
+ overflow 值为：hidden、auto、scroll

## BFC的特点：

+ 垂直方向上，自上而下排列，和`文档流的排列方式一致`。
+ 在BFC中`上下相邻的两个容器`的`margin`会`重叠`
+ 计算BFC的高度时，需要计算浮动元素的高度
+ BFC区域不会与浮动的容器发生重叠
+ BFC是独立的容器，容器内部元素不会影响外部元素
+ 每个元素的左margin值和容器的左border相接触

## BFC的作用：

+ 解决`margin的重叠`问题：由于BFC是一个独立的区域，内部的元素和外部的元素互不影响，将两个元素变为两个`BFC`，就解决了margin重叠的问题。
+ 解决`高度塌陷`的问题：在对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为0。解决这个问题，只需要把`父元素变成一个BFC`。常用的办法是给父元素设置overflow:hidden。
+ 创建自适应两栏布局：可以用来创建自适应两栏布局：左边的宽度固定，右边的宽度自适应。

```css
.left{
     width: 100px;
     height: 200px;
     background: red;
     float: left;
 }
 .right{
     height: 300px;
     background: blue;
     overflow: hidden;
 }
 
<div class="left"></div>
<div class="right"></div>
```

左侧设置`float:left`，右侧设置`overflow: hidden`。这样右边就触发了BFC，BFC的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠，实现了自适应两栏布局。

# px、em、rem

+ `px`固定像素 无法因为适应页面大小而改变
+ `em`只有设置自身字体大小的时候相对于父元素的字体大小；设置**其他属性的时候是相对于自身字体属性大小设置的** ！！！！！！！！
+ `rem`相对于根元素的字体大小
