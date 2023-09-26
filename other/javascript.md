![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc9240467b46494ca8fdc2d35d9f729e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
# [原文 上](https://juejin.cn/post/6940945178899251230)

# [原文 下](https://juejin.cn/post/6941194115392634888)

# 组件基础

## React事件机制

```javascript
<div onClick={this.handleClick.bind(this)}>点我</div>
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e969caa9fc647cf8985c4c841a01f60~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

JSX 上写的事件并没有绑定在对应的真实 DOM 上，而是通过事件代理的方式，将所有的事件都统一绑定在了 `document` 上。这样的方式不仅减少了内存消耗，还能在组件**挂载销毁时统一订阅和移除事件**。
另外冒泡到 `document` 上的事件也不是原生浏览器事件，而是 React 自己实现的合成事件（SyntheticEvent）。因此我们如果不想要事件冒泡的话，调用 `event.stopPropagation()` 是无效的，而应该调用 `event.preventDefault()`。

### 实现合成事件的目的如下：

+ 合成事件首先抹平了浏览器之间的**兼容问题**，另外这是一个跨浏览器原生事件包装器，赋予了**跨浏览器开发的能力**；
+ 对于原生浏览器事件来说，浏览器会给监听器创建一个事件对象。如果你有很多的事件监听，那么就需要分配很多的事件对象，造成高额的内存分配问题。但是对于合成事件来说，有一个事件池专门来管理它们的创建和销毁，当事件需要被使用时，就会从池子中复用对象，事件回调结束后，就会销毁事件对象上的属性，从而便于下次**复用**事件对象。 (**统一管理**、**减少内存消耗**)

## React的事件和普通的HTML事件有什么不同

### 区别：

+ 对于事件名称命名方式，原生事件为全小写，react 事件采用小驼峰；
+ 对于事件函数处理语法，原生事件为字符串，react 事件为函数；
+ react 事件不能采用` return false `的方式来阻止浏览器的默认行为，而必须要地明确地调用`preventDefault()`来阻止默认行为。

### 合成事件是 react 模拟原生 DOM 事件所有能力的一个事件对象，其优点如下：

+ **兼容**所有浏览器，更好的跨平台；
+ 将事件统一存放在一个数组，**避免频繁的新增与删除**（垃圾回收）。
+ 方便 react **统一管理和事务机制**。

> 事件的执行顺序为原生事件先执行，合成事件后执行，合成事件会冒泡绑定到 document 上，所以尽量避免原生事件与合成事件混用，如果原生事件阻止冒泡，可能会导致合成事件不执行，因为需要冒泡到document 上合成事件才会执行。

## React 组件中怎么做事件代理？它的原理是什么？
React基于Virtual DOM实现了一个SyntheticEvent层（合成事件层），定义的事件处理器会接收到一个合成事件对象的实例，它符合W3C标准，且与原生的浏览器事件拥有同样的接口，支持冒泡机制，所有的事件都自动绑定在最外层上。
在React底层，主要对合成事件做了两件事：

+ **事件委派**： React会把所有的事件绑定到结构的最外层，使用统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部事件监听和处理函数。
+ **自动绑定**： React组件中，每个方法的上下文都会指向该组件的实例，即自动绑定this为当前组件。

## React 高阶组件、Render props、hooks 有什么区别，为什么要不断迭代

### 目前react解决代码复用的主要方式：

+ **高阶组件(HOC)** 是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。具体而言，高阶组件是参数为组件，返回值为新组件的函数。
+ **render props** 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术，更具体的说，render prop 是一个用于告知组件需要渲染什么内容的函数 prop。
+ 通常，render props 和高阶组件只渲染一个子节点。让 **Hook** 来服务这个使用场景更加简单。这两种模式仍有用武之地，（例如，一个虚拟滚动条组件或许会有一个 renderltem 属性，或是一个可见的容器组件或许会有它自己的 DOM 结构）。但在大部分场景下，Hook 足够了，并且能够帮助减少嵌套。

### (1) HOC 官方解释

> 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

简言之，HOC是一种组件的设计模式，HOC接受一个组件和额外的参数（如果需要），返回一个新的组件。HOC 是纯函数，没有副作用。
```javascript
// hoc的定义
function withSubscription(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: selectData(DataSource, props)
      };
    }
    // 一些通用的逻辑处理
    render() {
      // ... 并使用新数据渲染被包装的组件!
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };

// 使用
const BlogPostWithSubscription = withSubscription(BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id));
```
HOC的优缺点∶

+ 优点∶ **逻辑复用**、不影响被包裹组件的内部逻辑。
+ 缺点∶ hoc传递给被包裹组件的props容易和被包裹后的组件**重名**，进而被**覆盖**

### (2) Render props 官方解释

> "render prop"是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术

具有render prop 的组件接受一个返回React元素的函数，将render的渲染逻辑注入到组件内部。在这里，"render"的命名可以是任何其他有效的标识符。

```javascript
// DataProvider组件内部的渲染逻辑如下
class DataProvider extends React.Components {
     state = {
    name: 'Tom'
  }

    render() {
    return (
        <div>
          <p>共享数据组件自己内部的渲染逻辑</p>
          { this.props.render(this.state) }
      </div>
    );
  }
}

// 调用方式
<DataProvider render={data => (
  <h1>Hello {data.name}</h1>
)}/>
```
Render props的优缺点：

+ 优点：**数据共享、代码复用**，将组件内的state作为props传递给调用者，将渲染逻辑交给调用者。
+ 缺点：无法在 return 语句外访问数据、嵌套写法不够优雅

### (3) Hooks 官方解释

> Hook是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。通过自定义hook，可以复用代码逻辑

```javascript
// 自定义一个获取订阅数据的hook
function useSubscription() {
  const data = DataSource.getComments();
  return [data];
}
// 
function CommentList(props) {
  const {data} = props;
  const [subData] = useSubscription();
    ...
}
// 使用
<CommentList data='hello' />
```

以上可以看出，hook解决了hoc的prop覆盖的问题，同时使用的方式解决了render props的嵌套地狱的问题。

**hook**的优点如下∶

+ 使用直观；
+ 解决hoc的prop 重名问题；
+ 解决render props 因共享数据 而出现嵌套地狱的问题；
+ 能在return之外使用数据的问题。

需要注意的是：hook只能在组件顶层使用，不可在分支语句中使用。

**总结∶**
Hoc、render props和hook都是为了解决代码复用的问题，但是hoc和render props都有特定的使用场景和明显的缺点。hook是react16.8更新的新的API，让组件逻辑复用更简洁明了，同时也解决了hoc和render props的一些缺点。

## 哪些方法会触发 React 重新渲染？重新渲染 render 会做些什么？

### 哪些方法会触发 react 重新渲染?

  + **setState()** 方法被调用
  `setState` 是 `React` 中最常用的命令，通常情况下，执行 `setState` 会触发 `render`。但是这里有个点值得关注，执行 setState 的时候不一定会重新渲染。当 `setState` 传入 `null` 时，`并不会触发 render`。

  + 父组件重新渲染
  只要父组件重新渲染了，即使传入子组件的 props 未发生变化，那么子组件也会重新渲染，进而触发 render

### 重新渲染 render 会做些什么

+ 会对新旧 `VNode` 进行对比，也就是我们所说的Diff算法。
+ 对新旧两棵树进行一个深度优先遍历，这样每一个节点都会一个标记，在到深度遍历的时候，每遍历到一和个节点，就把该节点和新的节点树进行对比，如果有差异就放到一个对象里面
+ 遍历差异对象，根据差异的类型，根据对应对规则更新VNode

React 的处理 render 的基本思维模式是每次一有变动就会去重新渲染整个应用。在 Virtual DOM 没有出现之前，最简单的方法就是直接调用 innerHTML。Virtual DOM厉害的地方并不是说它比直接操作 DOM 快，而是说不管数据怎么变，都会尽量以最小的代价去更新 DOM。React 将 render 函数返回的虚拟 DOM 树与老的进行比较，从而确定 DOM 要不要更新、怎么更新。当 DOM 树很大时，遍历两棵树进行各种比对还是相当耗性能的，特别是在顶层 setState 一个微小的修改，默认会去遍历整棵树。尽管 React 使用高度优化的 Diff 算法，但是这个过程仍然会损耗性能.

## React声明组件有哪几种方法，有什么不同？

### React 声明组件的三种方式：

  + 函数式定义的`无状态组件`
  + ES5原生方式`React.createClass`定义的组件
  + ES6形式的`extends React.Component`定义的组件

  1. **无状态函数式组件**
  它是为了创建纯展示组件，这种组件只负责根据传入的props来展示，不涉及到state状态的操作
  组件不会被实例化，整体渲染性能得到提升，不能访问this对象，不能访问生命周期的方法

  2. **ES5 原生方式 React.createClass // RFC**
  React.createClass会自绑定函数方法，导致不必要的性能开销，增加代码过时的可能性。

  3. **E6继承形式 React.Component // RCC**
  目前极为推荐的创建有状态组件的方式，最终会取代React.createClass形式；相对于 React.createClass可以更好实现代码复用。

### 无状态组件相对于于后者的区别：

与无状态组件相比，React.createClass和React.Component都是创建有状态的组件，这些组件是要被实例化的，并且可以访问组件的生命周期方法。

### React.createClass与React.Component区别：

  1. **函数this自绑定**

  `React.createClass`创建的组件，其每一个成员函数的this都有React自动绑定，函数中的this会被正确设置。
  `React.Component`创建的组件，其成员函数不会自动绑定this，需要开发者手动绑定，否则this不能获取当前组件实例对象。

  2. **组件属性类型propTypes及其默认props属性defaultProps配置不同**

  `React.createClass`在创建组件时，有关组件props的属性类型及组件默认的属性会作为组件实例的属性来配置，其中`defaultProps`是使用`getDefaultProp`s的方法来获取默认组件属性的
  `React.Component`在创建组件时配置这两个对应信息时，他们是作为组件类的属性，不是组件实例的属性，也就是所谓的类的静态属性来配置的。

  3. **组件初始状态state的配置不同**

  `React.createClass`创建的组件，其状态state是通过getInitialState方法来配置组件相关的状态；
  `React.Component`创建的组件，其状态state是在constructor中像初始化组件属性一样声明的。

## 有状态组件和无状态组件的理解及使用场景

### 1. 有状态组件

#### 特点：

+ 是类组件
+ 有继承
+ 可以使用this
+ 可以使用react的生命周期
+ 使用较多，容易频繁触发生命周期钩子函数，影响性能
+ 内部使用 state，维护自身状态的变化，有状态组件根据外部组件传入的 props 和自身的 state进行渲染。

#### 使用场景：

+ 需要使用到状态的。
+ 需要使用状态操作组件的（无状态组件的也可以实现新版本react hooks也可实现）

**总结：**
类组件可以维护自身的状态变量，即组件的 state ，类组件还有不同的生命周期方法，可以让开发者能够在组件的不同阶段（挂载、更新、卸载），对组件做更多的控制。类组件则既可以充当无状态组件，也可以充当有状态组件。当一个类组件不需要管理自身状态时，也可称为无状态组件。

### 2. 无状态组件

#### 特点：

+ 不依赖自身的状态state
+ 可以是类组件或者函数组件。
+ 可以完全避免使用 this 关键字。（由于使用的是箭头函数事件无需绑定）
+ 有更高的性能。当不需要使用生命周期钩子时，应该首先使用无状态函数组件
+ 组件内部不维护 state ，只根据外部组件传入的 props 进行渲染的组件，当 props 改变时，组件重新渲染。

#### 使用场景：

组件不需要管理 state，纯展示

#### 优点：

+ 简化代码、专注于 render
+ 组件不需要被实例化，无生命周期，提升性能。 输出（渲染）只取决于输入（属性），无副作用
+ 视图和数据的解耦分离

#### 缺点：

+ 无法使用 ref
+ 无生命周期方法
+ 无法控制组件的重渲染，因为无法使用shouldComponentUpdate 方法，当组件接受到新的属性时则会重渲染

**总结：**
组件内部状态且与外部无关的组件，可以考虑用状态组件，这样状态树就不会过于复杂，易于理解和管理。当一个组件不需要管理自身状态时，也就是无状态组件，应该优先设计为函数组件。比如自定义的` <Button/>`、 `<Input />` 等组件。

## 类组件与函数组件有什么异同？

### 相同点：

组件是 React 可复用的最小代码片段，它们会返回要在页面中渲染的 React 元素。也正因为组件是 React 的最小编码单位，所以无论是函数组件还是类组件，在使用方式和最终呈现效果上都是完全一致的。
我们甚至可以将一个类组件改写成函数组件，或者把函数组件改写成一个类组件（虽然并不推荐这种重构行为）。从使用者的角度而言，很难从使用体验上区分两者，而且在现代浏览器中，闭包和类的性能只在极端场景下才会有明显的差别。所以，基本可认为两者作为组件是完全一致的。

### 不同点：

+ 它们在开发时的心智模型上却存在巨大的差异。类组件是基于面向对象编程的，它主打的是继承、生命周期等核心概念；而函数组件内核是函数式编程，主打的是 immutable、没有副作用、引用透明等特点。
+ 之前，在使用场景上，如果存在需要使用生命周期的组件，那么主推类组件；设计模式上，如果需要使用继承，那么主推类组件。但现在由于 React Hooks 的推出，生命周期概念的淡出，函数组件可以完全取代类组件。其次继承并不是组件最佳的设计模式，官方更推崇“组合优于继承”的设计概念，所以类组件在这方面的优势也在淡出。
+ 性能优化上，类组件主要依靠 `shouldComponentUpdate` 阻断渲染来提升性能，而函数组件依靠 `React.memo` 缓存渲染结果来提升性能。
+ 从上手程度而言，类组件更容易上手，从未来趋势上看，由于React Hooks 的推出，函数组件成了社区未来主推的方案。
+ 类组件在未来时间切片与并发模式中，由于生命周期带来的复杂度，并不易于优化。而函数组件本身轻量简单，且在 Hooks 的基础上提供了比原先更细粒度的逻辑组织与复用，更能适应 React 的未来发展。

# 数据管理

## React setState 调用的原理

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e15b888f3bd4a1db8b72259331a4747~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
