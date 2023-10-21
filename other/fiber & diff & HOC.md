[原文](https://mp.weixin.qq.com/s/gaASCIVTuUfsM-cVP2teGw) | [视频](https://www.bilibili.com/video/BV1y94y1v7TL?p=10&vd_source=a56b31fb136d9787929c44f3b4e80c4f)

# fiber架构

> jsx -> babel （转换成虚拟dom） -> render (渲染到页面上，将vDom挂载到真实的dom)


## 为什么需要fiber

vdom -> dom （renderer 渲染器

reconciler diff vdom进行对比更新 （vdom->dom 是同步的过程

在 16 之前，`React` 是直接递归渲染 `vdom` 的，`setState` 会触发重新渲染，对比渲染出的新旧 `vdom`，对差异部分进行 `dom` 操作。

在 16 之后，为了优化性能，会先把 `vdom` 转换成 `fiber`，也就是从`树转换成链表`，然后再渲染。整体渲染流程分成了两个阶段：

+ `render` 阶段：从 `vdom` 转换成 `fiber`，并且对需要 `dom` 操作的节点打上 `effectTag` 的标记

+ `commit` 阶段：对有 `effectTag` 标记的 `fiber` 节点进行 `dom` 操作，并执行所有的 `effect` 副作用函数。

从 `vdom` 转成 `fiber` 的过程叫做 `reconcile`（调和），这个过程是`可以打断`的，由 `scheduler` 调度执行

![](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGia49G3hLkgib7WZRTknfVcHxFVjTaCtiarwdPICicZXgttRTkbEYyuJup25qz6x6A29Phd2m0ltzWzLQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**fiber就是解决同步更新耗时长的问题的**

### 同步更新存在的问题 -> 怎么该进

1. 同步不可中断 -> 异步可中断
2. scheduler 中存在任务优先级

fiber -> [window.requestIdleCallback()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)  解决该方法兼容性问题

> `window.requestIdleCallback(callack,option)` 方法插入一个函数，这个函数将在浏览器空闲时期被调用。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序。

### 解决的问题

1. 新的任务调度，有高优先级任务的时候将浏览器让出来，等浏览器空了在执行
2. 新的数据结构，可以随时中断，下次进来可以接着执行

节点 -> 子节点 -> 子节点 -> 兄弟节点 -> return父节点

# diff算法

`diff` 算法作用在 `reconcile` 阶段：

+ 第一次渲染不需要 `diff`，直接 `vdom` 转 `fiber`。
+ 再次渲染的时候，会产生新的 `vdom`，这时候要和之前的 `fiber` 做下对比，决定怎么产生新的 `fiber`，`对可复用`的节点打上`修改的标记`，剩余的`旧节点`打上`删除标记`，`新节点`打上`新增标记`。


## 那为什么浏览器里要做 diff

> 因为 dom 创建的性能成本很高，如果不做 dom 的复用，那前端框架的性能就太差了。

diff 算法的目的就是对比两次渲染结果，找到可复用的部分，然后剩下的该删除删除，该新增新增。


## 具体实现

![](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGia49G3hLkgib7WZRTknfVcHxQVZNePSrAlibFAPiaqyZJ1Vc9FBF8K6bYHFXvhbFjZrgZZTMl2NjxzbA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

经过 reconcile 之后，会变成这样的 fiber 结构：
![](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGia49G3hLkgib7WZRTknfVcHxVOqy9MaicwQVg5EHOuia4DWPfAwfDHR5omhiaEPvLMgqiclNfDG7JzAkMA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

再次渲染出 vdom 的时候，也要进行 vdom 转 fiber 的 reconcile 阶段，但是要尽量能复用之前的节点。

那怎么复用呢？

一一对比下不就行了？

先把之前的 fiber 节点放到一个 map 里，key 就是节点的 key：
![](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGia49G3hLkgib7WZRTknfVcHxlXT4A3AJ0tLwzyj0A9Z59icYq7t3ghOaQRpAkZf6bVDqiaDWbOdeicd4Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

然后每个新的 vdom 都去这个 map 里查找下有没有可以复用的，找到了的话就移动过来，打上更新的 effectTag：
**( Q: 为什么标记的是更新 A: 不重新创建 dom，但是属性什么的还是要更新 )**
![](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGia49G3hLkgib7WZRTknfVcHxgkuiadXV8hibicEF8WRL6ucwjSz1Pzsk543umgneibB3AKrq3X9ZdQcv7Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这样遍历完 vdom 节点之后，map 里剩下一些，这些是不可复用的，那就删掉，打上删除的 effectTag；如果 vdom 中还有一些没找到复用节点的，就直接创建，打上新增的 effectTag

**核心就是找到可复用的节点，删掉剩下的旧节点，新节点新增。**

# 技术总结

浏览器下使用 `react-dom` 的渲染器，会先把 `vdom` 转成 `fiber`，找到需要更新 `dom` 的部分，打上增删改的 `effectTag` 标记，这个过程叫做 `reconcile`，可以打断，由 `scheducler` 调度执行。`reconcile` 结束之后一次性根据 `effectTag` 更新 `dom`，叫做 `commit`。

这就是 react 的基于 fiber 的渲染流程，分成 `render（reconcile + schedule）`、`commit` 两个阶段。

当渲染完一次，产生了 `fiber` 之后，再次渲染的 `vdom` 要和之前的 `fiber` 对比下，再决定如何产生新的 `fiber`，目标是尽可能复用已有的 `fiber` 节点，这叫做 `diff 算法`。

## 所以 React 的 diff 算法是分成两次遍历的：

+ 第一轮遍历，一一对比 `vdom` 和老的 `fiber`，如果可以复用就处理下一个节点，否则就结束遍历。

    + 如果所有的新的 `vdom` 处理完了，那就把剩下的老 `fiber` 节点删掉就行。

    + 如果还有 `vdom` 没处理，那就进行第二次遍历：

+ 第二轮遍历，把剩下的老 `fiber` 放到 `map` 里，遍历剩下的 `vdom`，从 `map` 里查找，如果找到了，就移动过来。 

    + 第二轮遍历完了之后，把剩余的老 `fiber` 删掉，剩余的 `vdom` 新增。

    + 这样就完成了新的 `fiber` 结构的创建，也就是 `reconcile` 的过程。


# HOC

> 以组件做为入参并且返回一个新的组件

## 使用原因：

1. 抽离重复代码，实现组件复用
2. 条件渲染渲染拦截
3. 拦截组件的生命周期

## 使用场景：

 1. 属性代理 （模拟修改/操作传入的值）
  props
  state  

2. 条件渲染，外部逻辑的封装

3. 反向继承(组件复制类组件)

4. 生命周期的拦截(通过原型链获取生命周期 并绑定this指向)