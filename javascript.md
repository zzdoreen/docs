![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc9240467b46494ca8fdc2d35d9f729e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
# [原文 上](https://juejin.cn/post/6940945178899251230)

# [原文 下](https://juejin.cn/post/6941194115392634888)

# 回调地狱
> 回调函数嵌套回调函数，为了能按顺序执行异步任务 （可读性差

# Promise
> js对象，异步编程的解决方案，是一个构造函数，自身有resolve、reject等方法，原型上有then、catch方法

## 特点
1. 状态只受异步操作的结果影响，不受外界影响。`pending`、`rejected`、`fulfilled`
2. 一旦状态改变，不会再改变。
3. 链式调用

# async/await
> `async` 函数返回一个 `promise` 对象，可以用 `then` 方法添加回调函数。当执行的时候，一旦遇到 `await` 就先返回，等到触发的异步操作完成，再执行函数体后面的语句

## 特点
1. 同步代码编写方式。顺序执行就像写同步代码，符合编码习惯
2. 多个参数传递。
3. 同步代码和异步代码可以一起编写。
4. 对 `promise` 的优化

# BOM

+ `navigator`: 获取浏览器特性，识别客户端
```js
const ua = navigator.userAgent
const isChrome = ua.indexOf('Chrome')
```

+ `screen`: 获取屏幕相关信息 `screen.height` , `screen.width`

+ `location`: 获取网址、协议、path、参数、hash等

+ `history`: 调用浏览器前进、后退功能等

# react render
# flex