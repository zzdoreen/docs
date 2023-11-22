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

# let const var 作用域

> 在全局作用域中， `let` 和 `const` 声明的全局变量，存储在了一个块级作用域 `script` 中。 `var` 声明的变量， `function` 声明的函数直接挂载到了`全局对象 (global) 的属性上`

```js
let b = 'let b'
var a = 'var a'
const c = 'const c'
var funA = function () {
    console.log('hello')
}
let funB = function () {
    console.log('world')
}
function fun(){
    console.log('-')
}
//          var a, undefined, undefined, -, hello, Error ... not a function
console.log(this.a, this.b, this.c, this.fun(), this.funA(), this.funB())

// 正常输出，先执行函数 再输出变量
console.log(a, b, c, fun(), funA(), funB())

```
![](https://i.postimg.cc/Njz2qqbh/1699858887446.png)

# let const var 使用场景

> let、const、var 用于声明变量的关键字

1. var：
- 可以声明全局变量和局部变量。
- 变量声明提升，可以在声明之前使用，但是值为 undefined。
- 可以重复声明同一个变量。

2. let：
- 块级作用域的变量声明方式，只在语句块内有效。
- 不允许重复声明同一个变量。
- 不会像 var 一样存在变量声明提升的问题。

3. const：
- 声明一个只读常量，不允许修改。
- 也是块级作用域的方式声明变量，只在语句块内有效。
- 不允许重复声明同一个变量。

总的来说，推荐使用 `const` 和 `let` 声明变量，因为它们的作用域更加明确，可以有效避免变量的问题。
+ `const` 适合声明不需要修改的常量，
+ `let` 则适合一般的变量声明。
+ 而在一些特殊场景下，`var` 也可以用来声明变量。 

    在特定场景下，使用 var 声明变量也是可以的，虽然这种情况很少：

    1. 在`全局作用域`下声明变量，这时候使用 var 会更为方便。

    2. 在`函数`中声明变量时，如果希望变量的`作用域能够扩展到整个函数`，那么使用 var 声明变量就是比较合适的。

    3. 如果需要把`同名变量声明在某个嵌套的作用域内`，同时又不希望它被外部的作用域访问到，那么使用 var 就是比较好的选择。

    > 需要注意的是，在使用 var 的时候，要特别小心变量提升（Hoisting），也就是在变量还没有被声明时就可以使用的问题。
    因此，建议在 JavaScript 中尽量使用 let 或 const 来声明变量，尤其是在块级作用域中声明变量时。


| 区别 | var | let | const |
| ---- | --- | --- | ---- |
| 是否有块级作用域 | × | √ | √ |
| 是否存在变量提升 | √ | × | × |
| 是否添加全局属性 | √ | × | × |
| 能否重复声明变量 | √ | × | × |
| 是否存在暂时性死区 | × | √ | √ |
| 是否必须设置初始值 | × | × | √ |
| 能否改变指针指向 | √ | √ | × |

# 数据类型判断

> 基础数据类型：string、number、boolean、null、undefined、symbol
  引用数据类型：object (function、object、array)

+ `原始数据类型`在内存中是`栈`存储，`引用类型`是`堆`存储
+ 栈（stack）为自动分配的内存空间，它由系统自动释放
+ 堆（heap）则是动态分配的内存，大小不定也不会自动释放
+ 在内存中存储方式的不同导致了原始数据类型不可变
+ 原始数据类型和引用数据类型做赋值操作一个是`传值`一个是`传址`

## typeof

> 用于判断基础数据类型

+ 对于`基础类型`，除 `null` 以外，均可以正确返回
+ 对于`引用类型`，除 `function` 以外，均返回 `object` 

```js
typeof '' // string
typeof 1 // number
typeof Symbol() // symbol
typeof true // boolean
typeof undefined // undefined

typeof null // object ×

typeof [] // object
typeof {} // object
typeof new Function() // function
```

## instanceof

> 用于判断引用数据类型 （判断两个对象是否属于实例关系，`不能判断一个对象实例具体属于哪种类型`
xx.__proto__ => XX.prototype // 最终都指向 null 

eg: `[].__proto__ -> Array.prototype -> Object.prototype -> null`

```js
[] instanceof Array // true
[] instanceof Object // true

{} instanceof Object // true
new Date() instanceof Date // true
new Function() instanceof Function // true
new Function() instanceof Object // true

1 instanceof Number // false
new Number(1) instanceof Number // true
1 == new Number(1)
```

## constructor

> 用于判断引用数据类型，原型对象内包含一个 `constructor` 构造器，指向的是构造函数 `（对 null、undefined 无效）`

```js
let num = 1,str = '',obj = {}

num.__proto__.constructor === Number // true
num.__proto__.constructor === Object // false

str.__proto__.constructor === String // true
obj.__proto__.constructor === Object // true
```

## Object.prototype.toString (最严谨的方法)

> 内置转换方法判断类型

```js
var num = 1
var str = 'abc'
var arr = []
var obj = {}
var nul = null
var unde
var bool = true
var foo = function(){}

Object.prototype.toString() // [object Object]
Object.prototype.toString.call(str) // [object String]
Object.prototype.toString.call(num) // [object Number]
Object.prototype.toString.call(arr) // [object Array]
Object.prototype.toString.call(obj) // [object Object]
Object.prototype.toString.call(nul) // [object Null]
Object.prototype.toString.call(unde) // [object Undefined]
Object.prototype.toString.call(bool) // [object Boolean]
Object.prototype.toString.call(foo) // [object Function]

```