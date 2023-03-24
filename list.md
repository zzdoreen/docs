# Question

## [Object.keys() & for...in 顺序](https://zhuanlan.zhihu.com/p/40601459)

> `Object.keys`在内部会根据属性名`key`的类型进行不同的排序逻辑。分三种情况：

+ 如果属性名的类型是`Number`，那么`Object.keys`返回值是按照`key`从小到大排序 **'1'也算是number**
+ 如果属性名的类型是`String`，那么`Object.keys`返回值是按照属性被创建的时间升序排序。
+ 如果属性名的类型是`Symbol`，那么逻辑同`String`相同

## 解构赋值

> 可以取代 delete xxx

```javascript

const { name,...rest } = { name:'z', age:10, sex:'female' }
// name = 'z' , rest = { age:10, sex:'female' }

const [ item,...rest ] = [ { first:'a' }, 23, 55 ]
// item = { first:'a' } , rest = [ 23, 55 ]

```

## json简写

> `key`和`value`名字一样的时候可以省略`value`

```javascript

let name = 'zz'
let age = 10

let json = { name, age, say(){ console.log('') } }
// => let json = { name:name, age:age, say:function(){ console.log('') }  }

```

## ProTable

### beforeSearchSubmit 搜索前参数的修改

## [docxtemplater 模板语法](https://docxtemplater.com/demo/)

+ 对象

```javascript
// person = {name:'',sex:''}
{#person} {name} {sex} {/person}

```

+ 数组

```javascript
// list = [1,2,3]
{#list}{.}{/list}

// list = [{name:'',sex:''}]
// listFormatterFun: (scope) => {
//    return 'hello ' + scope.age + ' , ' + scope.sex
//  }
{#list}
    {name}
    {sex}
    // 匿名函数插槽
    {listFormatterFun}
{/list}

```

+ 判断

```javascript

{#isTrue}...{/}

```

+ 图片

`base64格式`

```javascript

{%image}

```
