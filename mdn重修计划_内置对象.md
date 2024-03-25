# [Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

+ at
+ of
+ copyWithin
+ entries
+ every
+ findIndex
+ findLastIndex
+ flat
+ flatMap
+ from
+ fromAsync
+ reduce
+ reduceRight
+ slice
+ some
+ splice
+ toReversed // 和 `reverse` 方法一样 但是不改变原数组
+ toSorted // 和 `sort` 方法一样 但是不改变原数组
+ toSplice // ...
+ unshift
+ values
+ with(index,value) // => array[index] = value 不改变原数组


# [Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)

+ getDate
+ getDay // 0 - 6  0：星期天
+ getFullYear
+ getHours
+ getMilliseconds
+ getMinutes
+ getMonth // 从0开始
+ getSeconds
+ getTime、valueOf、Date.now() // 毫秒时间戳
+ Date.parse() // 字符串解析为毫秒时间戳
+ toISOString、toJSON // 转换为ISO格式的字符串 YYYY-MM-DDTHH:mm:ss.sssZ
+ toLocaleString // 2024/3/21 10:00:00 
+ toLocaleTimeString // 10:00:00 


# [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

+ size // 属性不是方法
+ clear()
+ delete(key)
+ entries
+ forEach // new Map([...]).forEach((value,key,map)=>{...})
+ get
+ groupBy(items,callbackFn) // 对给定可迭代对象中的元素进行分组 items是待分组数据，回调函数返回key值
+ has
+ keys
+ set(key,value)
+ values


# [Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

+ size
+ clear
+ delete
+ difference // A.difference(B) 返回A有B没有的集合 B多出的不管
+ entries
+ forEach
+ has
+ intersection // A.intersection(B) 返回A有B共有的集合
+ isDisjointFrom // A.isDisjointFrom(B) B内不存在A的任何值 返回 `true` 否则 `false`
+ isSubsetOf // A是否是B的子集
+ keys
+ values


# [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

+ all       // Promise.all([,,,])  => 全兑现返回[,,,]，否则返回第一个错误原因
+ allSettled    // Promise.allSettled([,,]) => 返回所有状态和结果 [{status: rejected,value: xx}, {}]
+ any // 返回所有结果
+ race // 返回先执行完成的结果，不论reject还是resolve


# [Math](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)

+ abs // 绝对值
+ ceil // 向上取整 7.1 => 8
+ floor // 小于等于给定值的最大正数 5.9 => 5 , -5.6 => -6
+ max // Math.max(,,,)
+ min
+ random // [0,1) 浮点数
+ round // 四舍五入


# [Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

+ assign // 改变原始对象 `Object.assign(a,b) === a` `true`，浅拷贝 `Object.assign({},a,b,c)` 
+ create // 以现有对象作为原型，创建一个新对象
+ defineProperties // 对象上定义新的属性或修改现有属性，并返回该对象 `Object.defineProperties(obj, props)` 
    - obj // 在其上定义或修改属性的对象
    - props
        + `value`
        + `writable` // 是否可以通过赋值运算更改

        + `configurable` // 属性是否可以从相应的对象中删除
        + `enumerable` // 在枚举相应对象的属性时应显示出来

        + `get()` // `get` & `set` 成对出现 并且不能和 `value` & `writable` 属性同时出现
        + `set(value)`

```js

const a = {}
let num = 10
Object.defineProperties(a, {
    b: {
        value: 3,
        writable: true,
        configurable: true,
    },
    c: {
        // value: 1,
        // writable: true,
        configurable: true,
        enumerable: true,
        get() {
            return num
        },
        set(v) {
            num = v
        }
    }
})
a.c = 'a'
// delete a.c
console.log(a.c) // 'a'

for(let i in a){
    console.log(i) // c
}
```

+ defineProperty // 对象上定义 <u>***一个***</u> 新属性，或修改其现有属性，并返回此对象。 `Object.defineProperty(obj, prop, descriptor)`

```js

const object1 = {};

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false,
});

object1.property1 = 77;
// Throws an error in strict mode

console.log(object1.property1);
// Expected output: 42

```

+ entries // 返回键值对
+ fromEntries // 将键值对转换为对象 `Object.fromEntries([['name':'doreen']]) -> { name: 'doreen' }` 
+ getOwnPropertyDescriptor(obj, prop) // 返回一个对象，该对象描述给定对象上特定属性的配置 `{ value:0, writable:true, ... }`
+ getOwnPropertyDescriptors // 如上 `{ property1:{ value:1,... } , property2:{} }`
+ getOwnPropertyNames // 对象转数组 按写入顺序排序 ***返回所有属性名*** `Object.getOwnPropertyNames({ a:'-', b:'-' })  ->  ['a','b']`
+ keys // 基本同上 ***只返回可枚举的***
+ values // 返回 ***可枚举*** 的字符串键属性 **值** 组成的数组
+ getOwnPropertySymbols // 返回一个包含给定对象所有自有 `Symbol` 属性的数组
+ getPrototypeOf // 返回指定对象的原型（即内部 `Prototype` 属性的值）
+ hasOwn(obj,prop) // 取代 `obj.hasOwnProperty(prop)`
+ is(value1,value2) // 判断两个值是否相同 类型 符号 长度都得一致


# [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

> Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

`const p = new Proxy(traget,handler)`

+ handler.apply // 拦截 ***函数调用*** 

```js
function getName(name){
    return name
}

const handler = {
    apply: function(target,thisArg,argumentsList){
        return target('zz'+argumentsList[0])
    }
}

const proxy = new Proxy(getName,handler)

getName('doreen') // doreen
proxy('doreen') // zzdoreen

```

+ handler.construct // 拦截 ***new操作符***

```js
function monster1(disposition) {
  this.disposition = disposition;
}

const handler1 = {
  construct(target, args) {
    console.log(`Creating a ${target.name}`);
    // Expected output: "Creating a monster1"

    return new target(...args);
  },
};

const proxy1 = new Proxy(monster1, handler1);

console.log(new proxy1('fierce').disposition);
// Expected output: "fierce"
```

+ handler.defineProperty // 拦截对象的 `Object.defineProperty()` 操作

```js

var p = new Proxy(target, {
  defineProperty: function (target, property, descriptor) {},
});

```

+ handler.deleteProperty // `deleteProperty: function (target, prop) {}`
+ handler.get
+ handler.getOwnPropertyDescriptor
+ handler.getPrototypeOf
+ handler.has
+ handler.isExtensible
+ handler.ownKeys
+ handler.preventExtensions
+ handler.set
+ handler.setPrototypeOf
